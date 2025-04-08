import { Link } from "react-router";
import { assets, dummyEducatorData } from "../../assets/assets"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { BiUser } from "react-icons/bi";
const Navbar = () => {
    const educatorData = dummyEducatorData
    const { user } = useContext(AuthContext)
    return (
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
            <Link to='/'>
                <img src={assets.logo} alt="" className="w-28 lg:w-32" />
            </Link>
            <div className="flex items-center gap-5 text-gray-500">
                <p>H1!, {user ? user.fullName : 'Developers'}</p>
                {
                    user ? "Welcome" : <BiUser />
                }
            </div>
        </div>
    );
};

export default Navbar;