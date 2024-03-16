import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Creature } from '../types';
import { useStateStore } from '../useStateStore';
import { Input } from './Input';

export const AddCreature = () => {
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
      enemy: true,
      initiative: 20,
      ac: 15,
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
        <Input
          {...register('initiative', {
            required: 'Must provide initiative order',
          })}
          type="number"
          label={'Initiative'}
        />
        <Input {...register('hp')} label={'HP'} type="number" />
        <Input {...register('maxHp')} type="number" label={'Max HP'} />
        <Input {...register('tempHp')} type="number" label={'Temp HP'} />
        <Input {...register('ac')} type="number" label={'AC'} />
        <Input
          {...register('enemy')}
          type="checkbox"
          label={'Enemy?'}
          className="accent-pink-500 place-self-start flex"
        />
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
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const confirmed = confirm('Are you sure you want to reset?');
            if (confirmed) reset();
          }}
        >
          Reset
        </button>
      </Form>
    </FormProvider>
  );
};
