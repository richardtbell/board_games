# Purpose

This app is meant to make it easier to organise games nights. The end goal is to have something which people can organise an event and have people opt to attend the event. Depending on the number of people going, it will suggest appropriate games, or suggest how to split the group into smaller groups. 
Other nice to have features such as voting on which games to play, keeping a record of the games played and scores.

# General Info on app
This is bootstrapped from create-react-app. 

Using firebase DB with command line helper (npm install -g firebase-tools).

Currently anyone can read or write to the DB - this will need to change before it's being used properly.

There's an npm script to build and deploy.

# TODO

## Epics
* Add group
* Join group
* Host event
* Invite users
* Email users that they were invited to group / event
* Users accept/decline invite
* Split group
* Voting
* Track games played

## Next Steps
* Add styles
* Add form validation
* Table format
* Add group
* Create event in group
* Scrape games from boardgamegeek
* Redirects (Signin -> Profile, anywhere signed out -> signin)
* SuperAdmin role?

## TECH DEBT
* Test fire.js && extract mocks into same file
* Sort out DB
* Don't update state optimistically?
* Users.js - need to call Object.values - don't like this
* Test routes in App.test.js
* Remove the need to configure the adaptor in every test file
* Add "attending" to event but not users
* Games should be a purely presentational list of games (props should be an array)
* Only able to click attending if its your own user
* Signin / logout 