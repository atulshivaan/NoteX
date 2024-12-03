import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading] =useState(true)
 
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token =localStorage.getItem("token");
                if(token){
                    const response = await axios.get("http://localhost:4040/api/auth/verify",{
                    
                        headers:{"Authorization":`Bearer ${token}`}
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                    else{
                        setUser(null)
                        setLoading(false)
                    }
                }
                
            } catch (error) {
                console.log(error.response && error.response.data.error);
            }
            finally{
                setLoading(false);
            }
        };
    
        verifyUser();
    
        
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout  , }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook to use the Auth context
export const H1 = () => useContext(UserContext);

// Default export for the provider
export default AuthProvider;
