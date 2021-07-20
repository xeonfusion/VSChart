### VSChart implements a ReactJS based digital Anaesthesia chart

It supports timeline based adding or removing of intraoperative anaesthetic medications and automatic loading of monitor vital signs from the CSV or JSON file exported by VSCaptureWave or VSCaptureMP C# app (https://sourceforge.net/projects/vscapture/)

<img width="1438" alt="Screenshot 2021-07-19 at 8 50 44 PM" src="https://user-images.githubusercontent.com/10882257/126343603-dea42d23-b180-42e6-9a7f-7435b410f443.png">

<img width="1552" alt="Screenshot 2021-07-19 at 8 46 16 PM" src="https://user-images.githubusercontent.com/10882257/126344034-2613139c-72e4-4c22-89e0-a571ee36c337.png">

![Screen Shot 2021-04-23 at 1 08 27 PM](https://user-images.githubusercontent.com/10882257/126348055-3dd015bc-c62d-4967-a60e-7a77a3af7bb2.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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
