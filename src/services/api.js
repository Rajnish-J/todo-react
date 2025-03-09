// src/services/api.js
// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Generic fetch function with error handling
async function fetchAPI(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

// Task API functions
export async function fetchTasks() {
  return fetchAPI('tasks');
}

export async function addTask(taskData) {
  return fetchAPI('tasks', {
    method: 'POST',
    body: JSON.stringify(taskData)
  });
}

export async function updateTask(id, updates) {
  return fetchAPI(`tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates)
  });
}

export async function deleteTask(id) {
  return fetchAPI(`tasks/${id}`, {
    method: 'DELETE'
  });
}