export type Status = "pending" | "shipping" | "completed" | "cancelled";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: Status;
}