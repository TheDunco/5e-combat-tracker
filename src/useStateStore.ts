import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Creature, Damage } from './types';

interface UseStateStore {
  initiative: Array<Creature>;
  playersPreset: Array<Creature>;
  setPlayersPreset: () => void;
  loadPlayersPreset: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  addInitiative: (creature: Creature) => void;
  reset: () => void;
  incrementInitiative: () => void;
  setCreatureInitiative: (index: number, initiative: number) => void;
  setCreatureAction: (index: number, action: boolean) => void;
  setCreatureBonusAction: (index: number, bonusAction: boolean) => void;
  setCreatureReaction: (index: number, reaction: boolean) => void;
  creatureDamage: (index: number, damage: Damage) => void;
  creatureHeal: (index: number, health: number) => void;
  setCreatureTempHp: (index: number, tempHp: number) => void;
  tooltip: string;
  setTooltip: (tooltip: string) => void;
}

export const useStateStore = create<UseStateStore>()(
  persist(
    (set) => ({
      initiative: [] as Creature[],
      playersPreset: [] as Creature[],
      setPlayersPreset: () => {
        set((state) => ({
          playersPreset: state.initiative,
        }));
      },
      loadPlayersPreset: () => {
        set((state) => ({
          initiative: state.playersPreset,
        }));
      },
      activeIndex: 0,
      setActiveIndex: (index: number) => {
        set({ activeIndex: index });
      },
      addInitiative: (creature: Creature) => {
        set((state) => {
          return {
            initiative: [...state.initiative, creature].sort(
              (a, b) => b.initiative - a.initiative
            ),
          };
        });
      },
      reset: () => {
        set({ initiative: [], activeIndex: 0 });
      },
      incrementInitiative: () => {
        set((state) => {
          const newActiveIndex = state.activeIndex + 1;
          if (newActiveIndex >= state.initiative.length) {
            const newInitiative = state.initiative
              .map((creature) => {
                return {
                  ...creature,
                  action: false,
                  bonusAction: false,
                  reaction: false,
                };
              })
              .sort((a, b) => b.initiative - a.initiative);
            return { activeIndex: 0, initiative: newInitiative };
          }
          return { activeIndex: newActiveIndex };
        });
      },
      setCreatureAction: (index: number, action: boolean) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index && index === state.activeIndex) {
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
            if (i === index && index === state.activeIndex) {
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
              //   if (creature.resistances.includes(damage.type)) {
              //     damage.amount = Math.floor(damage.amount / 2);
              //   }
              // roll off tempHp first
              if (creature.tempHp > 0) {
                if (creature.tempHp - damage.amount <= 0) {
                  damage.amount -= creature.tempHp;
                  return {
                    ...creature,
                    tempHp: 0,
                    hp: creature.hp - damage.amount,
                  };
                }
                return { ...creature, tempHp: creature.tempHp - damage.amount };
              }
              if (creature.hp - damage.amount <= 0) {
                return { ...creature, hp: 0 };
              }
              return { ...creature, hp: creature.hp - damage.amount };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
      creatureHeal: (index: number, health: number) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              const prospectiveHealth = +creature.hp + +health;
              if (prospectiveHealth >= creature.maxHp) {
                return { ...creature, hp: creature.maxHp };
              }
              return { ...creature, hp: +creature.hp + +health };
            }
            return creature;
          });
          return { initiative: newInitiative };
        });
      },
      setCreatureInitiative: (index: number, initiative: number) => {
        set((state) => {
          const newInitiative = state.initiative
            .map((creature, i) => {
              if (i === index) {
                return { ...creature, initiative };
              }
              return creature;
            })
            .sort((a, b) => b.initiative - a.initiative);
          return { initiative: newInitiative };
        });
      },
      tooltip: 'Welcome!',
      setTooltip: (tooltip: string) => {
        set({ tooltip });
      },
      setCreatureTempHp: (index: number, tempHp: number) => {
        set((state) => {
          const newInitiative = state.initiative.map((creature, i) => {
            if (i === index) {
              return { ...creature, tempHp };
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
