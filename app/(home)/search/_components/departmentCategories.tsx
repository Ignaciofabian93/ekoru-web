"use client";
import useSearch from "@/app/(home)/search/_hooks/useSearch";

export default function DepartmentCategoryResults() {
  const { departmentCategories, handleDepartmentCategorySelect } = useSearch();
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Department Categories</h2>
      {departmentCategories.length ? (
        <ul className="space-y-2">
          {departmentCategories.map((category) => (
            <li
              key={category.id}
              className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDepartmentCategorySelect(category)}
            >
              <h3 className="text-lg font-semibold">{category.departmentCategoryName}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No department categories found.</p>
      )}
    </section>
  );
}
