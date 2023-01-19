import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import { Container } from '@mui/material'
import { styled } from '@mui/system'
import SodiRoutes from './utils/sodiStudy.router'

const InitWrap = styled(Container)(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflowX:'hidden',
    [theme.breakpoints.down('lg')]: {

    },

    [theme.breakpoints.down('md')]: {
        // padding:'0 20px'
    },

    [theme.breakpoints.down('sm')]: {
        padding:'0'
    },
}));

function App() {

    return (
        <InitWrap>
            <Router>
                <SodiRoutes />
            </Router>
        </InitWrap>
)
}

export default App
