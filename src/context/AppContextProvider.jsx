/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import appContext from "./AppContext";
import humanizeDuration from "humanize-duration";
import axios from "axios";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  //fetch user data from mongo
  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/user-details`, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success && data.data) {
        setUserData(data.data);
        setIsEducator(data.data.role === "educator");
      } else toast.error(data.message);
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
    }
  };

  // fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/course/all`);
      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserEnrolledCourses = async () => {
    try {
      const { data } = await axios.get(API_URL + "/user/enrolled-courses", {
        withCredentials: true,
      });
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
      fetchUserEnrolledCourses();
    }
  }, [user]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  //function to calculate avg rating of course
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;
    const totalRating = course.courseRatings.reduce(
      (sum, { rating }) => sum + rating,
      0
    );
    return Math.floor(totalRating / course.courseRatings.length);
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

  const value = {
    userData,
    currency,
    allCourses,
    fetchAllCourses,
    fetchUserEnrolledCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    API_URL,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
