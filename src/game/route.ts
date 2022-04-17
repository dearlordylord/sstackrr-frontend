import { GameId } from './types';

export const makeGameRoute = (id: GameId | ':token') => `/game/${id}`;
