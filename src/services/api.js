// src/services/api.js
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// CRUD -create read update delete
export const getItems = async () => {
  try {
    console.log('Trying to get Items')
    const response = await axios.get(`http://10.0.2.2:3000/items`);
    console.log('Fetched items:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    console.log('Created item:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/items/${id}`, item);
    console.log('Updated item:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${id}`);
    console.log('Deleted item:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
