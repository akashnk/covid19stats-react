import React, { createContext, useState } from "react";

export const TableContext = createContext({});

// This context provider is passed to any component requiring the context
const TableProvider = ({children}) => {
  // const [name, setName] = useState("William");
 
  // const [location, setLocation] = useState(["Mars"]);
  const [statecodes,setStatecodes] = useState(["TT"]);
  const [countrycodes, setCountrycodes] = useState(["World"]);
  const [stateselect, setStateselect] = useState([])
  const [countryselect, setCountryselect] = useState([])

  return (
    <TableContext.Provider
      value={{
      statecodes: statecodes,
      setStatecodes: setStatecodes,
      countrycodes: countrycodes,
      setCountrycodes: setCountrycodes,
      stateselect: stateselect,
      setStateselect: setStateselect,
      countryselect: countryselect,
      setCountryselect: setCountryselect
     }}
    >
    {children}
    </TableContext.Provider>
  );
}
export default TableProvider;
