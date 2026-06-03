import { renderCourses, initCourseLogic } from '../views/courseView.js';
import { useLegacyView } from '../hooks/useLegacyView.js';

export default function Courses() {
  const containerRef = useLegacyView(renderCourses, initCourseLogic);
  return <div ref={containerRef} className="p-8" />;
}
