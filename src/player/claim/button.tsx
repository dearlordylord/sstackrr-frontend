import { MouseEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';
import { PlayerColor, PlayerId } from '../types';
import { GameId } from '../../game/types';
import { useClaimPlayer } from './api/useClaimPlayer';
import { Loader } from '../../utils/loader';

const playerLabels: {[k in PlayerColor]: string} = {
  RED: 'Red',
  BLUE: 'Blue',
};

// https://stackoverflow.com/a/66593793/2123547 - use full class names
const playerColorClassNames: {[k in PlayerColor]: string} = {
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
};

const playerColorHoverClassNames: {[k in PlayerColor]: string} = {
  RED: 'bg-red-700',
  BLUE: 'bg-blue-700',
};

interface ClaimPlayerButtonProps {
  gameToken: GameId;
  playerToken?: PlayerId;
}

export const makeClaimPlayerButton = (color: PlayerColor) => {
  const playerLabel = playerLabels[color];
  const colorClassName = playerColorClassNames[color];
  const hoverColorClassName = playerColorHoverClassNames[color];
  return function ({ playerToken, gameToken }: ClaimPlayerButtonProps) {
    const disabled = !!playerToken;
    const { mutate, loading: isUpdating } = useClaimPlayer(gameToken);
    const handleClick = useCallback(async (e: MouseEvent) => {
      e.preventDefault();
      if (disabled) return;
      const r = await mutate({ gameToken, playerColor: color });
      if (r.errors) {
        console.error('errors claiming player:', r.errors);
        toast.error('Error claiming player');
        return;
      }
      toast.success(`You are now ${playerLabel}`);
    }, [disabled, gameToken, playerLabel]);
    if (isUpdating) return <Loader />;
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cx(`${colorClassName} hover:${hoverColorClassName} text-white font-bold py-2 px-4 rounded`, {
          'opacity-50 cursor-not-allowed': disabled,
        })}
      >
        {playerLabel}
        {' '}
        Player
      </button>
    );
  };
};
