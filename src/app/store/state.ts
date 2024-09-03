export interface DashboardState {
    items: Item[];
}

export interface Item {
    id: number;
    description: string;
    amount: number;
    imageLink: string;
    units: string;
    currentPrice: number | null;
    storeItemPrices: ItemPrice[];
}

export interface ItemPrice {
    id: number;
    price: number;
    dateTime: string;
}
