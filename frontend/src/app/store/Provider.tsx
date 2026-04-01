import { Provider } from "react-redux";
import { store } from "./index";
import { ReactNode } from "react";

export const ReduxProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
