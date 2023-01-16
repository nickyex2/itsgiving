# itsgiving
## Netlify App Link
You can view our hosted application [here](https://its-giving.netlify.app)

## Project setup
Make sure to have nodejs installed on your computer [Node.js](https://nodejs.org/en/download/) <br><br>
To see if you already have Node.js and npm installed and check the installed version, run the following commands:
```
node -v 
npm -v 
```

Please do this step before running either development or production so that the dependencies will be loaded correctly <br>
Make sure that you are in the root directory of the folder so that the dependencies will be installed correctly
```
npm install
```

### Compiles and hot-reloads for development 
#### use this command to preview it locally
```
npm run serve
```

### Compiles and minifies for production
#### this command is used for netlify hosting (need not do this if want to host locally)
```
npm run build && cp public/redirect.txt dist/_redirects
```

### Lints and fixes files (if there are any errors)
```
npm run lint
```

## User account details (Dummy account) for testing purposes 
### or you can create an account with an actual email to run the verify and forget password
email: nicky@gmail.com <br>
pass: test12345
