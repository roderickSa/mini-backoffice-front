import { create } from "zustand";
import { CategoryType } from "../_types";

type CategoryStore = {
  categories: CategoryType[];
  setCategories: (data: CategoryType[]) => void;
  addCategory: (data: CategoryType) => void;
  updateCategory: (data: CategoryType) => void;
  stateCreateModal: boolean;
  setOpenCreateModal: () => void;
  setCloseCreateModal: () => void;
  stateEditModal: boolean;
  setOpenEditModal: () => void;
  setCloseEditModal: () => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (data: CategoryType[]) => set({ categories: data }),
  addCategory: (data: CategoryType) =>
    set((state) => ({
      categories: [...state.categories, data],
    })),
  updateCategory: (data: CategoryType) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === data.id ? { ...data } : category
      ),
    })),
  stateCreateModal: false,
  setOpenCreateModal: () => set((state) => ({ stateCreateModal: true })),
  setCloseCreateModal: () => set((state) => ({ stateCreateModal: false })),
  stateEditModal: false,
  setOpenEditModal: () => set((state) => ({ stateEditModal: true })),
  setCloseEditModal: () => set((state) => ({ stateEditModal: false })),
}));
