import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';

const SettingsScreen = ({navigation}) => {
  const [country, setCountry] = useState(null);

  const onCountryPress = country => {
    setCountry(country);
    navigation.navigate('Universities', {country: country});
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        title="Iceland"
        onPress={() => onCountryPress('Iceland')}>
        <Text style={styles.text}>Iceland</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        title=""
        onPress={() => onCountryPress('Norway')}>
        <Text style={styles.text}>Norway</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        title="Sweden"
        onPress={() => onCountryPress('Sweden')}>
        <Text style={styles.text}>Sweden</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        title="Finland"
        onPress={() => onCountryPress('Finland')}>
        <Text style={styles.text}>Finland</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        title=""
        onPress={() => onCountryPress('Denmark')}>
        <Text style={styles.text}>Denmark</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default SettingsScreen;
