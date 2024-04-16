export const DamageTypeObj = {
    Acid: "Acid",
    Bludgeoning: "Bludgeoning",
    Cold: "Cold",
    Fire: "Fire",
    Force: "Force",
    Lightning: "Lightning",
    Necrotic: "Necrotic",
    Piercing: "Piercing",
    Poison: "Poison",
    Psychic: "Psychic",
    Radiant: "Radiant",
    Slashing: "Slashing",
    Thunder: "Thunder",
} as const;

export type DamageType = typeof DamageTypeObj;

export type SingleDamageType = DamageType[keyof DamageType];

export interface Damage {
    amount: number;
    type: SingleDamageType;
}

export interface DamageTypeSelectOptions {
    value: SingleDamageType;
    label: SingleDamageType;
}

export interface Creature {
    name: string;
    hp: number;
    maxHp: number;
    tempHp: number;
    resistances: Array<SingleDamageType>;
    immunities: Array<SingleDamageType>;
    action: boolean;
    bonusAction: boolean;
    reaction: boolean;
    enemy: boolean;
    initiative: number;
    ac: number;
}
