interface IenCpListItem {
    enCpIdx:string | number;
    chapter:string;
    isPublic?:boolean;
}

interface IenListItem {
    enIdx: string | number;
    title: string;
    contentKr: string;
    contentEn: string;
    explanation: string;
}

export type {
    IenCpListItem,
    IenListItem
}
