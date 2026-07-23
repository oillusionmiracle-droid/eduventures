import { API_BASE } from './constants';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function fetchWithHandler(url, options = {}) {
  try {
    options.credentials = 'include';
    const token = localStorage.getItem('admin_token');
    options.headers = { 
      ...defaultHeaders, 
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    };

    const response = await fetch(url, options);
    
    // For unauthorized access or server error, still attempt to parse JSON if possible
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'An unexpected error occurred' };
    }

    if (!response.ok) {
      const detailsStr = Array.isArray(data.details) ? data.details.join(', ') : (data.details || '');
      const errMsg = detailsStr ? `${data.error}: ${detailsStr}` : (data.error || data.message || `Error ${response.status}: ${response.statusText}`);
      throw new Error(errMsg);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export const submitForm = (data) => fetchWithHandler(`${API_BASE}/submit`, {
  method: 'POST',
  body: JSON.stringify(data),
});

export const adminLogin = (password) => fetchWithHandler(`${API_BASE}/admin/login`, {
  method: 'POST',
  body: JSON.stringify({ password }),
});

export const adminLogout = () => fetchWithHandler(`${API_BASE}/admin/logout`, {
  method: 'POST',
});

export const getSuggestions = () => fetchWithHandler(`${API_BASE}/admin/suggestions`);
export const getNominations = () => fetchWithHandler(`${API_BASE}/admin/nominations`);
export const getDuplicates = () => fetchWithHandler(`${API_BASE}/admin/duplicates`);
export const getBusinesses = () => fetchWithHandler(`${API_BASE}/admin/businesses`);
export const exportData = () => fetchWithHandler(`${API_BASE}/admin/export`);
export const resetData = () => fetchWithHandler(`${API_BASE}/admin/reset`, { method: 'POST' });
export const runAiAnalysis = () => fetchWithHandler(`${API_BASE}/admin/ai/analysis`, { method: 'POST' });
export const getAiDuplicates = () => fetchWithHandler(`${API_BASE}/admin/ai/duplicates`);
export const getAiThemes = () => fetchWithHandler(`${API_BASE}/admin/ai/themes`);
