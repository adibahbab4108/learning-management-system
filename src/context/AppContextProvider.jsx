/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import appContext from "./AppContext"
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);

    // fetch all courses
    useEffect(() => {
        setAllCourses(dummyCourses)
    }, [])

    //function to calculate avg rating of course
    const calculateRating = (course) => {
        if (!course?.courseRatings?.length) return 0;
        const totalRating = course.courseRatings.reduce((sum, { rating }) => sum + rating, 0);
        return totalRating / course.courseRatings.length;
    };

    //function to calculate course chapter time
    const calculateChapterTime = (chapter) => {
        const time = chapter.chapterContent.reduce((acc, lecture) => acc + lecture.lectureDuration, 0);
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    };
    
    //function to calculate course duration
    const calculateCourseDuration = course => {
        let time = 0;
        course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] })
    }
    //function to calculate number of lectures
    const calculateNoOfLectures = course => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        })
        return totalLectures
    }





    const value = {
        currency,
        allCourses,
        calculateRating,
        isEducator, setIsEducator,
        calculateChapterTime, calculateCourseDuration, calculateNoOfLectures
    }
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}