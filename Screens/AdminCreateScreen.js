import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, Button, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

let SQLite = require('react-native-sqlite-storage');

export default class CreateScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
    };
    this._insert = this._insert.bind(this);
    this.db = SQLite.openDatabase(
     {name: 'assignmentdb'},
      this.openDb,
      this.errorDb,
    );
  }

  openGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
    };
  
    launchImageLibrary(options, response => {
  
    console.log('Response = ',response);
    if(response.didCancel){
      console.log('User cancelled image picker');
    }
    else if(response.error){
      console.log('ImagePickerError',response.error);
    }
    else if(response.customButton){
      console.log('User tapped custom button',response.customButton);
    }
    else{
      this.setState({image: response.assets[0].uri});
    }
    });
  };

  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: 'Add New Product'});
  }

  _insert() {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO products(name,image,price,category,description) VALUES(?,?,?,?,?)', [
        this.state.name,
        this.state.image,
        this.state.price,
        this.state.category,
        this.state.description,
      ]);
    });

    this.props.route.params.refresh();
    this.props.navigation.goBack();
  }

  openDb() {
    console.log('Database opened');
  }
  errorDb(err) {
    console.log('SQL Error: ' + err);
  }
  render() {
    let product = this.state.product;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.TextLabel}>Name : </Text>
          <TextInput
              style={styles.TextInput}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.TextLabel}>Image : </Text>
        </View>
        <View style={{ width: 200, height: 200, borderWidth: 1, margin:10,}}>
          <Image source={{uri: this.state.image}} 
          style={{
            width: '100%',
            height: undefined,
            marginBottom: 20,
            aspectRatio: 1,
          }}/>
        </View>
        <View style={{flexDirection:'row',marginLeft:10,}}>
        <Button
            title='Pick image'
            onPress={this.openGallery}
        />
        </View>
        <View style={styles.section}>
          <Text style={styles.TextLabel}>Price : RM</Text>
          <TextInput
              style={styles.TextInput}
              onChangeText={(price) => this.setState({price})}
              value={this.state.price}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.TextLabel}>Category : </Text>
          <TextInput
              style={styles.TextInput}
              onChangeText={(category) => this.setState({category})}
              value={this.state.category}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.TextLabel}>Description : </Text>
          <TextInput
              multiline={true}
              style={styles.TextInput}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
          />
        </View>
        <View style={{alignItems: 'center', flex:1, width: '100%'}}>
          <Button
            title={'Save'}
            onPress={this._insert}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section:{
    flexDirection: 'row',
  },
  TextLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 20,
    color: '#000099',
    width: '100%',
    borderBottomWidth:1,
    borderColor:'#ccc',
    marginBottom: 20,
    marginLeft: 20,
    paddingBottom: 0,
  },
});