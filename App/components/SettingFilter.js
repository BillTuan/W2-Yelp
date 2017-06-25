/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Picker,
  TouchableOpacity
} from 'react-native';
import {Switch} from 'react-native-switch';
import {connect} from 'react-redux';
import {actionCreators} from '../actions/saveFilterAction';

const DISTANCE_OPTION = ["0.3 miles", "1 mile", "5 miles", "20 miles"];
const DISTANCE_RETURN = ["0.3", "1", "5", "20"];
const SORT_BY_OPTION = ["best_match", "rating", "review_count", "distance"];
class SettingCom extends Component {
  constructor(props) {
    super(props);
    tempCategory = [];
    categories = "";
    this.state = {
      selectedDistance: "482",
      selectedSort: 'best_match',
      attributes: true,
      listCategory: [],
      loadMore: false,
      stepLoad: 1
    };
  }
  getCategoryFromApi(){
    return fetch("https://www.yelp.com/developers/documentation/v3/all_category_list/categories.json")
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        listCategory: responseJSON
      })
    }).catch((err) => console.log(err))
  }

  componentDidMount(){
    this.getCategoryFromApi();
  }
  _loadCategory(){
    var viewCategory = [];
    if(this.state.listCategory.length > 2){
      var loadCond = this.state.stepLoad == 1 ? 5 : this.state.stepLoad*100
      for (let i = 0; i < loadCond ; i++) {
        var view = <View key={i} style={styles.offer}>
                      <Text style={{}}>
                        {this.state.listCategory[i].title}
                      </Text>
                      <Switch
                        value = {false}
                        onValueChange = {(value) => {this._changeValueSwitch(value, this.state.listCategory[i].alias)}}
                        backgroundActive={'#4cb4ff'}
                        backgroundInactive={'#cccccc'}
                        circleActiveColor={'#a50010'}
                        circleInActiveColor={'#cccccc'}
                      />
                  </View>
        viewCategory.push(view);
      }
    }
    return viewCategory
  }

  _changeValueSwitch(value, alias){
    if(value){
      tempCategory.push(alias)
    }else{
      var pos = tempCategory.indexOf(alias);
      tempCategory.splice(pos, 1);
    }

    var temp = "";
    categories = "";
    for (let i = 0; i < tempCategory.length; i++) {
      if(i !==  (tempCategory.length-1)){
        temp = ","
      }else{
        temp= ""
      }
      categories += tempCategory[i] + temp
    }
    console.log(categories);
  }
  _saveFilter(){
    this.props.dispatch(actionCreators.fetchDataSetting(this.state.attributes, this.state.selectedDistance, this.state.selectedSort, categories));
    this.props.navigation.goBack();
  }

  header(){
    return(
      <View style={styles.header}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
            <View style={styles.button}>
              <Text style={styles.titleButton}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>
            Setting
          </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <TouchableOpacity onPress = {() => this._saveFilter()}>
            <View style={styles.button}>
              <Text style={styles.titleButton}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.header()}
        <ScrollView>
        <View style={{}}>
            <View style={styles.offer}>
              <Text style={{}}>
                Offer Deals
              </Text>
              <Switch
                onValueChange = {(value) => this.setState({attributes: value})}
              />
            </View>
            <Text style={{}}>
              Distance
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue = {this.state.selectedDistance}
                onValueChange = {(value) => this.setState({selectedDistance: value})}
                >
                  <Picker.Item label="0.3 miles" value = "482"/>
                  <Picker.Item label="1 miles" value = "1609" />
                  <Picker.Item label="5 miles" value = "8046" />
                  <Picker.Item label="20 miles" value = "32186" />
              </Picker>
            </View>
            <Text style={{}}>
              Sort By
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue = {this.state.selectedSort}
                onValueChange = {(value) => this.setState({selectedSort: value})}
                >
                  <Picker.Item label="Best match" value="best_match" />
                  <Picker.Item label="Rating" value="rating" />
                  <Picker.Item label="Review count" value="review_count" />
                  <Picker.Item label="Distance" value="distance" />
              </Picker>
            </View>
            <Text style={{}}>
              Category
            </Text>
            {this._loadCategory()}
            <View style={{flex: 1}}>
              <Button
                title = 'Load more'
                onPress = {() => this.setState({stepLoad: this.state.stepLoad + 1})}
              />
            </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}


export default connect()(SettingCom);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  offer: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picker: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor:'red',
    borderRadius:4,
    borderColor:'#ffffff',
    borderWidth:1,
    height : 35,
    alignItems:'center',
    justifyContent:'center',
    padding:5,
  },
  titleButton: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  }
});
