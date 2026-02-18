import { useState, useRef, useEffect } from 'react';
import '../styles/diagram-viewer.css';

interface HTMLDiagramViewerProps {
  src: string;
  title: string;
}

export function HTMLDiagramViewer({ src, title }: HTMLDiagramViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} style={{ ...styles.container, ...(isFullscreen ? styles.fullscreenContainer : {}) }}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.controls}>
          <button onClick={toggleFullscreen} className="diagram-button" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 6h4V2M15 10h-4v4M11 2v4h4M5 14v-4H1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 2v4m0-4h4m-4 0l4 4M14 14v-4m0 4h-4m4 0l-4-4M14 2v4m0-4h-4m4 0l-4 4M2 14v-4m0 4h4m-4 0l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div style={{ ...styles.viewer, ...(isFullscreen ? styles.fullscreenViewer : {}) }}>
        <iframe
          src={src}
          style={styles.iframe}
          title={title}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <div style={styles.hint}>
        💡 Scroll within the diagram to navigate{isFullscreen && ' • Press ESC to exit fullscreen'}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '2rem',
    backgroundColor: 'var(--color-bg-primary)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
  },
  title: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  viewer: {
    position: 'relative',
    width: '100%',
    height: '600px',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg-tertiary)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  hint: {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
    backgroundColor: 'var(--color-bg-secondary)',
    borderTop: '1px solid var(--color-border)',
    textAlign: 'center',
  },
  fullscreenContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    margin: 0,
    borderRadius: 0,
  },
  fullscreenViewer: {
    height: 'calc(100vh - 120px)',
  },
};
