import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';

export default function CreateScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(
    Camera.Constants.Type.back,
  );

  useEffect(() => {
    (async () => {
      const { status } =
        await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    // const location =
    //   await Location.getCurrentPositionAsync();
    // console.log('location', location);
    setPhoto(photo.uri);
    console.log('photo', photo);
  };

  const sendPhoto = () => {
    console.log('navigation', navigation);
    navigation.navigate('Posts', { photo });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={setCamera}
      >
        {photo && (
          <View style={styles.takePictureContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.snapContainer}
          onPress={takePhoto}
        >
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity
        style={styles.sendContainer}
        onPress={sendPhoto}
      >
        <Text style={styles.push}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  takePictureContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  snap: {
    color: '#fff',
  },
  sendContainer: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    color: '#ff0000',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  push: {
    fontSize: 20,
  },
  snapContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  camera: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
// import React, { useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import { Camera } from 'expo-camera';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const CreateScreen = () => {
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState(null);

// const takePhoto = async () => {
//   const photo = await camera.takePictureAsync();
//   console.log(photo.url);
//   setPhoto(photo.url);
// };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         {photo && (
//           <View style={styles.takePictureContainer}>
// <Image
//   source={{ url: photo }}
//   style={{ height: 200, width: 200 }}
// />
//           </View>
//         )}
// <TouchableOpacity
//   style={styles.snapContainer}
//   onPress={takePhoto}
// >
//   <Text style={styles.snap}>SNAP</Text>
// </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
// snap: {
//   color: '#fff',
// },
// snapContainer: {
//   marginBottom: 20,
//   borderWidth: 1,
//   borderColor: '#ff0000',
//   borderRadius: 50,
//   width: 70,
//   height: 70,
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// takePictureContainer: {
//   position: 'absolute',
//   top: 50,
//   left: 10,
//   borderColor: '#fff',
//   borderWidth: 1,
// },
// });

// export default CreateScreen;
