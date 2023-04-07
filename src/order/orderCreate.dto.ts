export interface orderCreateDTO {
  userId: string;
  cartId: string;
  paymentData?: string;
  deliveryData?: string;
  comments?: string;
  total: number;
}
