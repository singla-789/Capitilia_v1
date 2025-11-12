import { Children, createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({Children}) => {

    const [user,setUser] = useState(null);

    const contextValue = {
        user
    }

    return(
        <AppContext.Provider value={contextValue}>
            {Children}
        </AppContext.Provider>
    )
}