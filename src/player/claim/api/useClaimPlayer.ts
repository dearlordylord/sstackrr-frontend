import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { CLAIM_PLAYER } from '../../../queries';

import { GameId } from '../../../game/types';
import { PlayerColor } from '../../types';
import { ClaimPlayerResponse } from '../../api/types';
import { useLastClaimedPlayer } from '../useLastClaimedPlayer';
import { usePlayerIdForGameId } from '../../usePlayerIdForGameId';

interface Args {
  gameToken: GameId;
  playerColor: PlayerColor;
}

interface ApiArgs {
  gameToken: GameId;
  player: PlayerColor;
}

export const useClaimPlayer = (gameToken?: GameId) => {
  const [mutate_, { reset, ...rest }] = useMutation<{
    claimPlayer: ClaimPlayerResponse;
  }, ApiArgs>(CLAIM_PLAYER);
  const { set: setLastClaimedPlayer } = useLastClaimedPlayer();
  const { set: setPlayerIdForGameId } = usePlayerIdForGameId(gameToken);
  const mutate = useCallback(async (args: Args) => {
    // maybe we could update queries, but it's also being pushed with subscriptions anyways
    const r = await mutate_({
      variables: {
        gameToken: args.gameToken,
        player: args.playerColor,
      },
    }).catch((e) => {
      console.error(e);
      toast.error(e.message);
      throw e;
    }).finally(() => {
      reset();
    });
    const token = r.data!.claimPlayer.playerToken;
    setPlayerIdForGameId(token);
    setLastClaimedPlayer(token);
    return r;
  }, [mutate_, reset]);
  return {
    ...rest,
    mutate,
  };
};
