import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Register = () => {
    const { setUser, signInUsingGoogle } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registering:', { email, password });
    };

    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                const user = result.user
                console.log(user)
                if (user) {
                    setUser(user)
                    navigate('/')
                }
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-sm text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                    <FcGoogle className="text-xl" />
                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Register;
