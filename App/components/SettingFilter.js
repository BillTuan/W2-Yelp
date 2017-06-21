/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Picker
} from 'react-native';
import {Switch} from 'react-native-switch';

const DISTANCE_OPTION = ["0.3 miles", "1 mile", "5 miles", "20 miles"];
const DISTANCE_RETURN = ["0.3", "1", "5", "20"];
const SORT_BY_OPTION = ["best_match", "rating", "review_count", "distance"];
export default class SettingCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistance: '0.3',
      selectedSort: 'best_match',
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
      for (let i = 0; i < 10*this.state.stepLoad ; i++) {
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
      console.log(alias);
    }
  }

  header(){
    return(
      <View style={styles.header}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Button
            backgroundColor = 'blue'
            title = 'Cancel'
            onPress = {() => this.props.navigation.goBack()}
          />
        </View>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>
            Setting
          </Text>
        </View>
        <View style={{flex: 2}}>
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
              <Switch/>
            </View>
            <Text style={{}}>
              Distance
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue = {this.state.selectedDistance}
                onValueChange = {(value) => this.setState({selectedDistance: value})}
                >
                  <Picker.Item label="0.3 miles" value="0.3" />
                  <Picker.Item label="1 miles" value="1" />
                  <Picker.Item label="5 miles" value="5" />
                  <Picker.Item label="20 miles" value="20" />
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
  }
});