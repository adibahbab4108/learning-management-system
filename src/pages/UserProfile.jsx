import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Loading from "../components/student/Loading";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Loading />;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  return (
    <div>
      <div className="relative">
        {/* Cover photo section */}
        <div className="border cover h-52 flex items-center justify-center bg-blue-300">
          <p>Cover photo</p>
        </div>
        {/* Profile picture section */}
        <div className="flex flex-col justify-center items-center top-40  absolute  left-1/2  transform -translate-x-1/2">
          <div className="border relative group">
            <img
              src={user.photoURL}
              className="w-36 h-36 bg-green-300"
              alt="Profile"
            />
            <div className="absolute bg-white/60 opacity-0 -bottom-11 
            group-hover:bottom-0 
            group-hover:opacity-100 
            hover:bg-white 
            transition-all ease-out duration-700
            ">
              <label
                htmlFor="upload-img"
                className="w-36 inline-block text-center py-1  rounded cursor-pointer"
              >
                Upload Photo
              </label>
              <input
                type="file"
                id="upload-img"
                name="upload-img"
                accept="image/*"
                capture
                className=" w-36 cursor-pointer hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold my-3">{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
