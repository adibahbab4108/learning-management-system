import React, { useContext, useEffect, useState } from "react";
import appContext from "../../context/AppContext";
import Loading from "../../components/student/Loading";

const MyCourses = () => {
    const { currency, allCourses } = useContext(appContext);
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        setCourses(allCourses);
    }, []);

    const calculateEarnings = (course) => {
        const priceAfterDiscount = course.coursePrice - (course.discount / 100) * course.coursePrice;
        return Math.floor(course.enrolledStudents.length * priceAfterDiscount);
    };

    if (!courses) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Courses</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100 text-left text-sm text-gray-600 border-b">
                        <tr>
                            <th className="px-6 py-4">Course</th>
                            <th className="px-6 py-4">Earnings</th>
                            <th className="px-6 py-4">Students</th>
                            <th className="px-6 py-4">Published On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id} className="border-b border-b-gray-300 hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <img src={course.courseThumbnail} alt={course.courseTitle} className="w-14 h-14 rounded object-cover" />
                                    <span className="text-gray-800 font-medium text-sm">{course.courseTitle}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {currency} {calculateEarnings(course)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {course.enrolledStudents?.length || 0}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {new Date(course.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCourses;
