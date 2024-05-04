import { useEffect } from "react";
import useDashboard from "../useDashboard";
import useProduct from "./useProduct";
import { useProductStore } from "@/app/_store/zustand";
import ProductTable from "./productTable";
import EditProductModal from "./editProductModal";
import CreateProductModal from "./createProductModal";
import Pagination from "../../pagination";
import ImagesProductModal from "./imagesProductModal";

export default function Product() {
  const { getUrlParam, handleStartCreateModel } = useDashboard();
  const { getProductsData } = useProduct();
  const {
    products,
    metaProducts,
    setOpenCreateModal,
    setOpenEditModal,
    setOpenImagesModal,
    stateCreateModal,
    stateEditModal,
    stateImagesModal,
  } = useProductStore();

  const action = getUrlParam("action");
  const product_id = getUrlParam("product_id");

  useEffect(() => {
    if (action) {
      if (action === "create") {
        setOpenCreateModal();
      }
      if (action === "edit" && product_id && !isNaN(parseInt(product_id))) {
        setOpenEditModal();
      }
      if (action === "images" && product_id && !isNaN(parseInt(product_id))) {
        setOpenImagesModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenCreateModal = () => {
    handleStartCreateModel();
    setOpenCreateModal();
  };

  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
          <div>
            <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
              Products
            </h6>
            <p className="antialiased text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                aria-hidden="true"
                className="h-4 w-4 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              <strong>{products.length}</strong> rows
            </p>
          </div>
          <div>
            <button
              className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-gray-600 to-gray-400 shadow-md shadow-gray-500/20 hover:shadow-lg hover:shadow-gray-500/40 active:opacity-[0.85]"
              onClick={handleOpenCreateModal}
            >
              Nuevo
            </button>
          </div>
        </div>
        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
          <ProductTable />
        </div>
        <Pagination
          metaProducts={metaProducts}
          paginationCall={getProductsData}
        />
      </div>
      {stateEditModal && <EditProductModal />}
      {stateImagesModal && <ImagesProductModal />}
      {stateCreateModal && <CreateProductModal />}
    </div>
  );
}
