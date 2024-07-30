// CustomerSelectionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const customers = [
  { label: 'DİASA(MEHMET BARUN)', value: '30815', manager: 'YUSUF KOÇAK' },
  { label: 'DİLARA GIDA VE MEŞRUBAT BÜFESİ(SALİHA POLAT)', value: '30817', manager: 'YUSUF KOÇAK' },
  { label: 'TUĞBA MARKET(MUSTAFA KÜTÜK)', value: '30883', manager: 'YUSUF KOÇAK' },
  { label: 'B42 GIDA TİC.VE SAN.LTD.ŞTİ.', value: '233986', manager: 'ŞAMİL ÖZ' },
  { label: 'ÇOKDOĞRUOL GIDA - ALİ OSMAN DOĞRUOL', value: '234045', manager: 'ŞAMİL ÖZ' },
  { label: 'GÜZEL MARKET - İLYAS KÖYLÜ', value: '231778', manager: 'ŞAMİL ÖZ' },
  { label: 'ÇİÇEK MARKET // ERSİN ÇİÇEK', value: '25671', manager: 'MUSTAFA ASAN' },
  { label: 'ÇİÇEK MARKET // İSMAİL ÇİÇEK', value: '25705', manager: 'MUSTAFA ASAN' },
  { label: 'BEREKET GIDA / TURGUT KARADEMİR', value: '15533', manager: 'NURİ BOSTAN' },
  { label: 'AKBAŞLAR MARKET / İSLAM AKBAŞ', value: '15615', manager: 'NURİ BOSTAN' },
  { label: 'VEYSEL ÖZÇELİK', value: '195140', manager: 'ERCAN UYGUN' },
  { label: 'TEYFİK AYÇEMAN', value: '195143', manager: 'ERCAN UYGUN' },
  { label: 'RAMAZAN KIRKKUDU', value: '195193', manager: 'ERCAN UYGUN' },
];

const CustomerSelectionScreen = ({ navigation, route }) => {
  const { manager } = route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const managerCustomers = customers.filter(c => c.manager === manager);
    setItems(managerCustomers);
  }, [manager]);

  const handleNext = () => {
    if (value) {
      navigation.navigate('Map', { customer: value });
    } else {
      alert('Please select a customer');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a customer:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true}
        searchPlaceholder="Search..."
      />
      <Button title="Next" onPress={handleNext} />
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
  }
});

export default CustomerSelectionScreen;
