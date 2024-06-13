import { IPreconf } from "@/interfaces/preconf";


export const findProposerNameByValidatorIndex = (arr: IPreconf[], key: number | string): string | null => {
    for (const item of arr) {
        if (item.validatorIndices.includes(parseInt(key?.toString()))) {
            return item.name;
        }
    }
    return null;
}



