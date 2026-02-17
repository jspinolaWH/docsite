import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocs } from '../hooks/useDocs';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useDocs();
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchQuery(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (val.trim()) {
          navigate('/search');
        }
      }, 300);
    },
    [setSearchQuery, navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && searchQuery.trim()) {
        navigate('/search');
      }
    },
    [searchQuery, navigate]
  );

  return (
    <div className="search-bar">
      <svg
        className="search-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search docs..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
