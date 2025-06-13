import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import appContext from "../../context/AppContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { user, logOut } = useContext(AuthContext);
  const { isEducator, setIsEducator } = useContext(appContext);

  const handleBecomeEducator = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Become an Educator?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No, Thank You",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `${API_URL}/user/update-role`,
            { role: "educator" },
            { withCredentials: true }
          )
          .then(() => {
            setIsEducator(true);
            Swal.fire({
              title: "Congratulations!",
              text: "You are now an educator.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error updating role:", error);
            Swal.fire({
              title: "Oops!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 
            md:px-14 lg:px-36  border-b border-gray-500 py-4
          `}
    >
      <h2 onClick={() => navigate("/")} className="text-2xl cursor-pointer">
        EduNest
      </h2>
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {user && (
          <>
            <div className="flex items-center gap-5">
              {isEducator ? (
                <button
                  className="cursor-pointer"
                  onClick={() => navigate("/educator")}
                >
                  Educator Dashboard
                </button>
              ) : (
                <button
                  onClick={handleBecomeEducator}
                  className="cursor-pointer"
                >
                  {" "}
                  Become Educator
                </button>
              )}
              <Link to="/my-enrollments">My Enrollments</Link>
            </div>
          </>
        )}
        {user ? (
          <>
            <div className="relative group inline-block text-left">
              <FaUser className="w-6 h-6 cursor-pointer text-gray-700" />

              <div className="absolute hidden group-hover:block right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={logOut}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link to="/register">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer">
              Create Account
            </button>
          </Link>
        )}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className=" flex items-center gap-2 sm:gap-5 text-gray-500">
          {user && (
            <>
              <button onClick={() => navigate("/educator")}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
          <button>
            {" "}
            <FaUser />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
