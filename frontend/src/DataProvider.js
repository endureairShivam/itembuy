import React, { createContext, useContext, useState } from "react";
export const DataContext=createContext();

export const DataProvider = (props) =>{

    const [items,setItems] = useState([]);
    const [amount,setAmount]=useState(0);

    return(
        <DataContext.Provider value={{items,setItems,amount,setAmount}}>
            {props.children}
        </DataContext.Provider>
    )
}