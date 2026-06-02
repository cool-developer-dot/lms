import { fetchMyTransactions } from '../js/api.js'; // FIXED: Corrected pathing

export function renderTransactions() {
    // Return the HTML structure immediately
    return `
    <div class="flex flex-col gap-4 pb-5 mb-8 border-b md:flex-row md:items-center md:justify-between border-slate-200 dark:border-slate-800">
        <div>
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Transaction Ledger</h1>
            <p class="mt-1 text-sm text-slate-500">Audit billing and payment history.</p>
        </div>
        <button id="open-gateway-modal" class="px-4 py-2 text-sm font-bold text-white transition bg-emerald-600 rounded-lg hover:bg-emerald-700">Simulate Payment</button>
    </div>

    <div class="overflow-hidden bg-white border shadow-sm dark:bg-slate-950 rounded-xl border-slate-200 dark:border-slate-800">
        <table class="w-full text-left">
            <thead class="text-xs uppercase bg-slate-50 dark:bg-slate-900 text-slate-500">
                <tr>
                    <th class="px-6 py-3">Course</th>
                    <th class="px-6 py-3">Reference ID</th>
                    <th class="px-6 py-3">Amount</th>
                    <th class="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody id="ledger-rows" class="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="4" class="px-6 py-8 text-center text-slate-500">Loading data...</td></tr>
            </tbody>
        </table>
    </div>`;
}

// Logic to be called by your router AFTER injection
export async function initTransactionLogic() {
    const rowsContainer = document.getElementById('ledger-rows');
    if (!rowsContainer) return;

    const data = await fetchMyTransactions();

    if (!Array.isArray(data) || data.length === 0) {
        rowsContainer.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-slate-500">No transactions found.</td></tr>`;
        return;
    }

    rowsContainer.innerHTML = data.map(tx => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-900">
            <td class="px-6 py-4">${tx.courseId?.title || 'N/A'}</td>
            <td class="px-6 py-4 text-slate-500">${tx.paymentId}</td>
            <td class="px-6 py-4 font-bold">$${parseFloat(tx.amount || 0).toFixed(2)}</td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${tx.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${tx.status}
                </span>
            </td>
        </tr>
    `).join('');
}