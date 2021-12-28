import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
  AnimatedRegion,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 12.899305;
const LONGITUDE = 77.634118;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mini = [
  {
    title: '3\nmin',
    coordinates: {
      latitude: 12.899844,
      longitude: 77.631634,
    },
  },
  {
    title: '4\nmin',
    coordinates: {
      latitude: 12.902254,
      longitude: 77.629027,
    },
  },
];

const sedan = [
  {
    title: '5\nmin',
    coordinates: {
      latitude: 12.905925,
      longitude: 77.632347,
    },
  },
  {
    title: '6\nmin',
    coordinates: {
      latitude: 12.894442,
      longitude: 77.635421,
    },
  },
];

const suv = [
  {
    title: '2\nmin',
    coordinates: {
      latitude: 12.899844,
      longitude: 77.631634,
    },
  },
  {
    title: '7\nmin',
    coordinates: {
      latitude: 12.905925,
      longitude: 77.632347,
    },
  },
];

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

navigator.geolocation = require('react-native-geolocation-service');

export default class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinates: [],
      markers: mini,
      prevLatLng: {},
      distanceTravelled: 0,
      // mapType: null,
    };
  }

  switchMapType() {
    console.log('Changing');
    this.state.mapType = 'satellite';
  }
  createNewRide() {
    ToastAndroid.show('Trip created successfully!', ToastAndroid.SHORT);
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Location Permission Granted.');
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // coordinates: this.state.coordinates.concat({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // }),
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 60000,
        maximumAge: 0,
      },
    );

    // Geolocation.watchPosition
    // (
    //   position => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       coordinates: this.state.coordinates.concat({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       }),
    //     });
    //   },
    //   error => {
    //     console.log(error);
    //   },
    //   {
    //     showLocationDialog: true,
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 0,
    //     distanceFilter: 0,
    //   },
    // );
  }

  render() {
    console.log(
      this.state.latitude,
      this.state.longitude,
      this.state.coordinate,
    );
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {this.state.latitude && this.state.longitude ? (
            <MapView
              // provider={PROVIDER_GOOGLE}
              // mapType={this.state.mapType}
              style={styles.map}
              initialRegion={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.25,
                longitudeDelta: 0.15,
              }}
              showsUserLocation={true}
              showsCompass
              loadingEnabled>
              <Marker
                coordinate={{
                  latitude: 12.899305,
                  longitude: 77.634118,
                }}
                title={'Location'}
                description="here i am"></Marker>

              {this.state.markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}>
                  <View style={styles.pinView}>
                    <Text style={styles.pinText}>{marker.title}</Text>
                    <Image
                      style={styles.pinImage}
                      source={require('../../assets/sedan.png')}></Image>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) : null}

          <Callout>
            {/* <ScrollView> */}
            <View style={styles.calloutView}>
              <GooglePlacesAutocomplete
                placeholder="Enter Destination"
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                getDefaultValue={() => ''}
                query={{
                  key: 'AIzaSyAY1rUjou3aHObZH2yaLYqE6Hzsxgji-XQ',
                  // key: 'AIzaSyDhuNpfOd9pVwTfb_hDjz2oJaH1oJsQ7PA',
                  language: 'en', // language of the results
                  //types: '(cities)' // default: 'geocode'
                  // components: 'country:in',
                }}
                // predefinedPlaces={[homePlace, workPlace]}
                styles={{
                  textInputContainer: {
                    width: '100%',
                  },
                  textInput: {
                    fontSize: 16,
                  },
                  predefinedPlacesDescription: {
                    color: 'black',
                  },
                }}
                // currentLocation={true}
              />
            </View>
            {/* </ScrollView> */}
          </Callout>

          <View style={styles.tabsContainer}>
            <View style={styles.tabContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({markers: mini})}>
                  <Text style={styles.minuteText}></Text>
                  <Image source={require('../../assets/mini.png')}></Image>
                  <Text style={styles.cabTypeText}>Mini</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({markers: sedan})}>
                  <Text style={styles.minuteText}></Text>
                  <Image source={require('../../assets/sedan.png')}></Image>
                  <Text style={styles.cabTypeText}>Sedan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.setState({markers: suv})}>
                  <Text style={styles.minuteText}></Text>
                  <Image source={require('../../assets/suv.png')}></Image>
                  <Text style={styles.cabTypeText}>SUV</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rideContainer}>
              <TouchableOpacity onPress={() => this.createNewRide()}>
                <Text style={styles.cabTypeButton}>Ride Now</Text>
                {/* <Text>
                  {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                </Text> */}
                <Icon onPress={this.switchMapType} size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: 700,
  //   width: 400,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  //   height: '100%',
  //   width: '100%',
  // },

  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 4,
  },
  map: {
    flex: 3,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  tabsContainer: {
    flex: 1,
  },
  tabContainer: {
    // flex: 1.5,
    flexDirection: 'row',
    margin: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    margin: 3,
    borderRadius: 150,
    backgroundColor: 'white',
  },
  rideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  cabTypeText: {
    color: 'black',
    fontSize: 10,
  },
  minuteText: {
    color: 'black',
    fontSize: 12,
  },
  pinView: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  pinText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  pinImage: {
    flex: 1,
  },
  calloutView: {
    //borderRadius: 10,
    height: '100%',
    width: '75%',
    marginLeft: '35%',
    marginRight: '20%',
    marginTop: '20%',
  },
});
