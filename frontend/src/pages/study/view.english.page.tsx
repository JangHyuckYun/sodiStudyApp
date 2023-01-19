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
import { IenListItem } from '../../interfaces/study/Ienglish'
import { ContainerFooter, ContainerMain } from '../../components/units/containers.related'
import { ModalBox, ModalItem } from '../../components/units/modal/modal'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SlideContainer = styled(Container)({
    minHeight: '300px',
    position: 'relative',
})

const SlideCover: any = styled(Grid)((props: any) => ({
    // width:(props.count * 100) +`%`,
    width: `100%`,
    height: '100%',
    position: 'relative',
    flexWrap: 'nowrap',
    overflow: 'none !important',
    '& > div': {
        width: `100%`,
        height: 'auto',
        position: 'absolute',
        '& > div': {
            width: '50%',
        },
    },
}))

const StackItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    height: 'auto',
    textAlign: 'center',
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    transition: '.2s',
    '&.hide': {
        visibility: 'hidden',
        height: 0,
        margin: 0,
        padding: 0,
        opacity: 0,
    },
    [theme.breakpoints.down('lg')]: {},

    [theme.breakpoints.down('md')]: {
        width: '100% !important',
    },

    [theme.breakpoints.down('sm')]: {},
}))

const ViewEnglishPage = (props: any) => {
    let {
        enList, addModalOpen, setAddModalOpen, slideContainerRef,
        inputs,
        setInputs,
        updateInputs,
        setUpdateInputs,
        addEnItem,
        updateEnItem,
        deleteEnItem,
    } = props;

    const showEn = useMemo(() => enList[enList.findIndex(d => d.isSlideView) ?? 0], [enList]) ?? { isUpdating: false }
    const slideCoverRef = useRef(null)
    const [coverHeight, setCoverHeight] = useState(400)
    const [observer, setObserver] = useState<any>(null);

    // const resetHeight = useCallback(() => {
    //     if (enList.length > 0) {
    //         const stackCoverEle: any = slideCoverRef.current?.querySelector(`[data-idx='${showEn.enIdx}']`);
    //         if (observer && stackCoverEle) {
    //             observer.observe(stackCoverEle)
    //         } else {
    //             setObserver(new ResizeObserver(entries => {
    //                 for (let entry of entries) {
    //                     const { width, height } = entry.contentRect;
    //                     console.log('height', height)
    //                     setCoverHeight(height + 50)
    //                 }
    //                 if (observer) {
    //                     observer.disconnect(stackCoverEle)
    //                 }
    //             }))
    //         }
    //     }
    // }, [enList,showEn])

    useEffect(() => {
        if (enList.length > 0) {
            const stackCoverEle: any = slideCoverRef.current?.querySelector(`[data-idx='${showEn.enIdx}']`);
            if (observer && stackCoverEle) {
                console.log('stackCoverEle', stackCoverEle)
                observer.observe(stackCoverEle);
            } else {
                setObserver(new ResizeObserver(entries => {
                    for (let entry of entries) {
                        const { width, height } = entry.contentRect;
                        console.log('height', height)
                        setCoverHeight(height + 50)
                    }
                    if (observer) {
                        observer.disconnect(stackCoverEle);
                        setObserver(null)
                    }
                }))
            }
        }
    }, [enList, observer, showEn]);

    return (
        <ContainerMain ref={slideContainerRef}
                       sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Box>
                <SlideContainer ref={slideContainerRef} sx={{ minHeight: `${coverHeight}px` }}>
                    <SlideCover container item count={1} ref={slideCoverRef}>
                        {enList.map((en: IenListItem) => (
                            <Slide
                                in={en.isSlideView}
                                direction={'left'}
                                container={slideContainerRef.current}
                                key={`enListItem_${en.enIdx}`}
                                mountOnEnter
                            >
                                <Stack spacing={3} alignItems={'center'} data-idx={en.enIdx}>
                                    <StackItem sx={{ order: 0, display: 'flex' }}>
                                        <Button sx={{ flex: 0.1, mr: 1 }} variant={'contained'} onClick={() => {
                                            if (!en.isUpdating) {
                                                setUpdateInputs({
                                                    enIdx: en.enIdx,
                                                    title: en.title,
                                                    contentEn: en.contentEn,
                                                    contentKr: en.contentKr,
                                                    explanation: en.explanation,
                                                })
                                            }
                                            updateEnItem({
                                                ...en,
                                                isUpdating: !en.isUpdating,
                                            })
                                        }}>
                                            <FaPen />
                                        </Button>
                                        <ButtonGroup sx={{ width: '100%', flex: 2 }}>
                                            <Button variant={en.tab === 'en' ? 'contained' : 'outlined'}
                                                    onClick={() => {
                                                        updateEnItem({ ...en, tab: 'en' })
                                                    }} sx={{ flex: '1' }}>English</Button>
                                            <Button variant={en.tab === 'kr' ? 'contained' : 'outlined'}
                                                    onClick={() => {
                                                        updateEnItem({ ...en, tab: 'kr' })
                                                    }} sx={{ flex: '1' }}>Korean</Button>
                                        </ButtonGroup>
                                        <Button sx={{ flex: 0.1, ml: 1 }} variant={'contained'}
                                                onClick={() => setAddModalOpen(true)}>
                                            <FaPlus />
                                        </Button>
                                    </StackItem>
                                    <StackItem
                                        className={en.tab === 'en' ? '' : (en.isView ? '' : 'hide')}
                                        sx={{ order: (en.tab === 'en' ? 1 : 2) }}
                                    >
                                        {en.isUpdating ?
                                            (
                                                <TextField
                                                    label={'Content - English'}
                                                    variant={'outlined'}
                                                    fullWidth
                                                    color={'primary'}
                                                    multiline
                                                    rows={3}
                                                    onChange={(e) => setUpdateInputs({
                                                        ...updateInputs,
                                                        contentEn: e.target.value,
                                                    })}
                                                    value={updateInputs.contentEn}
                                                />
                                            ) :
                                            <pre>{en.contentEn}</pre>}
                                    </StackItem>
                                    <StackItem className={en.tab === 'kr' ? '' : (en.isView ? '' : 'hide')}
                                               sx={{ order: (en.tab === 'kr' ? 1 : 2) }}>
                                        {en.isUpdating ?
                                            (
                                                <TextField
                                                    label={'Content - Korean'}
                                                    variant={'outlined'}
                                                    fullWidth
                                                    color={'primary'}
                                                    multiline
                                                    rows={3}
                                                    onChange={(e) => setUpdateInputs({
                                                        ...updateInputs,
                                                        contentKr: e.target.value,
                                                    })}
                                                    value={updateInputs.contentKr}
                                                />
                                            ) :
                                            <pre>{en.contentKr}</pre>}
                                    </StackItem>
                                    <StackItem sx={{ order: 3 }}>
                                        {en.isUpdating ?
                                            (
                                                <TextField
                                                    label={'Explanation'}
                                                    variant={'outlined'}
                                                    fullWidth
                                                    color={'primary'}
                                                    multiline
                                                    rows={3}
                                                    onChange={(e) => setUpdateInputs({
                                                        ...updateInputs,
                                                        explanation: e.target.value,
                                                    })}
                                                    value={updateInputs.explanation}
                                                />
                                            ) :
                                            <pre>{en.explanation}</pre>}
                                    </StackItem>
                                </Stack>
                            </Slide>
                        ))}
                    </SlideCover>
                </SlideContainer>
                {enList.length <= 0 ? (
                    <Button variant={'contained'} sx={{ width:'40%', height:'40%' }} onClick={() => setAddModalOpen(true)}>ADD</Button>
                ) : <Box sx={{ padding: '0 30px' }}>
                    <ButtonGroup sx={{ width: '50%' }}>
                        {
                            showEn.isUpdating ?
                                <>
                                    <Button sx={{ flex: 1, mr: 1 }} variant={'contained'} onClick={() => {
                                        updateEnItem({ ...updateInputs, enIdx: showEn.enIdx, isUpdating: false }, true)
                                    }}>Submit</Button>
                                    <Button sx={{ flex: 1 }} variant={'contained'}
                                            onClick={() => {
                                                updateEnItem({
                                                    ...showEn,
                                                    isUpdating: false,
                                                })
                                                setUpdateInputs({
                                                    enIdx: showEn.enIdx,
                                                    title: showEn.title,
                                                    contentEn: showEn.contentEn,
                                                    contentKr: showEn.contentKr,
                                                    explanation: showEn.explanation,
                                                })
                                            }}>Cancel</Button>
                                </>
                                : <>
                                    <Button sx={{ flex: 1, mr: 1 }} variant={'contained'}
                                            onClick={() => updateEnItem({
                                                ...showEn,
                                                isView: !showEn.isView,
                                            })}>View</Button>
                                    <Button sx={{ flex: 0.1, margin: '0 !important' }} variant={'contained'}
                                            onClick={() => {
                                                if (confirm('정말 삭제하시겠습니까?')) {
                                                    setObserver(null);
                                                    deleteEnItem(showEn.enIdx);
                                                }
                                            }}>
                                        <FaTrash />
                                    </Button>
                                </>
                        }
                    </ButtonGroup>
                    <br /><br />
                    <ButtonGroup>
                        {enList.map((en: IenListItem, idx: number) => (
                            <Button
                                key={`enListItemBtn_${idx}`}
                                variant={en.isSlideView ? 'contained' : 'outlined'}
                                onClick={() => {
                                    const findIsSlideViewTrueIdx = enList.findIndex((d: { isSlideView: boolean }) => d.isSlideView)

                                    updateEnItem([
                                        { ...enList[findIsSlideViewTrueIdx], isSlideView: false },
                                        { ...en, isSlideView: true },
                                    ])
                                }}>{idx + 1}</Button>
                        ))}
                    </ButtonGroup>
                </Box>}
            </Box>
            <br />
            <ContainerFooter>
            </ContainerFooter>

            {/*  Modal  */}
            <Modal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <ModalBox>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Text in a modal
                    </Typography>
                    <ModalItem>
                        <TextField
                            label={'Title'}
                            variant={'outlined'}
                            fullWidth
                            color={'primary'}
                            value={inputs.title}
                            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                        />
                    </ModalItem>
                    <ModalItem>
                        <TextField
                            label={'Content - English'}
                            variant={'outlined'}
                            fullWidth
                            multiline
                            rows={3}
                            color={'primary'}
                            value={inputs.contentEn}
                            onChange={(e) => setInputs({ ...inputs, contentEn: e.target.value })}
                        />
                    </ModalItem>
                    <ModalItem>
                        <TextField
                            label={'Content - Korean'}
                            variant={'outlined'}
                            fullWidth
                            multiline
                            rows={3}
                            color={'primary'}
                            value={inputs.contentKr}
                            onChange={(e) => setInputs({ ...inputs, contentKr: e.target.value })}
                        />
                    </ModalItem>
                    <ModalItem>
                        <TextField
                            label={'Description'}
                            variant={'outlined'}
                            fullWidth
                            multiline
                            rows={4}
                            color={'primary'}
                            value={inputs.explanation}
                            onChange={(e) => setInputs({ ...inputs, explanation: e.target.value })}
                        />
                    </ModalItem>
                    <ModalItem>
                        <ButtonGroup fullWidth>
                            <Button variant={'outlined'} onClick={() => addEnItem()}>Save</Button>
                            <Button variant={'outlined'} onClick={() => setAddModalOpen(false)}>Cancel</Button>
                        </ButtonGroup>
                    </ModalItem>
                </ModalBox>
            </Modal>

        </ContainerMain>
    )
}

export default ViewEnglishPage
