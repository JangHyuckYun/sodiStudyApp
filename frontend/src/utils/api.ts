import axios from 'axios';
axios.defaults.withCredentials = true;

const MULTIPART = { "Content-Type": "multipart/form-data" };
export const client = axios.create({
    baseURL: 'http://dockerssh.sodiapp.com:4033/',
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
                    const url = `/study/en/create/cp`;
                    return await client.post(url, { chapter }).then(res => res)
                        .catch(e => {
                            return {
                                msg:'생성 도중 오류가 발생하였습니다.'
                            };
                        }) ?? [];
                },
                update: async function() {},
                findAll: async function() {
                    const url = `/study/en/list/cp`;
                    return await client.post(url).then(res => res.data)
                        .catch(e => {
                            return [];
                        }) ?? [];
                },
                delete: async function() {},
            },
            create: async function(cpIdx:string | number | undefined, inputs:any) {
                if(cpIdx !== undefined) {
                    const url = `/study/en/create`;
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
            update: async function() {},
            findAll: async function(enCpIdx:number) {
                const url = `/study/en/list`;
                return await client.post(url, {enCpIdx}).then(res => {
                    console.log('category response:', res)
                    return res.data;
                })
                    .catch(e => {
                        console.log('category error: ', e)
                        return [];
                    }) ?? [];
            },
            delete: async function() {},
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
