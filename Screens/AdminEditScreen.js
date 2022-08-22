import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, Button, Image} from 'react-native';

let SQLite = require('react-native-sqlite-storage');

export default class EditScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.route.params.id,
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
    };
    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'assignmentdb'},
      this.openDb,
      this.errorDb,
    );
  }
  componentDidMount() {
    this._query();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.name});
  }
  _query() {
    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products WHERE id = ?',
        [this.state.productID],
        (tx, results) => {
          if (results.rows.length>0) {
            this.setState({
              name: results.rows.item(0).name,
              category: results.rows.item(0).category,
              price: results.rows.item(0).price,
              description: results.rows.item(0).description,
              image: results.rows.item(0).image,
            });
            console.log("data inserted into state");
          }
        },
      );
    });
  }
  _update() {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE products SET name=?,price=?,category=?,description=? WHERE id=?', [
        this.state.name,
        this.state.price,
        this.state.category,
        this.state.description,
        this.state.productID,
      ]);
    });
    this.props.route.params.refresh();
    this.props.route.params.homeRefresh();
    this.props.navigation.goBack();
  }
  openDb() {
    console.log('Database opened');
  }
  errorDb(err) {
    console.log('SQL Error: ' + err);
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom:10,
            borderColor: '#ccc',
            }}>
            <Image source={{uri: this.state.image}} 
              style={{
                width: '40%',
                height: undefined,
                aspectRatio: 1,
              }}/>
          </View>
            <Text style={styles.TextLabel}>Name:</Text>
            <TextInput
                style={styles.TextInput}
                value={this.state.name}
                onChangeText={name => {
                    this.setState({name});
                }}
                orientation={'vertical'}
            />
            <Text style={styles.TextLabel}>Price:</Text>
            <TextInput
                style={styles.TextInput}
                value={this.state.price}
                onChangeText={price => {
                    this.setState({price});
                }}
                orientation={'vertical'}
            />
            <Text style={styles.TextLabel}>Category:</Text>
            <TextInput
                style={styles.TextInput}
                value={this.state.category}
                onChangeText={category => {
                    this.setState({category});
                }}
                orientation={'vertical'}
            />
            <Text style={styles.TextLabel}>Description:</Text>
            <TextInput
                style={styles.TextInput}
                multiline={true}
                value={this.state.description}
                onChangeText={description => {
                    this.setState({description});
                }}
                orientation={'vertical'}
            />
            <Button
                title={'Save'}
                onPress={this._update}
            />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: '#000099',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});