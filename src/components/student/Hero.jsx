import { assets } from '../../assets/assets'
import SearchBar from './SearchBar';
const Hero = () => {
    return (
        <div className='flex flex-col justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center'>
            <div className='relative max-w-3xl mx-auto'>
                <h1 className='font-bold  text-4xl mx-auto'>Empower your design with the courses designed to fit your choice</h1> 
                <img src={assets.sketch} alt="" className='md:block w-72 hidden absolute -bottom-2 right-10 ' />
            </div>
            <p className='max-w-2xl mx-auto text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis corrupti, recusandae neque fugiat accusantium commodi? Quae nostrum qui accusamus provident perspiciatis nam natus, vel eum voluptate tempora fuga aspernatur voluptates.</p>
            <SearchBar/>
        </div>
    );
};

export default Hero;