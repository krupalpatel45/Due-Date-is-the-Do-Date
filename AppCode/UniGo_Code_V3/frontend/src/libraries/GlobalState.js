import React, { createContext, useState } from "react";

const initialState = {
  // mapsKey: "AIzaSyCCZcb_AEAcCRk0uxe-GjAtUU_ewjpDXIM",
  endPoint: "http://localhost:8080/api"
}

export const GlobalContext = createContext();

const GlobalState = ({children}) => {
  const [globalSate, setGlobalState] = useState(initialState);
  return (
    <GlobalContext.Provider value={[globalSate, setGlobalState]}>
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalState;