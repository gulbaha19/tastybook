import {Recipe} from "./Recipe";


export type Subcategory = {
    id: number;
    name: string;
    description?: string;
    recipes?: Recipe[] | null;
    img?: string
}
