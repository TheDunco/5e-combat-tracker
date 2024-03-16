import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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
      hp: 0,
      tempHp: 0,
      name: 'Goblin',
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
        <Input {...register('tempHp')} type="number" label={'Temp HP'} />
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
  const { initiative, activeIndex } = useStateStore((state) => ({
    initiative: state.initiative,
    activeIndex: state.activeIndex,
  }));

  return (
    <div className="size-full grid grid-cols-9 flex-col">
      <div className="max-w-md col-span-2 rounded bg-white shadow-black/20 shadow-sm w-full text-center">
        <AddCreature />
      </div>
      <div className="col-span-3 mt-5">
        {initiative.map((creature, index) => {
          return (
            <div
              key={`${creature.name}${creature.hp}${index}`}
              className={`p-2 border-b border-gray-200 ${
                index === activeIndex ? 'bg-gray-200' : ''
              }`}
            >
              <h2>{creature.name}</h2>
              <p>HP: {creature.hp}</p>
              <p>Temp HP: {creature.tempHp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
