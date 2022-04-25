# A-Scavenger-Hunt-For-The-Ages

## Table of Contents 
- [Introduction](#introduction)
- [Test](#tests)
- [User Story](#user-story)
- [Technologies Used](#technologies-used)
- [Contributors](#contributors)

## Introduction

This is a scavenger hunt application where users can set up hunts and add challenges to complete inside or outside with friends!

Upon opening the application, you will be prompted to log in. Every user must be logged in to view thier hunts and challenges.

By clicking on your profile, you have the option to create a new hunt and challenges.

## Hunts

The user profile is where the user can view hunts they have created, updated the names or discard, and create hunts.


## Challenges

Challenges can be created in the hunt the user created in profile. In the hunt page, the user can create a challenge adding a challenge name, A task to complete and a location. Once a user completes the challenge, there is a checkbox to mark the challenge as complete.


## Tests
[Link to Deployed Application on Heroku](https://a-scavenger-hunt-for-the-ages.herokuapp.com/)


![Desktop view screenshot of homepage](/client/src/assets/Readme.png)
![mobileview](/client/src/assets/mobile.jpg)

## User Story

```md
GIVEN a scavenger hunt web application
WHEN I open the application
THEN I am presented with the homepage with a login and sign up buttons
WHEN I click sign up
THEN I am directed to the signup page with inputs for username, email and password
WHEN I click log in
THEN I am directed to the login page with inputs for email and password
WHEN I am logged in 
THEN I am directed back to the homepage with user's hunts and logout buttons
WHEN I click user's hunts
THEN I am presented with the users profile displaying users scavenger hunts with buttons to rename or discard and a form to create a new scavenger hunt
WHEN I click the input, name a hunt, and click submit
THEN the new scavenger hunt is added to the profile with buttons to rename and discard
WHEN I click rename, a modal appears with an input to rename and a button to save
WHEN I click save 
THEN the huntname is updated
WHEN I click descard
THEN scavenger hunt and all challenges are discarded
WHEN I click on a scavenger hunt name
THEN I am presented with the challenges for the scavenger hunt, each with a checkbox, a link to google maps, buttons to edit or discard and a new challenge form
WHEN I create a challenge, I need to add a challenge name, a challenge task, and address information
WHEN click submit, the challenge is created and it is added to the list of challenges
WHEN I click on the checkbox 
THEN the checkbox is filled with a check to mark the challenge task completed
WHEN I click on the google maps link
THEN I am directed to google maps search result of the address information
WHEN I click on edit button 
THEN a modal appears to update challenge name, challenge task, and address information and a save button
WHEN I click save
THEN the information is updated on the challenge
WHEN I click discard 
THEN the challenge is discarded
```

## Technologies Used

- React
- CSS
- Material UI
- Bootstrap
- JavaScript
- Node.js
- Mongo DB
- Express.js
- Graphql
- Google Analytics

## Contributors

- [Darci Bailey](https://github.com/dbailey321)
- [Chris Kimball](https://github.com/chriskimball)
- [Billy Mott](https://github.com/Billygm)
- [Shane Wiens](https://github.com/ShaneWiens)
- [Alberto Barrientos](https://github.com/Bertokeys1)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)