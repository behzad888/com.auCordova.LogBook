// Load JS for webpack
import 'framework7';
 var appVersion = 'Browser';
 try{
           appVersion = cordova.Device.version;
        }catch(err) {}
// import 'framework7/dist/css/framework7.ios.rtl.min.css!';
// import 'framework7/dist/css/framework7.ios.min.css!';
// import 'framework7/dist/css/framework7.ios.colors.min.css!';
if(appVersion.toLocaleLowerCase() == 'android' || appVersion.toLocaleLowerCase() == 'browser'){
	System.import('framework7/dist/css/framework7.material.rtl.min.css!');
	System.import('framework7/dist/css/framework7.material.min.css!');
	System.import('framework7/dist/css/framework7.material.colors.min.css!');
}else{
	System.import('framework7/dist/css/framework7.ios.rtl.min.css!');
	System.import('framework7/dist/css/framework7.ios.min.css!');
	System.import('framework7/dist/css/framework7.ios.colors.min.css!');
}

import 'framework7/dist/css/my-app.css!';
// Create F7 object
export const F7 = new Framework7({
	modalTitle: 'پیغام',
	modalButtonOk: 'تایید',
	modalButtonCancel: 'لغو',
    material: true,
    ios: true
});