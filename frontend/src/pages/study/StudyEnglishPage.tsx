import { GridItem, MenuGrid } from '../../components/units/MenuGrid'
import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Container, Modal, TextField, Typography } from '@mui/material'
import { IenCpListItem } from '../../interfaces/study/Ienglish'
import { ModalBox } from '../../components/units/modal/modal'

const StudyEnglishPage = (props: any) => {
    const { chapterList, addChapterName, setAddChapterName, addChapter, addModalOpen, setAddModalOpen } = props;
    return (
        <Container sx={{ height:'100%' }}>
            <Container sx={{ height:'calc(100% - 50px)', maxHeight:'calc(100% - 50px)', overflowY:'auto', padding:'20px 0 0 0' }}>
                <MenuGrid container spacing={2} gap={'10px'}>
                    {chapterList?.map((item:IenCpListItem, idx:number) => (
                        <GridItem key={`en_cp_${idx}`} xs={10} sm={5} md={3}>
                            <Link to={String(item.enCpIdx)}>{item.chapter}</Link>
                        </GridItem>
                    ))}
                </MenuGrid>
            </Container>
            <Button sx={{ position:'absolute', bottom:10 }} variant={'contained'} onClick={() => setAddModalOpen(true)} >Add</Button>

            <Modal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalBox>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Add Chapter
                    </Typography>
                    <br/>
                    <TextField
                        label={'Chapter Name'}
                        variant={'outlined'}
                        fullWidth
                        color={'primary'}
                        value={addChapterName}
                        onChange={(e) => setAddChapterName(e.target.value) }
                    />
                    <br/>
                    <br/>
                    <ButtonGroup fullWidth>
                        <Button onClick={() => addChapter()} >Save</Button>
                        <Button onClick={() => setAddModalOpen(false)}>Cancel</Button>
                    </ButtonGroup>
                </ModalBox>
            </Modal>
        </Container>
    );
}

export default StudyEnglishPage
