import React, { createContext, useState } from "react";

export const TableContext = createContext({});

// This context provider is passed to any component requiring the context
const TableProvider = ({children}) => {
  const [name, setName] = useState("William");
 
  const [location, setLocation] = useState(["Mars"]);
  const [statecodes,setStatecodes] = useState(["TT"]);
console.log("context",statecodes);
  return (
    <TableContext.Provider
      value={{
      statecodes: statecodes,
      setStatecodes: setStatecodes
     }}
    >
    {children}
    </TableContext.Provider>
  );
}
export default TableProvider;
