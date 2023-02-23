import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import UniversityListItem from './UniversityListItem';
import Geolocation from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'http://universities.hipolabs.com/search?country=';

const UniversityScreen = props => {
  const [newCountry, setCountry] = useState('Finland');
  const [universities, setUniversities] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const fetchUniversityData = async () => {
    setCountry(props.route.params.country);
    try {
      const response = await fetch(API_URL + newCountry);
      const data = await response.json();
      setUniversities(data.map(university => university.name));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchByLocation = async () => {
    try {
      const response = await fetch(API_URL + newCountry);
      const data = await response.json();
      setUniversities(data.map(university => university.name));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUniversityData();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to work properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
            const response = await fetch(url);
            const data = await response.json();
            setCountry(data.countryName);
            console.log(data.countryName);
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    fetchByLocation();
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isConnected ? (
        <View>
          <Text style={styles.text}>{newCountry}</Text>
          <FlatList
            data={universities}
            renderItem={({item}) => <UniversityListItem name={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
          <Pressable
            style={styles.button}
            title="Fetch University Data"
            onPress={fetchUniversityData}>
            <Text style={styles.text1}>Fetch University Data</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={requestLocationPermission}>
            <Text style={styles.text1}>Set country by location</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>No internet connection</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    padding: 10,
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default UniversityScreen;
