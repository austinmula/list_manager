/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

function App() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [caption, onChangeCaption] = useState('');
  handleChoosePhoto = async () => {
    const options = {mediaType: 'photo'};
    const result = await launchImageLibrary(options, result => {
      if (result.assets) {
        setImage(result.assets[0]);
      }
    });

    console.log(result.assets[0].uri);
  };

  handleCreatePost = () => {
    if (image?.uri && caption) {
      setData(prev => [...prev, {image: image?.uri, caption}]);
      setImage(null);
      onChangeCaption('');
    }
  };

  handleDelete = caption => {
    setData(data.filter(item => item.caption !== caption));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="#f3f3f3" backgroundColor="#3333" />
      <View style={{gap: 5, flexDirection: 'row'}}>
        <View style={styles.inputContainer}>
          <TextInput
            editable
            multiline
            onChangeText={onChangeCaption}
            value={caption}
            placeholder="Enter post details"
            // style={{padding: 10}}
          />
        </View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleChoosePhoto}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 7}}>
          <>
            <Image source={{uri: image.uri, width: 200, height: 200}} />
          </>
        </View>
      )}

      <Button title="Create Post" onPress={handleCreatePost} />

      {data.length === 0 ? (
        <View>
          <Text>No posts Yet</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Image source={{uri: item.image, width: '100%', height: 200}} />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    backgroundColor: '#f3f3f3',
                    flex: 1,
                  }}>
                  <Text style={{fontSize: 20}}>{item.caption}</Text>
                  <Button
                    title="Delete"
                    color={'red'}
                    onPress={() => handleDelete(item.caption)}
                  />
                </View>
              </View>
            )}
          />

          {/* {data.map((item, index) => (
            <View>
              <Text key={index}>{item.caption}</Text>
            </View>
          ))} */}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customButton: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    elevation: 4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 300,
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: 800,
    color: '#fff',
  },
  container: {
    padding: 4,
    gap: 10,
  },
  inputContainer: {
    borderWidth: 1,
    flex: 1,
    borderColor: 'thistle',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});

export default App;
