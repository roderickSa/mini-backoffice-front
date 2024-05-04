import { useEffect, useState } from "react";
import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import { HttpErrorResponse, HttpItemProductResponse } from "@/app/_types";
import UploadProductImage from "./uploadProductImage";
import CarouselImagesProduct from "./carouselImagesProduct";

const BASE_URL_IMAGES =
  "https://res.cloudinary.com/dmys2afnl/image/upload/v1713631351/";

export default function ImagesProductModal() {
  const { token, getUrlParam, handleCloseImagesModel } = useDashboard();
  const {
    setCloseImagesModal,
    updateProduct,
    currentProduct,
    setCurrentProduct,
  } = useProductStore();
  const product_id = getUrlParam("product_id");
  /* TODO: send this to the store because we are gonna need it when upload images */
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axioxFrontClient(
          token
        ).get<HttpItemProductResponse>("/product/" + product_id);
        setCurrentProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    product_id && getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, token]);

  const handleRemoveImage = async (image_id: number, product_id: number) => {
    if (!confirm("confirme para eliminar esta imagen") || loading) {
      return;
    }

    setLoading(true);
    const payload = { images_ids: [image_id], product_id: product_id };
    try {
      const response = await axioxFrontClient(
        token
      ).post<HttpItemProductResponse>("/product/delete/image", payload);
      const { data } = response;

      updateProduct(data.data);
      setCurrentProduct(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      /* TODO: make error all the same fuck please */
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
    handleCloseImagesModel();
    setCloseImagesModal();
  };

  if (!currentProduct) {
    return <></>;
  }

  return (
    <div className="transition duration-150 ease-in-out z-20 absolute top-0 right-0 bottom-0 left-0 bg-gray-600 bg-opacity-75">
      <div
        role="alert"
        className="container mx-auto flex items-center justify-center py-4 h-screen"
      >
        <div className="relative h-full overflow-auto py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Product Images
          </h1>
          <input type="hidden" name="id" value={currentProduct.id} />
          {currentProduct.images.length > 0 && (
            <>
              <p>Mis Imagenes</p>
              <CarouselImagesProduct
                images={currentProduct.images.map((image) => ({
                  id: image.id,
                  url: BASE_URL_IMAGES + image.url,
                }))}
                hasDeleteImage={true}
                handleRemoveImage={handleRemoveImage}
                productId={currentProduct.id}
              />
            </>
          )}
          <p
            className={`text-sm mt-2 px-2 text-red-600 ${
              errorMessage.trim().length > 0 ? "" : "hidden"
            }`}
          >
            {errorMessage}
          </p>
          <UploadProductImage />
          <div className="flex items-center justify-evenly w-full mt-10">
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
    </div>
  );
}
