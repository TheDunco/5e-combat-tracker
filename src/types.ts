export const DamageTypeObj = {
  Acid: 'Acid',
  Bludgeoning: 'Bludgeoning',
  Cold: 'Cold',
  Fire: 'Fire',
  Force: 'Force',
  Lightning: 'Lightning',
  Necrotic: 'Necrotic',
  Piercing: 'Piercing',
  Poison: 'Poison',
  Psychic: 'Psychic',
  Radiant: 'Radiant',
  Slashing: 'Slashing',
  Thunder: 'Thunder',
} as const;

export type DamageType = typeof DamageTypeObj;

export interface Damage {
  amount: number;
  type: DamageType;
}

export interface Creature {
  name: string;
  hp: number;
  maxHp: number;
  tempHp: number;
  resistances: Array<DamageType>;
  action: boolean;
  bonusAction: boolean;
  reaction: boolean;
  enemy: boolean;
  initiative: number;
  ac: number;
}
