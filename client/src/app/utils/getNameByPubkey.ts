
export const getNameByPubkey = (arr: any[], key: any) => {
    const found = arr.find(item => item.pubkey === key)
    return found ? found.name : undefined;
}