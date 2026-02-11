import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-foreground/50">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.href ? (
            <Link
              href={item.href}
              className="transition hover:text-foreground/80"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
