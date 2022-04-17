import { MouseEvent, useCallback } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';
import { PlayerColor, PlayerId } from '../types';
import { GameId } from '../../game/types';
import { useClaimPlayer } from './api/useClaimPlayer';
import { Loader } from '../../utils/loader';
import { playerColorClassNames, playerColorHoverClassNames } from '../colors';
import { playerLabels } from '../labels';

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
    const handleClick = useCallback(async (ev: MouseEvent) => {
      ev.preventDefault();
      if (disabled) return;
      await mutate({ gameToken, playerColor: color }).catch((e) => {
        console.error('errors claiming player:', e);
        throw e;
      });
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
