import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import MapView, {Circle, Marker, Polyline} from 'react-native-maps';

function MapEx() {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          //   latitude: 22.92255,
          //   longitude: 78.783406,
          latitude: 22.921,
          longitude: 78.777802,
          latitudeDelta: 0.25,
          longitudeDelta: 0.15,
        }}
        showsUserLocation
        showsCompass
        loadingEnabled>
        {/* <Polyline
          coordinates={[
            {latitude: 37.8025259, longitude: -122.4351431},
            {latitude: 37.7896386, longitude: -122.421646},
            {latitude: 37.7665248, longitude: -122.4161628},
            {latitude: 37.7734153, longitude: -122.4577787},
            {latitude: 37.7948605, longitude: -122.4596065},
            {latitude: 37.8025259, longitude: -122.4351431},
          ]}
          strokeColor="#000"
          strokeColors={[
            '#7F0000',
            '#00000000',
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
        /> */}

        <Circle
          center={{
            latitude: 22.921,
            longitude: 78.777802,
          }}
          radius={1000}
        />

        <Marker
          coordinate={{
            latitude: 22.921,
            longitude: 78.777802,
          }}
          title={'Location'}
          description="here i am">
          {/* <Callout>
            <Text>An intersting city</Text>
          </Callout> */}
          <Image
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            style={{height: 35, width: 35}}
          />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
});

export default MapEx;
