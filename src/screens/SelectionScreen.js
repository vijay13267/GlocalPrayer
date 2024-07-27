import React, { useState } from 'react';
import { View, Button, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const SelectionScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [organizationList, setOrganizationList] = useState([
    { label: 'Organization 1', value: '1' },
    { label: 'Organization 2', value: '2' },
    { label: 'Organization 3', value: '3' },
  ]);

  const handleNavigate = () => {
    if (selectedItem) {
      navigation.navigate('Dashboard', { selectedItem });
    } else {
      alert('Please select an organization');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an Organization</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={organizationList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selectedItem ? selectedItem.value : null}
        onChange={(item) => {
          setSelectedItem(item);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Go to Organization Dashboard</Text>
        </TouchableOpacity>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  dropdown: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#262698',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SelectionScreen;
