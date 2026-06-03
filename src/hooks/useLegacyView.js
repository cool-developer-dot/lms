import { useEffect, useRef } from 'react';

/**
 * Mounts existing vanilla view renderers into a React page container.
 * Keeps API/CRUD logic in view modules while routing is handled by React Router.
 */
export function useLegacyView(renderView, initLogic) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    async function mountView() {
      container.innerHTML = '<div class="text-slate-500 animate-pulse">Syncing...</div>';

      try {
        const html = await renderView();
        if (cancelled) return;

        container.innerHTML = html;

        if (initLogic) {
          await initLogic();
        }
      } catch (error) {
        if (!cancelled) {
          container.innerHTML = `<div class="text-rose-500 p-6">Error: ${error.message}</div>`;
        }
      }
    }

    mountView();

    return () => {
      cancelled = true;
      container.innerHTML = '';
    };
  }, [renderView, initLogic]);

  return containerRef;
}
