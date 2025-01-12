The solution is to use the `onImageCaptured` callback provided by the `takePictureAsync` method.  This callback provides the photo object with a valid `uri` after the image is completely processed. 

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null && <Text>Requesting permissions...</Text>}
      {hasPermission === false && <Text>No access to camera</Text>}
      {hasPermission === true && (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          </Camera>
          <Button title="Take Picture" onPress={takePicture} />
          {image && (
            <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
          )}
        </View>
      )}
    </View>
  );
};
export default App;
```