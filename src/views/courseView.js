import { fetchAllCourses, deleteTargetCourse, createNewCourse } from '../js/api.js';

// 1. UI Skeleton
export function renderCourses() {
    return `
    <div class="min-w-0 max-w-full">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div class="min-w-0">
                <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white break-words">Course Catalog</h2>
                <p class="text-slate-500 text-sm">Manage your academy's curriculum and modules.</p>
            </div>
            
            <form id="add-course-form" class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[280px]">
                <input type="text" id="course-title" placeholder="New course title..." required 
                    class="w-full min-w-0 flex-1 p-3 sm:p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <button type="submit" class="min-h-[44px] px-5 py-3 sm:py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition shadow-lg">
                    Add
                </button>
            </form>
        </div>

        <div id="courses-container" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 min-w-0">
            <p class="text-slate-500 italic animate-pulse">Syncing course modules from cluster...</p>
        </div>
    </div>`;
}

// 2. Main Logic: Auto-Populate + CRUD
export async function initCourseLogic() {
    // Check if courses exist, if not, add starter content
    await checkAndPopulateStarterCourses();
    await refreshCourses();
    
    // Add Course Handler
    const form = document.getElementById('add-course-form');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('course-title');
            await createNewCourse({ title: titleInput.value, description: "New custom course module." });
            titleInput.value = '';
            await refreshCourses();
        };
    }
}

// Helper: Populate Demo Content
async function checkAndPopulateStarterCourses() {
    const apiResult = await fetchAllCourses();
    const courses = (apiResult && apiResult.data) ? apiResult.data : [];
    
    if (courses.length === 0) {
        const demoCourses = [
            { title: "Full Stack MERN Development", description: "Master React, Node.js, and MongoDB." },
            { title: "UI/UX Design Fundamentals", description: "User research, wireframing, and Figma." },
            { title: "Cloud DevOps with AWS", description: "Deploy apps using Docker and AWS." }
        ];
        for (const course of demoCourses) {
            await createNewCourse(course);
        }
    }
}

// 3. UI Renderer
async function refreshCourses() {
    const container = document.getElementById('courses-container');
    const apiResult = await fetchAllCourses();
    
    let courses = (apiResult && apiResult.success && Array.isArray(apiResult.data)) ? apiResult.data : [];

    container.innerHTML = courses.length > 0 
        ? courses.map(course => `
            <div class="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 min-w-0">
                <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h4 class="font-bold text-xl text-slate-800 dark:text-white">${course.title || 'Untitled'}</h4>
                <p class="text-sm text-slate-500 mt-2 line-clamp-2">${course.description || 'No description provided.'}</p>
                <div class="mt-6 flex flex-col sm:flex-row gap-2">
                    <button data-id="${course._id}" class="delete-btn flex-1 min-h-[44px] py-2.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-100 transition">Delete</button>
                    <button class="flex-1 min-h-[44px] py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 transition">Edit</button>
                </div>
            </div>
        `).join('')
        : `<p class="text-slate-400 italic">No courses found. Add one to get started!</p>`;

    // Bind Delete
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            if (confirm("Delete this course?")) {
                await deleteTargetCourse(id);
                await refreshCourses();
            }
        });
    });
}