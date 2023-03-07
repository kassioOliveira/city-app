import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from '@mui/material';
import {Box} from '@mui/system';

import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemContext = createContext({} as IThemeContextData);

interface IChildrenProp {
    children: React.ReactNode;
};

export const useAppThemeContext = () => {
    return useContext(ThemContext);
};

export const AppThemeProvider: React.FC<IChildrenProp> = ({children}) => {
    const [themeName,setThemeName] = useState<'light' | 'dark'>('light');
    
    const toggleTheme = useCallback(()=>{
        setThemeName(oldTheme => oldTheme === 'light'? 'dark': 'light');

    },[]);

    const theme = useMemo(()=> {
        if(themeName === 'light')return LightTheme;

        return DarkTheme;

    },[themeName]);

    return (
        <ThemContext.Provider value={{themeName, toggleTheme}}>
             <ThemeProvider theme={theme}>
             <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
             {children}
             </Box>
             </ThemeProvider>
        </ThemContext.Provider>
    )
};
