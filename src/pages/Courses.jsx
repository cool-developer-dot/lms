import PageContainer from '../components/PageContainer.jsx';
import { renderCourses, initCourseLogic } from '../views/courseView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Courses() {
  const containerRef = useLegacyView(renderCourses, initCourseLogic);
  return (
    <PageContainer>
      <div ref={containerRef} className="min-w-0 w-full max-w-full" />
    </PageContainer>
  );
}
