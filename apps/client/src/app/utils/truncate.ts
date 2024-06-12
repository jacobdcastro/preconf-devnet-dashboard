interface TruncateFnOptionalParams {
    firstCharCount?: number
    lastCharCount?: number
    exclude0x?: boolean
    address?: string | undefined;
}
  
export const truncateHex = ({
    hexStr,
    firstCharCount = 7,
    lastCharCount = 4,
    exclude0x = false
    }: { hexStr: string } & TruncateFnOptionalParams) =>
    `${hexStr.slice(exclude0x ? 2 : 0, 2 + firstCharCount)}${
        lastCharCount > 0 ? '....' : ''
    }${hexStr.slice(hexStr.length - lastCharCount, hexStr.length)}`

export const truncateAddress = ({
    address,
    firstCharCount = 7,
    lastCharCount = 4,
    exclude0x = false
    }: { address: string } & TruncateFnOptionalParams) => {
    return truncateHex({ hexStr: address, firstCharCount, lastCharCount, exclude0x })
}
