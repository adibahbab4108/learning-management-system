import { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router";

const SearchBar = ({ data }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState(data ? data : '');
    const onSearchHandler = (e) => {
        e.preventDefault();
        navigate('/course-list/' + input)
    }
    return (
        <div>
            <form onSubmit={onSearchHandler} className="flex items-center max-w-xl md:h-14 h-12 border rounded bg-white mx-auto">
                <img src={assets.search_icon} alt="search-icon" className="md:w-auto w-10 px-3" />
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Search for courses" className="w-full h-full outline-none text-gray-500/80" />
                <button type="submit" className="md:px-10 px-7 md:py-3 py-2 mx-1 bg-blue-500 text-white rounded cursor-pointer">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;