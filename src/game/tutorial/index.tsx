import { FC } from 'react';
import { tutorialGame, tutorialWinningCombinations } from './fields';
import { Field } from '../component';
import { GameCell } from '../cell';
import { PlayerColor } from '../../player/types';

const TutorialPlayerCell = ({ p }:{p: PlayerColor}) => (
  <div className="inline-block"><GameCell cell={p} cellSide={13} /></div>
);

/* eslint-disable react/no-array-index-key */ // really it's ok here
const TutorialGame: FC = () => (
  <>
    {tutorialGame.map(([f, p], i) => {
      const PlayerCellWithText = (
        <div className="inline-block">
          Player
          {' '}
          <TutorialPlayerCell p={p} />
        </div>
      );
      return (
        <div key={i} className="flex flex-row my-5">
          <div className="flex flex-col">
            {i === tutorialGame.length - 1 ? (
              <p>
                {PlayerCellWithText}
                {' '}
                won
              </p>
            ) : (
              <p>
                {PlayerCellWithText}
                {"'s "}
                turn
              </p>
            )}
            <Field field={f} cellSide={20} />
          </div>
          {i < tutorialGame.length - 1 ? <p className="mx-5">→</p> : null}
        </div>
      );
    })}
  </>
);
/* eslint-enable react/no-array-index-key */

/* eslint-disable react/no-array-index-key */ // really it's ok here
const TutorialWinningCombinations: FC = () => (
  <>
    {tutorialWinningCombinations.map((f, i) => (
      <div key={i} className="flex flex-row my-5">
        <div className="flex flex-col">
          <Field field={f} cellSide={20} />
        </div>
      </div>
    ))}
  </>
);
/* eslint-enable react/no-array-index-key */

export const Tutorial: FC = () => (
  <div>
    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">Tutorial</h1>
    <div className="flex flex-col items-center">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2">Winning combinations:</h2>
      <div className="flex flex-row flex-wrap">
        <TutorialWinningCombinations />
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2">Example game:</h2>
      <div className="flex flex-row flex-wrap">
        <TutorialGame />
      </div>
    </div>
  </div>
);
