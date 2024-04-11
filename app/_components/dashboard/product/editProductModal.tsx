import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import {
  HttpErrorResponse,
  HttpItemProductResponse,
  ProductType,
} from "@/app/_types";
import productStatuses from "@/app/_utils/productStatuses";
import { PayloadProductType } from "@/app/_types/product";
import { handleProductFormValidation } from "@/app/_utils/validations";

export default function EditProductModal() {
  const { token, getUrlParam, handleCloseEditModel } = useDashboard();
  const { setCloseEditModal, categories, updateProduct } = useProductStore();
  const product_id = getUrlParam("product_id");
  const [product, setProduct] = useState<ProductType>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axioxFrontClient(
          token
        ).get<HttpItemProductResponse>("/product/" + product_id);
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    product_id && getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  const handleEditProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!product) return;

    const [validationResponse, errorMessageResponse] =
      handleProductFormValidation(product);
    if (!validationResponse) {
      setErrorMessage(errorMessageResponse);
      return;
    }

    const payload: PayloadProductType = product;
    try {
      const response = await axioxFrontClient(
        token
      ).patch<HttpItemProductResponse>("/product/" + product.id, payload);
      const { data } = response;

      updateProduct(data.data);
      handleCloseEditModal();
      return;
    } catch (error) {
      if (
        (error as HttpErrorResponse).response?.status === 401 ||
        ["Unauthenticated", "Unauthorized"].includes(
          (error as HttpErrorResponse).response?.data.data.errors[0].message
        )
      ) {
        const message = (error as HttpErrorResponse).response?.data.data
          .errors[0].message;

        setErrorMessage(message);
        return;
      }

      console.log("unidentified error");
    }
  };

  const handleCloseEditModal = () => {
    handleCloseEditModel("product");
    setCloseEditModal();
  };

  const handleSetFormValues = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (product) {
      const name = event.target.name;
      let value: any = event.target.value;

      if (["status", "category_id", "stock"].includes(name)) {
        value = parseInt(event.target.value);
      }

      if (["price"].includes(name)) {
        value = parseFloat(Number(event.target.value).toFixed(2));
      }

      setProduct({ ...product, [name]: value });
    }
  };

  if (!product) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleEditProduct}
      className="py-12 transition duration-150 ease-in-out z-20 absolute top-0 right-0 bottom-0 left-0 bg-gray-600 bg-opacity-75"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Edit Product
          </h1>
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Name
          </label>
          <input type="hidden" name="id" value={product.id} />
          <input
            id="name"
            name="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Product Name"
            value={product.name}
            onChange={handleSetFormValues}
          />
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-20 flex items-center pl-3 text-sm border-gray-300 rounded border resize-none"
            placeholder="Description"
            value={product.description}
            onChange={handleSetFormValues}
          />
          <label
            htmlFor="stock"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Stock"
            value={product.stock}
            onChange={handleSetFormValues}
          />
          <label
            htmlFor="price"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Price"
            value={product.price}
            onChange={handleSetFormValues}
          />
          <label
            htmlFor="status"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            defaultValue={product.status}
            onChange={handleSetFormValues}
          >
            {productStatuses.map(({ name, value }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
          <label
            htmlFor="category_id"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Category
          </label>
          <select
            name="category_id"
            id="category_id"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            defaultValue={product.category_id}
            onChange={handleSetFormValues}
          >
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <p
            className={`text-sm mt-2 px-2 text-red-600 ${
              errorMessage.trim().length > 0 ? "" : "hidden"
            }`}
          >
            {errorMessage}
          </p>
          <div className="flex items-center justify-evenly w-full">
            <button
              type="submit"
              disabled={!product.id}
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
            >
              Actualizar
            </button>
            <button
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
              onClick={handleCloseEditModal}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={handleCloseEditModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
