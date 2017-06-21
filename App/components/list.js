'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  Button,
  TextInput
} from 'react-native';
import {connect} from 'react-redux';
import {fetchData} from '../actions/fetchAction';

class ListCom extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  // static navigationOptions = ({navigation}) => ({
  //       headerStyle: {backgroundColor: 'red'},
  //       headerTintColor: 'white',
  //       headerLeft: <Button color='blue' title = 'Filter' onPress={() => navigation.navigate('Setting_Screen')} />
  //     })

  componentDidMount() {
    this.props.getData();
  }
  componentWillReceiveProps(newProps) {
    if(newProps.data.foods.length !== 0)
    {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data.foods)
      })
    }
  }
  renderCell(rowData){
    var category = "";
    var i = 0;
    for (i ; i < rowData.categories.length - 1; i++) {
      category += rowData.categories[i].title + ", ";
    }
    category += rowData.categories[i].title;
      return(
        <View style={styles.cell}>
          <View style={{flex: 3}}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: rowData.image_url}}
            />
          </View>
          <View style={{flex: 7}}>
            <Text style={{}}>
              {rowData.name}
            </Text>
            <Text style={{}}>
              {rowData.rating}/{rowData.review_count}
            </Text>
            <Text style={{}}>
              {category}
            </Text>
          </View>
        </View>
      )
  }
  header(){
    return(
      <View style={styles.header}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Button
            backgroundColor = 'blue'
            title = 'Filter'
            onPress = {() => this.props.navigation.navigate('Setting_Screen')}
          />
        </View>
        <TextInput
          style = {{flex: 8, borderWidth: 1, backgroundColor: 'white'}}
        />
      </View>
    )
  }

  render() {
    console.log(this.props);
    return (
      <View style={{flex: 1}}>
        {this.header()}
        {
          this.props.data.isFetching && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{}}>Loading... </Text></View>
        }
        {
          this.props.data.foods.length ? (
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderCell(rowData)}
                enableEmptySections = {true}
              />
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell:{
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 3
  },
  header: {
    height: 50,
    backgroundColor: 'red',
    flexDirection: 'row'
  }
});

function mapStateToProps(state) {
  return{
    data: state.dataReducer
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(fetchData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCom);
