/**
 * This app shares pictures
 * @author docs.expo
 * @author Mark Emmanuel
 * @author Dahn Balan
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
// The type of imports that allow the app to run are mentioned below
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
// Allows for a image picker and all its files
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  // Splash screen delay
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync,1000);

  // Initialize a variable to hold our selected image data.
  const [selectedImage, setSelectedImage] = React.useState(null);

  /* Requests permissions to access the camera roll, then launches
  the picker and logs the results.
   */
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    // Stops running the function if the user cancels the dialog
    if (pickerResult.cancelled === true) {
      return;
    }

    // Stores the picked image's uri
    setSelectedImage({ localUri: pickerResult.uri });
  };

  // Share the selected image if the device allows it.
  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert("Uh oh, sharing isn't available on your platform");
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
    await Sharing.shareAsync(imageTmp.uri);
  };

  // Shows the selected image if there is one.
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://imgur.com/TkIrScD.png" }} style={styles.logo} />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    /* Even though the width and height are the same, 
    the resize keeps the correct aspect ratio.*/
    resizeMode: "contain"
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
});
