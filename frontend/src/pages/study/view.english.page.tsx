import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Grid,
    Modal,
    Paper,
    Slide,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useMemo, useRef, useState } from 'react'
import { IenListItem } from '../../interfaces/study/Ienglish'
import { ContainerFooter, ContainerMain } from '../../components/units/containers.related'
import { ModalBox } from '../../components/units/modal/modal'

const SlideContainer = styled(Container)({
    minHeight: '300px',
    overflowX: 'hidden',
    position: 'relative',
})

const SlideCover:any = styled(Grid)((props: any) => ({
    // width:(props.count * 100) +`%`,
    width: `100%`,
    position: 'relative',
    flexWrap: 'nowrap',
    '& > div': {
        width: `100%`,
        position: 'absolute',
        '& > div': {
            width:'50%'
        }
    },
}));

const StackItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    height:'auto',
    textAlign: 'center',
    wordBreak:'break-all',
    whiteSpace:'break-spaces',
    transition:'.2s',
    '&.hide': {
        visibility:'hidden',
        height:0,
        margin:0,
        padding:0,
        opacity:0,
    },
    [theme.breakpoints.down('lg')]: {

    },

    [theme.breakpoints.down('md')]: {
        width:'100% !important'
    },

    [theme.breakpoints.down('sm')]: {

    },
}));

const ViewEnglishPage = (props: any) => {
    let { enList, slideOnOff, setSlideOnOff, slideTab, setSlideTab, isView, setIsView, addModalOpen, setAddModalOpen, slideContainerRef, inputs, setInputs, addEnglishPage } = props;

    return (
        <ContainerMain ref={slideContainerRef} sx={{ display:'flex', justifyContent:'space-between', flexDirection:'column' }}>
           <Box>
               <SlideContainer ref={slideContainerRef}>
                   <SlideCover container item count={1}>
                       {enList.map((en: IenListItem) => (
                           <Slide
                               in={slideOnOff[en.enIdx]}
                               direction={'left'}
                               container={slideContainerRef.current}
                               mountOnEnter
                               key={`enListItem_${en.enIdx}`}
                           >
                               <Stack spacing={3} alignItems={'center'}>
                                   <StackItem sx={{ order:0 }}>
                                       <ButtonGroup sx={{ width:'100%' }}>
                                           <Button variant={slideTab[en.enIdx] === "en" ? 'contained' : 'outlined'} onClick={() => { setSlideTab({ ...slideTab, [en.enIdx] : "en" }); setIsView(false)  }} sx={{ flex:'1' }}>English</Button>
                                           <Button variant={slideTab[en.enIdx] === "kr" ? 'contained' : 'outlined'} onClick={() => { setSlideTab({ ...slideTab, [en.enIdx] : "kr" }); setIsView(false)  }} sx={{ flex:'1' }}>Korean</Button>
                                       </ButtonGroup>
                                   </StackItem>
                                   <StackItem className={slideTab[en.enIdx] === "en" ? "" : ( isView ? "" : 'hide')} sx={{ order: (slideTab[en.enIdx] === "en" ? 1 : 2) }}><pre>{en.contentEn}</pre></StackItem>
                                   <StackItem className={slideTab[en.enIdx] === "kr" ? "" : ( isView ? "" : 'hide')} sx={{ order: (slideTab[en.enIdx] === "kr" ? 1 : 2) }} ><pre>{en.contentKr}</pre></StackItem>
                                   <StackItem sx={{ order:3 }}><pre>{en.explanation}</pre></StackItem>
                               </Stack>
                           </Slide>
                       ))}
                   </SlideCover>
               </SlideContainer>
               <Box sx={{ padding:'0 30px' }}>
                   <Button sx={{ width:'50%' }} variant={'contained'} onClick={() => setIsView(!isView)} >View</Button>
                   <br/><br/>
                   <ButtonGroup>
                       {Object.keys(slideOnOff).map((key: any, idx) => (
                           <Button
                               key={`enListItemBtn_${idx}`}
                               variant={slideOnOff[key] ? 'contained' : 'outlined'}
                               onClick={() => {
                                   const newObj:any = {};
                                   for (let newKey in slideOnOff) {
                                       newObj[newKey] = newKey === key;
                                   }

                                   setIsView(false);
                                   setSlideOnOff({ ...newObj, [key]: true });
                               }}>{idx + 1}</Button>
                       ))}
                   </ButtonGroup>
               </Box>
           </Box>
            <br/>
            <ContainerFooter>
                <ButtonGroup>
                    <Button onClick={() => setAddModalOpen(true)} variant={'contained'} >Add English</Button>
                    <Button variant={'contained'} >Delete</Button>
                </ButtonGroup>
            </ContainerFooter>

        {/*  Modal  */}
            <Modal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <TextField
                        label={'Title'}
                        variant={'outlined'}
                        fullWidth
                        color={'primary'}
                        value={inputs.title}
                        onChange={(e) => setInputs({ ...inputs,  title: e.target.value}) }
                    />
                    <TextField
                        label={'Content - English'}
                        variant={'outlined'}
                        fullWidth
                        color={'primary'}
                        value={inputs.contentEn}
                        onChange={(e) => setInputs({ ...inputs,  contentEn: e.target.value}) }
                    />
                    <TextField
                        label={'Content - Korean'}
                        variant={'outlined'}
                        fullWidth
                        color={'primary'}
                        value={inputs.contentKr}
                        onChange={(e) => setInputs({ ...inputs,  contentKr: e.target.value}) }
                    />
                    <TextField
                        label={'Description'}
                        variant={'outlined'}
                        fullWidth
                        color={'primary'}
                        value={inputs.explanation}
                        onChange={(e) => setInputs({ ...inputs,  explanation: e.target.value}) }
                    />
                    <ButtonGroup fullWidth>
                        <Button onClick={() => addEnglishPage()} >Save</Button>
                        <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
                    </ButtonGroup>
                </ModalBox>
            </Modal>

        </ContainerMain>
    )
}

export default ViewEnglishPage
