import cx from 'classnames';
import {
  forwardRef, useMemo, MouseEvent, useCallback,
} from 'react';

import { toast } from 'react-toastify';
import { GameId, GameSide } from './types';
import { PlayerColor, PlayerId } from '../player/types';
import { useGame } from './api/get';
import { Loader } from '../utils/loader';
import { playerColorClassNames } from '../player/colors';

import { GameStateResponse } from './api/types';
import { usePlayerColor } from '../player/usePlayerColor';
import { useMakeTurn } from './api/turn';
import { playerLabels } from '../player/labels';
import { NewGameButton } from './newGameButton';
import { makeGameRoute } from './route';
import { useLocation } from 'react-router-dom';

interface Props {
  gameToken: GameId;
  playerToken?: PlayerId;
}

const cellMarginClass = 'm-1';

const cellColorClassName = (p: PlayerColor | null) => (p ? playerColorClassNames[p] : 'bg-gray-100');

const Field = forwardRef<HTMLDivElement, { field: GameStateResponse['state'], cellSide: number }>(({ field, cellSide }, ref) => {
  const squareStyles = useMemo(() => ({
    width: `${cellSide}px`,
    height: `${cellSide}px`,
  }), [cellSide]);
  /* eslint-disable react/no-array-index-key */
  return (
    <div className="flex flex-col align-center" ref={ref}>
      {field.map((row, i) => (
        <div className="flex flex-row justify-center" key={i}>
          {row.map((cell, j) => (
            <div style={squareStyles} className={cx('rounded', cellMarginClass, cellColorClassName(cell))} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
  /* eslint-enable react/no-array-index-key */
});

const useCellSide = () => 70; // todo calculate responsively

const controlsButtonSymbols: {[k in GameSide]: string} = {
  RIGHT: '←',
  LEFT: '→',
};

function ControlsButton({
  cellSide, side, height, playerColor, playerToken,
}: {playerToken?: PlayerId, playerColor: PlayerColor, cellSide: number, height: number, side: GameSide}) {
  const { mutate: makeTurn } = useMakeTurn();
  const marginClass = cellMarginClass;
  const squareStyles = useMemo(() => ({
    width: `${cellSide}px`,
    height: `${cellSide}px`,
  }), [cellSide]);
  const handleClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    await makeTurn({
      playerToken: playerToken!,
      turn: {
        side, height,
      },
    }).catch((err) => {
      console.error('error making turn', err);
      toast.error('Error making turn');
      throw err;
    });
  }, [side, height, playerToken]);
  return (
    <button
      type="button"
      onClick={handleClick}
      style={squareStyles}
      className={cx(marginClass, 'bg-gray-100 cursor-pointer', playerColor === 'RED' ? 'hover:bg-red-500' : 'hover:bg-blue-500')}
    >
      {controlsButtonSymbols[side]}
    </button>
  );
}

/* eslint-disable react/no-array-index-key */
const makeControls = (side: GameSide) => function ({
  canControl, playerToken, playerColor, field, cellSide,
}: { canControl: boolean, playerToken?: PlayerId, playerColor: PlayerColor, field: GameStateResponse['state'], cellSide: number }) {
  return (
    <div className={cx('flex flex-col', {
      invisible: !canControl,
    })}
    >
      {field.map((_, i) => (
        <ControlsButton playerToken={playerToken} playerColor={playerColor} height={i} cellSide={cellSide} side={side} key={i} />
      ))}
    </div>
  );
};
/* eslint-enable react/no-array-index-key */

const LeftControls = makeControls('LEFT');
const RightControls = makeControls('RIGHT');

const InviteLinkButton = ({ gameToken }: { gameToken: GameId }) => {
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const url = window.location.origin + makeGameRoute(gameToken);
    window.navigator.clipboard.writeText(url);
    toast.success('Invite link copied to clipboard');
  }, [gameToken])
  return <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
    Copy Invite Link
  </button>;
};

export function Game({ gameToken, playerToken }: Props) {
  const { data: game, loading: isGameLoading, error } = useGame(gameToken);
  const cellSide = useCellSide();
  const { data: playerColorData, loading: isColorLoading } = usePlayerColor(playerToken);
  const playerColor = playerColorData?.me;
  const isLoading = isGameLoading || isColorLoading;
  if (isLoading) return <Loader />;
  if (error) {
    return (
      <div>
        Error $
        {error.message}
      </div>
    );
  }
  if (!game) return <div>No game fetched</div>; // unlikely but will fix us a type error
  const field = game.game.state;
  const canControl = !!playerToken && !game.game.isStalemate && !game.game.winner && game.game.nextPlayer === playerColor;
  const isFinished = game.game.isStalemate || !!game.game.winner;
  return (
    <div>
      <div className="flex justify-center"><div className="flex flex-row space-x-3 w-fit">
      <div>{playerColor ? (
        <div className="flex place-content-center">
          <span className="mr-1">You are </span>
          {' '}
          <span className={playerColorClassNames[playerColor]}>{playerLabels[playerColor]}</span>
        </div>
      ) : null}
      {game.game.nextPlayer ? (
        <div className="flex place-content-center">
          <span className="mr-1">Turn is </span>
          {' '}
          <span className={playerColorClassNames[game.game.nextPlayer]}>{playerLabels[game.game.nextPlayer]}</span>
        </div>
      ) : null}</div><div>{!isFinished ? <InviteLinkButton gameToken={gameToken} /> : null}</div></div></div>

      {game.game.winner ? (
        <div className="flex flex-col">
          <div className={playerColorClassNames[game.game.winner]}>
            Player
            {playerLabels[game.game.winner]}
            {' '}
            won!
          </div>
          <NewGameButton />
        </div>
      ) : null}
      <div className="flex flex-row place-content-center">
        <LeftControls canControl={canControl} playerToken={playerToken} playerColor={playerColor!} field={field} cellSide={cellSide} />
        <Field cellSide={cellSide} field={field} />
        <RightControls canControl={canControl} playerToken={playerToken} playerColor={playerColor!} field={field} cellSide={cellSide} />
      </div>
    </div>
  );
}
