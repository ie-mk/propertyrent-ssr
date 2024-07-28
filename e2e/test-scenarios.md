Test scenarios

############ 1. Not logged in ########################

1.1 Not logged in - check booking dates
Given I navigate to platform url
And I wait "2000" ms
And I open date picker
And I select start date first day of the week on the date picker
And I select same week last day of the week on the date picker
And I wait "3000" ms
And I enter the number of guests "3"
And I wait "3000" ms
Then I click button "Search Now"
And I can see "More filters"
And I wait "5000" ms
Then I click "1" result in the results page
And I can see "Reserve"
And I can see "Location"
And I can see "Contact host"
And I can see "More places to stay"

1.2. Not logged in - adding to favourites
Given I navigate to platform url
And I wait "2000" ms
And I open date picker
And I select start date first day of the week on the date picker
And I select same week last day of the week on the date picker
And I wait "2000" ms
And I enter the number of guests "3"
And I wait "2000" ms
Then I click button "Search Now"
And I can see "More filters"
And I add first 2 items from the list to favourites
Then I refresh page
Then The number of favourites on the results page should be "2"

############ 2. Logged in ###############################

2.1 Logged in - Create an ad
Given I logout if logged in
And I Login with the registered test user
Then I navigate to user profile page
And I click the Properties list tab
Then I click button "Create new"
And I can see "Title"
And I can see "Type of the property"
And I can see "Number of Rooms"
And I can see "Number of Bedrooms"
And I can see "Number of Bathrooms"
And I can see "Price per night"
And I can see "Currency"
And I can see "Max Number Of Guests"
And I can see "Location description"
And I can see "Full description"
And I fill add description data
| Title | Best flat in Hyderabad |
| Number of Rooms | 3 |
| Number of Rooms | 3 |
| Number of Bedrooms | 2 |
| Number of Bathrooms | 2 |
| Price per night | 199 |
| Currency | EUR |
| Max Number Of Guests | 6 |
| Location description | Best location in Hyderabad |
| Full description | Please book ASAP as almost fully booked |
And I click button "Update description"
Then I refresh the page
And I check the values of the description
| Title | Best flat in Hyderabad |
| Number of Rooms | 3 |
| Number of Rooms | 3 |
| Number of Bedrooms | 2 |
| Number of Bathrooms | 2 |
| Price per night | 199 |
| Currency | EUR |
| Max Number Of Guests | 6 |
| Location description | Best location in Hyderabad |
| Full description | Please book ASAP as almost fully booked |

2.2 Logged in - adding to favourites
** skip for now ** Given I logout if logged in
** skip for now ** Given I Login with the registered test user
I navigate to user profile page
And I click favourites tab
And The number of saved favourites should be "0"
Then I navigate to results page
And I add first 2 items from the list to favourites
Then I navigate to user profile page
And I click favourites tab
And The number of saved favourites should be "2"
Then I click save to favourites icon
And The number of saved favourites should be "1"

2.3 Logged in - upload ad pictures
Given I logout if logged in
And I Login with the registered test user
Then I navigate to user profile page
And I click the Properties list tab
Then I click button "Create new"
And I click button "Select Pictures"
