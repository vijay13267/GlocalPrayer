import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import logo from '../../assets/logo.png'
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'test@gmail.com' && password === 'Test@123') {
      navigation.navigate('Selection');
    } else {
      alert('Invalid credentials');
    }
  };
  const handleCRUDButton = () => {
    navigation.navigate('TestCrudOperations');
  };

  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>    
        <TouchableOpacity style={styles.button} onPress={handleCRUDButton}>
          <Text style={styles.buttonText}>Check CRUD Operations</Text>
        </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 100, // Adjust the width as necessary
    height: 100, // Adjust the height as necessary
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    marginTop: 20,
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

export default LoginScreen;
