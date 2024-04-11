import { PayloadProductType } from "../_types/product";

const handleProductFormValidation = (
  product: PayloadProductType
): [boolean, string] => {
  if (product.name.trim().length === 0) {
    return [false, "enter a name"];
  }

  if (product.stock < 0) {
    return [false, "stock can't be negative"];
  }

  if (product.price < 0) {
    return [false, "price can't be negative"];
  }

  return [true, ""];
};

export { handleProductFormValidation };
