import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import appContext from "../../context/AppContext";
import { NavLink } from "react-router";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = () => {
    const { isEducator } = useContext(appContext)
    const [showSideBar, setShowSideBar] = useState(true)
    const menuItems = [
        { name: "Dashboard", path: '/educator', icon: assets.home_icon },
        { name: "Add Course", path: '/educator/add-course', icon: assets.add_icon },
        { name: "My Courses", path: '/educator/my-courses', icon: assets.my_course_icon },
        { name: "Student Enrolled", path: '/educator/student-enrolled', icon: assets.person_tick_icon },

    ]
    const handleSideBar = () => {
        setShowSideBar(!showSideBar)
    }
    return isEducator && (
        <div className="relative flex">
            {/* Toggle Button */}
            <button
                onClick={handleSideBar}
                className={`absolute -right-4 top-6 z-50 bg-white text-2xl p-1 rounded-full shadow transition-transform duration-300 ${!showSideBar ? 'rotate-180' : ''
                    }`}
            >
                <FaArrowRightFromBracket />
            </button>

            {/* Sidebar */}
            <div
                className={`transition-all duration-300 ease-in-out border-r border-gray-300 min-h-screen py-2 flex flex-col
            ${showSideBar ? 'w-64' : 'w-4'}`
                }
            >
                {menuItems.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        end={item.path === '/educator'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 ${showSideBar ? 'px-4':'px-2'}  py-3.5 whitespace-nowrap transition-all duration-200
                 ${isActive
                                ? 'bg-indigo-100 border-r-4 border-indigo-500 font-medium text-indigo-700'
                                : 'hover:bg-gray-100 border-r-4 border-transparent hover:border-gray-300'}`
                        }
                    >
                        <img src={item.icon} alt={item.name} className="w-6 h-6" />
                        {showSideBar && <span className="text-sm">{item.name}</span>}
                    </NavLink>
                ))}
            </div>
        </div>


    );
};

export default Sidebar;