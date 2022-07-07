export type CategoriesResponse = {
  id: number;
  name: string;
  children: ChildrenProps[];
};
export type ChildrenProps = {
  id: number;
  name: string;
};
export type ResipesResponse = {
  id: string;
  userEmail: string;
  title: string;
  steps: string;
};
