/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import appContext from "./AppContext"
import { dummyCourses } from "../assets/assets";
export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const [allCourses, setAllCourses] = useState([])

    // fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }
    useEffect(() => {
        fetchAllCourses()
    }, [])

    const value = {
        currency,
        allCourses
    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}