export default function ProductsSkeleton() {
  return (
    <div className="w-full flex overflow-x-auto gap-x-4 pb-4 scrollbar-thin scrollbar-thumb-green-200">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="min-w-[180px] max-w-[180px] h-[350px] bg-gray-200 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}
