import PageWrapper from "@/app/(home)/_components/pageWrapper";

export default function BrowseProductCategoryResultsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Categoria de productos, seleccionado</h1>
        <p className="text-gray-600">This is where the browse results will be displayed.</p>
      </div>
    </PageWrapper>
  );
}
