// MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const customerLocations = [
// Add the locations here in the following format
// { id: '', name: '', latitude: , longitude: },
];

const MapScreen = ({ route }) => {
  const { customer } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [note, setNote] = useState('');
  const selectedCustomer = customerLocations.find(c => c.id === customer);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleConfirm = () => {
    if (location) {
      const distance = Math.sqrt(
        Math.pow(location.latitude - selectedCustomer.latitude, 2) +
        Math.pow(location.longitude - selectedCustomer.longitude, 2)
      );

      if (distance <= 0.0025) { // Approx 0.25km
        alert('Location confirmed');
      } else {
        alert('You are not within the 1km radius');
      }
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedCustomer.latitude,
          longitude: selectedCustomer.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: selectedCustomer.latitude, longitude: selectedCustomer.longitude }}
          title={selectedCustomer.name}
        />
        <Circle
          center={{ latitude: selectedCustomer.latitude, longitude: selectedCustomer.longitude }}
          radius={1000}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
      </MapView>
      <Text>{text}</Text>
      <Button title="Confirm Location" onPress={handleConfirm} />
      <TextInput
        style={styles.input}
        placeholder="Write a note"
        value={note}
        onChangeText={setNote}
        editable={location && Math.sqrt(
          Math.pow(location.latitude - selectedCustomer.latitude, 2) +
          Math.pow(location.longitude - selectedCustomer.longitude, 2)
        ) <= 0.01}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    margin: 16
  }
});

export default MapScreen;
