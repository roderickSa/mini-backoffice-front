import { useCategoryStore } from "@/app/_store/zustand";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useCategory() {
  const { setOpenModal, setCloseModal } = useCategoryStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStartEditCategory = (category_id: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("action", "edit");
    params.set("category_id", category_id.toString());

    replace(`${pathname}?${params.toString()}`);
    setOpenModal();
  };

  const handleCloseEditCategory = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("action");
    params.delete("category_id");

    replace(pathname);
    setCloseModal();
  };

  const getUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams);

    return params.get(key);
  };

  return {
    handleStartEditCategory,
    handleCloseEditCategory,
    getUrlParam,
  };
}
