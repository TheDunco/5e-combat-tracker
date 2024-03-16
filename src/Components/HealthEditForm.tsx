import React from 'react';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RxArrowDown, RxArrowUp } from 'react-icons/rx';
import { Creature, Damage, DamageTypeObj } from '../types';
import { useStateStore } from '../useStateStore';
import { CreatureCard } from './CreatureCard';
import { Input } from './Input';

type EditCreatureFormType = Damage & Pick<Creature, 'initiative' | 'tempHp'>;

export const EditCreatureForm: React.FC = () => {
  const {
    activeIndex,
    initiative,
    creatureDamage,
    creatureHeal,
    setCreatureInitiative,
    setTooltip,
    setCreatureTempHp,
  } = useStateStore((state) => ({
    activeIndex: state.activeIndex,
    initiative: state.initiative,
    creatureDamage: state.creatureDamage,
    creatureHeal: state.creatureHeal,
    setCreatureInitiative: state.setCreatureInitiative,
    setTooltip: state.setTooltip,
    setCreatureTempHp: state.setCreatureTempHp,
  }));

  const creature = initiative[activeIndex];
  const methods = useForm<EditCreatureFormType>({
    defaultValues: {
      amount: 1,
      type: DamageTypeObj.Slashing,
      initiative: creature?.initiative || 0,
      tempHp: creature?.tempHp || 0,
    },
  });
  if (!creature) return null;

  const { register, handleSubmit, watch } = methods;
  const amount = watch('amount');

  const handleInitiative: SubmitHandler<EditCreatureFormType> = (data) => {
    setCreatureInitiative(activeIndex, data.initiative);
  };

  const handleTempHp: SubmitHandler<EditCreatureFormType> = (data) => {
    setCreatureTempHp(activeIndex, data.tempHp);
  };

  const onSubmitHeal: SubmitHandler<EditCreatureFormType> = (data) => {
    if (data.amount < 0) {
      return;
    }
    creatureHeal(activeIndex, data.amount);
    handleInitiative(data);
  };

  const onSubmitDamage: SubmitHandler<EditCreatureFormType> = (data) => {
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
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-500 rounded-full h-10"
              onClick={handleSubmit(onSubmitHeal)}
              onMouseOver={() => setTooltip(`Heal the creature ${amount} HP`)}
            >
              <RxArrowUp />
              Heal
            </button>
            <button
              type="submit"
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:bg-gradient-to-l hover:from-rose-400 hover:to-red-500"
              onClick={handleSubmit(onSubmitDamage)}
              onMouseOver={() => setTooltip(`Damage the creature ${amount} HP`)}
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
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:bg-gradient-to-l hover:from-rose-400 hover:to-pink-500"
              onClick={handleSubmit(handleInitiative)}
              onMouseOver={() =>
                setTooltip(`Set the initiative order of ${creature.name}`)
              }
            >
              Set
            </button>
          </span>
          <span className="flex flex-row gap-2 items-center">
            <Input {...register('tempHp')} type="number" label="Temp HP" />

            <button
              type="submit"
              className="flex flex-row items-center max-w-min pl-4 pr-5 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-500"
              onClick={handleSubmit(handleTempHp)}
              onMouseOver={() => setTooltip(`Set temp HP for ${creature.name}`)}
            >
              Set
            </button>
          </span>
        </Form>
      </FormProvider>
    </>
  );
};
