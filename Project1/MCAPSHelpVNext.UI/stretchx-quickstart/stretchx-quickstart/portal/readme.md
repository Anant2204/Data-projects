# Introduction 
Its container for web components  

# What features are available
1. Authentication service (ADAL, MSAL, MSAL v2)
2. Telemetry client
3. http client
4. Internationalization with React-Intl
5. React Router (page navigation)
6. React hook
7. Fluent UI controls 
8. CSEO Coherence Controls (Left Navigation, Header)
9. OCV integration
10.	State management with Redux
11.	Finance BOT integration
12. UX Theme integration
13. Dashboard customization
14. Onboard new portal extension developed by different teams 

# Get Started

Download and install Node 18.x or higher from below link.
https://nodejs.org/en/  

To setup the NPM feed please execute the below commands. 

```console
npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false 
```

```console
vsts-npm-auth -config .npmrc
```
If you get following error 
vsts-npm-auth : File C:\Program Files\nodejs\vsts-npm-auth.ps1 cannot be loaded. The file C:\Program Files\nodejs\vsts-npm-auth.ps1 is not 
digitally signed.
Then run following command

```console
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
Start by downloading the project dependencies using following commands

```console
npm i
```
```console
npm start
```

error :0308010C:digital envelope 
routines::unsupported" 

which is due to an existing issue with OpenSSL, run below command

```console
set NODE_OPTIONS=--openssl-legacy-provider"(recommended only for localhost) and then re-run "npm start"
```

To Do portal will start running on localhost:3000 and your browser opens a new window

# Changes as per your application
1. REACT_APP_AD_CLIENT_ID and other config values in the .env files as per your requirement
2. Register the extension in the extensionRegistration.json in public/data & make sure it same as the extensionRegistration.json created in webextension
	2.1. Create GUID for each extension and replace extensions element
	2.2. Create GUID for each page and replace the routes and pages
3. copy sw- files from webextension to portal public/extensions


