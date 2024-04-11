import { ChangeEvent, FormEvent, useState } from "react";
import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import productStatuses from "@/app/_utils/productStatuses";
import { HttpErrorResponse, HttpItemProductResponse } from "@/app/_types";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import { PayloadProductType } from "@/app/_types/product";
import { handleProductFormValidation } from "@/app/_utils/validations";

export default function CreateProductModal() {
  const { token, handleCloseCreateModel } = useDashboard();
  const { categories, setCloseCreateModal, addProduct } = useProductStore();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [product, setProduct] = useState<PayloadProductType>({
    name: "",
    description: "",
    category_id: categories[0].id,
    stock: 0,
    price: 0.0,
    status: productStatuses[0].value,
  });

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
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
      ).post<HttpItemProductResponse>("/product", payload);
      const { data } = response;

      addProduct(data.data);
      handleCloseCreateModal();
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

  const handleCloseCreateModal = () => {
    handleCloseCreateModel();
    setCloseCreateModal();
  };

  return (
    <form
      onSubmit={handleCreateProduct}
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
            value={product?.description}
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
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
            >
              Crear
            </button>
            <button
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
              onClick={handleCloseCreateModal}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={handleCloseCreateModal}
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
