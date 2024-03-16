import React from 'react';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RxArrowDown, RxArrowUp } from 'react-icons/rx';
import { Creature, Damage, DamageTypeObj } from '../types';
import { useStateStore } from '../useStateStore';
import { CreatureCard } from './CreatureCard';
import { Input } from './Input';

type HealthForm = Damage & Pick<Creature, 'initiative'>;

export const HealthEditForm: React.FC = () => {
  const {
    activeIndex,
    initiative,
    creatureDamage,
    creatureHeal,
    setCreatureInitiative,
  } = useStateStore((state) => ({
    activeIndex: state.activeIndex,
    initiative: state.initiative,
    creatureDamage: state.creatureDamage,
    creatureHeal: state.creatureHeal,
    setCreatureInitiative: state.setCreatureInitiative,
  }));

  const creature = initiative[activeIndex];
  const methods = useForm<HealthForm>({
    defaultValues: {
      amount: 1,
      type: DamageTypeObj.Slashing,
      initiative: creature?.initiative || 0,
    },
  });
  if (!creature) return null;

  const { register, handleSubmit } = methods;

  const handleInitiative: SubmitHandler<HealthForm> = (data) => {
    setCreatureInitiative(activeIndex, data.initiative);
  };

  const onSubmitHeal: SubmitHandler<HealthForm> = (data) => {
    if (data.amount < 0) {
      return;
    }
    creatureHeal(activeIndex, data.amount);
    handleInitiative(data);
  };

  const onSubmitDamage: SubmitHandler<HealthForm> = (data) => {
    if (data.amount < 0) {
      return;
    }
    creatureDamage(activeIndex, data);
    handleInitiative(data);
  };

  return (
    <>
      <div className="p-3">
        <CreatureCard creature={creature} index={activeIndex} sidebar={true} />
      </div>
      <FormProvider {...methods}>
        <Form className="@container p-3 gap-4 flex flex-col">
          <span className="flex flex-row gap-2">
            <Input
              {...register('amount', {
                required: 'Must provide damage amount',
              })}
              type="number"
              label={'HP'}
            />
            <Input
              {...register('type', {
                required: 'Must provide damage amount',
              })}
              type="text"
              label={'Type'}
            />
          </span>
          <span className="flex-col @xs:flex-row flex gap-0 @xs:gap-2">
            <button
              type="submit"
              id="heal"
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-500 rounded-full h-10"
              onClick={handleSubmit(onSubmitHeal)}
            >
              <RxArrowUp />
              Heal
            </button>
            <button
              type="submit"
              id="damage"
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:bg-gradient-to-l hover:from-rose-400 hover:to-red-500"
              onClick={handleSubmit(onSubmitDamage)}
            >
              <RxArrowDown />
              Damage
            </button>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <Input
              {...register('initiative')}
              type="number"
              label="Initiative"
            />
            <button
              type="submit"
              id="damage"
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:bg-gradient-to-l hover:from-rose-400 hover:to-pink-500"
              onClick={handleSubmit(handleInitiative)}
            >
              Set
            </button>
          </span>
        </Form>
      </FormProvider>
    </>
  );
};
