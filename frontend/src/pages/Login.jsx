import { useState } from "react";
import axios from "axios";
import { H1} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = H1();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4040/api/auth/login", {
                email,
                password,
            });

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashbord");
                } else {
                    navigate("/employee-dashbord");
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Server Error");
            }
            console.error("Error during login:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-red-500 to-red-100 space-x-6">
            <h2 className="font-serif text-3xl text-black">
                Note <span className="text-grey-500">X</span>
            </h2>
            <div className="border rounded-3xl shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="m-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 rounded py-2 border"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="m-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="w-full px-3 rounded py-2 border"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-400">Remember me</span>
                        </label>
                        <a href="#" className="text-red-500">Forgot Password?</a>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-red-600 text-white py-2">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

