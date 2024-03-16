import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Creature } from './types';

interface UseStateStore {
  initiative: Array<Creature> | Array<never>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addInitiative: (creature: Creature) => void;
  reset: () => void;
}

export const useStateStore = create<UseStateStore>()(
  persist(
    (set, get) => ({
      initiative: [],
      activeIndex: 0,
      setActiveIndex: (index: number) => {
        set({ activeIndex: index });
      },
      addInitiative: (creature: Creature) => {
        set((state) => {
          return { initiative: [...state.initiative, creature] };
        });
      },
      reset: () => {
        set({ initiative: [], activeIndex: 0 });
      },
    }),
    { name: 'combat-state', storage: createJSONStorage(() => localStorage) }
  )
);
