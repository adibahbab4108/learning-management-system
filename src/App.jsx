import { Route, Routes, useMatch } from "react-router"
import Home from "./pages/student/Home"
import CourseLists from "./pages/student/CourseLists"
import CourseDetails from "./pages/student/CourseDetails"
import MyEnrollments from "./pages/student/MyEnrollments"
import Player from "./pages/student/Player"
import Loading from "./components/student/Loading"
import Educator from "./pages/educator/Educator"
import Dashboard from "./pages/educator/Dashboard"
import AddCourse from "./pages/educator/AddCourse"
import MyCourses from "./pages/educator/MyCourses"
import StudentsEnrolled from "./pages/educator/StudentsEnrolled"
import Navbar from "./components/student/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "quill/dist/quill.snow.css";
import UserProfile from "./pages/UserProfile"


export const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className="min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseLists />} />
        <Route path="/course-list/:input" element={<CourseLists />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}
