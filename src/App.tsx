import clsx from 'clsx';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { Input } from './Components/Input';
import { Creature } from './types';
import { useStateStore } from './useStateStore';

const AddCreature = () => {
  const { addInitiative, reset } = useStateStore((state) => ({
    addInitiative: state.addInitiative,
    reset: state.reset,
  }));

  const methods = useForm<Creature>({
    defaultValues: {
      hp: 10,
      tempHp: 0,
      maxHp: 10,
      name: 'Goblin',
      action: false,
      bonusAction: false,
      reaction: false,
    },
  });

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<Creature> = (data) => {
    console.log(data);
    addInitiative(data);
  };

  return (
    <FormProvider {...methods}>
      <Form className="p-3 gap-4 flex flex-col">
        <Input
          {...register('name', { required: 'Name required' })}
          label={'Name'}
          type="text"
        />
        <Input {...register('hp')} label={'HP'} type="number" />
        <Input {...register('maxHp')} type="number" label={'Max HP'} />
        <Input {...register('tempHp')} type="number" label={'Temp HP'} />
        {/* TODO: figure out how to do the input stuff */}
        <button
          type="submit"
          className="px-3 font-bold mt-5 max-w-32 text-white bg-gray-800 rounded-full h-10 hover:shadow-md hover:shadow-pink-500/50"
          onClick={handleSubmit(onSubmit)}
        >
          Add Creature
        </button>
        <button
          className="bg-white h-10 rounded-full max-w-32 text-gray-800 border-gray-800 hover:shadow-md hover:shadow-pink-500/50 border-2 font-bold "
          type="button"
          onClick={() => reset()}
        >
          Reset
        </button>
      </Form>
    </FormProvider>
  );
};

const App = () => {
  const {
    initiative,
    activeIndex,
    incrementInitiative,
    setCreatureAction,
    setCreatureBonusAction,
    setCreatureReaction,
  } = useStateStore((state) => ({
    initiative: state.initiative,
    activeIndex: state.activeIndex,
    incrementInitiative: state.incrementInitiative,
    setCreatureAction: state.setCreatureAction,
    setCreatureBonusAction: state.setCreatureBonusAction,
    setCreatureReaction: state.setCreatureReaction,
  }));

  return (
    <div className="size-full grid grid-cols-9 flex-col">
      <div className="max-w-md col-span-2 rounded bg-white shadow-black/20 shadow-sm w-full text-center">
        <AddCreature />
      </div>
      <div className="col-span-3 mt-5 ml-5 flex flex-col gap-5 max-h-screen overflow-auto">
        <div className="flex flex-row justify-end">
          <button onClick={() => incrementInitiative()}>
            <RxDoubleArrowRight className="scale-x-150 scale-y-125 hover:animate-spin text-pink-500" />
          </button>
        </div>
        {initiative.map((creature, index) => (
          <div
            key={`${creature.name}${creature.hp}${index}`}
            className={clsx(
              {
                'border border-pink-500': index === activeIndex,
              },
              'bg-gray-100 hover:bg-hero-texture-30 rounded-lg px-3 py-4 drop-shadow-md'
            )}
          >
            <h2 className="font-bold text-lg">{creature.name}</h2>
            <p>
              HP: {creature.hp}/{creature.maxHp}
            </p>
            <p>Temp HP: {creature.tempHp}</p>
            <p className="flex flex-row gap-5">
              <span>
                Action:{' '}
                <input
                  className="accent-pink-500"
                  type="checkbox"
                  checked={creature.action}
                  onChange={() => setCreatureAction(index, !creature.action)}
                />
              </span>
              <span>
                Bonus Action:{' '}
                <input
                  className="accent-pink-500"
                  type="checkbox"
                  checked={creature.bonusAction}
                  onChange={() =>
                    setCreatureBonusAction(index, !creature.bonusAction)
                  }
                />
              </span>
              <span>
                Reaction:{' '}
                <input
                  className="accent-pink-500"
                  type="checkbox"
                  checked={creature.reaction}
                  onChange={() =>
                    setCreatureReaction(index, !creature.reaction)
                  }
                />
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
