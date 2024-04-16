import React from "react";
import { Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";
import { Creature, Damage, DamageTypeObj } from "../types";
import { useStateStore } from "../useStateStore";
import { CreatureCard } from "./CreatureCard";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";

type EditCreatureFormType = Damage & Pick<Creature, "initiative" | "tempHp">;

export const EditCreatureForm: React.FC = () => {
    const {
        activeIndex,
        initiative,
        creatureDamage,
        creatureHeal,
        setCreatureInitiative,
        setCreatureTempHp,
    } = useStateStore((state) => ({
        activeIndex: state.activeIndex,
        initiative: state.initiative,
        creatureDamage: state.creatureDamage,
        creatureHeal: state.creatureHeal,
        setCreatureInitiative: state.setCreatureInitiative,
        setCreatureTempHp: state.setCreatureTempHp,
    }));

    const creature = initiative[activeIndex];
    const methods = useForm<EditCreatureFormType>({
        defaultValues: {
            amount: 1,
            type: DamageTypeObj.Slashing,
            initiative: creature?.initiative || 0,
            tempHp: creature?.tempHp || 0,
        },
    });
    if (!creature) return null;

    const { register, handleSubmit, watch } = methods;
    const amount = watch("amount");

    const handleInitiative: SubmitHandler<EditCreatureFormType> = (data) => {
        setCreatureInitiative(activeIndex, data.initiative);
    };

    const handleTempHp: SubmitHandler<EditCreatureFormType> = (data) => {
        setCreatureTempHp(activeIndex, data.tempHp);
    };

    const onSubmitHeal: SubmitHandler<EditCreatureFormType> = (data) => {
        if (data.amount < 0) {
            return;
        }
        creatureHeal(activeIndex, data.amount);
    };

    const onSubmitDamage: SubmitHandler<EditCreatureFormType> = (data) => {
        if (data.amount < 0) {
            return;
        }
        creatureDamage(activeIndex, data);
    };

    return (
        <>
            <div className="p-3 hidden md:block">
                <CreatureCard
                    creature={creature}
                    index={activeIndex}
                    sidebar={true}
                />
            </div>
            <FormProvider {...methods}>
                <Form className="@container p-3 gap-4 flex flex-col">
                    <span className="flex flex-row gap-2">
                        <Input
                            {...register("amount", {
                                required: "Must provide damage amount",
                            })}
                            type="number"
                            label={"HP"}
                        />
                        <span className="flex items-center mt-7">
                            <select
                                {...register("type", {
                                    required: "Must provide damage amount",
                                })}
                                className="bg-gray-50 ring-none border-2 h-12 focus:border-gray-800 outline-none border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                            >
                                {Object.keys(DamageTypeObj).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </span>
                    <span className="flex-col @xs:flex-row flex gap-0 @xs:gap-2 mb-4">
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmitHeal)}
                            variant="heal"
                            tooltip={`Heal the creature ${amount} HP`}
                        >
                            <RxArrowUp />
                            Heal
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmitDamage)}
                            variant="damage"
                            tooltip={`Damage the creature ${amount} HP`}
                        >
                            <RxArrowDown />
                            Damage
                        </Button>
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Input
                            {...register("initiative")}
                            type="number"
                            label="Initiative"
                        />
                        <Button
                            type="submit"
                            onClick={handleSubmit(handleInitiative)}
                            tooltip={`Set the initiative order of ${creature.name}`}
                            variant="secondary"
                            className="mt-6"
                        >
                            Set
                        </Button>
                    </span>
                    <span className="flex flex-row gap-2 items-center">
                        <Input
                            {...register("tempHp")}
                            type="number"
                            label="Temp HP"
                        />

                        <Button
                            type="submit"
                            onClick={handleSubmit(handleTempHp)}
                            tooltip={`Set temp HP for ${creature.name}`}
                            variant="secondary"
                            className="mt-6"
                        >
                            Set
                        </Button>
                    </span>
                </Form>
            </FormProvider>
        </>
    );
};
