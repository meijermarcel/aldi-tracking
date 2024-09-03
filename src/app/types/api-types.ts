export interface ItemResponse {
    id: number;
    description: string;
    amount: number;
    units: string;
    imageLink: string;
    createdAt: string;
    updatedAt: string;
    storeItemPrices: StoreItemPriceResponse[];
}

export interface StoreItemPriceResponse {
    id: number;
    price: number;
    storeItemId: number;
    dateTime: string;
    createdAt: string;
    updatedAt: string;
}
