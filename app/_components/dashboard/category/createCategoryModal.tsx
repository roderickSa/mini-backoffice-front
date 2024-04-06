import { ChangeEvent, FormEvent, useState } from "react";
import useDashboard from "../useDashboard";
import useCategory from "./useCategory";
import { useCategoryStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import { HttpErrorResponse, HttpItemCategoryResponse } from "@/app/_types";

function CreateCategoryModal() {
  const { token } = useDashboard();
  const { addCategory } = useCategoryStore();
  const [categoryName, setCategoryName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { handleCloseCreateCategory } = useCategory();

  const handleCreateCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (categoryName.trim() === "") return;

    const payload = {
      name: categoryName,
    };
    try {
      const response = await axioxFrontClient(
        token
      ).post<HttpItemCategoryResponse>("/category", payload);
      const { data } = response;

      addCategory(data.data);
      handleCloseCreateCategory();
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

  return (
    <form
      onSubmit={handleCreateCategory}
      className="py-12 transition duration-150 ease-in-out z-20 absolute top-0 right-0 bottom-0 left-0 bg-gray-600 bg-opacity-75"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Enter New Category
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
            placeholder="Category Name"
            value={categoryName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCategoryName(event?.target.value)
            }
          />
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
              Actualizar
            </button>
            <button
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
              onClick={handleCloseCreateCategory}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={handleCloseCreateCategory}
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

export default CreateCategoryModal;
