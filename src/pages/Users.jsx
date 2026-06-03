import { renderUsers, initAuthLogic } from '../views/authView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Users() {
  const containerRef = useLegacyView(renderUsers, initAuthLogic);
  return <div ref={containerRef} className="p-8" />;
}
