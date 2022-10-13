# Description

[Create React App](https://create-react-app.dev/) application that uses drag and drop to interact with a grid of products

It uses Typecript, Jest for testing and the following 3rd party libraries:

- [React Query](https://react-query.tanstack.com/) for fetching and caching data
- [DnDKit](https://dndkit.com/) for drag and drop interaction
- [Nanoid](https://github.com/ai/nanoid/) to generate random ids
- [React Zoom Pan Pinch](https://github.com/proNestorAps/react-zoom-pan-pinch) to handle the zoom on the grid

---

## Installation

```bash
yarn
```

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\

After running it, open [THIS LINK](http://localhost:3000/?productIds=762644,538476,629249,119144,728086,776655,609473,713975,211502,733834,347676,759598,166597,710316,668527) in order to provide the product ids via query params.

You have to provide the productIds separated by commas in order to be parsed

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start:prod`

Runs the app in the production mode.\
You have to run `yarn build` first.\
Open [THIS LINK](http://localhost:3000/?productIds=762644,538476,629249,119144,728086,776655,609473,713975,211502,733834,347676,759598,166597,710316,668527) to view it in the browser.

---

## Stay in touch

- Author - [Carlos Díaz](https://github.com/linkmetal)
