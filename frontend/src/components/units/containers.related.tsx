import { styled } from '@mui/system'
import withWidth from '@mui/material/Hidden/withWidth'
import { Container } from '@mui/material'

const ContainerFooter = styled('footer')(({ theme }) => ({
    width:'100%',
}));

const ContainerMain = styled(Container)(({ theme }) => ({
    height:'100%',
    padding:0,
    [theme.breakpoints.down('lg')]: {

    },

    [theme.breakpoints.down('md')]: {
        width:'100% !important'
    },

    [theme.breakpoints.down('sm')]: {

    },
}));


export {
    ContainerMain,
    ContainerFooter
}
