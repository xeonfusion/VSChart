### VSChart implements a ReactJS based digital Anaesthesia chart

It supports timeline based adding or removing of intraoperative anaesthetic medications and automatic loading of monitor vital signs from the CSV or JSON file exported by VSCaptureWave or VSCaptureMP C# app (https://sourceforge.net/projects/vscapture/)

<img width="1440" alt="Screen Shot 2022-05-25 at 5 15 41 PM" src="https://user-images.githubusercontent.com/10882257/170272620-52da8e62-021f-47d5-b2df-c1fb6399faa9.png">
<img width="1440" alt="Screen Shot 2022-05-25 at 5 17 27 PM" src="https://user-images.githubusercontent.com/10882257/170272651-d32195fc-b403-4cec-a70f-840a253a4175.png">
<img width="1440" alt="Screen Shot 2022-05-25 at 5 18 34 PM" src="https://user-images.githubusercontent.com/10882257/170272660-9b8fde34-d18b-468b-86c1-42a4332df822.png">
<img width="1440" alt="Screen Shot 2022-05-25 at 5 19 17 PM" src="https://user-images.githubusercontent.com/10882257/170272668-7bcd0ca1-2166-4cce-855f-f6369d20b961.png">
<img width="1440" alt="Screen Shot 2022-05-25 at 5 19 32 PM" src="https://user-images.githubusercontent.com/10882257/170272673-85ff0d53-2ef4-47ae-acf7-1a8c15d6c251.png">
<img width="1440" alt="Screen Shot 2022-05-25 at 5 20 32 PM" src="https://user-images.githubusercontent.com/10882257/170272679-5320a2f8-3665-4388-85b8-e61757ed03a7.png">

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Install node module dependencies for the app before start.<br />

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm devserver`

Runs the app in the development mode on port 3000 with a json-server running concurrently on port 5000.<br />
Send JSON data from VSCaptureWave C# app to http://localhost:5000/posts to read and chart vitals data with VSChart. <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
