import api from './api';

export const getGoals = () => api.get('/savings');
export const createGoal = (data) => api.post('/savings', data);
export const updateGoal = (id, data) => api.put(`/savings/${id}`, data);
export const deleteGoal = (id) => api.delete(`/savings/${id}`);
export const getGoalProgress = (id) => api.get(`/savings/${id}/progression`);
