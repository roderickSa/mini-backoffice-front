import { HttpErrorResponse, HttpItemProductResponse } from "@/app/_types";
import { axiosFormClient } from "@/app/_utils/axiosClient";
import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";
import { ProductUploadImageType } from "@/app/_types/product";
import CarouselImagesProduct from "./carouselImagesProduct";

const MAX_NUMBER_UPLOAD_IMAGES = 3;

export default function UploadProductImage() {
  const { token } = useDashboard();
  const { updateProduct, currentProduct, setCurrentProduct } =
    useProductStore();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imagesFile, setImagesFile] = useState<Array<File>>([]);
  const [images, setImages] = useState<Array<ProductUploadImageType>>([]);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickInputImage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputImageRef.current && inputImageRef.current.click();
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagesFile([]);
      setImages([]);
      setErrorMessage("");

      if (event.target.files.length > MAX_NUMBER_UPLOAD_IMAGES) {
        setErrorMessage("Max number of images " + MAX_NUMBER_UPLOAD_IMAGES);
        return;
      }

      Array.from(event.target.files).forEach((file) => {
        setImagesFile((previousImageFiles) => [...previousImageFiles, file]);
        setImages((previousImages) => [
          ...previousImages,
          { url: URL.createObjectURL(file) },
        ]);
      });
    }
  };

  const saveProductImages = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    if (!imagesFile || !currentProduct?.id) return;

    const formImages = new FormData();
    formImages.append("product_id", currentProduct.id.toString());
    for (const imageFile of imagesFile) {
      formImages.append("images[]", imageFile);
    }

    setLoading(true);

    try {
      const response = await axiosFormClient(
        token
      ).post<HttpItemProductResponse>("/product/upload/image", formImages, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = response;

      updateProduct(data.data);
      setCurrentProduct(data.data);
      setImagesFile([]);
      setImages([]);
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

  /* TODO: make carousel image component(we need to refresh carrousel images) */
  return (
    <>
      <p>Subir Imagenes</p>
      <CarouselImagesProduct images={images} />
      <div className="flex justify-around w-full mt-10">
        <button
          className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
          onClick={handleClickInputImage}
        >
          Seleccione Imagen
        </button>
        <input
          type="file"
          multiple
          className="hidden"
          ref={inputImageRef}
          onChange={onImageChange}
        />
        {loading && <span>procesando...</span>}
        {imagesFile.length > 0 && (
          <form onSubmit={saveProductImages}>
            <input
              type="submit"
              className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
              disabled={loading}
              value={`Subir ${imagesFile.length === 1 ? "imagen" : "imagenes"}`}
            />
          </form>
        )}
      </div>
      <p
        className={`text-sm mt-2 px-2 text-red-600 ${
          errorMessage.trim().length > 0 ? "" : "hidden"
        }`}
      >
        {errorMessage}
      </p>
    </>
  );
}
