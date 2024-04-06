import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import useCategory from "./useCategory";
import { useCategoryStore } from "@/app/_store/zustand";
import { axioxFrontClient } from "@/app/_utils/axiosClient";
import updateCategoryAction from "@/app/_api/updateCategoryAction";
import { CategoryType, HttpItemCategoryResponse } from "@/app/_types";

interface UpdateCategoryResponseType {
  error: {
    status: number;
    message: string;
  };
  data: any | CategoryType;
}

const initialState: UpdateCategoryResponseType = {
  error: { status: 400, message: "" },
  data: null,
};

export default function EditCategoryModal() {
  const [formState, formAction] = useFormState(
    updateCategoryAction,
    initialState
  );
  const { updateCategory } = useCategoryStore();
  const [category, setCategory] = useState<CategoryType>();
  const { handleCloseEditCategory, getUrlParam } = useCategory();
  const category_id = getUrlParam("category_id");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axioxFrontClient.get<HttpItemCategoryResponse>(
          "/category/" + category_id
        );
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    category_id && getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category_id]);

  useEffect(() => {
    if (formState.data?.id) {
      updateCategory(formState.data);
      handleCloseEditCategory();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  if (!category) {
    return <></>;
  }

  return (
    <form
      action={formAction}
      className="py-12 transition duration-150 ease-in-out z-20 absolute top-0 right-0 bottom-0 left-0 bg-gray-600 bg-opacity-75"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Edit Category
          </h1>
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Name
          </label>
          <input type="hidden" name="id" value={category.id} />
          <input
            id="name"
            name="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Category Name"
            value={category?.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCategory({ ...category, name: event?.target.value })
            }
          />
          <p
            className={`text-sm mt-2 px-2 text-red-600 ${
              formState?.error?.message ? "" : "hidden"
            }`}
          >
            {formState?.error?.message}
          </p>
          <div className="flex items-center justify-evenly w-full">
            <button
              type="submit"
              disabled={!category.id}
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
            >
              Actualizar
            </button>
            <button
              className="border px-4 py-2 rounded-lg shadow ring-1 ring-inset"
              onClick={handleCloseEditCategory}
            >
              Cancel
            </button>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={handleCloseEditCategory}
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
