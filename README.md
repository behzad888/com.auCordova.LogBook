Aurelia sample with Apache Cordova



##Building The Code
To build the code, follow these steps.

 1. Ensure that NodeJS is installed. This provides the platform on which the build tooling runs.
 2. From the project folder, execute the following command:
 
 ```
 npm install
 ```
 3. Ensure that Gulp is installed. If you need to install it, use the following command:
 
 ```
 npm install -g gulp
 ```
 4. Ensure that Jspm is installed. If you need to install it, use the following command
 
 ```
 npm install -g jspm
 ```
 5. Install jspm packages with:
 
 ```
 jspm install
 ```
 6. Install Apache Cordova
 
 ```
 npm install -g cordova
 ```
 7. Install Android Platform
 
 ```
 cordova platform add android
 ```
 8. And form Browser platform
 
 ```
 cordova platform add browser
 ```
 9. To build the code, you can now run:
 
 ```
 gulp build
 ```
 10. To make .apk files, you can now run:
 
 ```
 cordova build android
 ```
 11. To watch in browser platform, you can run:
 
 ```
 cordova run browser
 ```
 12. To watch in gulp, you can run
 
 ```
 gulp watch
 ```
 You will find the compiled code in the `www` folder.
