import { create } from "zustand";
import { CategoryType, ProductType } from "../_types";

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

type ProductStore = {
  categories: CategoryType[];
  setCategories: (data: CategoryType[]) => void;
  products: ProductType[];
  setProducts: (data: ProductType[]) => void;
  addProduct: (data: ProductType) => void;
  updateProduct: (data: ProductType) => void;
  stateCreateModal: boolean;
  setOpenCreateModal: () => void;
  setCloseCreateModal: () => void;
  stateEditModal: boolean;
  setOpenEditModal: () => void;
  setCloseEditModal: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  categories: [],
  setCategories: (data: CategoryType[]) => set({ categories: data }),
  products: [],
  setProducts: (data: ProductType[]) => set({ products: data }),
  addProduct: (data: ProductType) =>
    set((state) => ({
      products: [...state.products, data],
    })),
  updateProduct: (data: ProductType) =>
    set((state) => ({
      products: state.products.map((Product) =>
        Product.id === data.id ? { ...data } : Product
      ),
    })),
  stateCreateModal: false,
  setOpenCreateModal: () => set((state) => ({ stateCreateModal: true })),
  setCloseCreateModal: () => set((state) => ({ stateCreateModal: false })),
  stateEditModal: false,
  setOpenEditModal: () => set((state) => ({ stateEditModal: true })),
  setCloseEditModal: () => set((state) => ({ stateEditModal: false })),
}));
