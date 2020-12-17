import { Platform } from 'react-native';
import { ImagePickerResult } from 'expo-image-picker';
import { AppConfigs } from '../AppConfigs';
import { Brand, Product, User } from '../types/Entities';
import { transformImageToFormData } from './utils';
import { parseResponseToProducts } from './parser';

export class APIProvider {
  static currentAddress = AppConfigs.APIAddress;

  static getColorsFromImage = async (image: ImagePickerResult): Promise<Array<string>> => {
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

  static addBrand = async (brand: Brand) => {}

  static updateBrand = async (brand: Brand) => {}

  static deleteBrand = async (brandId) => {}

  static getProductsByColor = async (color: string): Promise<Product[]> => {
    const colorParameter: string = `?compareToColor=${color}`;
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
    const brandIdParameter: string = brandId ? `?brandId=${brandId}` : '';
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

  static addProduct = async (product: Product) => {}
  static updateProduct = async (product: Product) => {}

  static deleteProduct = async (productId) => {}

  static addUser = async (user: User) => {}

  static getUser = async (userEmail: string): Promise<User> => {
    return {email: userEmail} as User;
  }

  static updateUser = async (user: User) => {
  }
}
