import useCategory from "./useCategory";
import { useCategoryStore } from "@/app/_store/zustand";

export default function CategoryTable({}: {}) {
  const { categories } = useCategoryStore();
  const { handleStartEditCategory } = useCategory();

  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              Name
            </p>
          </th>
          <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
            <p className="block antialiased text-[11px] font-medium uppercase text-blue-gray-400">
              Action
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
                  {category.name}
                </p>
              </div>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased text-sm leading-normal text-blue-gray-900 font-bold">
                  <button
                    className="middle none font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]"
                    onClick={() => handleStartEditCategory(category.id)}
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
