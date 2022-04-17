import { useQuery } from '@apollo/client';
import { PlayerColor, PlayerId } from './types';
import { GET_ME_QUERY } from '../queries';

export const usePlayerColor = (playerToken?: PlayerId) => useQuery<{me: PlayerColor}>(GET_ME_QUERY, {
  variables: { playerToken },

});
