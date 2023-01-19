interface IenCpListItem {
    enCpIdx:string | number;
    chapter:string;
    isPublic?:boolean;
}

type keyProp = string | boolean | number;

interface IenListItem {
    [key: string]: keyProp | undefined;
    enIdx: number;
    title: keyProp;
    contentEn: keyProp;
    contentKr: keyProp;
    explanation: keyProp;
    isView?: boolean;
    isSlideView?: boolean;
    isUpdating?: keyProp | undefined;
    tab?: string;
}

export type {
    IenCpListItem,
    IenListItem
}
