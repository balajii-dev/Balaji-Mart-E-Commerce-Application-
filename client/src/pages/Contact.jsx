import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contactDetails = [
        {
            icon: "bi-geo-alt-fill",
            title: "Our Locations",
            description: "Coimbatore, Karur, Trichy, Erode, Chennai",
            color: "bg-blue-50 text-blue-600",
        },
        {
            icon: "bi-envelope-at-fill",
            title: "Email Address",
            description: "balajimohan.c9@gmail.com",
            color: "bg-red-50 text-red-600",
        },
        {
            icon: "bi-telephone-fill",
            title: "Phone Number",
            description: "+91 73588 32705",
            color: "bg-green-50 text-green-600",
        },
        {
            icon: "bi-clock-fill",
            title: "Working Hours",
            description: "Monday - Sunday: 24/7 Support",
            color: "bg-purple-50 text-purple-600",
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-16">
                <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-3">Contact Us</h2>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    We're Here to <span className="text-red-500">Help</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Whether you have a question about our fresh produce, delivery, or anything else, 
                    our team is ready to answer all your questions.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactDetails.map((item, index) => (
                    <div 
                        key={index} 
                        className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
                    >
                        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                            <i className={`bi ${item.icon}`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-20 p-10 bg-gray-900 rounded-[2rem] text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Need immediate assistance?</h3>
                    <p className="text-gray-400 mb-6">Give us a call and we'll solve your problem in minutes.</p>
                    <a 
                        href="tel:+917358832705" 
                        className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-red-500/20"
                    >
                        Call Now
                    </a>
                </div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Contact;