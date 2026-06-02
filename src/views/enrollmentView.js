import { manualEnrollStudent, updateEnrollmentProgress } from '../js/api.js';

export function renderEnrollments() {
    return `
    <div class="pb-5 mb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Student Enrollment</h1>
        <p class="mt-1 text-sm text-slate-500">Manage student course access and update progress.</p>
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="p-6 bg-white border shadow-sm dark:bg-slate-950 rounded-xl border-slate-200 dark:border-slate-800 h-fit">
            <h2 class="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Manual Enrollment</h2>
            <form id="manual-enrollment-form" class="space-y-4 text-sm">
                <div>
                    <label class="block mb-1 text-xs font-medium text-slate-500">Student ID</label>
                    <input type="text" id="enroll-student-id" required class="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg">
                </div>
                <div>
                    <label class="block mb-1 text-xs font-medium text-slate-500">Course ID</label>
                    <input type="text" id="enroll-course-id" required class="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg">
                </div>
                <button type="submit" class="w-full py-2 font-bold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">Enroll Student</button>
            </form>
        </div>

        <div class="bg-white border shadow-sm lg:col-span-2 dark:bg-slate-950 rounded-xl border-slate-200 dark:border-slate-800">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <h2 class="font-semibold text-slate-800 dark:text-slate-200">Progress Override</h2>
            </div>
            <div class="p-6">
                <form id="progress-override-form" class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <input type="text" id="prog-student-id" placeholder="Student ID" required class="p-2 border rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900">
                    <input type="text" id="prog-course-id" placeholder="Course ID" required class="p-2 border rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900">
                    <input type="number" min="0" max="100" id="prog-percentage" placeholder="Progress %" required class="p-2 border rounded border-slate-300 dark:border-slate-700 dark:bg-slate-900">
                    <button type="submit" class="col-span-1 md:col-span-3 py-2 text-sm font-medium transition bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg">Update Progress</button>
                </form>
            </div>
        </div>
    </div>`;
}

export async function initEnrollmentLogic() {
    // 1. Enrollment Handler
    document.getElementById('manual-enrollment-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await manualEnrollStudent(
            document.getElementById('enroll-student-id').value.trim(),
            document.getElementById('enroll-course-id').value.trim()
        );
        alert(res.success ? "Student enrolled successfully." : `Error: ${res.message}`);
    });

    // 2. Progress Override Handler
    document.getElementById('progress-override-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const res = await updateEnrollmentProgress(
            document.getElementById('prog-student-id').value.trim(),
            document.getElementById('prog-course-id').value.trim(),
            document.getElementById('prog-percentage').value
        );
        alert(res.success ? "Progress updated." : `Error: ${res.message}`);
    });
}