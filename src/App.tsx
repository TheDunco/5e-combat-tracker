import { RxDoubleArrowRight, RxReset } from "react-icons/rx";
import { AddCreatureForm } from "./Components/AddCreatureForm";
import { CreatureCard } from "./Components/CreatureCard";
import { EditCreatureForm } from "./Components/EditCreatureForm";
import { useStateStore } from "./useStateStore";

const App = () => {
    const { initiative, incrementInitiative, reset, tooltip, setTooltip } =
        useStateStore((state) => ({
            initiative: state.initiative,
            incrementInitiative: state.incrementInitiative,
            reset: state.reset,
            tooltip: state.tooltip,
            setTooltip: state.setTooltip,
        }));

    return (
        <div className="size-full flex-row md:grid md:grid-cols-9">
            <div className="col-span-2 rounded md:bg-white shadow-black/20 shadow-sm w-full text-center">
                <AddCreatureForm />
            </div>
            <div className="col-span-4 m-5 mr-0 pr-5 flex flex-col gap-5 max-h-screen overflow-auto">
                <div className="flex flex-row justify-end gap-5 sticky top-0 z-10  bg-neutral-100/5 backdrop-blur-sm">
                    <p>{tooltip}</p>
                    <button
                        className="bg-gray-800 rounded-full h-8 p-2 px-4 hover:shadow-md hover:shadow-pink-500/50"
                        onClick={() => {
                            // eslint-disable-next-line no-restricted-globals
                            const confirmed = confirm(
                                "Are you sure you want to reset?"
                            );
                            if (confirmed) reset();
                        }}
                        onMouseOver={() => setTooltip("Reset app state")}
                    >
                        <RxReset className="scale-x-150 scale-y-125 text-white" />
                    </button>
                    <button
                        className="bg-gray-800 rounded-full h-8 p-2 px-4 hover:shadow-md hover:shadow-pink-500/50"
                        onClick={() => incrementInitiative()}
                        onMouseOver={() => setTooltip("Increment initiative")}
                    >
                        <RxDoubleArrowRight className="scale-x-150 scale-y-125 text-white" />
                    </button>
                </div>
                {initiative.map((creature, index) => (
                    <CreatureCard
                        key={`${creature.name}${creature.initiative}${index}`}
                        creature={creature}
                        index={index}
                    />
                ))}
            </div>
            <div className="bg-transparent col-span-3 bg-hero-diagonal-lines-10">
                <EditCreatureForm />
            </div>
        </div>
    );
};

export default App;
