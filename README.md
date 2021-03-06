# employees-app

[![Build Status](https://travis-ci.com/mike-trout/employees-app.svg?branch=master)](https://travis-ci.com/mike-trout/employees-app)

This project is a basic React app to interact with the [employees-service](https://github.com/mike-trout/employees-service).

By default, it will use the hosted API at [https://api.miketrout.dev/employees/](https://api.miketrout.dev/employees/). Set the `EMPLOYEES_API_URL` environment variable appropriately to use a different version of the API, e.g. local development.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

`npm start`

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

To build the app locally to a container image, run:

`docker build --tag employees-app .`

To run the container locally:

`docker run -d -p 80:80 --name employees-app employees-app`

The app will then be served at [http://localhost/employees-app](http://localhost/employees-app).

The app is automatically built to [Docker Hub](https://hub.docker.com/r/miketrout/employees-app) on a commit to `master` as `miketrout/employees-app:latest`

To deploy to a Kubernetes cluster, run:
```sh
kubectl apply \
-f https://raw.githubusercontent.com/mike-trout/employees-app/master/employees-app-deployment.yaml \
-f https://raw.githubusercontent.com/mike-trout/employees-app/master/employees-app-service.yaml
```
You must first have created the backend resources from [employees-service](https://github.com/mike-trout/employees-service).

The service is exposed as a `NodePort` service.
