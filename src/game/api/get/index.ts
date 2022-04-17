import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GameId } from '../../types';
import { GAME_SUBSCRIPTION, GET_GAME_QUERY } from '../../../queries';
import { GameStateResponse } from '../types';

interface GameQueryResponse {
  game: GameStateResponse;
}

export const useGame = (token: GameId) => {
  const { subscribeToMore, ...rest } = useQuery<GameQueryResponse>(GET_GAME_QUERY, {
    variables: {
      gameToken: token,
    },
  });
  useEffect(() => {
    const unsubscribe = subscribeToMore<GameQueryResponse>({
      document: GAME_SUBSCRIPTION,
      variables: {
        gameToken: token,
      },
      updateQuery: (prev: GameQueryResponse, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return subscriptionData.data;
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, token]);
  return rest;
};
