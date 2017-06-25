'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  Button,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import {fetchData} from '../actions/fetchAction';

class ListCom extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      text: "",
      refreshing: false,
      tempParams: ""
    };
  }
  componentDidMount() {
    this.props.getData(this.state.tempParams);
  }
  componentWillReceiveProps(newProps) {
    if(newProps.data.foods.length !== 0)
    {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data.foods)
      })
    }
    if(newProps.setting.isRefresh === true){
      this._getFilterFromSetting(newProps);
      newProps.setting.isRefresh = false;
      console.log("get data filter");
      this.props.getData(this.state.tempParams);
      this.setState({
        tempParams: ""
      })
    }
  }

  _getFilterFromSetting(newProps){
    const {attributes, radius, sort_by, categories} = newProps.setting;
    if(attributes){
      this.setState({
        tempParams: this.state.tempParams += "&attributes=deals"
      })
    }
    if(radius !== 1){
      this.setState({
        tempParams: this.state.tempParams += "&radius=" + radius
      })
    }
    if(sort_by !== ''){
      this.setState({
        tempParams: this.state.tempParams += "&sort_by=" + sort_by
      })
    }
    if (categories !== '') {
      this.setState({
        tempParams: this.state.tempParams += "&categories=" + categories
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
  _filterSearch(text){
    this.setState({text: text})
    var filterData = this.props.data.foods.filter(function(item){
      var itemData = item.name.toLowerCase();
      var textSearch = text.toLowerCase();
      return itemData.indexOf(textSearch) > -1
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filterData)
    })
  }

  _onRefresh(){
    this.setState({refreshing: true});
    this._getFilterFromSetting(this.props);
    this.props.getData(this.state.tempParams);
    this.setState({
      refreshing: false,
      tempParams: ""
    })
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
          value = {this.state.text}
          onChangeText={(text)=>this._filterSearch(text)}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.header()}
        {
          this.props.data.isFetching && <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            animating={this.state.animating}
                    style={{height: 100}}
                    size="large"/>
            <Text style ={{fontWeight:'500'}}>Loading</Text>
          </View>
        }
        {
          this.props.data.foods.length ? (
              <ListView
                refreshControl={<RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                />}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this.renderCell(rowData)}
                enableEmptySections = {true}
              />
          ) : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>NO DATA</Text></View>
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
    data: state.dataReducer,
    setting: state.settingReducer
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getData: (params) => dispatch(fetchData(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCom);
