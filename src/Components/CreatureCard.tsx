import clsx from 'clsx';
import { useId } from 'react';
import { RxCrosshair2, RxHeart } from 'react-icons/rx';
import { Creature } from '../types';
import { useStateStore } from '../useStateStore';

const healthPercentToDescriptor = (percent: number): string => {
  switch (true) {
    case percent === 100:
      return 'Mint';
    case percent < 100 && percent >= 90:
      return 'Healthy';
    case percent < 90 && percent >= 80:
      return 'Bruised';
    case percent < 80 && percent >= 70:
      return 'Injured';
    case percent < 70 && percent >= 50:
      return 'Hurt';
    case percent < 50 && percent >= 25:
      return 'Bloodied';
    case percent < 25 && percent >= 10:
      return 'Haggard';
    case percent < 10 && percent >= 5:
      return 'Critical';
    case percent < 5 && percent > 0:
      return "Death's Door";
    case percent <= 0:
      return 'Unconscious';
    default:
      return 'Healthy';
  }
};

export const CreatureCard: React.FC<{
  creature: Creature;
  index: number;
  sidebar?: boolean;
}> = ({ creature, index, sidebar }) => {
  const {
    activeIndex,
    setCreatureAction,
    setCreatureBonusAction,
    setCreatureReaction,
  } = useStateStore((state) => ({
    activeIndex: state.activeIndex,
    setCreatureAction: state.setCreatureAction,
    setCreatureBonusAction: state.setCreatureBonusAction,
    setCreatureReaction: state.setCreatureReaction,
  }));
  const creatureTotalHealth = +creature.hp + +creature.tempHp;
  const healthPercent = Math.round(
    (creatureTotalHealth * 100) / creature.maxHp
  );
  const actionId = useId();
  const bonusActionId = useId();
  const reactionId = useId();
  return (
    <div className="@container">
      <div
        className={clsx(
          'bg-gray-100 hover:bg-hero-texture-30 rounded-lg px-3 py-4 drop-shadow-md flex flex-col gap-1',
          {
            'border-2 border-pink-500': index === activeIndex && !sidebar,
            'bg-hero-skulls-10 hover:bg-hero-skulls-pink-30': creature.hp <= 0,
            'text-pink-950': creature.enemy,
          }
        )}
      >
        <h2 className="font-bold text-lg">
          [{creature.initiative}] {creature.name}{' '}
        </h2>
        <p className="flex flex-row items-center">
          <RxHeart className="text-pink-500 mr-2" />
          <span className="font-bold">{creature.hp}</span>
          {creature.tempHp > 0 ? `\x07(+${creature.tempHp})` : ''}/
          <span className="font-medium">{creature.maxHp}</span>
          <span className="font-light">&nbsp;({healthPercent}%)</span>
          <span className="text-sm italic ml-1">
            {healthPercentToDescriptor(healthPercent)}
          </span>
        </p>
        <p className="flex flex-row items-center gap-2">
          <RxCrosshair2 /> {creature.ac}
        </p>
        <p className="flex flex-col @sm:flex-col @sm:gap-2 @md:flex-row @md:gap-5">
          <span className="flex flex-row items-center gap-1 cursor-pointer">
            <label htmlFor={actionId} className="cursor-pointer">
              Action{' '}
            </label>
            <input
              id={actionId}
              className="accent-pink-500 cursor-pointer"
              type="checkbox"
              checked={creature.action}
              onChange={() => setCreatureAction(index, !creature.action)}
              disabled={index !== activeIndex}
            />
          </span>
          <span className="flex flex-row items-center gap-1 cursor-pointer">
            <label htmlFor={bonusActionId} className="cursor-pointer">
              Bonus Action{' '}
            </label>
            <input
              id={bonusActionId}
              className="accent-pink-500 cursor-pointer"
              type="checkbox"
              checked={creature.bonusAction}
              onChange={() =>
                setCreatureBonusAction(index, !creature.bonusAction)
              }
              disabled={index !== activeIndex}
            />
          </span>
          <span className="flex flex-row items-center gap-1 className='cursor-pointer'">
            <label htmlFor={reactionId}>Reaction </label>
            <input
              id={reactionId}
              className="accent-pink-500 cursor-pointer"
              type="checkbox"
              checked={creature.reaction}
              onChange={() => setCreatureReaction(index, !creature.reaction)}
            />
          </span>
        </p>
      </div>
    </div>
  );
};
