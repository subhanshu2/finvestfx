import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:3000',
});

const menuItemsApi = {
  getAll: () => apiService.get('/api/menuItems'),
  create: (menuItem) => apiService.post('/api/menuItems', menuItem),
  update: (id, menuItem) => apiService.put(`/api/menuItems/${id}`, menuItem),
  delete: (id) => apiService.delete(`/api/menuItems/${id}`),
};

export { menuItemsApi };