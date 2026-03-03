import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddAddress = () => {
    const { axios, backendUrl, user, getUserData, isLoggedin } = useAppContext();
    const navigate = useNavigate();

    const emptyForm = {
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipCode: '', country: '', phone: ''
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (user?.address) {
            setFormData({
                firstName: user.address.firstName || '',
                lastName: user.address.lastName || '',
                email: user.address.email || '',
                street: user.address.street || '',
                city: user.address.city || '',
                state: user.address.state || '',
                zipCode: user.address.zipCode || '',
                country: user.address.country || '',
                phone: user.address.phone || ''
            });
        }
    }, [user]);

    const onChangeHandler = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const clearForm = () => {
        setFormData(emptyForm);
        toast.success("Form cleared");
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isLoggedin) return toast.error("Please login first");

        try {
            const { data } = await axios.post(backendUrl + '/api/user/save-address', { address: formData });

            if (data.success) {
                toast.success("Address Saved!");
                // Crucial: await the refresh so the state is ready before navigation
                await getUserData(); 
                navigate('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 py-16 max-w-2xl w-full px-6 mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Delivery Information</h2>
                <button 
                    type="button" 
                    onClick={clearForm}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors underline"
                >
                    Clear Form
                </button>
            </div>
            <hr className="border-gray-100 mb-4" />
            
            <div className="flex gap-3">
                <input required name="firstName" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="First Name" value={formData.firstName} onChange={onChangeHandler} />
                <input required name="lastName" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="Last Name" value={formData.lastName} onChange={onChangeHandler} />
            </div>

            <input required name="email" type="email" className="border border-gray-300 p-2.5 rounded outline-red-400" placeholder="Email Address" value={formData.email} onChange={onChangeHandler} />
            <input required name="street" className="border border-gray-300 p-2.5 rounded outline-red-400" placeholder="Street" value={formData.street} onChange={onChangeHandler} />
            
            <div className="flex gap-3">
                <input required name="city" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="City" value={formData.city} onChange={onChangeHandler} />
                <input required name="state" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="State" value={formData.state} onChange={onChangeHandler} />
            </div>

            <div className="flex gap-3">
                <input required name="zipCode" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="ZipCode" value={formData.zipCode} onChange={onChangeHandler} />
                <input required name="country" className="border border-gray-300 p-2.5 rounded w-full outline-red-400" placeholder="Country" value={formData.country} onChange={onChangeHandler} />
            </div>

            <input required name="phone" type="tel" className="border border-gray-300 p-2.5 rounded outline-red-400" placeholder="Phone Number" value={formData.phone} onChange={onChangeHandler} />
            
            <button type="submit" className="bg-red-600 text-white px-10 py-3 rounded font-bold uppercase hover:bg-red-700 transition-all shadow-md active:scale-95">
                Save Address & View Cart
            </button>
        </form>
    );
};

export default AddAddress;