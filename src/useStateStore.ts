import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Creature, Damage } from './types';

interface UseStateStore {
  initiative: Array<Creature>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addInitiative: (creature: Creature) => void;
  reset: () => void;
  incrementInitiative: () => void;
  setCreatureAction: (index: number, action: boolean) => void;
  setCreatureBonusAction: (index: number, bonusAction: boolean) => void;
  setCreatureReaction: (index: number, reaction: boolean) => void;
  creatureDamage: (index: number, damage: Damage) => void;
}

export const useStateStore = create<UseStateStore>()(
  persist(
    (set) => ({
      initiative: [] as Creature[],
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
      incrementInitiative: () => {
        set((state) => {
          const newActiveIndex = state.activeIndex + 1;
          if (newActiveIndex >= state.initiative.length) {
            const newInitiative = state.initiative.map((creature) => {
              return {
                ...creature,
                action: false,
                bonusAction: false,
                reaction: false,
              };
            });
            return { activeIndex: 0, initiative: newInitiative };
          }
          return { activeIndex: newActiveIndex };
        });
      },
      setCreatureAction: (index: number, action: boolean) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              return { ...creature, action };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
      setCreatureBonusAction: (index: number, bonusAction: boolean) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              return { ...creature, bonusAction };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
      setCreatureReaction: (index: number, reaction: boolean) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              return { ...creature, reaction };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
      creatureDamage: (index: number, damage: Damage) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              return { ...creature, hp: creature.hp - damage.amount };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
    }),
    { name: 'combat-state', storage: createJSONStorage(() => localStorage) }
  )
);
