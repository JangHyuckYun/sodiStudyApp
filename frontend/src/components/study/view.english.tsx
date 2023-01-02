import ViewEnglishPage from '../../pages/study/view.english.page'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import indexStore from '../../store/store.index'
import { useObserver } from 'mobx-react'
import { toJS } from 'mobx'
import { IenListItem } from '../../interfaces/study/Ienglish'
import sodiStudyApi from '../../utils/api'
import { responseData } from '../../interfaces/Iresponse'

const ViewEnglish = () => {
    const { enCpIdx } = useParams();
    const { studyEnStore } = indexStore;
    const [slideOnOff, setSlideOnOff] = useState<any>({});
    const [slideTab, setSlideTab] = useState<any>({});
    const [isView, setIsView] = useState<boolean>(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const slideContainerRef = useRef(null);
    const [inputs, setInputs] = useState<any>({
        title: '',
        contentEn:'',
        contentKr:'',
        explanation:''
    });

    useEffect(() => {
    (async () => {
        if (typeof enCpIdx === 'string') {
            await studyEnStore.initEnList(parseInt(enCpIdx))
        } else {
            studyEnStore.enList = [];
        }
    })()
    }, []);

    useEffect(() => {
        let initialSlideOnOff: any = {};

        studyEnStore.enList.slice().forEach(({ enIdx }:IenListItem, idx: number) => {
            initialSlideOnOff[enIdx] = idx === 0;
            slideTab[enIdx] = "en";
        })

        setSlideOnOff(initialSlideOnOff);
    }, [studyEnStore.enList]);

    const addEnglishPage = useCallback(() => {
        Object.keys(inputs).some(key => {
            const value = inputs[key];
            if (value.trim().length <= 0) {
                alert(`'${key}'의 값을 입력해 주세요.`);
                return true;
            }

            return false;
        });

        (async () => {
            const { statusText }:responseData = await sodiStudyApi.study.en.create(enCpIdx, inputs);

            console.log(statusText)

            setInputs({
                title: '',
                contentEn:'',
                contentKr:'',
                explanation:''
            });
            setAddModalOpen(false);

            if(statusText === 'Created') {
                if (typeof enCpIdx === 'string') {
                    await studyEnStore.initEnList(parseInt(enCpIdx))
                } else {
                    studyEnStore.enList = [];
                }
            }
        })();
    }, [inputs]);

    return useObserver(() => {
        return (
            <ViewEnglishPage
                enList={toJS(studyEnStore.enList)}
                slideOnOff={slideOnOff}
                setSlideOnOff={setSlideOnOff}
                slideTab={slideTab}
                setSlideTab={setSlideTab}
                isView={isView}
                setIsView={setIsView}
                addModalOpen={addModalOpen}
                setAddModalOpen={setAddModalOpen}
                slideContainerRef={slideContainerRef}
                inputs={inputs}
                setInputs={setInputs}
                addEnglishPage={addEnglishPage}
            />
        );
    });
};

export default ViewEnglish;
