import { useState } from 'react';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import { Creature, DamageTypeObj, DamageTypeSelectOptions } from '../types';
import { useStateStore } from '../useStateStore';
import { Input } from './Input';

export const AddCreatureForm = () => {
  const {
    addInitiative,
    setPlayersPreset,
    loadPlayersPreset,
    setTooltip,
    initiative,
    activeIndex,
  } = useStateStore((state) => ({
    addInitiative: state.addInitiative,
    setPlayersPreset: state.setPlayersPreset,
    loadPlayersPreset: state.loadPlayersPreset,
    setTooltip: state.setTooltip,
    initiative: state.initiative,
    activeIndex: state.activeIndex,
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
      enemy: true,
      initiative: 20,
      ac: 15,
    },
  });

  const { register, handleSubmit, watch, reset } = methods;
  const name = watch('name');

  const character = initiative[activeIndex];

  const onSubmit: SubmitHandler<Creature> = (data) => {
    addInitiative({
      ...data,
      immunities: selectedImmunities.map((i) => i.value),
      resistances: selectedResistances.map((i) => i.value),
    });
  };

  const [selectedResistances, setSelectedResistances] = useState(
    [] as Array<DamageTypeSelectOptions>
  );
  const [selectedImmunities, setSelectedImmunities] = useState(
    [] as Array<DamageTypeSelectOptions>
  );

  const loadInCharacter = () => {
    if (character) {
      reset({ ...character });
      setSelectedResistances(
        character?.resistances?.map((resistance) => ({
          label: resistance,
          value: resistance,
        })) || []
      );
      setSelectedImmunities(
        character?.immunities?.map((immunity) => ({
          label: immunity,
          value: immunity,
        })) || []
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <Form className="p-3 gap-4 flex flex-col">
        <button
          className="px-4 bg-white h-10 rounded-full text-gray-800 border-gray-800 hover:shadow-md hover:shadow-pink-500/50 border-2 font-bold "
          type="button"
          onClick={() => loadInCharacter()}
          onMouseOver={() =>
            setTooltip(
              'Load the current character into the form for editing. Useful for updating characters in the initiative order if you delete the previous one'
            )
          }
        >
          Load Current Character
        </button>
        <Input
          {...register('name', { required: 'Name required' })}
          label={'Name'}
          type="text"
        />
        <span className="flex flex-row gap-2">
          <Input
            {...register('initiative', {
              required: 'Must provide initiative order',
            })}
            type="number"
            label={'Initiative'}
          />
          <Input {...register('ac')} type="number" label={'AC'} />
        </span>
        <span className="flex flex-row gap-2">
          <Input {...register('hp')} label={'HP'} type="number" />
          <Input {...register('tempHp')} type="number" label={'Temp HP'} />
          <Input {...register('maxHp')} type="number" label={'Max HP'} />
        </span>
        <Input
          {...register('enemy')}
          type="checkbox"
          label={'Enemy?'}
          className="accent-pink-500 place-self-start flex size-8 rounded-full cursor-pointer"
          onMouseOver={() =>
            setTooltip('Mark the creature as an enemy (text is dark pink)')
          }
        />
        <label className="flex w-full flex-start -mb-3">Immunities</label>
        <MultiSelect
          options={Object.keys(DamageTypeObj).map((key) => ({
            label: key,
            value: key,
          }))}
          value={selectedImmunities}
          onChange={setSelectedImmunities}
          labelledBy="Immunities"
        />
        <label className="flex w-full flex-start -mb-3">Resistances</label>
        <MultiSelect
          options={Object.keys(DamageTypeObj).map((key) => ({
            label: key,
            value: key,
          }))}
          value={selectedResistances}
          onChange={setSelectedResistances}
          labelledBy="Resistances"
          className="outline-none"
        />
        <button
          type="submit"
          className="px-4 font-bold mt-5 text-white bg-gray-800 rounded-full h-10 hover:shadow-md hover:shadow-pink-500/50"
          onClick={handleSubmit(onSubmit)}
          onMouseOver={() => setTooltip(`Add ${name} to initiative order`)}
        >
          Add Creature
        </button>
        <hr className="border-gray-800" />
        <button
          className="px-4 bg-white h-10 rounded-full text-gray-800 border-gray-800 hover:shadow-md hover:shadow-pink-500/50 border-2 font-bold "
          type="button"
          onClick={() => setPlayersPreset()}
          onMouseOver={() =>
            setTooltip(
              'Save the current initiative order as a preset. Useful for saving players'
            )
          }
        >
          Save as Preset
        </button>
        <button
          className="px-4 bg-white h-10 rounded-full text-gray-800 border-gray-800 hover:shadow-md hover:shadow-pink-500/50 border-2 font-bold "
          type="button"
          onClick={() => loadPlayersPreset()}
          onMouseOver={() => setTooltip('Load the last saved preset')}
        >
          Load Preset
        </button>
      </Form>
    </FormProvider>
  );
};
