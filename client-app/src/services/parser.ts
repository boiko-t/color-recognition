import { Product, Brand } from '../types/Entities';

export const parseResponseToProducts = (response): Product[] => {
    return response.map(item => ({
        id: item.id,
        name: item.name,
        color: item.color,
        isFavorite: item.isFavorite,
        brand: { id: item.brandId, name: item.brand, price: item.price } as Brand,
      } as Product));
}