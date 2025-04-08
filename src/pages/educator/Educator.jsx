import { Outlet } from "react-router";
import Navbar from "../../components/educator/Navbar";

const Educator = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Educator;