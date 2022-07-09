import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    const setData = (data) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            ...data,
        }));
    };

    // console.log(userData);

    return (
        <UserContext.Provider value={{ userData, setData }}>
            <div className="h-screen">
                {children}
            </div>
        </UserContext.Provider>
    );
}

// custom hook
export const useData = () => useContext(UserContext);