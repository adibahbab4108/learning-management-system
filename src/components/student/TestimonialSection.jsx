import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
    return (
        <div className="pb-14 md:px-40 px-8">
            <h2 className="text-3xl font-medium text-gray-800">Testimonial</h2>
            <p className="text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus mollitia unde doloribus labore assumenda odio autem magnam reiciendis deserunt culpa tenetur aliquid quas neque iste rerum nesciunt fugit, corporis pariatur?</p>
            <div className="grid grid-cols-auto px-4 gap-4  md:px-0 md:my-16">
                {dummyTestimonial.map((testimonial, index) => (
                    <div key={index} className="text-sm text-left border border-gray-500/30 pb-6 rounded-2xl bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden">
                        <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                            <img src={testimonial.image} className="w-12 h-12 rounded-full" alt={testimonial.name} />
                            <div>
                                <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                                <p className="text-gray-800/80">{testimonial.role}</p>
                            </div>
                        </div>
                        <div className="p-5 pb-7">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="*" />
                                ))}
                            </div>
                            <p className="mt-5 text-gray-500">{testimonial.feedback}</p>
                        </div>
                        <a href="#" className="text-blue-500 underline px-5">Read more</a>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialSection;