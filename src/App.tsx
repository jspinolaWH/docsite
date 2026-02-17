import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocsContext } from './hooks/useDocs';
import { useDocsProvider } from './hooks/useDocs';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { SearchResultsPage } from './pages/SearchResultsPage';

export default function App() {
  const docsCtx = useDocsProvider();
  const themeCtx = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeCtx}>
      <DocsContext.Provider value={docsCtx}>
        <BrowserRouter basename="/docsite">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/doc/:slug" element={<DocPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DocsContext.Provider>
    </ThemeContext.Provider>
  );
}
