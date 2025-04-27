import { createContext, useContext, useEffect, useState } from "react";

const ThemeToggleContext = createContext({
    darkMode: localStorage.getItem('darkMode') === 'true',
    setDarkMode: () => {},
})


export const ThemeToggleProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <ThemeToggleContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeToggleContext.Provider>
    );
}

export const useThemeToggle = () => {
    return useContext(ThemeToggleContext);
}