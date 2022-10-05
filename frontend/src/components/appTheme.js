import { createTheme } from "@mui/material";

export let appTheme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    body1: 'CardContent'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#FD2D01'
        },
        secondary: {
            main: '#FFD7D7'
        }
    },
    typography: {
        fontFamily: 'Lato',
        body1: {
            fontWeight: 500
        },
        button: {
            fontWeight: 600
        }
    }
})