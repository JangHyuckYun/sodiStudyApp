import ViewEnglishPage from '../../pages/study/view.english.page'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import indexStore from '../../store/store.index'
import { useObserver } from 'mobx-react'
import { toJS } from 'mobx'
import { IenListItem } from '../../interfaces/study/Ienglish'
import sodiStudyApi from '../../utils/api'
import { responseData } from '../../interfaces/Iresponse'

//TODO - index signature에 대한 블로그 글 작성

const ViewEnglish = () => {
    const { enCpIdx } = useParams();
    const { studyEnStore } = indexStore;

    const initialViewEn:IenListItem = {
        enIdx: -1,
        title: '',
        contentEn: '',
        contentKr: '',
        explanation: '',
    };

    const [addModalOpen, setAddModalOpen] = useState(false);
    const slideContainerRef = useRef(null);
    const [inputs, setInputs] = useState<IenListItem>(initialViewEn);
    const [updateInputs, setUpdateInputs] = useState<IenListItem>(initialViewEn);
    const [enList, setEnList] = useState<Array<IenListItem>>([]);

    const addEnItem = (): void => {
        Object.keys(inputs).some(key => {
            const value = inputs[key];
            if (typeof value === 'string' && value?.trim().length <= 0) {
                alert(`'${key}'의 값을 입력해 주세요.`);
                return true;
            }

            return false;
        });

        (async () => {
            console.log('inputs', inputs)

            const { statusText }:responseData = await sodiStudyApi.study.en.create(enCpIdx, inputs);

            setInputs({
                enIdx:-1,
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

        enList.push({ ...inputs, tab:'en',enIdx: ((enList.at(-1)?.enIdx ?? 1) + 1) });
        resetEnlist();
    };

    const updateEnItem = async (enItems:IenListItem | Array<IenListItem>, db: boolean = false) => {
        if (Array.isArray(enItems)) {
            enItems.forEach((enItem:IenListItem) => {
                let findIdx = enList.findIndex(d => d.enIdx === enItem.enIdx);
                if (findIdx !== -1) {
                    enList[findIdx] = { ...enList[findIdx], ...enItem };
                }
            })

            setEnList(() => [...enList]);
        } else {
            const findIdx = enList.findIndex(d => d.enIdx === enItems.enIdx);

            if (findIdx !== -1) {
                enList[findIdx] = { ...enList[findIdx], ...enItems };
                setEnList(() => [...enList]);
            }

            if (db && typeof enCpIdx === "string") {
                const { statusText, msg }:responseData = await sodiStudyApi.study.en.update(parseInt(enCpIdx), updateInputs);
                console.log('statusText, msg', statusText, msg)
            }
        }
    };

    const resetEnlist = (): void => {
        setEnList(() => enList.map((enItem:IenListItem, idx:number) => {
            return {
                ...enItem,
                isUpdating:false,
                isSlideView: idx === 0
            };
        }));
    };

    const deleteEnItem = (enIdx:number): void => {
        enList.splice(enList.findIndex(d => d.enIdx === enIdx), 1);
        resetEnlist();

        (async () => {
            if (typeof enCpIdx === "string") {
                const { statusText }:responseData = await sodiStudyApi.study.en.delete(parseInt(enCpIdx), enIdx);
                console.log('statusText', statusText);
            }

        })();
    };

    useEffect(() => {
    (async () => {
        if (typeof enCpIdx === 'string') {
            await studyEnStore.initEnList(parseInt(enCpIdx));

            setEnList(studyEnStore.enList.slice().map((enItem:IenListItem, idx:number) => {
                if (idx === 0) {
                    setUpdateInputs({
                        enIdx:enItem.enIdx,
                        title: enItem.title,
                        contentEn:enItem.contentEn,
                        contentKr:enItem.contentKr,
                        explanation:enItem.explanation
                    });
                }
                return {
                    ...enItem,
                    enIdx: Number(enItem.enIdx),
                    isSlideView: idx === 0,
                    isUpdating:false,
                    tab: 'en',
                };
            }));
        } else {
            studyEnStore.enList = [];
        }
    })()
    }, []);

    return useObserver(() => {
        return (
            <ViewEnglishPage
                addModalOpen={addModalOpen}
                setAddModalOpen={setAddModalOpen}
                slideContainerRef={slideContainerRef}
                inputs={inputs}
                setInputs={setInputs}
                enList={enList}
                addEnItem={addEnItem}
                updateEnItem={updateEnItem}
                deleteEnItem={deleteEnItem}
                updateInputs={updateInputs}
                setUpdateInputs={setUpdateInputs}
            />
        );
    });
};

export default ViewEnglish;
