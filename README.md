# FAR Verified templates

## Setup

Install aurelia-cli and dependencies

```
npm install aurelia-cli -g
npm install
```

## Run development server

```
au run --watch
```

## Deploying the app

Run the following build command:

```
au build --env prod
```

Then copy the file index.html and the folder /scripts to the main deployment folder on your server.
