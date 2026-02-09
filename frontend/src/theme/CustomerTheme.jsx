import { createTheme } from "@mui/material";

export const CustomerTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#001742', // Deep professional blue
            light: '#2563eb',
            dark: '#000f2e',
        },
        secondary: {
            main: '#febd69', // Amazon-like warm yellow for CTAs
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#475569',
        }
    },
    typography: {
        fontFamily: ['"Montserrat"', '"Inter"', '"Roboto"', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 }
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 24px',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #001742 30%, #002a7a 90%)',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 23, 66, 0.04)',
                        transform: 'scale(1.1)',
                    },
                },
            },
        },
    },
});