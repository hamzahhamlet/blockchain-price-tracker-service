export type TokenPriceResponse = {
    tokenName: string | undefined;
    tokenSymbol: string | undefined;
    usdPrice: number;
    percentChangeInLast24hr: string | undefined;
    tokenAddress: string | undefined;
    blockTimestamp: string | undefined;
}