import { createTheme } from '@mui/material';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                    margin: 0,
                    padding: 0
                },
                html: {
                    height: "100%",
                    width: "100%"
                },
                body: {
                    height: "100%",
                    width: "100%",
                },
                a: {
                    textDecoration: "none",
                    color: "inherit"
                },
                "#root": {
                    height: "100%",
                    width:'100%',
                    maxWidth:'100%'
                }
            }
        },
    },
    palette: {
        primary: {
            light: "#38329f",
            main: "#4e46d3",
            dark: "#827cec",

        },
        secondary: {
            main: "#EEFD53"
        },
        error: {
            main: "#DA1E28"
        },
        mode: 'dark'
    },
    typography: {
        fontFamily: ["Noto Sans KR", "sans-serif", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"].join(",")
    },

});

export default theme;
