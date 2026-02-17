import { Link } from 'react-router-dom';
import { CATEGORIES } from '../types';

interface BreadCrumbProps {
  category?: string;
  title?: string;
}

export function BreadCrumb({ category, title }: BreadCrumbProps) {
  const catConfig = category ? CATEGORIES[category] : undefined;

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      {catConfig && (
        <>
          <span className="breadcrumb-sep">/</span>
          <span style={{ color: catConfig.color }}>{catConfig.label}</span>
        </>
      )}
      {title && (
        <>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{title}</span>
        </>
      )}
    </nav>
  );
}
