import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { GameId } from '../../types';
import { GAME_SUBSCRIPTION, GET_GAME_QUERY } from '../../../queries';
import { GameStateResponse } from '../types';

export const useGame = (token: GameId) => {
  const { subscribeToMore, ...rest } = useQuery<GameStateResponse>(GET_GAME_QUERY, {
    variables: {
      gameToken: token,
    },
  });
  useEffect(() => {
    const unsubscribe = subscribeToMore<GameStateResponse>({
      document: GAME_SUBSCRIPTION,
      variables: {
        gameToken: token,
      },
      updateQuery: (prev: GameStateResponse, { subscriptionData }) => {
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
