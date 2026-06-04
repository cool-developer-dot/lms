import { useCallback, useEffect, useMemo, useState } from 'react';
import PageContainer from '../components/PageContainer.jsx';
import CoursesPageHeader from '../components/courses/CoursesPageHeader.jsx';
import CourseGrid from '../components/courses/CourseGrid.jsx';
import CourseFormModal from '../components/courses/CourseFormModal.jsx';
import ViewCourseModal from '../components/courses/ViewCourseModal.jsx';
import { MOCK_COURSES, normalizeCourse } from '../data/mockCourses.js';
import {
  createNewCourse,
  deleteTargetCourse,
  fetchAllCourses,
  updateCourse,
} from '../js/api.js';

function isRemoteCourseId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

export default function Courses() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewCourse, setViewCourse] = useState(null);
  const [editCourse, setEditCourse] = useState(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    const result = await fetchAllCourses();

    if (result?.success && Array.isArray(result.data) && result.data.length > 0) {
      setCourses(result.data.map((course, index) => normalizeCourse(course, index)));
    } else {
      setCourses(MOCK_COURSES);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleCreate = useCallback(
    async (payload) => {
      const result = await createNewCourse(payload);

      if (result?.success) {
        await loadCourses();
        setCreateOpen(false);
        return;
      }

      setCourses((prev) => [{ id: `local-${Date.now()}`, ...payload }, ...prev]);
      setCreateOpen(false);
    },
    [loadCourses]
  );

  const handleUpdate = useCallback(
    async (payload) => {
      if (!editCourse) return;

      const courseId = editCourse.id;
      const isRemote = isRemoteCourseId(courseId);

      if (isRemote) {
        const result = await updateCourse(courseId, payload);
        if (result?.success) {
          await loadCourses();
          setEditCourse(null);
          return;
        }
      }

      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, ...payload } : c))
      );
      setEditCourse(null);
    },
    [editCourse, loadCourses]
  );

  const handleDelete = useCallback(async (course) => {
    if (!window.confirm(`Delete "${course.title}"? This action cannot be undone.`)) {
      return;
    }

    if (isRemoteCourseId(course.id)) {
      await deleteTargetCourse(course.id);
    }

    setCourses((prev) => prev.filter((c) => c.id !== course.id));
    if (viewCourse?.id === course.id) setViewCourse(null);
    if (editCourse?.id === course.id) setEditCourse(null);
  }, [viewCourse, editCourse]);

  const handleView = useCallback((course) => {
    setEditCourse(null);
    setViewCourse(course);
  }, []);

  const handleEdit = useCallback((course) => {
    setViewCourse(null);
    setEditCourse(course);
  }, []);

  const handleEditFromView = useCallback((course) => {
    setViewCourse(null);
    setEditCourse(course);
  }, []);

  const gridContent = useMemo(() => {
    if (loading) {
      return (
        <div
          className="grid min-w-0 gap-5 sm:gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
          aria-busy="true"
          aria-label="Loading courses"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50"
            />
          ))}
        </div>
      );
    }

    return (
      <CourseGrid
        courses={courses}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }, [loading, courses, handleView, handleEdit, handleDelete]);

  return (
    <PageContainer className="bg-slate-50/80 dark:bg-transparent">
      <CoursesPageHeader onCreateClick={() => setCreateOpen(true)} />
      {gridContent}

      <CourseFormModal
        mode="create"
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <ViewCourseModal
        course={viewCourse}
        isOpen={Boolean(viewCourse)}
        onClose={() => setViewCourse(null)}
        onEdit={handleEditFromView}
      />

      <CourseFormModal
        mode="edit"
        course={editCourse}
        isOpen={Boolean(editCourse)}
        onClose={() => setEditCourse(null)}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
}
