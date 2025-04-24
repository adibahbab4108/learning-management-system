import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Loading from "../components/student/Loading";

const UserProfile = () => {
    const { user } = useContext(AuthContext)
    if (!user) return <Loading />
    return (
        <div>
            <div className="relative">
                {/* Cover photo section */}
                <div className="border cover h-52 flex items-center justify-center bg-blue-300" >
                    <p>Cover photo</p>
                </div>
                {/* Profile picture section */}
                <div className="flex flex-col justify-center items-center top-40  absolute  left-1/2  transform -translate-x-1/2">
                    <div className="border">
                        <img src={user.photoURL} className="w-36 h-36 bg-green-300" alt="Profile" />
                    </div>
                    <h2 className="text-xl font-semibold my-3">
                        {user.displayName}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;