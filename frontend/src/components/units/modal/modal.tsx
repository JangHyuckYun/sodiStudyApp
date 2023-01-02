import { styled } from '@mui/system'
import { Box } from '@mui/material'

// @ts-ignore
const ModalBox:any = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: (theme.palette.mode === "dark" ? "#121212" : "#fff"),
    border: '2px solid #000',
    boxShadow: 24,
    padding: '10px',
}));

export {
    ModalBox
}
