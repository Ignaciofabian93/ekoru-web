import PageWrapper from "@/app/(home)/_components/pageWrapper";

// This page is for displaying the results of browsing a specific department.
export default function BrowseDepartmentResultsPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">Departamentos, seleccionado</h1>
        <p className="text-gray-600">This is where the browse results will be displayed.</p>
      </div>
    </PageWrapper>
  );
}
