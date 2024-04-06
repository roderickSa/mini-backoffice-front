import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/app/_store/zustand";

export default function useCategory() {
  const {
    setOpenCreateModal,
    setCloseCreateModal,
    setOpenEditModal,
    setCloseEditModal,
  } = useCategoryStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStartCreateCategory = () => {
    const params = new URLSearchParams(searchParams);

    params.set("action", "create");

    replace(`${pathname}?${params.toString()}`);
    setOpenCreateModal();
  };

  const handleCloseCreateCategory = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("action");

    replace(pathname);
    setCloseCreateModal();
  };

  const handleStartEditCategory = (category_id: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("action", "edit");
    params.set("category_id", category_id.toString());

    replace(`${pathname}?${params.toString()}`);
    setOpenEditModal();
  };

  const handleCloseEditCategory = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("action");
    params.delete("category_id");

    replace(pathname);
    setCloseEditModal();
  };

  const getUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams);

    return params.get(key);
  };

  return {
    handleStartCreateCategory,
    handleCloseCreateCategory,
    handleStartEditCategory,
    handleCloseEditCategory,
    getUrlParam,
  };
}
