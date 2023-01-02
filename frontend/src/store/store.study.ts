import { observable } from 'mobx'
import sodiStudyApi from '../utils/api'

const studyEnStore = observable({
    categoryList: [],
    enList: [],

    initCategoryList: async function() {
        this.categoryList = await sodiStudyApi.study.en.chapter.findAll()
    },

    initEnList: async function(enCpIdx: number) {
        console.log('init...')
        const result = await sodiStudyApi.study.en.findAll(enCpIdx);
        console.log('result', result)
        this.enList = await result;
    },
})

export default studyEnStore
