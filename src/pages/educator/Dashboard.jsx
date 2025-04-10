import { useContext, useEffect, useState } from "react";
import appContext from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";

const DashboardCard = ({ icon, value, label, showCurrency = false, currency = "" }) => (
    <div className="flex items-center gap-4 p-6 w-full sm:w-64 rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow">
        <img src={icon} alt={label} className="w-12 h-12 object-contain" />
        <div>
            <p className="text-3xl font-semibold text-gray-800">
                {showCurrency ? `${currency} ${value}` : value}
            </p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </div>
);

const EnrollmentTable = ({ data }) => (
    <div className="mt-10 bg-white shadow-md rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 px-6 pt-6">Latest Enrollments</h2>
        <table className="w-full text-left mt-4">
            <thead className="bg-gray-100 border-y">
                <tr>
                    <th className="px-6 py-3 text-sm text-gray-600 hidden sm:table-cell">#</th>
                    <th className="px-6 py-3 text-sm text-gray-600">Student Name</th>
                    <th className="px-6 py-3 text-sm text-gray-600">Course Title</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3 text-center text-sm text-gray-500 hidden sm:table-cell">{index + 1}</td>
                        <td className="px-6 py-3 flex items-center gap-3">
                            <img src={item.student.imageUrl} alt="profile" className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-sm text-gray-700">{item.student.name}</span>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{item.courseTitle}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Dashboard = () => {
    const { currency } = useContext(appContext);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        setDashboardData(dummyDashboardData);
    }, []);

    if (!dashboardData) return <Loading />;

    const { enrolledStudentsData = [], totalCourses = 0, totalEarnings = 0 } = dashboardData;

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    icon={assets.patients_icon}
                    value={enrolledStudentsData.length}
                    label="Total Enrolment"
                />
                <DashboardCard
                    icon={assets.appointments_icon}
                    value={totalCourses}
                    label="Total Courses"
                />
                <DashboardCard
                    icon={assets.earning_icon}
                    value={totalEarnings}
                    label="Total Earning"
                    showCurrency
                    currency={currency}
                />
            </div>
            <EnrollmentTable data={enrolledStudentsData} />
        </div>
    );
};

export default Dashboard;
