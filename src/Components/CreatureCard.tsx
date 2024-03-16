import clsx from 'clsx';
import { RxCrosshair2, RxHeartFilled } from 'react-icons/rx';
import { Creature } from '../types';
import { useStateStore } from '../useStateStore';

const healthPercentToDescriptor = (percent: number): string => {
  switch (true) {
    case percent === 100:
      return 'Healthy';
    case percent < 100 && percent >= 75:
      return 'Bruised';
    case percent < 75 && percent >= 50:
      return 'Hurt';
    case percent < 50 && percent >= 25:
      return 'Bloodied';
    case percent < 25:
      return 'Haggard';
    case percent < 10:
      return 'Critical';
    case percent < 5:
      return "Death's Door";
    case percent <= 0:
      return 'Unconscious';
    default:
      return 'Healthy';
  }
};

export const CreatureCard: React.FC<{ creature: Creature; index: number }> = ({
  creature,
  index,
}) => {
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
  return (
    <div
      key={`${creature.name}${creature.hp}${index}`}
      className={clsx(
        {
          'border-2 border-pink-500': index === activeIndex,
          'bg-hero-hideout-50 hover:bg-hero-hideout-pink-50': creature.hp <= 0,
          'text-pink-950': creature.enemy,
        },
        'bg-gray-100 hover:bg-hero-texture-30 rounded-lg px-3 py-4 drop-shadow-md flex flex-col gap-1'
      )}
    >
      <h2 className="font-bold text-lg">
        [{creature.initiative}] {creature.name}{' '}
      </h2>
      <p className="flex flex-row items-center">
        <RxHeartFilled className="text-pink-500 mr-2" />
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
      <p className="flex flex-row gap-5">
        <span className="flex flex-row items-center gap-1">
          <label htmlFor="action">Action </label>
          <input
            id="action"
            className="accent-pink-500"
            type="checkbox"
            checked={creature.action}
            onChange={() => setCreatureAction(index, !creature.action)}
            disabled={index !== activeIndex}
          />
        </span>
        <span className="flex flex-row items-center gap-1">
          <label htmlFor="bonus-action">Bonus Action </label>
          <input
            id="bonus-action"
            className="accent-pink-500"
            type="checkbox"
            checked={creature.bonusAction}
            onChange={() =>
              setCreatureBonusAction(index, !creature.bonusAction)
            }
            disabled={index !== activeIndex}
          />
        </span>
        <span className="flex flex-row items-center gap-1">
          <label htmlFor="reaction">Reaction </label>
          <input
            id="reaction"
            className="accent-pink-500"
            type="checkbox"
            checked={creature.reaction}
            onChange={() => setCreatureReaction(index, !creature.reaction)}
          />
        </span>
      </p>
    </div>
  );
};
