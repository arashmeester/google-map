import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FullScreenMap() {
  const [region, setRegion] = useState({
    latitude: 3.139,
    longitude: 101.6869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [marker, setMarker] = useState(null);

  const [searchHistory, setSearchHistory] = useState([{}]);

  const handlePlaceSelect = (data, details) => {
    const location = details.geometry.location;
    const newHistoryItem = {
      id: Date.now().toString(),
      name: data.structured_formatting.main_text,
      description: data.description,
      latitude: location.lat,
      longitude: location.lng,
      timestamp: new Date().toISOString(),
    };

    // Update map and marker
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setMarker({
      latitude: location.lat,
      longitude: location.lng,
      title: data.structured_formatting.main_text,
      description: data.description,
    });

    // Add to history (newest first)
    setSearchHistory((prev) => [newHistoryItem, ...prev]);
  };

  const handleHistoryItemPress = (item) => {
    setMarker(null);

    setRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMarker({
      latitude: item.latitude,
      longitude: item.longitude,
      title: item.name,
      description: item.description,
    });
  };

  // Load saved history on startup
  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await AsyncStorage.getItem("searchHistory");
      if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    };
    loadHistory();
  }, []);

  // Save when history changes
  useEffect(() => {
    AsyncStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 3.139,
          longitude: 101.6869,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}
      >
        {marker && (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title || "Selected Place"}
            description={marker.description || ""}
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={handlePlaceSelect}
          query={{
            key: "AIzaSyCLtS3ZrbP0TYrhVjRA_MMtE1X1_8piKHU",
            language: "en",
          }}
          styles={{
            textInput: styles.searchInput,
            listView: styles.searchResults,
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
        />
      </View>

      {searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View
            style={{
              ...styles.displayFlex,
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={styles.historyTitle}>History</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setSearchHistory([])}>
                <Text>Clear History</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={searchHistory}
            keyExtractor={(item) => `${item.id}_${item.timestamp}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(item)}
              >
                <View
                  style={{
                    ...styles.displayFlex,
                  }}
                >
                  <Text style={styles.historyText}>{item.name}</Text>
                  <Text style={styles.historyDesc}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    top: 40,
    alignSelf: "center",
  },
  searchInput: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchResults: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    elevation: 4,
  },
  historyContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    maxHeight: "30%",
  },
  historyTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  historyText: {
    fontSize: 14,
  },
  historyDesc: {
    fontSize: 12,
    color: "#666",
  },
  displayFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
