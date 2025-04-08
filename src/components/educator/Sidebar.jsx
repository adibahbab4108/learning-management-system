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
        <div className="md:w-64 w-16 border-r min-h-screen border-gray-500 py-2 flex flex-col">
            {
                menuItems.map((item) => {
                    <NavLink to={item.path} key={item.name} end={item.path==="/educator"}>
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                })
            }
        </div>
    );
};

export default Sidebar;