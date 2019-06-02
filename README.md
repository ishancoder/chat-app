This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to get this thing working ?
1. Clone the repository using `git clone` or Just download it whichever your prefer.
2. `cd` into the directory.
3. Run `npm install` or `yarn` (if you're using yarn).
4. Sit back relax & let the dependecies download.
5. Run `npm start` or `yarn start` (Again if you're using it)
6. A browser window will automatically open & in case if it didn't open your favourite browser and go to : [http://localhost:3000](http://localhost:3000).


## What have I implemented ?
1. First I'm assuming the user is already logged in which is going to be me by default. If you want you to be logged in add yourself in `api.js` file & change `App.js` to load your data by default.
2. All your contacts will be shown in the right pane. If you want to add anyone just click on the top "Plus" button and type a **Valid User Name** (Note: Since this is only the front end part you have can only type a valid username which is defined in the `api.js` file). I desperatly wanted to implement a searchable dropdown here but due to time contraints I didn't managed to do it.
3. You can navigate between chats using **Arrow UP** and **Arrow DOWN** keys.
4. You can record and send your audio as well. Just click on the **Microphone** button and it will start recording and click it again to stop and send your recording. (Make sure you have your microphone connected otherwise it'll give you and alert that you device doesn't support audio recording).
5. Anything which is written as @Username will going to be rendered as <mark>@Username</mark> iff the user is in you contact list.
6. This app will work fine with a good tablet/desktop or laptop. I was not able to make it responsive again due to time constraints. 

## What did I use to build it ?
1. **React.js** my choice of front end framework for almost all projects.
2. **node-uuid** to dynamically generate mock chat ids.
3. **SASS** Syntactically Awesome.
4. Where is **REDUX** ? you might be asking but to be honest I didn't felt the need of using **REDUX** it this project. 