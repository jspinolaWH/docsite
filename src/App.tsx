import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocsContext } from './hooks/useDocs';
import { useDocsProvider } from './hooks/useDocs';
import { InvoicingDocsContext, useInvoicingDocsProvider } from './hooks/useInvoicingDocs';
import { ThemeContext, useThemeProvider } from './hooks/useTheme';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { EntityDiagramsPage } from './pages/EntityDiagramsPage';
import { FlowDiagramsPage } from './pages/FlowDiagramsPage';
import { LinearCyclesPage } from './pages/LinearCyclesPage';
import { LinearCycleDetailPage } from './pages/LinearCycleDetailPage';
import { TranscriptsPage } from './pages/TranscriptsPage';
import { RequirementsCompliancePage } from './pages/RequirementsCompliancePage';
import { InvoicingHomePage } from './pages/InvoicingHomePage';
import { InvoicingDocPage } from './pages/InvoicingDocPage';

export default function App() {
  const docsCtx = useDocsProvider();
  const invoicingDocsCtx = useInvoicingDocsProvider();
  const themeCtx = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeCtx}>
      <DocsContext.Provider value={docsCtx}>
        <InvoicingDocsContext.Provider value={invoicingDocsCtx}>
          <BrowserRouter basename="/docsite">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/doc/:slug" element={<DocPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/diagrams/entity-diagrams" element={<EntityDiagramsPage />} />
                <Route path="/diagrams/flow-diagrams" element={<FlowDiagramsPage />} />
                <Route path="/cycles" element={<LinearCyclesPage />} />
                <Route path="/cycles/:id" element={<LinearCycleDetailPage />} />
                <Route path="/miska/transcripts" element={<TranscriptsPage />} />
                <Route path="/miska/requirements" element={<RequirementsCompliancePage />} />
                <Route path="/invoicing" element={<InvoicingHomePage />} />
                <Route path="/invoicing/doc/:slug" element={<InvoicingDocPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </InvoicingDocsContext.Provider>
      </DocsContext.Provider>
    </ThemeContext.Provider>
  );
}
