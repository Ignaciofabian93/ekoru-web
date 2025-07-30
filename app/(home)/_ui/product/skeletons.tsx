export const BreadCrumbSkeleton = ({ isStore }: { isStore: boolean }) => {
  if (isStore) {
    return (
      <div className="text-sm text-gray-500 mb-4 flex gap-2 flex-wrap">
        <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  } else {
    return (
      <div className="text-sm text-gray-500 mb-4 flex gap-2 flex-wrap">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        <span>&gt;</span>
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        <span>&gt;</span>
        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
        <span>&gt;</span>
        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }
};

export const ProductImagesSkeleton = () => {
  return (
    <div className="flex-1">
      <div className="relative">
        <div className="w-full h-96 rounded-lg bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export const ProductInfoSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
      </h1>

      {/* Price and Offer */}
      <div className="flex items-center gap-4">
        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Buy Buttons */}
      <div className="flex gap-4">
        <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Seller Info */}
      <div className="text-sm text-gray-700">
        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap mt-4">
        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
