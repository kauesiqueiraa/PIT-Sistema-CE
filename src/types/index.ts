export interface InventoryItem {
    id: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
}

export interface Filters {
    type: string;
    search: string;
    priceRange: string;
}

export interface NewItem {
    name: string;
    type: string;
    quantity: string;
    price: string;
}