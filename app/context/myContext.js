"use client";
import { createContext, useState } from "react";

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [open_sidebar, set_open_sidebar] = useState(true);
  const [open_drap_menu, set_open_drap_menu] = useState(false);

  return (
    <MyContext.Provider
      value={{
        open_sidebar,
        set_open_sidebar,
        open_drap_menu,
        set_open_drap_menu,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
