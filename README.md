
# Spendaway - A Full-Stack Budgeting App

This is a full-stack and responsive budgeting application built with React and Node. Spendaway helps people with breaking down their 
spending and income. Both visual and numeric breakdown to provide as much information as possible to the user. 
This app is aimed towards the everyday spender. Sometimes just staring at numbers on your banking app makes it 
difficlt to asses how well you are saving and spending money. Spendaway is here to help!

# Related

Here is the back end API for this project

[Spendaway - Node.js Back End](https://github.com/Danko2111/Spendaway-Server)

[Spendaway - Live Site](https://spendaway.netlify.app/)




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### API 

`REACT_APP_BASE_URL = {YOUR DEPLOYMENT HERE}`

## Run Locally
1. Once you have cloned this repository make sure to run `npm i` to install any dependancies you might be missing.
2. Make sure you download [Spendaway Back-End](https://github.com/Danko2111/Spendaway-server) and follow the installation steps in that repository.
3. Once all the steps above as well as on the back-end have been completed, now run 
```bash
npm run dev
```
for the back-end, and
```bash
npm start
```
for the front end and the app should be available on your browser.
Dummy Data is available on this account: 
```bash
username: Admin
```
```bash
password: admin
```
## App Demo

![Spendaway Gif 1](https://github.com/Danko2111/Spendaway/blob/main/src/Data/Gifs/ezgif.com-gif-maker.gif)

![Spendaway Gif 2](https://github.com/Danko2111/Spendaway/blob/main/src/Data/Gifs/ezgif.com-gif-maker%20(1).gif)

![Spendaway Gif 3](https://github.com/Danko2111/Spendaway/blob/main/src/Data/Gifs/ezgif.com-gif-maker%20(2).gif)


## Tech Stack

#### Front-End

-   React - was used as the front end framework. This would create a perfect base for this app  

-   React Charts - was used to create the beautiful yet dynamic charts used throughout the project.

-   Axios - was used for making async API calls to the custom Node.js Backend. 

-   Sass - was used to handle all front-end styling.

#### Back-End

-   Node.js - handled the runtime environment for Express.

-   Express.js - was used to handle all API calls comming in from the front end. Creating routes and controllers to help with separation of concerns. 

-   JWT - was implemented for user authorization.

-   Bcrypt - was used to encrypt and decrypt user passwords to strengthen user-info security.  All user data was stored in the DB 

-   Knex - was used to query the MySQL DB from the backend. Allowing for custom API calls to be handled with ease.

#### Database

-   MySQL - was the optimal choice, as the potentially vast amounts of transactional information would need to be handled in a robust and efficient manner.


