import { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const StudentsEnrolled = () => {
    const [enrolledStudents, setEnrolledStudents] = useState(null);

    useEffect(() => {
        setEnrolledStudents(dummyStudentEnrolled);
    }, []);

    if (!enrolledStudents) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Students Enrolled</h2>
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100 text-gray-600 text-sm border-b">
                        <tr>
                            <th className="px-6 py-4 text-left">#</th>
                            <th className="px-6 py-4 text-left">Student Name</th>
                            <th className="px-6 py-4 text-left">Course Title</th>
                            <th className="px-6 py-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledStudents.map((item, index) => (
                            <tr key={index} className="border-b border-b-gray-300 hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <img
                                        src={item.student.imageUrl}
                                        alt={item.student.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="text-sm text-gray-800 font-medium">{item.student.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.courseTitle}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {new Date(item.purchaseDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsEnrolled;
