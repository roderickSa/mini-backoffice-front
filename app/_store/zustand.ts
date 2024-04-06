import { create } from "zustand";
import { CategoryType } from "../_types";

type CategoryStore = {
  categories: CategoryType[];
  setCategories: (data: CategoryType[]) => void;
  updateCategory: (data: CategoryType) => void;
  stateModal: boolean;
  setOpenModal: () => void;
  setCloseModal: () => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (data: CategoryType[]) => set({ categories: data }),
  updateCategory: (data: CategoryType) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === data.id ? { ...data } : category
      ),
    })),
  stateModal: false,
  setOpenModal: () => set((state) => ({ stateModal: true })),
  setCloseModal: () => set((state) => ({ stateModal: false })),
}));
