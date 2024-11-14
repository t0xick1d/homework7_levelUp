import { ComponentType } from '@angular/cdk/portal';

export interface Product {
  id: number;
  category: string;
  inStock: boolean;
  name: string;
  price: number;
}
export interface ConfigTable {
  titleColums: string;
  component: ComponentType<unknown>;
}
export interface newProduct {
  name: string;
  price: number;
  discount: number;
  sku: string;
  isActive: boolean;
  countryCode: string;
  itemUrl: string;
  tags: string[];
}

export interface DialogData {
  id: string;
}
export interface FilterOption {
  name: string;
  value: string;
}

export interface FilterConfig {
  label: string;
  name: string;
  type: 'checkbox' | 'select' | 'text';
  options?: FilterOption[];
}
