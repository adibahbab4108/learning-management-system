import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <footer className="w-full border-t bg-white py-6 px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Side: Logo and Text */}
                <div className="flex items-center gap-4 text-gray-600">
                    <img src={assets.logo} alt="logo" className="w-16 md:w-20" />
                    <span className="hidden md:block h-6 w-px bg-gray-400/50" />
                    <p className="text-xs md:text-sm text-center md:text-left">
                        &copy; 2024 Adib. All rights reserved.
                    </p>
                </div>

                {/* Right Side: Social Icons */}
                <div className="flex items-center gap-4">
                    <a href="#" aria-label="Facebook">
                        <img src={assets.facebook_icon} alt="facebook" className="w-5 h-5 hover:opacity-80 transition" />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <img src={assets.twitter_icon} alt="twitter" className="w-5 h-5 hover:opacity-80 transition" />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <img src={assets.instagram_icon} alt="instagram" className="w-5 h-5 hover:opacity-80 transition" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
