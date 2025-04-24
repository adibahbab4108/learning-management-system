import { Link } from "react-router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { BiUser } from "react-icons/bi";
const Navbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
            <Link to='/'>
                <h2 className="w-28 lg:w-32 text-2xl">EduNest</h2>
            </Link>
            <div className="flex items-center gap-5 text-gray-500 relative">
                <p>H1!, {user ? user.displayName : 'Developers'}</p>
                {
                    user ? "Welcome" : <BiUser />
                }
            </div>
        </div>
    );
};

export default Navbar;