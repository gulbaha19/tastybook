import { createContext, FC, useContext } from "react";
import { store, Store } from "../models/Store";

const AppContext = createContext({ store: store });

type Props = {
  store: Store;
  children: any;
};
export const AppProvider: FC<Props> = ({ children, store }) => {
  return <AppContext.Provider value={{ store }}>{children}</AppContext.Provider>;
};

export const useStore = () => useContext(AppContext);
