// TODO items are added to local storage but never deleted. it's a leak, should be addressed

import {
  createContext, PropsWithChildren, useCallback, useContext, useMemo, useState,
} from 'react';
import store2 from 'store2';
import { GameId } from '../game/types';
import { PlayerId } from '../player/types';
import { identity } from '../utils/identity';

const idsStoragePrefix = 'ids-';
const currentPlayerStorageKey = 'currentPlayer';

interface Context {
  playerTokenForGameToken: Map<GameId, PlayerId>;
  setPlayerTokenForGameToken: (gameToken: GameId, playerToken: PlayerId) => void;
  lastPlayerToken?: PlayerId;
  setLastPlayerToken: (pid: PlayerId) => void;
}
const defaultContext: Context = {
  playerTokenForGameToken: new Map(),
  setPlayerTokenForGameToken: identity as any,
  lastPlayerToken: undefined,
  setLastPlayerToken: identity as any,
};
const context = createContext<Context>(defaultContext);
export const useLocalStorageContext = () => useContext(context);
type IdLocalStorage = { [key in GameId]: PlayerId };
const idsFromStorage = (): Map<GameId, PlayerId> => new Map(Object.entries((store2.namespace(idsStoragePrefix).getAll() as IdLocalStorage))) as Map<GameId, PlayerId>;
export function LocalStorageContextProvider({ children }: PropsWithChildren<unknown>) {
  const [tokensData, setTokensData] = useState<Map<GameId, PlayerId>>(idsFromStorage());
  const [lastPlayerToken, setLastPlayerToken_] = useState<PlayerId | undefined>(store2.get(currentPlayerStorageKey));
  const setPlayerTokenForGameToken = useCallback((gameToken: GameId, playerToken: PlayerId) => {
    store2.namespace(idsStoragePrefix).set(gameToken, playerToken);
    setTokensData(new Map(tokensData).set(gameToken, playerToken));
  }, [tokensData]);
  const setLastPlayerToken = useCallback((pid: PlayerId) => {
    store2.set(currentPlayerStorageKey, pid);
    setLastPlayerToken_(pid);
  }, []);
  const state = useMemo(() => ({
    playerTokenForGameToken: tokensData,
    setPlayerTokenForGameToken,
    lastPlayerToken,
    setLastPlayerToken,
  }), [
    tokensData,
    setPlayerTokenForGameToken,
    lastPlayerToken,
    setLastPlayerToken,
  ]);
  return (
    <context.Provider value={state}>
      {children}
    </context.Provider>
  );
}
