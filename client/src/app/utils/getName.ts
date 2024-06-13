import { IPreconf } from "@/interfaces/preconf";

interface ICurrentProposer extends IPreconf {
    img: string;
}


export const findProposerNameByValidatorIndex = (arr: IPreconf[], key: number | string): string | null => {
    for (const item of arr) {
        if (item.validatorIndices.includes(parseInt(key?.toString()))) {
            return item.name;
        }
    }
    return null;
}



export const findProposerByValidatorIndex = (arr: IPreconf[], key: number | string): ICurrentProposer => {
    for (const item of arr) {
        if (item.validatorIndices.includes(parseInt(key?.toString()))) {
            return {
                name: item.name,
                img: item.img
            }
        }
    }
    return null;
}
