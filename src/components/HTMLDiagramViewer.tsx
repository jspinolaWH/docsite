import { useState, useRef, useEffect } from 'react';
import '../styles/diagram-viewer.css';

interface HTMLDiagramViewerProps {
  src: string;
  title: string;
}

export function HTMLDiagramViewer({ src, title }: HTMLDiagramViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 4));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

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

  // Wheel zoom: only active in fullscreen or when Ctrl is held — otherwise let the page scroll
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !document.fullscreenElement) return;
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY * -0.002;
      setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 4));
    };

    viewer.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewer.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

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
          <button onClick={zoomOut} className="diagram-button" title="Zoom Out">
            −
          </button>
          <span style={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} className="diagram-button" title="Zoom In">
            +
          </button>
          <button onClick={resetZoom} className="diagram-reset-button" title="Reset View">
            Reset
          </button>
          <button onClick={toggleFullscreen} className="diagram-button" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
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
      <div
        ref={viewerRef}
        style={{ ...styles.viewer, ...(isFullscreen ? styles.fullscreenViewer : {}) }}
      >
        <iframe
          src={src}
          style={{
            ...styles.iframe,
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
          }}
          title={title}
          sandbox="allow-scripts allow-same-origin"
        />
        {/* Transparent overlay captures mouse/wheel events — iframes swallow them otherwise */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      <div style={styles.hint}>
        💡 Ctrl + Scroll to zoom • Drag to pan • Use controls above or fullscreen{isFullscreen && ' • Scroll to zoom • Press ESC to exit'}
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
  zoomLevel: {
    fontSize: '0.875rem',
    color: 'var(--color-text-muted)',
    minWidth: '50px',
    textAlign: 'center',
  },
  viewer: {
    position: 'relative',
    width: '100%',
    height: '600px',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg-tertiary)',
    userSelect: 'none',
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
