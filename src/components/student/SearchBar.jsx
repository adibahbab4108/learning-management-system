import { assets } from "../../assets/assets";

const SearchBar = () => {
    return (
        <div>
            <form action="" className="flex items-center max-w-xl md:h-14 h-12 border rounded bg-white mx-auto">
                <img src={assets.search_icon} alt="search-icon" className="md:w-auto w-10 px-3" />
                <input type="text" placeholder="Search for courses" className="w-full h-full outline-none text-gray-500/80" />
                <button type="submit" className="md:px-10 px-7 md:py-3 py-2 mx-1 bg-blue-500 text-white rounded">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;