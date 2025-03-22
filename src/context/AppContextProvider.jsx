/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import appContext from "./AppContext"
import { dummyCourses } from "../assets/assets";
export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);

    // fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }
    useEffect(() => {
        fetchAllCourses()
    }, [])

    //function to calculate avg rating of course
    const calculateRating = (course) => {
        console.log(course)
        if (!course?.courseRatings?.length) return 0;
        const totalRating = course.courseRatings.reduce((sum, { rating }) => sum + rating, 0);
        return totalRating / course.courseRatings.length;
    };
    








    const value = {
        currency,
        allCourses,
        calculateRating,
        isEducator, setIsEducator
    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}