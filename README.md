# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Portfolio update instructions

This folder contains modified files for your React + Tailwind portfolio.  To integrate the changes into your repository (`abdarrahmanayyaz.github.io`):

1. **Replace component files** — copy the files from `src/components` in this folder into the same location in your repo:

   * `Home.jsx` — updated hero section that emphasises AI and cloud troubleshooting.
   * `About.jsx` — updated about section with AI/cloud description and your motto.

2. **Update project data** — replace `src/data/data.js` in your repo with the version in this folder.  It adds your new projects (TriagedAI and Advancely) and imports the new images.

3. **Add new assets** — copy `triagedai.png` and `advancely.png` from `src/assets` in this folder into `src/assets` in your repo.  These images will be used for the new project cards.

4. **Install react‑icons (if not already installed)** — the new `Home.jsx` imports `HiArrowNarrowRight` from `react-icons/hi`.  If your project doesn’t already have `react-icons`, install it with:

   ```bash
   npm install react-icons
   ```

5. **Rebuild and deploy** — run your project locally (`npm start`) to verify that the new sections render correctly.  Then commit the changes and deploy to your GitHub Pages or preferred hosting platform.

These updates will add two new projects, update your hero/about copy to highlight your AI and cloud expertise and lay the groundwork for further design enhancements such as glassmorphism cards and gradient buttons.

