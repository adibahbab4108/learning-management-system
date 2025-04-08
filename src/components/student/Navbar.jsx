import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import appContext from "../../context/AppContext";
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { isEducator } = useContext(appContext)

    const isCourseListPage = location.pathname.includes('/course-list');

    console.log(user)
    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 
            md:px-14 lg:px-36  border-b border-gray-500 py-4
          ${isCourseListPage ? 'bg-white' : "bg-cyan-100/70"}`}>
            <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
            <div className="hidden md:flex items-center gap-5 text-gray-500">
                {user &&
                    <>
                        <div className="flex items-center gap-5">
                            <button onClick={() => navigate('/educator')} >{isEducator ? "Dashboard" : "Become Educator"}</button>
                            <Link to='/my-enrollments'>My Enrollments</Link>
                        </div>
                    </>
                }
                <Link to="/register">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer" >Create Account</button>
                </Link>
            </div>

            {/* Mobile view */}
            <div className="md:hidden">
                <div className=" flex items-center gap-2 sm:gap-5 text-gray-500">
                    {user && <>
                        <button onClick={() => navigate('/educator')} >{isEducator ? "Dashboard" : "Become Educator"}</button>
                        <Link to='/my-enrollments'>My Enrollments</Link>
                    </>}
                    <button> <FaUser /> </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;