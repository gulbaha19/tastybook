import { makeAutoObservable } from "mobx";
import { Store } from "./Store";
import { CategoriesResponse, ChildrenProps } from "./CategoriesResponse";

export class Category {
  id: number | undefined;
  name: string = "";
  children: ChildrenProps[] = [] ;
  store: Store | undefined;

  //   constructor(store: Store) {
  //     this.id = 1;
  // this.name= '';
  // this.children=,
  //     this.store = store;
  //     makeAutoObservable(this, { store: false });
  //   }

  setCategory({ id, name, children }: CategoriesResponse) {
    this.id = id;
    this.name = name;
    this.children = children;

    return this;
  }
}
