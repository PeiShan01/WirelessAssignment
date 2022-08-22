import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/AntDesign';

let SQLite = require('react-native-sqlite-storage');

const actions = [
  {
    text: 'Add',
    icon: <Ionicons name="pluscircleo" size={40} color={'white'} />,
    name: 'add',
    position: 1,
  },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this._deleteTable = this._deleteTable.bind(this);
    this._query = this._query.bind(this);
    this._databasePrepare = this._databasePrepare.bind(this);
    this.db = SQLite.openDatabase(
     {name: 'assignmentdb'},
      this.openCallback,
      this.errorCallback,
    );
  }
  componentDidMount() {
    //this._deleteTable();
    this._databasePrepare();
    this._query();
  }

  _deleteTable(){
    this.db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE products',
        [],(sqlTxn, res) => {
          console.log('products table deleted');
        },
    );});
  }

  _databasePrepare() {
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), image VARCHAR(20), price VARCHAR(20), category VARCHAR(20), description VARCHAR(100))',
        [],
        (sqlTxn, res) => {
          console.log('products table ready');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  }
  

  _query() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM products ORDER BY name', [], (tx, results) =>
        this.setState({products: results.rows.raw()}),
      ),
    );
  }

  openCallback() {
    console.log('database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }

  render() {
    console.log(this.state.products);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={
            <View style={{flexDirection:'row', flex:1, backgroundColor:'#7fffd4',marginTop:20}}>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Image</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Name</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Category</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Price</Text>
              </View>
              <View  style={styles.item}>
              <Text style={styles.itemTitle}>Description</Text>
              </View>
            </View>
          }
          renderItem={({item}) => (
          <TouchableHighlight
              underlayColor="pink"
              onPress={() => {
                this.props.navigation.navigate('AdminViewScreen', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: this._query,
                });
              }}>
          <View style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.item}>
            <Image source={{uri: item.image}} style={{
              width:'100%',
              margin:5,
              flex:1,
            }}/>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.name}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.category}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>RM{item.price}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemSubtitle}>{item.description}</Text>
            </View>
          </View>
          </TouchableHighlight>
          )}
        />
      <FloatingAction
          actions={actions}
          overrideWithAction={true}
          color={'#a80000'}
          onPressItem={() => {
            this.props.navigation.navigate('AdminCreateScreen', {refresh:this._query});
          }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 14,
    olor: '#000',
  },
});