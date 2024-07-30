// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const users = [
  { username: 'YUSUF KOÇAK', password: 'yusuf123' },
  { username: 'ŞAMİL ÖZ', password: 'şamil123' },
  { username: 'MUSTAFA ASAN', password: 'mustafa123' },
  { username: 'NURİ BOSTAN', password: 'nuri123' },
  { username: 'ERCAN UYGUN', password: 'ercan123' },
  { username: 'ADEM YILMAZ', password: 'adem123' }
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      navigation.navigate('CustomerSelection', { manager: user.username });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  label: {
    fontSize: 18,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16
  }
});

export default LoginScreen;
