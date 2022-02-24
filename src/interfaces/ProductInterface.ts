export interface BaseProduct {
  name: string;
  amount: string;
}

export interface Product extends BaseProduct {
  id: number;
}

export interface ProductWithOrder extends Product {
  orderId: number;
}

export interface ProductId {
  id: number;
}