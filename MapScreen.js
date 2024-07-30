// MapScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const customerLocations = [
  { id: '30815', name: 'DİASA(MEHMET BARUN)', latitude: 40.03943295, longitude: 32.61510831 },
  { id: '30817', name: 'DİLARA GIDA VE MEŞRUBAT BÜFESİ(SALİHA POLAT)', latitude: 39.97179181, longitude: 32.64747430 },
  { id: '30832', name: 'FIRATCAN MAR.TUHAFİYE(TÜRKİLERİ POLAT)', latitude: 39.94366991, longitude: 32.65607990 },
  { id: '30834', name: 'ABBASOĞULLARI TURZM HABİNŞ KUA GIDA MAD TİC.LTDŞTİ', latitude: 39.94498475, longitude: 32.65689600 },
  { id: '30864', name: 'ÇAĞRICI BÜFE(CESUR DOĞAN ÇAĞRICI)', latitude: 39.94011263, longitude: 32.64522153 },
  { id: '30866', name: 'YURTDAŞ BÜFE(ÖZGÜR YURTDAŞ)', latitude: 39.94247403, longitude: 32.61852977 },
  { id: '30881', name: 'BEYDAĞ MARKET(YILMAZ DAĞ)', latitude: 39.94191016, longitude: 32.65213312 },
  { id: '30883', name: 'TUĞBA MARKET(MUSTAFA KÜTÜK)', latitude: 39.94209939, longitude: 32.65388587 },
  { id: '233986', name: 'B42 GIDA TİC.VE SAN.LTD.ŞTİ.', latitude: 37.99688850, longitude: 32.52485880 },
  { id: '234045', name: 'ÇOKDOĞRUOL GIDA - ALİ OSMAN DOĞRUOL', latitude: 37.89148190, longitude: 32.50720300 },
  { id: '234077', name: 'NUR MARKET - AHMET BAŞCI', latitude: 37.94504280, longitude: 32.50825750 },
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
