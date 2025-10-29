export type TParamsLogin = {
  email: string;
  password: string;
};

export type PostType = {
  _id: string;
  user: string;
  title: string;
  content: string;
  picture?: string;
  likes: LikeType[];
  likesCount: number;
  comments?: CommentType[];
};

export interface PostCreate {
  user: string;
  title: string;
  content: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type LikeType = {
  _id: string;
  user: string;
  post: string;
};

export type Like = {
  user: string;
  post: string;
};

export type CommentType = {
  _id: string;
  user: User;
  post: string;
  content: string;
};

export type Comment = {
  user: string;
  post: string;
  content: string;
};

export type AttributeType = {
  _id: string;
  name: string;
  type: string;
  slug?: string;
  options?: { label: string; value: string }[];
  isFilterable: boolean;
  isVisible: boolean;
};
export type Attribute = {
  name: string;
  type: string;
  slug?: string;
  options?: { label: string; value: string }[];
  isFilterable: boolean;
  isVisible: boolean;
};
export type AttributeEnum = "string" | "number" | "boolean" | "enum";
export type AttributeOption = {
  _id: string;
  name: string;
  type: AttributeEnum;
  options?: { label: string; value: string }[];
};

// /types/product.ts
export interface ProductAttributeValue {
  attribute: string; // Attribute._id
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
}

export interface ProductVariant {
  _id?: string;
  sku: string;
  attributes: ProductAttributeValue[];
  price: number;
  stock: number;
  images?: string[];
}
export type ProductType = {
  _id: string;
  name: string;
  description: string;
  images: string[] | undefined;
  price: number;
  category: string;
  stock: number;
  attributes: ProductAttributeValue[];
  variants: ProductVariant[];
};

export type Product = {
  name: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  stock: number;
  attributes: ProductAttributeValue[];
  variants: ProductVariant[];
};

export type CategoryType = {
  _id: string;
  name: string;
  description: string;
};
export type Category = {
  name: string;
  description: string;
};

export type CartItem = {
  product: string; // tham chiếu tới Product
  name: string; // tên lúc mua (tránh thay đổi khi product update)
  quantity: number;
  price: number;
  image: string;
};
export interface PaymentMethod {
  method: "paypal" | "stripe" | "momo" | "cod";
  status: "pending" | "paid" | "failed" | "refunded";
  transactionId?: string;
  paidAt?: Date;
  amount: number;
  currency?: string;
  rawResponse?: unknown; // optional log raw API response
}
export interface PaymentMethodType {
  _id: string;
  method: "paypal" | "stripe" | "momo" | "cod";
  status: "pending" | "paid" | "failed" | "refunded";
  transactionId?: string;
  paidAt?: Date;
  amount: number;
  currency?: string;
  rawResponse?: unknown; // optional log raw API response
}
export interface DeliveryMethod {
  method: "ghn" | "ghtk" | "vnpost" | "grab" | "manual";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  shippingFee: number;
}
export interface DeliveryMethodType {
  _id: string;
  method: "ghn" | "ghtk" | "vnpost" | "grab" | "manual";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  shippingFee: number;
}
export type OrderItem = {
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
export type IOPTION = {
  label: string;
  value: string | number;
};
export type AddressType = {
  _id: string;
  name: string; // Họ và tên người nhận
  phone: string; // Số điện thoại
  country: string; // Quốc gia (VD: "Vietnam")
  province: IOPTION | null; // Tỉnh / Thành phố
  district: IOPTION | null; // Quận / Huyện
  ward?: IOPTION | null; // Phường / Xã
  email?: string; // (Tùy chọn) email người nhận
  postalCode?: string; // Mã bưu điện (tùy chọn)
  company?: string; // Công ty (nếu có)
  note?: string; // Ghi chú giao hàng

  isDefault?: boolean; // Đặt làm địa chỉ mặc định
};

export type Address = {
  name: string; // Họ và tên người nhận
  phone: string; // Số điện thoại
  country: string; // Quốc gia (VD: "Vietnam")
  province: IOPTION | null; // Tỉnh / Thành phố
  district: IOPTION | null; // Quận / Huyện
  ward?: IOPTION | null; // Phường / Xã
  email?: string; // (Tùy chọn) email người nhận
  postalCode?: string; // Mã bưu điện (tùy chọn)
  company?: string; // Công ty (nếu có)
  note?: string; // Ghi chú giao hàng

  isDefault?: boolean; // Đặt làm địa chỉ mặc định
};
