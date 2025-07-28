"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export type Crumb = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const router = useRouter();

  if (!items || items.length === 0) {
    return <nav aria-label="Breadcrumb" className="w-full h-[36px] px-4 py-2" />;
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 py-3">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item.href ? (
              <button
                type="button"
                className="hover:underline text-primary font-medium"
                onClick={() => router.push(item.href!)}
              >
                {item.label}
              </button>
            ) : (
              <span className="font-semibold text-gray-700">{item.label}</span>
            )}
            {idx < items.length - 1 && <ChevronRight size={16} className="mx-2 text-gray-400" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
