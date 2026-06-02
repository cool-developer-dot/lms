import { fetchAllUsers, impersonateTargetUser } from '../js/api.js';

// 1. Initial Render: UI structure return karta hai
export function renderUsers() {
    return `
    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Identity & Access Control (RBAC)</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Direct integration with User Mongoose Schema metrics.</p>
    </div>

    <div class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 class="font-semibold text-slate-800 dark:text-slate-200">Registered Platform Identities</h3>
            <span class="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-500/20 font-mono">JWT Verified Cluster</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 dark:bg-slate-900/30 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <th class="px-6 py-4">User Details</th>
                        <th class="px-6 py-4">System Role</th>
                        <th class="px-6 py-4">Verification Status</th>
                        <th class="px-6 py-4 text-right">Administrative Execution</th>
                    </tr>
                </thead>
                <tbody id="users-table-rows" class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm text-slate-700 dark:text-slate-300">
                    <tr><td colspan="4" class="px-6 py-8 text-center text-slate-400">Loading cluster data...</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

// 2. Logic Controller: Isse main.js se call kiya jata hai
export async function initAuthLogic() {
    await loadUsersTableData();
}

// 3. Table Data Engine
async function loadUsersTableData() {
    const rowsContainer = document.getElementById('users-table-rows');
    if (!rowsContainer) return;

    const apiResult = await fetchAllUsers();

    if (!apiResult.success) {
        rowsContainer.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-rose-500">Error: ${apiResult.message || 'Access Denied'}</td></tr>`;
        return;
    }

    const users = apiResult.data || [];
    if (users.length === 0) {
        rowsContainer.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-slate-400">No users found.</td></tr>`;
        return;
    }

    rowsContainer.innerHTML = users.map(user => {
        let roleBadgeHtml = '';
        if (user.role === 'ADMIN') roleBadgeHtml = `<span class="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-md font-semibold">ADMIN</span>`;
        else if (user.role === 'MENTOR') roleBadgeHtml = `<span class="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs px-2.5 py-1 rounded-md font-semibold">MENTOR</span>`;
        else roleBadgeHtml = `<span class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-700 text-xs px-2.5 py-1 rounded-md font-semibold">STUDENT</span>`;

        return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
            <td class="px-6 py-4 flex items-center space-x-3">
                <img src="${user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + user.name}" class="w-8 h-8 rounded-full bg-slate-800 border" />
                <div>
                    <div class="font-medium text-slate-900 dark:text-white">${user.name}</div>
                    <div class="text-xs text-slate-500 font-mono">${user.email}</div>
                </div>
            </td>
            <td class="px-6 py-4">${roleBadgeHtml}</td>
            <td class="px-6 py-4">
                ${user.isVerified 
                    ? `<span class="text-emerald-500 text-xs">Verified</span>`
                    : `<span class="text-amber-500 text-xs">Pending</span>`
                }
            </td>
            <td class="px-6 py-4 text-right">
                <button data-id="${user._id}" class="impersonate-btn text-xs border border-slate-700 hover:border-amber-500 text-amber-500 px-3 py-1.5 rounded-md transition font-medium">
                    Impersonate
                </button>
            </td>
        </tr>`;
    }).join('');

    // Events
    document.querySelectorAll('.impersonate-btn').forEach(btn => {
        btn.onclick = async (e) => {
            const id = e.target.getAttribute('data-id');
            await impersonateTargetUser(id);
        };
    });
}