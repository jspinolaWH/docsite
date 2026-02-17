import { CATEGORIES } from '../types';

export function CategoryBadge({ category }: { category: string }) {
  const config = CATEGORIES[category];
  if (!config) return <span className="badge">{category}</span>;

  return (
    <span
      className="badge"
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {config.label}
    </span>
  );
}
