import { createContext, useContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const useAdminContext = () => {
    return useContext(AdminContext);
}

export const AdminContextProvider = ({ children }) => {
    let user = localStorage.getItem("user")
    const [adminUser,setAdminUser] = useState(user || null);

    useEffect(() => {
        if (adminUser == null) localStorage.removeItem("user")
        else localStorage.setItem("user", adminUser)
    }, [ adminUser ])

    console.log(adminUser)
    return <AdminContext.Provider value={{ adminUser,setAdminUser }}>
        {children}
    </AdminContext.Provider>
}