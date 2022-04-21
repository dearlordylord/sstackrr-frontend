import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { CLAIM_PLAYER } from '../../../queries';

import { GameId } from '../../../game/types';
import { PlayerColor } from '../../types';
import { ClaimPlayerResponse } from '../../api/types';
import { useLastClaimedPlayer } from '../useLastClaimedPlayer';
import { useSetPlayerIdForGameId } from '../../usePlayerIdForGameId';

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
  const setPlayerIdForGameId = useSetPlayerIdForGameId();
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
    setPlayerIdForGameId(gameToken!, token);
    setLastClaimedPlayer(token);
    return r;
  }, [mutate_, reset, gameToken, setLastClaimedPlayer, setPlayerIdForGameId]);
  return {
    ...rest,
    mutate,
  };
};
