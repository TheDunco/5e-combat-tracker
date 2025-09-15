import { useCallback, useEffect, useState } from "react";
import { Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { Creature, DamageTypeObj, DamageTypeSelectOptions } from "../types";
import { useStateStore } from "../useStateStore";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { RxPlus } from "react-icons/rx";

export const AddCreatureForm = () => {
  const {
    addInitiative,
    setPlayersPreset,
    loadPlayersPreset,
    setTooltip,
    initiative,
    activeIndex,
    setLoadCreatureIntoForm,
  } = useStateStore((state) => ({
    addInitiative: state.addInitiative,
    setPlayersPreset: state.setPlayersPreset,
    loadPlayersPreset: state.loadPlayersPreset,
    setTooltip: state.setTooltip,
    initiative: state.initiative,
    activeIndex: state.activeIndex,
    setLoadCreatureIntoForm: state.setLoadCreatureIntoForm,
  }));

  const methods = useForm<Creature>({
    defaultValues: {
      hp: 10,
      tempHp: 0,
      maxHp: 10,
      name: "Goblin",
      action: false,
      bonusAction: false,
      reaction: false,
      enemy: true,
      initiative: 20,
      ac: 15,
    },
  });

  const { register, handleSubmit, watch, reset } = methods;
  const name = watch("name");

  const creature = initiative[activeIndex];

  const onSubmit: SubmitHandler<Creature> = (data) => {
    addInitiative({
      ...data,
      immunities: selectedImmunities.map((i) => i.value),
      resistances: selectedResistances.map((i) => i.value),
    });
  };

  const [selectedResistances, setSelectedResistances] = useState(
    [] as Array<DamageTypeSelectOptions>,
  );
  const [selectedImmunities, setSelectedImmunities] = useState(
    [] as Array<DamageTypeSelectOptions>,
  );

  const loadInCharacter = useCallback(
    (c: Creature = creature) => {
      if (c) {
        reset({ ...c });
        setSelectedResistances(
          c?.resistances?.map((resistance) => ({
            label: resistance,
            value: resistance,
          })) || [],
        );
        setSelectedImmunities(
          c?.immunities?.map((immunity) => ({
            label: immunity,
            value: immunity,
          })) || [],
        );
      }
    },
    [creature],
  );

  // Set the load function in the store
  useEffect(() => {
    setLoadCreatureIntoForm(loadInCharacter);
  }, [loadInCharacter, setLoadCreatureIntoForm]);

  return (
    <FormProvider {...methods}>
      <Form className="p-3 justify-between gap-4 flex @container flex-col h-full">
        <div className="gap-4 flex flex-col w-full">
          <Button
            type="button"
            onClick={() => loadInCharacter()}
            variant="secondary"
            tooltip={`Load ${creature.name} into the form for editing. Useful for updating characters in the initiative order if you delete the previous one`}
          >
            Load {creature.name}
          </Button>
          <Input
            {...register("name", { required: "Name required" })}
            label={"Name"}
            type="text"
          />
          <span className="flex flex-row gap-2">
            <Input
              {...register("initiative", {
                required: "Must provide initiative order",
              })}
              type="number"
              label={"Initiative"}
            />
            <Input {...register("ac")} type="number" label={"AC"} />
          </span>
          <span className="flex flex-row gap-2">
            <Input {...register("hp")} label={"HP"} type="number" />
            <Input {...register("tempHp")} type="number" label={"Temp HP"} />
            <Input {...register("maxHp")} type="number" label={"Max HP"} />
          </span>
          <Input
            {...register("enemy")}
            type="checkbox"
            label={"Enemy?"}
            className="accent-pink-500 place-self-start flex size-8 rounded-full cursor-pointer"
            onMouseOver={() =>
              setTooltip("Mark the creature as an enemy (text is dark pink)")
            }
          />
          <label className="flex w-full flex-start -mb-3">Immunities</label>
          <MultiSelect
            options={Object.keys(DamageTypeObj).map((key) => ({
              label: key,
              value: key,
            }))}
            value={selectedImmunities}
            onChange={setSelectedImmunities}
            labelledBy="Immunities"
          />
          <label className="flex w-full flex-start -mb-3">Resistances</label>
          <MultiSelect
            options={Object.keys(DamageTypeObj).map((key) => ({
              label: key,
              value: key,
            }))}
            value={selectedResistances}
            onChange={setSelectedResistances}
            labelledBy="Resistances"
            className="outline-none"
          />
          <Button
            type="submit"
            className="inline-flex items-center justify-center gap-2"
            onClick={handleSubmit(onSubmit)}
            tooltip={`Add ${name} to initiative order`}
          >
            <RxPlus /> Add Creature
          </Button>
        </div>
        <div className="w-full gap-2 flex flex-col @md:flex-row justify-between">
          <Button
            type="button"
            onClick={() => setPlayersPreset()}
            variant="secondary"
            tooltip={
              "Save the current initiative order as a preset. Useful for saving players"
            }
          >
            Save&nbsp;as&nbsp;Preset
          </Button>
          <Button
            type="button"
            onClick={() => loadPlayersPreset()}
            variant="secondary"
            tooltip={"Load the last saved preset"}
          >
            Load&nbsp;Preset
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
};
