import { useNavigate } from 'react-router-dom';
import { MouseEvent, useCallback } from 'react';
import { toast } from 'react-toastify';

import { useInitGame } from './api/init/useInitGame';
import { Loader } from '../utils/loader';
import { makeGameRoute } from './route';

export function NewGameButtonComponent({ withBot, onClick }: { withBot?: boolean; onClick: (e: MouseEvent) => void; }) {
  return (
    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
      New Game
      {' '}
      {withBot ? ' Against a Bot' : 'Against another Player'}
    </button>
  );
}

export function NewGameButton({ withBot }: { withBot?: boolean }) {
  const navigate = useNavigate();
  const { mutate, loading: isLoading } = useInitGame();
  const onNewGame = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    const r = await mutate(withBot);
    if (r.errors?.length) {
      toast.error('Error on game init');
      console.error('Error during game init:', r.errors);
      return;
    }
    navigate(makeGameRoute(r.data!.initGame.id));
  }, [mutate, navigate, withBot]);
  if (isLoading) return <Loader />;
  return <NewGameButtonComponent withBot={withBot} onClick={onNewGame} />;
}
