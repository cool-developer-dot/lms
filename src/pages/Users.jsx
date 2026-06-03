import PageContainer from '../components/PageContainer.jsx';
import { renderUsers, initAuthLogic } from '../views/authView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Users() {
  const containerRef = useLegacyView(renderUsers, initAuthLogic);
  return (
    <PageContainer>
      <div ref={containerRef} className="min-w-0 w-full max-w-full" />
    </PageContainer>
  );
}
