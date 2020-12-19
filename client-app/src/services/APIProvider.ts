import { Platform } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';
import { AppConfigs } from '../AppConfigs';
import { Brand, Product, User, PriceCategory } from '../types/Entities';
import { transformImageToFormData } from './utils';
import { parseResponseToProducts } from './parser';
import { AuthService } from './AuthService';

export class APIProvider {
  static currentAddress = AppConfigs.APIAddressLocal;

  static getColorsFromImage = async (
    image: ImagePickerResult
  ): Promise<Array<string>> => {
    let contentType: string =
      Platform.OS === 'web' ? 'text' : 'multipart/form-data';

    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/get-color`,
        {
          method: 'POST',
          body: transformImageToFormData(image),
          headers: { 'Content-Type': contentType },
        }
      );
      let json = await response.json();
      return json;
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static getBrands = async (): Promise<Brand[]> => {
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/brands`,
        { method: 'GET' }
      );
      let json = await response.json();
      return json.map((item) => ({ ...item } as Brand));
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static addBrand = async (brand: Brand) => {
    try {
      await fetch(`${APIProvider.currentAddress}/brands/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brand),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  static updateBrand = async (brand: Brand) => {
    try {
      await fetch(`${APIProvider.currentAddress}/brands/update`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(brand),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  static deleteBrand = async (brandId) => {
    try {
      await fetch(`${APIProvider.currentAddress}/brands/delete?id=${brandId}`, {
        method: 'POST',
      });
    } catch (e) {
      console.warn(e);
    }
  };

  static getProductsByColor = async (color: string): Promise<Product[]> => {
    const colorParameter: string = `?compareToColor=${color}&userId=${AuthService.currentUser.id}`;
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/products${colorParameter}`,
        { method: 'GET' }
      );
      let json = await response.json();
      return parseResponseToProducts(json);
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static getProducts = async (brandId?: number): Promise<Product[]> => {
    const brandIdParameter: string = brandId
      ? `?brandId=${brandId}&userId=${AuthService.currentUser.id}`
      : `?userId=${AuthService.currentUser.id}`;
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/products${brandIdParameter}`,
        { method: 'GET' }
      );
      let json = await response.json();
      return parseResponseToProducts(json);
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static getFavoriteProducts = async (): Promise<Product[]> => {
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/products/favorite?userId=${AuthService.currentUser.id}`,
        { method: 'GET' }
      );
      let json = await response.json();
      return parseResponseToProducts(json);
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static toggleFavoriteProduct = async (product: Product) => {
    const action = product.isFavorite ? 'set-favorite' : 'remove-favorite'
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/products/${action}?userId=${AuthService.currentUser.id}&productId=${product.id}`,
        { method: 'POST' }
      );
      let json = await response.json();
      return parseResponseToProducts(json);
    } catch (e) {
      console.warn(e);
      return [];
    }
  };

  static addProduct = async (product: Product) => {
    try {
      await fetch(`${APIProvider.currentAddress}/products/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  static updateProduct = async (product: Product) => {};

  static deleteProduct = async (productId) => {};

  static addUser = async (user: User) => {
    try {
      await fetch(`${APIProvider.currentAddress}/users/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
    } catch (e) {
      console.warn(e);
    }
  };

  static getUser = async (userEmail: string): Promise<User> => {
    try {
      let response: Response = await fetch(
        `${APIProvider.currentAddress}/user/get?email=${userEmail}`,
        { method: 'GET' }
      );
      return (await response.json()) as User;
    } catch (e) {
      console.warn(e);
      return {} as User;
    }
  };

  static getPriceCategories = async (): Promise<PriceCategory[]> => {
    return [
      { id: 1, name: 'Economy', price: 100 },
      { id: 2, name: 'Standard', price: 125 },
      { id: 3, name: 'Luxury', price: 150 },
    ];
  };

  static updateUser = async (user: User) => {};
}
