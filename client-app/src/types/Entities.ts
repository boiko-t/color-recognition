export interface Product {
    id: number;
	name: string;
	color: string;
    brand: Brand;
    isFavorite?: boolean;
}

export interface Brand {
	id: number;
	name: string;
	price: number;
}

export interface PriceCategory {
	id: number;
	name?: string;
	price: number;
}