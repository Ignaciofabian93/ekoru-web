export const DepartmentSkeleton = () => {
  return (
    <div className="min-w-[150px] min-h-[150px] rounded-full bg-gray-200 animate-pulse flex flex-col items-center justify-center shadow-inner" />
  );
};

export const CategorySectionSkeleton = () => {
  return (
    <section className="w-full min-h-[200px] h-full flex flex-col items-center justify-between pb-8 border-b border-gray-300">
      <div className="w-full h-[56px] bg-gray-200 rounded-lg mb-4 animate-pulse" />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-row gap-4 p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="min-w-[280px] max-w-[340px] h-[420px] rounded-2xl bg-gray-200 animate-pulse pb-3 flex flex-col"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
