import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FullScreenMap from "../components/FullScreenMap";

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
      <FullScreenMap></FullScreenMap>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
