export interface DashboardState {
    items: Item[];
    isLoading: boolean;
}

export interface Item {
    id: number;
    description: string;
    amount: number;
    imageLink: string;
    units: string;
    currentPrice: number | null;
    averagePrice: number | null;
    currentDiffFromAvgPrice: number | null;
    storeItemPrices: ItemPrice[];
}

export interface ItemPrice {
    id: number;
    price: number;
    dateTime: string;
}
