import api from './api';

export const getObjectifs = () => api.get('/savings');
export const createObjectif = (data) => api.post('/savings', data);
export const updateObjectif = (id, data) => api.put(`/savings/${id}`, data);
export const deleteObjectif = (id) => api.delete(`/savings/${id}`);
export const getObjectifProgress = (id) => api.get(`/savings/${id}/progression`);
