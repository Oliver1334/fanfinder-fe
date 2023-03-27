import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

let locationsOfInterest = [
  {
    title: "Northcoders",
    location: {
      latitude: 53.47237955300849,
      longitude: -2.2382431,
    },
    description: "Northcoders HQ Manchester",
  },
  {
    title: "Manchester Academy",
    location: {
      latitude: 53.46375031620907,
      longitude: -2.2314531000949103,
    },
    description: "Concert venue in the Student's Union",
  },
];

export const Map = () => {
  const onRegionChange = (region) => {
    // console.log(region);
  };

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text(errorMsg);
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(userLat);

  if (userLat !== null && userLong !== null) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onRegionChange={onRegionChange}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          initialRegion={{
            //delta values - the higher the number, the more zoomed out
            latitude: userLat,
            latitudeDelta: 10.20408435934594706,
            longitude: userLong,
            longitudeDelta: 10.18552860468626022,
          }}
        >
          {showLocationsOfInterest()}
        </MapView>
        <Text>FanFinder Map</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "95%",
  },
});
