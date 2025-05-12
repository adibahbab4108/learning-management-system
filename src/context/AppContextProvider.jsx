/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import appContext from "./AppContext";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import axios from "axios";
import AuthContext from "./AuthContext";
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);

  const fetchUser = async () => {
    if (user) {
      try {
        const { data } = await axios.get(`${API_URL}/users/${user.email}`);
        setDbUser(data.data);
        if (data.data.role === "educator") setIsEducator(true);
        else setIsEducator(false);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    }
  };
  console.log(dbUser);
  useEffect(() => {
    fetchUser();
  }, [user]);

  // fetch all courses
  useEffect(() => {
    setAllCourses(dummyCourses);
    setEnrolledCourses(dummyCourses);
  }, []);

  //function to calculate avg rating of course
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;
    const totalRating = course.courseRatings.reduce(
      (sum, { rating }) => sum + rating,
      0
    );
    return totalRating / course.courseRatings.length;
  };

  //function to calculate course chapter time
  const calculateChapterTime = (chapter) => {
    const time = chapter.chapterContent.reduce(
      (acc, lecture) => acc + lecture.lectureDuration,
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };
  //function to calculate number of lectures
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //Fetch user enrolled Courses
  const fetchUserEnrolledCourses = async () => {};

  const value = {
    dbUser,
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
