import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import PubNubReact from 'pubnub-react';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapTrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };

    // Replace "X" with your PubNub Keys
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-3288c418-a4a0-4d5b-a8fd-213b3b8df791',
      subscribeKey: 'sub-c-f061d67c-0193-11ec-b0c0-62dfa3a98328',
    });
    this.pubnub.init(this);
  }

  // code to receive messages sent in a channel
  componentDidMount() {
    this.subscribeToPubNub();
  }

  subscribeToPubNub = () => {
    this.pubnub.subscribe({
      channels: ['location'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      const {coordinate} = this.state;
      const {latitude, longitude} = msg.message;
      const newCoordinate = {
        latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
        longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
      };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(newCoordinate, 500);
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }
      this.setState({
        latitude,
        longitude,
      });
    });
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            ref={c => (this.mapView = c)}
            region={this.state.latitude ? this.getMapRegion() : null}>
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapTrack;
