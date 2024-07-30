// CustomerSelectionScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const customers = [
  // Add the customers in the following format
  { label: 'DİASA(MEHMET BARUN)', value: '30815', manager: 'YUSUF KOÇAK' },
  { label: 'DİLARA GIDA VE MEŞRUBAT BÜFESİ(SALİHA POLAT)', value: '30817', manager: 'YUSUF KOÇAK' },
  { label: 'TUĞBA MARKET(MUSTAFA KÜTÜK)', value: '30883', manager: 'YUSUF KOÇAK' },
  { label: 'B42 GIDA TİC.VE SAN.LTD.ŞTİ.', value: '233986', manager: 'ŞAMİL ÖZ' },
  { label: 'ÇOKDOĞRUOL GIDA - ALİ OSMAN DOĞRUOL', value: '234045', manager: 'ŞAMİL ÖZ' },
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
