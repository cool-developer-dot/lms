import CourseFormModal from './CourseFormModal.jsx';

/** @deprecated Use CourseFormModal with mode="create" */
export default function CreateCourseModal(props) {
  return <CourseFormModal mode="create" {...props} />;
}
