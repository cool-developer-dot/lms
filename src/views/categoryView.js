// =========================================================================
// WHOLCURE LMS - CATEGORIES CORE VIEW ENGINE (DYNAMIC COMPONENT SYSTEM)
// =========================================================================

// FIXED PATH: Pointing directly to api.js in the parent src directory
import { fetchAllCategories, createNewCategory, deleteTargetCategory, updateTargetCategory } from '../js/api.js';

let currentEditId = null; // Internal tracking state variable for edit triggers

export function renderCategories() {
    setTimeout(() => {
        loadCategoriesData();
    }, 50);

    return `
    <div class="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Course Categories</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage, partition, and map dynamic structural subject nodes for Wholcure catalog metrics.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-fit shadow-xl">
            <h2 id="form-context-title" class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Add New Category Node</h2>
            
            <form id="category-creation-form" class="space-y-4 text-sm">
                <div>
                    <label class="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Category Name</label>
                    <input type="text" id="cat-name" placeholder="e.g., Full Stack Web Development" required
                        class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-amber-500 transition">
                </div>
                
                <div>
                    <label class="block text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Description Brief</label>
                    <textarea id="cat-desc" rows="4" placeholder="Summarize the instructional parameters..." required
                        class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-amber-500 transition"></textarea>
                </div>

                <div class="flex gap-2">
                    <button type="submit" id="form-submit-btn"
                        class="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-lg transition duration-150 shadow-md">
                        Commit Category Data
                    </button>
                    <button type="button" id="cancel-edit-btn" class="hidden bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 px-3 rounded-lg text-xs font-medium">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

        <div class="lg:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200">Active Pipeline Clusters</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 dark:bg-slate-900/20 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                            <th class="px-6 py-4">Structural Class Name</th>
                            <th class="px-6 py-4">URL Slug Mapping</th>
                            <th class="px-6 py-4 text-right">Administrative Execution</th>
                        </tr>
                    </thead>
                    <tbody id="category-table-rows" class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm text-slate-700 dark:text-slate-300">
                        <tr>
                            <td colspan="3" class="px-6 py-8 text-center text-slate-400 dark:text-slate-500 font-mono">
                                Compiling database references, linking nodes...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>`;
}

async function loadCategoriesData() {
    const rowsContainer = document.getElementById('category-table-rows');
    if (!rowsContainer) return; // Safety check guard

    setupFormEvent();

    const apiResult = await fetchAllCategories();
    if (!apiResult.success) {
        rowsContainer.innerHTML = `<tr><td colspan="3" class="px-6 py-8 text-center text-rose-500 dark:text-rose-400 font-mono">Error Matrix Break: ${apiResult.message}</td></tr>`;
        return;
    }

    const categories = apiResult.data || [];
    if (categories.length === 0) {
        rowsContainer.innerHTML = `<tr><td colspan="3" class="px-6 py-8 text-center text-slate-400 dark:text-slate-500">Storage engine empty.</td></tr>`;
        return;
    }

    rowsContainer.innerHTML = categories.map(cat => {
        return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors group">
            <td class="px-6 py-4">
                <div class="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">${cat.name}</div>
                <div class="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1 max-w-xs" id="desc-${cat._id}">${cat.description || ''}</div>
            </td>
            <td class="px-6 py-4">
                <span id="name-${cat._id}" class="hidden">${cat.name}</span>
                <span class="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs px-2.5 py-1 rounded-md">
                    ${cat.slug}
                </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
                <button data-id="${cat._id}" class="edit-cat-btn text-xs text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium">
                    Modify
                </button>
                <button data-id="${cat._id}" class="delete-cat-btn text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 hover:bg-rose-600 dark:hover:bg-rose-900 hover:text-white px-3 py-1.5 rounded-lg transition font-medium">
                    Deallocate
                </button>
            </td>
        </tr>`;
    }).join('');

    bindCategoryTableActions();
}

function setupFormEvent() {
    const form = document.getElementById('category-creation-form');
    if(!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('cat-name').value;
        const description = document.getElementById('cat-desc').value;

        let result;
        if (currentEditId) {
            result = await updateTargetCategory(currentEditId, name, description);
        } else {
            result = await createNewCategory(name, description);
        }

        if (result.success) {
            resetFormState();
            loadCategoriesData();
        } else {
            alert(`Execution Protocol Failed: ${result.message}`);
        }
    };

    const cancelBtn = document.getElementById('cancel-edit-btn');
    if(cancelBtn) cancelBtn.onclick = resetFormState;
}

function bindCategoryTableActions() {
    // 1. EDIT FLOW TRANSITION HANDLER
    document.querySelectorAll('.edit-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            currentEditId = id;

            const existingName = document.getElementById(`name-${id}`).innerText;
            const existingDesc = document.getElementById(`desc-${id}`).innerText;

            document.getElementById('cat-name').value = existingName;
            document.getElementById('cat-desc').value = existingDesc;

            document.getElementById('form-context-title').innerText = "Modify Category Context Node";
            document.getElementById('form-submit-btn').innerText = "Save Alterations";
            
            const cancelBtn = document.getElementById('cancel-edit-btn');
            if(cancelBtn) cancelBtn.classList.remove('hidden');
        });
    });

    // 2. PURGE FLOW ROUTING INTERACTION
    document.querySelectorAll('.delete-cat-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if(confirm('Are you certain you want to drop this category node?')) {
                const categoryId = e.target.getAttribute('data-id');
                const res = await deleteTargetCategory(categoryId);
                if(res.success) loadCategoriesData();
                else alert(`Purge Intercepted: ${res.message}`);
            }
        });
    });
}

function resetFormState() {
    currentEditId = null;
    const form = document.getElementById('category-creation-form');
    if(form) form.reset();
    
    const contextTitle = document.getElementById('form-context-title');
    if(contextTitle) contextTitle.innerText = "Add New Category Node";
    
    const submitBtn = document.getElementById('form-submit-btn');
    if(submitBtn) submitBtn.innerText = "Commit Category Data";
    
    const cancelBtn = document.getElementById('cancel-edit-btn');
    if(cancelBtn) cancelBtn.classList.add('hidden');
}