/* eslint-disable no-unused-vars */
import appContext  from "./AppContext"
export const AppContextProvider = ({ children }) => {

    const value = {

    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}