import { createContext } from "react";

export const appContext = createContext(null)

export const AppContextProvider = ({ children }) => {

    const value={

    }
    return (
        <appContext.Provider value={value}>
            {
                children
            }
        </appContext.Provider>
    )
}