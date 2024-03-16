import { RxDoubleArrowRight } from 'react-icons/rx';
import { AddCreature } from './Components/AddCreature';
import { CreatureCard } from './Components/CreatureCard';
import { useStateStore } from './useStateStore';

const App = () => {
  const { initiative, incrementInitiative } = useStateStore((state) => ({
    initiative: state.initiative,
    incrementInitiative: state.incrementInitiative,
  }));

  return (
    <div className="size-full grid grid-cols-9 flex-col">
      <div className="max-w-md col-span-2 rounded bg-white shadow-black/20 shadow-sm w-full text-center">
        <AddCreature />
      </div>
      <div className="col-span-3 mt-5 ml-5 flex flex-col gap-5 max-h-screen overflow-auto">
        <div className="flex flex-row justify-end">
          <button
            className="bg-gray-800 rounded-full p-2 px-4 hover:shadow-md hover:shadow-pink-500/50"
            onClick={() => incrementInitiative()}
          >
            <RxDoubleArrowRight className="scale-x-150 scale-y-125 text-white" />
          </button>
        </div>
        {initiative.map((creature, index) => (
          <CreatureCard creature={creature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default App;
