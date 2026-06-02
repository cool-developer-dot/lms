import { renderCourses, initCourseLogic } from '../src/views/courseView.js';
import { renderCategories } from '../src/views/categoryView.js';
import { renderEnrollments, initEnrollmentLogic } from '../src/views/enrollmentView.js';
import { renderTransactions, initTransactionLogic } from '../src/views/transactionView.js';
import { renderUsers, initAuthLogic } from '../src/views/authView.js';

const appContainer = document.getElementById('app');

const routes = {
    courses: renderCourses,
    categories: renderCategories,
    enrollments: renderEnrollments,
    transactions: renderTransactions,
    auth: renderUsers
};

async function switchView(targetViewKey) {
    if (!appContainer) return;

    try {
        appContainer.innerHTML = '<div class="text-slate-500 animate-pulse">Syncing...</div>';

        // Fix: Call the function dynamically
        const viewFunction = routes[targetViewKey];
        if (!viewFunction) throw new Error("Route not found");

        appContainer.innerHTML = await viewFunction();

        await runViewLogic(targetViewKey);

        // Update Buttons
        document.querySelectorAll('.nav-tab-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-target') === targetViewKey;
            btn.className = isActive 
                ? "nav-tab-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-amber-500 bg-slate-100 dark:bg-slate-800 border"
                : "nav-tab-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800";
        });
    } catch (error) {
        appContainer.innerHTML = `<div class="text-rose-500">Error: ${error.message}</div>`;
    }
}

async function runViewLogic(key) {
    const logicMap = {
        courses: initCourseLogic,
        auth: initAuthLogic,
        transactions: initTransactionLogic,
        enrollments: initEnrollmentLogic
    };
    if (logicMap[key]) await logicMap[key]();
}

function initAppBootstrap() {
    document.querySelectorAll('.nav-tab-btn').forEach(button => {
        button.addEventListener('click', () => switchView(button.getAttribute('data-target')));
    });
    switchView('courses');
}

document.addEventListener('DOMContentLoaded', initAppBootstrap);