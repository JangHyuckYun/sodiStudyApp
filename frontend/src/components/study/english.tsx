import StudyEnglishPage from '../../pages/study/StudyEnglishPage'
import { useCallback, useEffect, useState } from 'react'
import indexStore from '../../store/store.index'
import { useObserver } from 'mobx-react'
import sodiStudyApi from '../../utils/api'
import { responseData } from '../../interfaces/Iresponse'

const StudyEnglish = () => {
    const { studyEnStore } = indexStore;
    const [addChapterName, setAddChapterName] = useState<string>('');
    const [addModalOpen, setAddModalOpen] = useState(false);

    const addChapter = useCallback(() => {
        if(addChapterName.trim().length <= 0) return alert('한 글자 이상 입력해 주세요.');

        (async () => {
            const { statusText }:responseData = await sodiStudyApi.study.en.chapter.create(addChapterName);

            setAddChapterName('');
            setAddModalOpen(false);

            if (statusText === "Created") {
                await studyEnStore.initCategoryList();
            }
        })();
    }, [addChapterName]);

    useEffect(() => {
        (async () => {
            await studyEnStore.initCategoryList();
            console.log(studyEnStore.categoryList);
        })();
    }, []);

    return useObserver(() => {
        const chapterList = studyEnStore.categoryList;
        return <StudyEnglishPage
            chapterList={chapterList}
            addChapterName={addChapterName}
            setAddChapterName={setAddChapterName}
            addChapter={addChapter}
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
        />;
    });
};

export default StudyEnglish;
