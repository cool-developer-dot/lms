import { renderCategories } from '../views/categoryView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Categories() {
  const containerRef = useLegacyView(renderCategories);
  return <div ref={containerRef} className="p-8" />;
}
