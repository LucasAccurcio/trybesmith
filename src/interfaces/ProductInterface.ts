export interface BaseProduct {
  name: string;
  amount: string;
  orderId: number;
}

export interface Product extends BaseProduct {
  id: number;
}