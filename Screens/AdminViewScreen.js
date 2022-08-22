import React, {Component} from 'react';
import {Text, StyleSheet, Alert, View, TextInput, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/AntDesign';

const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: <Ionicons name="edit" size={30} color={'white'} />,
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: <Ionicons name="delete" size={30} color={'white'} />,
    name: 'delete',
    position: 1,
  },
];
let SQLite = require('react-native-sqlite-storage');

export default class ViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: this.props.route.params.id,
      product: null,
    };
    this.db = SQLite.openDatabase(
      {name: 'assignmentdb'},
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
  }
  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM products WHERE id=?',
        [this.state.productID],
        (tx, results) => {
          console.log(results.rows.item(0));
          if (results.rows.length) {
            this.setState({product: results.rows.item(0)});
          }
        },
      ),
    );
  }
  _delete() {
    Alert.alert('Confirm to delete ?', this.state.product.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction(tx => {
            tx.executeSql('DELETE FROM products WHERE id = ?', [
              this.state.productID,
            ]);
          });
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }
  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }
  componentDidMount() {
    this._queryByID();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.product.name});
  }
  render() {
    let product = this.state.product;
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
            <Image source={{uri: product ? product.image : ''}} 
              style={{
                width: '40%',
                height: undefined,
                aspectRatio: 1,
              }}/>
          </View>
            <Text style={styles.TextLabel}>Name:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.name : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Category:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.category : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Price:</Text>
            <TextInput
                style={styles.TextInput}
                value={product ? product.price : ''}
                orientation={'vertical'}
                editable={false}
            />
            <Text style={styles.TextLabel}>Description:</Text>
            <TextInput
                style={styles.TextInput}
                multiline={true}
                value={product ? product.description : ''}
                orientation={'vertical'}
                editable={false}
            />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'} 
          onPressItem={name => {
            switch (name) {
              case 'edit':
                this.props.navigation.navigate('AdminEditScreen', {
                  id: product ? product.id : 0,
                  headerTitle: product ? product.name : '',
                  refresh: this._queryByID,
                  homeRefresh: this.props.route.params.refresh,
                });
                break;
              case 'delete':
                this._delete();
                break;
            }
          }}
        />
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
    color: 'black',
  },
});