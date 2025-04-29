interface IProduct {
  productName: string;
  price: number;
}
interface IPromocode {
  code: string;
  discount: number;
}

type PromocodeList = IPromocode[];

export { IProduct, IPromocode, PromocodeList };
