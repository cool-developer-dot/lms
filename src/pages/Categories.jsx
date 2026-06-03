import PageContainer from '../components/PageContainer.jsx';
import { renderCategories } from '../views/categoryView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Categories() {
  const containerRef = useLegacyView(renderCategories);
  return (
    <PageContainer>
      <div ref={containerRef} className="min-w-0 w-full max-w-full" />
    </PageContainer>
  );
}
