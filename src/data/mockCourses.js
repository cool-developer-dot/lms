export const MOCK_COURSES = [
  {
    id: 'course-1',
    title: 'JavaScript Fundamentals',
    description:
      'Master the core concepts of JavaScript including variables, functions, objects, and modern ES6+ features for web development.',
    level: 'Beginner',
    status: 'Published',
    price: 49,
  },
  {
    id: 'course-2',
    title: 'React.js Complete Guide',
    description:
      'Build modern web applications with React, hooks, context API, and advanced patterns used in production SaaS products.',
    level: 'Intermediate',
    status: 'Pending Review',
    price: 79,
  },
  {
    id: 'course-3',
    title: 'Node.js & Express Mastery',
    description:
      'Create scalable backend services with Node.js, Express, REST APIs, authentication, and deployment best practices.',
    level: 'Advanced',
    status: 'Published',
    price: 89,
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Principles',
    description:
      'Learn user-centered design, wireframing, prototyping, and visual systems for delightful digital experiences.',
    level: 'All Levels',
    status: 'Published',
    price: 59,
  },
  {
    id: 'course-5',
    title: 'Python for Beginners',
    description:
      'Start your programming journey with Python syntax, data structures, scripting, and practical automation projects.',
    level: 'Beginner',
    status: 'Pending Review',
    price: 39,
  },
  {
    id: 'course-6',
    title: 'Data Structures & Algorithms',
    description:
      'Strengthen problem-solving skills with essential DSA topics, complexity analysis, and interview-ready patterns.',
    level: 'Intermediate',
    status: 'Published',
    price: 69,
  },
];

export function normalizeCourse(raw, index = 0) {
  const fallback = MOCK_COURSES[index % MOCK_COURSES.length];
  return {
    id: raw._id || raw.id || `course-${index}-${Date.now()}`,
    title: raw.title || 'Untitled Course',
    description: raw.description || fallback.description,
    level: raw.level || fallback.level,
    status: raw.status || fallback.status,
    price: typeof raw.price === 'number' ? raw.price : fallback.price,
  };
}
