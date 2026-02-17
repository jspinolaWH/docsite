import { HashRouter, Routes, Route } from 'react-router-dom';
import { DocsContext } from './hooks/useDocs';
import { useDocsProvider } from './hooks/useDocs';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { SearchResultsPage } from './pages/SearchResultsPage';

export default function App() {
  const docsCtx = useDocsProvider();

  return (
    <DocsContext.Provider value={docsCtx}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/doc/:slug" element={<DocPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DocsContext.Provider>
  );
}
