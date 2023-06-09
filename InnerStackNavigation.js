//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SingleGigCard from "./components/SingleGigCard";
import { Map } from "./components/Map";
import { ForumCard } from "./components/ForumCard";

const Stack = createStackNavigator(); // creates object for Stack Navigator

const MapPinNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen
        name="Current Gig"
        component={SingleGigCard}
        options={{
          headerTitleStyle: {
            color: "#FBFFF1",
          },
        }}
      />
      <Stack.Screen
        name="ForumCard"
        component={ForumCard}
        options={{
          headerTitleStyle: {
            color: "#FBFFF1",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export { MapPinNavigator }; // Stack-Navigator for Screen 2 Tab
