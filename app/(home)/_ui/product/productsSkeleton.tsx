export default function ProductsSkeleton() {
  return (
    <div className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[164px] max-w-[164px] h-[300px] bg-gray-200 animate-pulse rounded-2xl"
        />
      ))}
    </div>
  );
}
