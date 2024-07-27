import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';

const DashboardScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
    setLoading(false);
  };

  const handleCreateItem = async () => {
    if (newItemName.trim() === '') return; // Ignore empty input
    const newItem = { event_name: newItemName };
    await createItem(newItem);
    setNewItemName('');
    setModalVisible(false);
    fetchItems(); // Refresh the list
  };

  const handleUpdateItem = async () => {
    if (!selectedItem || !selectedItem.event_name.trim()) return; // Ignore empty input
    const updatedItem = { ...selectedItem, event_name: selectedItem.event_name };
    await updateItem(selectedItem.event_id, updatedItem);
    setEditModalVisible(false);
    setSelectedItem(null);
    fetchItems(); // Refresh the list
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    fetchItems(); // Refresh the list
  };

  if (loading) {
    return <Text style={{alignSelf: 'center', justifyContent: 'center'}}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Dashboard</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.event_name}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => {
                setSelectedItem(item);
                setEditModalVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]} 
              onPress={() => handleDeleteItem(item.event_id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Create Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={handleCreateItem}
            >
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={selectedItem?.event_name || ''}
              onChangeText={(text) => setSelectedItem({ ...selectedItem, event_name: text })}
            />
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={handleUpdateItem}
            >
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.modalButton]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
  },
  modalButton: {
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
