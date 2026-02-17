import { useTheme } from '../hooks/useTheme';
import { CATEGORIES } from '../types';

export function CategoryBadge({ category }: { category: string }) {
  const { theme } = useTheme();
  const config = CATEGORIES[category];
  if (!config) return <span className="badge">{category}</span>;

  const color = theme === 'dark' ? config.darkColor : config.color;
  const bgColor = theme === 'dark' ? config.darkBgColor : config.bgColor;
  const borderColor =
    theme === 'dark' ? config.darkBorderColor : config.borderColor;

  return (
    <span
      className="badge"
      style={{
        color,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {config.label}
    </span>
  );
}
