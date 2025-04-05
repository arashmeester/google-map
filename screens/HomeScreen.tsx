import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MapView from "../components/MapView";
import Button from "../components/Button";

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <MapView></MapView>
      {/* <Text style={styles.title}>Home Screen</Text> */}
      {/* <Button label="Go to Details" onPress={() => navigation.navigate('Details')} /> */}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
