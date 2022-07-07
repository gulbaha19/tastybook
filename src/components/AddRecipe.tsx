import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Theme,
    useTheme,
} from "@mui/material";
import {toJS} from "mobx";
import React, {FC, useEffect, useMemo, useState} from "react";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Category} from "../models/Category";
import {RecipeForm} from "../models/Recipe";
import {useStore} from "../provider";
import {getFieldState} from "../utils/getFieldState";
import {Icon, IconSmall} from "../utils/Icon";

type Props = {};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export const AddRecipe: FC<Props> = () => {
    const {control, register} = useFormContext<RecipeForm>();
    const [value, setStepValue] = useState<string>("");
    const {fields: steps, append: addStep, remove: removeStep} = useFieldArray({control, name: "steps"});
    const {fields: categories, append: addCategories} = useFieldArray({
        control,
        name: "categories"
    });
    const [chosenCategory, setChosen] = useState<string[]>([]);

    const {store} = useStore();

    useEffect(() => {
        store.loadCategories();
    }, [store]);

    useEffect(() => {
    }, [value, chosenCategory]);
    const addNewStep = (e: React.FormEvent) => {
        e.preventDefault();
        addStep({value});
        setStepValue("");
    };

    const addNewCategory = (e:  React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        console.log("Event", e)
        // addCategories(chosenCategory);
        // setChosen(prevState => [...prevState,e.target.value[0]]);
    };

    const handleChange = (event: SelectChangeEvent<typeof chosenCategory>) => {
        // const {
        //     target: {value},
        // } = event;
        console.log("Eveeeent", event)

        addCategories({value: event.target.value[event.target.value.length-1]})
        console.log(categories)
        // setValue('categories', categories)
        setChosen(prevState => [...prevState,event.target.value[event.target.value.length-1]]);
        console.log("ch", chosenCategory)

    };

    function getChildren(arr: Category[]) {
        let childrenArr: string[] = [];
        arr.map((item, index) => {
            Object.values(item.children).map((subItem, subIndex) => {
                childrenArr.push(subItem.name);
            });
        });
        return childrenArr;
    }
    const subCategories = getChildren(store.categories)
    console.log(subCategories,"ss")
    // const subCategories = useMemo(() => getChildren(store.categories), [store])
    console.log(chosenCategory, "fff");
    return (
        <div>
            <h2>Your recipe</h2>

            <FormControl fullWidth sx={{mb: 2}}>
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: "Поле обязательное",
                    }}
                    render={({field, fieldState, formState}) => (
                        // <div style={{ display: "flex ", alignItems: "center" }}>

                        <div>
                            {/* <div style={{ marginRight: "20px" }}>Name:</div>
               */}
                            <p>Name:</p>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="standard"
                                    placeholder="Your recipe Title"
                                    {...getFieldState({fieldState, formState})}
                                    {...field}></TextField>
                            </div>
                        </div>
                    )}
                />
            </FormControl>
            <FormControl fullWidth sx={{mb: 2}}>
                <Controller
                    name="steps"
                    control={control}
                    rules={{
                        required: "Поле обязательное",
                        validate: (value) => {
                            if (value && value.length >= 2) {
                                return true;
                            } else {
                                return "Not Valid";
                            }
                        },
                    }}
                    render={({field, fieldState, formState}) => (
                        <div>
                            <p>Steps:</p>
                            <ol>
                                {steps.length > 0 ? steps.map((step) => <li key={step.id}>{step.value}</li>) : ""}
                            </ol>
                            <form noValidate autoComplete="off" onSubmit={(e) => addNewStep(e)}>
                                <TextField
                                    variant="standard"
                                    onChange={(e) => setStepValue(e.target.value)}
                                    value={value}
                                    placeholder="Your recipe Steps"
                                />
                                <Button onClick={(e) => addNewStep(e)}>
                                    <IconSmall type="Plus"/>
                                </Button>
                            </form>
                        </div>
                    )}
                />
            </FormControl>
            <FormControl fullWidth sx={{mb: 2}}>
                <Controller
                    name="categories"
                    control={control}
                    rules={{
                        required: "Поле обязательное",
                        validate: (value) => {
                            if (value && value.length > 0) {
                                return true;
                            } else {
                                return "Not Valid";
                            }
                        },
                    }}
                    render={({field, fieldState, formState}) => (
                        <div>
                            <p>Categories:</p>

                            <FormControl sx={{m: 1, width: 300}}>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={chosenCategory}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value}/>
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}>
                                    {subCategories.map((name,index) => (
                                        <MenuItem
                                            key={index}
                                            value={name}

                                            onClick={(e) => addNewCategory(e)}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                />
            </FormControl>
        </div>
    );
};
