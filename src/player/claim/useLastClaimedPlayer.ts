import { useLocalStorageContext } from '../../localStorage/context';

// last game we have claimed a player token for
export const useLastClaimedPlayer = () => {
  const localStorageContext = useLocalStorageContext();
  return { data: localStorageContext.lastPlayerToken, set: localStorageContext.setLastPlayerToken };
};
