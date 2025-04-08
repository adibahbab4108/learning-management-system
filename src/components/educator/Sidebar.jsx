import { useContext } from "react";
import { assets } from "../../assets/assets";
import appContext from "../../context/AppContext";
import { NavLink } from "react-router";

const Sidebar = () => {
    const { isEducator } = useContext(appContext)
    const menuItems = [
        { name: "Dashboard", path: '/educator', icon: assets.home_icon },
        { name: "Add Course", path: '/educator/add-course', icon: assets.add_icon },
        { name: "My Courses", path: '/educator/my-courses', icon: assets.my_course_icon },
        { name: "Student Enrolled", path: '/educator/student-enrolled', icon: assets.person_tick_icon },

    ]
    return isEducator && (
        <div className="md:w-64 w-16 border-r border-gray-500 min-h-screen py-2 flex flex-col">
            {menuItems.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.name}
                    end={item.path==='/educator'}
                    className={({ isActive }) =>
                        `flex items-center gap-3 py-3.5 px-4 md:px-10 border-r-4 transition-all duration-200
               ${isActive
                            ? 'bg-indigo-50 border-indigo-500/90'
                            : 'hover:bg-gray-100 border-transparent hover:border-gray-300'}`
                    }
                >
                    <img src={item.icon} alt="" className="w-6 h-6" />
                    <p className="hidden md:block">{item.name}</p>
                </NavLink>
            ))}
        </div>

    );
};

export default Sidebar;