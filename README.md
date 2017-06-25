# Project 2 - Yelp

Yelp is a Yelp search app using the [Yelp API](https://www.yelp.com/developers/documentation/v3/business_search).

Time spent: **15** hours spent in total

## User Stories

The following **required** functionality is completed:
- [x] Login Screen, just a page before go to Homepage
- [x] Search results page
   - [x] Add filter button and search text input.
   - [x] Display items, rows should be dynamic height according to the content height.
   - [x] Infinite scroll for restaurant results.
- [x] Filter page: (Unfortunately, not all the filters in the real Yelp App, are supported in the Yelp API)
   - [x] Categories should show a subset of the full list, and when click "Show all" row to expand all subset.
   - [x] Clicking on the "Search" button should dismiss the filters page and trigger the search with the new filter settings.
   - [x] Using Redux to storage filter data
 - [x] Show loading page when waiting to fetch data from Yelp


The following **optional** features are implemented:

- [ ] Implement the restaurant detail page with map view (show restaurant's position).
- [ ] Implement a custom switch to look like Yelp app.

- [x] Implement login page with [Facebook SDK](https://github.com/facebook/react-native-fbsdk)
- [ ] Implements TabbarIOS
  - [ ] ListView, the layout as description above
  - [ ] MapView, list all place on Map as Marker, and the layout as below. [Example](https://github.com/airbnb/react-native-maps#using-the-mapview-with-the-animated-api)


The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app functionality!

Please list two areas of the assignment you'd like to **discuss further with your peers** during the next class (examples include better ways to implement something, how to extend your app in certain ways, etc):

1. In this assignment, I didn't work with MapView. Hope to deal with it next time
2. Work with Redux is still complex to me

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='walkthrough.gif' title='Video Walkthrough' width='350px' height='600px' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
