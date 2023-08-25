import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://finvestfx-be-6faacdf06e11.herokuapp.com',
});

const menuItemsApi = {
  getAll: () => apiService.get('/api/menuItems'),
  create: (menuItem) => apiService.post('/api/menuItems', menuItem),
  update: (id, menuItem) => apiService.put(`/api/menuItems/${id}`, menuItem),
  delete: (id) => apiService.delete(`/api/menuItems/${id}`),
};

export { menuItemsApi };