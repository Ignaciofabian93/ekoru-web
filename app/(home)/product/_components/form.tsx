"use client";
import Select from "@/components/select/select";
import TextInput from "@/components/textInput/input";
import useProduct from "../_hooks/useProduct";

export default function ProductForm() {
  const {
    departments,
    department,
    selectDepartment,
    departmentCategories,
    departmentCategory,
    selectDepartmentCategory,
  } = useProduct();

  return (
    <div className="w-full h-full flex flex-col items-center px-4 py-2">
      <form className="w-full">
        <Select
          name="department"
          value={department.id}
          options={departments.map((d) => ({ label: d.department, value: d.id }))}
          onChange={selectDepartment}
          labelText="Departamento"
          hasLabel
        />
        <Select
          name="departmentCategory"
          value={departmentCategory.id}
          options={departmentCategories.map((d) => ({ label: d.departmentCategory, value: d.id }))}
          onChange={selectDepartmentCategory}
          labelText="Categoría"
          hasLabel
        />
        <Select
          name="productCategory"
          value={departmentCategory.id}
          options={departmentCategories.map((d) => ({ label: d.departmentCategory, value: d.id }))}
          onChange={selectDepartmentCategory}
          labelText="Categoría"
          hasLabel
        />
        <TextInput name="product" placeholder="Nombre del producto" hasLabel labelText="Producto" />
        <TextInput
          name="price"
          placeholder="precio"
          hasLabel
          labelText="Precio"
          infoIcon
          infoText="Ingresa el precio sin puntos ni signos"
        />
        <TextInput name="description" placeholder="Descripción" hasLabel labelText="Descripción" />
      </form>
    </div>
  );
}
