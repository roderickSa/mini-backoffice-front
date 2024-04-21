import { useEffect } from "react";
import useDashboard from "./dashboard/useDashboard";
import { MetaProductType } from "../_types/product";

/* TODO: CHANGE NAME OF PAGINATION TYPES */
export default function Pagination({
  metaProducts,
  paginationCall,
}: {
  metaProducts: MetaProductType | null;
  paginationCall: (url_page?: string) => void;
}) {
  const { handleSetUrlPagePagination } = useDashboard();

  useEffect(() => {
    if (metaProducts?.current_page) {
      handleSetUrlPagePagination(metaProducts.current_page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaProducts?.current_page]);

  if (!metaProducts || metaProducts?.last_page === 1) {
    return;
  }

  return (
    <nav
      aria-label="Page navigation"
      className="flex items-center justify-center m-2.5"
    >
      <ul className="inline-flex -space-x-px text-sm">
        {metaProducts.links.map((link, index) => (
          <li key={link.label}>
            <a
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-white border border-gray-300 hover:bg-gray-100  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                link.active
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              } ${
                index === 0
                  ? "rounded-s-lg"
                  : index === metaProducts.links.length - 1
                  ? "rounded-e-lg"
                  : ""
              } ${!link.url ? "hidden" : ""}`}
              onClick={() => paginationCall(link.url)}
            >
              <p dangerouslySetInnerHTML={{ __html: link.label }} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
