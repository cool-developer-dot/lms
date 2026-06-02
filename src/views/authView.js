import { fetchAllUsers, impersonateTargetUser } from '../js/api.js';

// Yeh function aapka main.js call kar raha hai
export async function renderUsers() {
    return await renderAuth();
}

export async function renderAuth() {
    return `
    <div class="pb-5 mb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">User Management</h1>
        <p class="text-sm text-slate-500 mt-1">Manage user roles and system access.</p>
    </div>

    <div class="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table class="w-full text-left">
            <thead class="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                    <th class="px-6 py-3 text-xs font-semibold uppercase text-slate-500">User</th>
                    <th class="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Role</th>
                    <th class="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Actions</th>
                </tr>
            </thead>
            <tbody id="user-registry-rows" class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr><td colspan="3" class="px-6 py-8 text-center text-slate-500">Loading users...</td></tr>
            </tbody>
        </table>
    </div>`;
}

export async function initAuthLogic() {
    const rowsContainer = document.getElementById('user-registry-rows');
    if (!rowsContainer) return; 

    const apiResult = await fetchAllUsers();
    
    if (!apiResult || !apiResult.success) {
        rowsContainer.innerHTML = `<tr><td colspan="3" class="px-6 py-4 text-center text-red-500">Error: Unable to load user registry.</td></tr>`;
        return;
    }

    rowsContainer.innerHTML = apiResult.data.map(user => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-900">
            <td class="px-6 py-4">
                <div class="font-medium text-slate-900 dark:text-white">${user.name}</div>
                <div class="text-xs text-slate-500">${user.email}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 capitalize">${user.role}</span>
            </td>
            <td class="px-6 py-4">
                <button data-id="${user._id}" class="impersonate-trigger-btn text-blue-600 hover:underline">Impersonate</button>
            </td>
        </tr>
    `).join('');
    
    bindEvents();
}

function bindEvents() {
    document.querySelectorAll('.impersonate-trigger-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const userId = e.target.getAttribute('data-id');
            await impersonateTargetUser(userId);
            alert('Impersonation session started.');
        });
    });
}