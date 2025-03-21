import { useContext } from "react";
import { Link } from "react-router";
import appContext from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
    const { allCourses } = useContext(appContext)
    return (
        <div className="py-16 md:px-40 px-8">
            <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
            <p className="text-sm mt-3 ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda quos illo id facere dolor accusantium nostrum, nisi dolore aperiam, animi officiis vero, quidem maiores repudiandae rerum reiciendis eligendi ad praesentium!
            </p>
            <div className="grid grid-cols-4 px-4 md:px-0 md:my-16 gap-4">
                {allCourses.slice(0, 4).map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </div>
            <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded">
                Show All Courses
            </Link>
        </div>
    );
};

export default CourseSection;