import { Grid } from '@mui/material'
import { styled } from '@mui/system'

const MenuGrid = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {

    }
}))

const GridItem = styled(Grid)(({ theme }) => ({
    padding: '0 !important',
    width: 'calc(100% / 4)',
    height: 'calc(100% / 4)',
    backgroundColor: theme.palette.primary[theme.palette.mode],
    boxShadow: '0 0 2px rgba(0,0,0, .1)',
    borderRadius: theme.spacing(1.6),
    '& > a': {
        width: '100%',
        height: '100%',
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        wordBreak:'break-all',
        whiteSpace:'break-spaces',
        padding:'0 5px',
    },
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
}))

export {
    MenuGrid,
    GridItem,
}
