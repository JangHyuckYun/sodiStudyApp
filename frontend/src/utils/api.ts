import axios from 'axios';
import { IenListItem } from '../interfaces/study/Ienglish'
axios.defaults.withCredentials = true;

const MULTIPART = { "Content-Type": "multipart/form-data" };
export const client = axios.create({
    baseURL: '/',
    timeout: 180000,
    withCredentials: false,

    responseType: "json",
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

const sodiStudyApi = {
    study:{
        en:{
            chapter: {
                create: async function(chapter: string) {
                    const url = `/api/study/en/create/cp`;
                    return await client.post(url, { chapter }).then(res => res)
                        .catch(e => {
                            return {
                                msg:'생성 도중 오류가 발생하였습니다.'
                            };
                        }) ?? [];
                },
                update: async function() {},
                findAll: async function() {
                    const url = `/api/study/en/list/cp`;
                    return await client.post(url).then(res => res.data)
                        .catch(e => {
                            return [];
                        }) ?? [];
                },
                delete: async function() {},
            },
            create: async function(cpIdx:string | number | undefined, inputs:any) {
                if(cpIdx !== undefined) {
                    delete inputs.enIdx;
                    const url = `/api/study/en/create`;
                    return await client.post(url, { ...inputs, cpIdx }).then(res => res)
                        .catch(e => {
                            return {
                                msg:'생성 도중 오류가 발생하였습니다.'
                            };
                        }) ?? [];
                } else {
                    return {
                        msg:'error'
                    }
                }
            },
            update: async function(cpIdx: number, inputs:any) {
                const url = `/api/study/en/update`;
                return await client.post(url, { cpIdx, ...inputs }).then(res => {
                    console.log('res', res)
                    return res;
                }).catch(e => {
                    console.log('e');

                    return {
                        msg:'error'
                    }
                })
            },
            findAll: async function(enCpIdx:number) {
                const url = `/api/study/en/list`;
                return await client.post(url, {enCpIdx}).then(res => {
                    console.log('category response:', res)
                    return res.data;
                })
                    .catch(e => {
                        console.log('category error: ', e)
                        return [];
                    }) ?? [];
            },
            delete: async function(cpIdx:number, enIdx:number) {
                const url = `/api/study/en/delete`;
                return await client.delete(url, { data: {cpIdx, enIdx} }).then(res => {
                    console.log('res', res)
                    return res;
                }).catch(e => {
                    console.log('e');

                    return {
                        msg:'error'
                    }
                })
            },
        },
        server: {
            category: {
                create: async function() {},
                update: async function() {},
                findAll: async function() {},
                delete: async function() {},
            },
        }
    },
};

export default sodiStudyApi;
