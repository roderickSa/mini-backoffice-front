import useDashboard from "../useDashboard";
import { useProductStore } from "@/app/_store/zustand";

export default function ProductTable() {
  const { handleStartEditModel } = useDashboard();
  const { products, setOpenEditModal } = useProductStore();

  const handleEditProduct = (product_id: number) => {
    handleStartEditModel(product_id, "product");
    setOpenEditModal();
  };

  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              name
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              description
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              stock
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              price
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              status
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              category
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              created_at
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              updated_at
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              action
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
                  {product.name}
                </p>
              </div>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600 max-h-8 overflow-ellipsis overflow-hidden">
                {product.description}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                {product.stock}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                S/{product.price}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                {product.status}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                {product.category_name}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                {product.created_at}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased text-xs font-medium text-blue-gray-600">
                {product.updated_at}
              </p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
                  <button
                    className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
