** Prerequisites **

- Install Node.js LTS version (16.0.0)

**Run following commanmds to run**

1.  Open cmd propt from inside the "webextension" folder inside project folder and run the command "npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false"

2.  Next run the command "vsts-npm-auth -config .npmrc" to add the azure artifacts token added to the npmrc file.

3.  Run "npm install" to add all the dependencies.

4.  If you notice/face any errors due to missing packages run "npm install --legacy-peer-deps" to ignore peer dependencies.

5.  Finally run "npm start"

6.  If you face the error "error:0308010C:digital envelope routines::unsupported" which is due to an existing issue with OpenSSL, run "set NODE_OPTIONS=--openssl-legacy-provider" (recommended only for localhost) and then re-run "npm start"

``` on PowerShell
$env:NODE_OPTIONS = "--openssl-legacy-provider"
`````
7. If you face issue "vsts-npm-auth.ps1 is not digitally signed" run below command 
````
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
````
- portal will start running on localhost:3000 and your browser opens a new window

**Extension building process**

Create AD App
1. Use the AD App created for portal
2. Give access to the Client APP to your API (if required)

changes in .env file
--------------------
3. Replace the REACT_APP_Consumption_API_ENDPOINT & REACT_APP_Consumption_API_ENDPOINT in the .env files

changes in the public/config.js file
---------------------------------------
4. replace your app client id in authConfig/cientId key
5. replace app inisght key in instrumentationKey

Create Webextension
-------------------
1. Create the extension by following the code provided in the pages folder
2. Register the extension in the extensionRegistration.json in public/data
	2.1. Create GUID for each extension and replace extensions element
	2.2. Create GUID for each page and replace the routes and pages
	
npm run build (this will create two files starts with sw-) which can be copied to the portal.

