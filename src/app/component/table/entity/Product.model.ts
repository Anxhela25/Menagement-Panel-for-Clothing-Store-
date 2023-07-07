export interface ProductsModel {
  id?: any;
  name: string;
  category: string;
  size: string;
  price: number;
  gender: string;
  discount: string | number;
  availability: string;
  active?: boolean; // Make the 'active' property optional
}
