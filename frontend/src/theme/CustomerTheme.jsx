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
    }
})