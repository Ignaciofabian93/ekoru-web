"use client";
import { useState } from "react";
import { PRODUCT_COLORS } from "@/constants/colors";
import { motion } from "framer-motion";
import Select from "@/components/select/select";
import TextInput from "@/components/textInput/input";
import useProduct from "../_hooks/useProduct";
import Button from "@/components/buttons/button";
import ImageUploader from "./imageUploader";
import BadgeSelector from "@/components/badges/badgeSelector";
import CheckBox from "@/components/checkbox/checkbox";
import Modal from "@/components/modal/modal";
import ProductCard from "@/components/cards/productCard";

export default function ProductForm() {
  const [previewProduct, setPreviewProduct] = useState<boolean>(false);
  const {
    departments,
    department,
    selectDepartment,
    departmentCategories,
    departmentCategory,
    selectDepartmentCategory,
    productCategories,
    productCategory,
    selectProductCategory,
    handleProduct,
    product,
    handleImageUpload,
    handleSubmit,
    ProductLoading,
    handleBadges,
    data,
    handleImageRemove,
    handleInterests,
    productImpactCalculation,
    totalWasteSavings,
  } = useProduct();

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form className="w-full h-full space-y-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Publicar producto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              name="department"
              value={department.id}
              options={departments.map((d) => ({ label: d.departmentName, value: d.id }))}
              onChange={selectDepartment}
              labelText="Departamento"
              hasLabel
            />
            <Select
              name="departmentCategory"
              value={departmentCategory.id}
              options={departmentCategories.map((d) => ({ label: d.departmentCategoryName, value: d.id }))}
              onChange={selectDepartmentCategory}
              labelText="Categoría"
              hasLabel
              disabled={!department.id}
            />
            <Select
              name="productCategory"
              value={productCategory.id}
              options={productCategories.map((d) => ({ label: d.productCategoryName, value: d.id }))}
              onChange={selectProductCategory}
              labelText="Tipo de producto"
              hasLabel
              disabled={!departmentCategory.id}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              name="brand"
              placeholder="Marca del producto"
              hasLabel
              labelText="Marca"
              value={product.brand}
              onChange={handleProduct}
              disabled={!productCategory.id}
            />
            <TextInput
              name="name"
              placeholder="Producto"
              hasLabel
              labelText="Nombre del producto"
              value={product.name}
              onChange={handleProduct}
              disabled={!product.brand}
            />
            <TextInput
              name="price"
              placeholder="Precio"
              hasLabel
              labelText="Precio"
              infoIcon
              infoText="Ingresa el precio sin puntos ni signos"
              value={product.price}
              onChange={handleProduct}
              disabled={!product.name}
            />
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between bg-lime-50 rounded-lg p-4">
            <CheckBox
              id="hasOffer"
              name="hasOffer"
              checked={product.hasOffer}
              label="Oferta"
              onChange={handleProduct}
            />
            <CheckBox
              id="isExchangeable"
              name="isExchangeable"
              checked={product.isExchangeable}
              label="Intercambiable"
              onChange={handleProduct}
            />
            <CheckBox
              id="isActive"
              name="isActive"
              checked={product.isActive}
              label="Publicar"
              onChange={handleProduct}
            />
          </div>
          {product.isExchangeable && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="font-semibold text-sm mb-1 block">Intereses de intercambio (al menos 3)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((idx) => (
                  <TextInput
                    key={idx}
                    name={`interest-${idx}`}
                    placeholder={`Producto de interés #${idx + 1}`}
                    value={product.interests[idx] || ""}
                    onChange={(e) => handleInterests(idx, e)}
                    required
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              name="offerPrice"
              placeholder="Precio de oferta"
              hasLabel
              labelText="Precio de oferta (opcional)"
              infoIcon
              infoText="Al ingresar precio oferta este será el precio principal mientras se muestra el precio original tachado"
              value={product.offerPrice}
              onChange={handleProduct}
              disabled={!product.hasOffer}
            />
            <TextInput
              type="number"
              name="stock"
              placeholder="Unidades"
              hasLabel
              labelText="Unidades"
              value={product.stock}
              onChange={handleProduct}
              disabled={!product.name}
            />
            <Select
              name="color"
              value={product.color}
              options={PRODUCT_COLORS.map((c) => ({
                label: c.name,
                value: c.value,
                iconColor: c.value,
              }))}
              onChange={(value) =>
                handleProduct({
                  target: { name: "color", value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              labelText="Color del producto"
              hasLabel
              isRenderingColorIcon
            />
          </div>
          {data.isCompany && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="sku"
                placeholder="SKU"
                hasLabel
                labelText="SKU (opcional)"
                value={product.sku || ""}
                onChange={handleProduct}
                disabled={!product.name}
              />
              <TextInput
                name="barcode"
                placeholder="Código de barras"
                hasLabel
                labelText="Código de barras (opcional)"
                value={product.barcode || ""}
                onChange={handleProduct}
                disabled={!product.name}
              />
            </div>
          )}
          <div>
            <TextInput
              name="description"
              placeholder="Descripción"
              hasLabel
              labelText="Descripción"
              value={product.description}
              onChange={handleProduct}
              disabled={!product.name}
              className="min-h-[80px]"
            />
          </div>
          <div>
            <p className="leading-relaxed font-semibold text-md mb-2">
              Selecciona hasta 3 etiquetas para resaltar tu producto
            </p>
            <BadgeSelector value={product.badges} onChange={handleBadges} isCompany={data.isCompany} />
          </div>
          <div>
            <p className="text-md font-semibold leading-relaxed mb-2">Sube imágenes de tu producto</p>
            <div className="w-full min-h-[180px] flex items-center justify-evenly gap-2 overflow-x-auto no-scrollbar bg-lime-50 rounded-lg p-4">
              <ImageUploader
                handleImage={handleImageUpload}
                image={product.images[0]}
                removeImage={handleImageRemove}
              />
              <ImageUploader
                handleImage={handleImageUpload}
                image={product.images[1]}
                removeImage={handleImageRemove}
              />
              <ImageUploader
                handleImage={handleImageUpload}
                image={product.images[2]}
                removeImage={handleImageRemove}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              text="Previsualizar producto"
              onClick={() => setPreviewProduct(true)}
              type="button"
              variant="secondary"
              isLoading={ProductLoading}
              className="w-1/2"
            />
            <Button
              text="Guardar producto"
              onClick={handleSubmit}
              type="submit"
              variant="primary"
              isLoading={ProductLoading}
              className="w-1/2"
            />
          </div>
        </form>
        <Modal
          title="Previsualización del producto"
          size="sm"
          isOpen={previewProduct}
          close={() => setPreviewProduct(false)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-sm leading-relaxed mb-2">*Así se verá tu producto en las búsquedas*</p>
            <ProductCard
              id={product.id}
              title={product.name}
              price={product.price}
              seller={data.name.split(" ")[0]}
              location={`${data.address}, ${data.county.county}`}
              images={product.images}
              sellerImage={data.profileImage}
              description={product.description}
              totalCo2Savings={productImpactCalculation.totalCo2Savings}
              totalWaterSavings={productImpactCalculation.totalWaterSavings}
              totalWasteSavings={totalWasteSavings}
              badges={product.badges}
              isButtonActivated={false}
              isFavoriteActivated={false}
              isSharedActivated={false}
              interests={product.interests}
              isExchangeable={product.isExchangeable}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}
