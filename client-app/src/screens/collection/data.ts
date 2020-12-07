import { Product, Brand } from '../../types/Entities';
export const data: Product[] = [
  {
    id: 1,
    name: 'Number 123',
    color: '#cd8e8e',
    brand: {
      id: 1,
      name: 'Kodi Professional',
      price:  100,
    },
    isFavorite: true,
  },
  {
    id: 1,
    name: 'Number 456',
    color: '#008ad1',
    brand: {
      id: 1,
      name: 'Nika Professional',
      price: 150,
    },
    isFavorite: false,
  },
  {
    id: 1,
    name: 'Number 678',
    color: '#437f57',
    brand: {
      id: 1,
      name: 'Test Professional',
      price: 100,
    },
    isFavorite: true,
  },
];
