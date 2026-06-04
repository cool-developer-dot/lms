/**
 * DYNAMIC BASE URL
 * Agar app deployed hai toh relative path use karein, 
 * local development ke liye 'http://localhost:5000/api/v1' use karein.
 */
const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/v1' 
    : '/api/v1';

/**
 * Centralized API request wrapper
 */
async function request(endpoint, options = {}) {
    const token = localStorage.getItem('adminToken');
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...options.headers,
        },
    };

    try {
        // Endpoint mein se agar /v1 pehle se hai toh remove karein (taaki path duplicate na ho)
        const cleanEndpoint = endpoint.startsWith('/v1') ? endpoint.substring(3) : endpoint;
        const response = await fetch(`${BASE_URL}${cleanEndpoint}`, config);
        
        if (response.status === 204) return { success: true };
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Status ${response.status}`);
        }
        return { success: true, data: data };
    } catch (err) {
        console.error(`API Error [${endpoint}]:`, err.message);
        return { success: false, message: err.message };
    }
}

// ========================================================
// API ENDPOINTS
// ========================================================

// 1. Auth & Users
export const fetchAllUsers = () => request('/admin/users');
export const impersonateTargetUser = (userId) => request(`/admin/impersonate/${userId}`, { method: 'POST' });

// 2. Course Management
export const fetchAllCourses = () => request('/courses');
export const createNewCourse = (payload) => request('/courses', { method: 'POST', body: JSON.stringify(payload) });
export const deleteTargetCourse = (courseId) => request(`/courses/${courseId}`, { method: 'DELETE' });
export const updateCourse = (courseId, payload) =>
  request(`/courses/${courseId}`, { method: 'PUT', body: JSON.stringify(payload) });
export const updateCourseApprovalStatus = (courseId, status) => request(`/courses/${courseId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });

// 3. Category Management
export const fetchAllCategories = () => request('/categories');
export const createNewCategory = (name, description) => request('/categories', { method: 'POST', body: JSON.stringify({ name, description }) });
export const updateTargetCategory = (categoryId, name, description) => request(`/categories/${categoryId}`, { method: 'PUT', body: JSON.stringify({ name, description }) });
export const deleteTargetCategory = (categoryId) => request(`/categories/${categoryId}`, { method: 'DELETE' });

// 4. Enrollment
export const manualEnrollStudent = (studentId, courseId) => request('/enrollment', { method: 'POST', body: JSON.stringify({ studentId, courseId }) });
export const updateEnrollmentProgress = (studentId, courseId, progress) => request(`/enrollment/${courseId}`, { method: 'PATCH', body: JSON.stringify({ studentId, progress: Number(progress) }) });

// 5. Transactions
export const fetchMyTransactions = () => request('/transactions');