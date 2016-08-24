import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { F7 } from 'services/f7';
import  Closing  from 'services/closing';
import 'jquery';
@inject(HttpClient, Router, F7,Closing)
export class Forms {
    constructor(httpClient, router, f7,closing) {
        httpClient.configure(x => {
            // x.withCredentials();
            // x.withHeader('Access-Control-Allow-Origin','*');
            // x.withHeader('charset', 'UTF-8');
            // x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
            // x.withHeader('Host', '79.127.100.182:83');
        });
        this.httpClient = httpClient;
        this.router = router;
        this.f7 = f7;
        this.f7.hidePreloader();
        this.closing = closing;
    }
    activate(params, routeConfig, $navigationInstruction) {
  
        this.id = params.id;
        this.username = routeConfig.settings.username;
        this.password = routeConfig.settings.password;
        this.hash = routeConfig.settings.hash;
        this.user = routeConfig.settings.user;
        this.back = this.user + '/' + this.hash;
        this.closing.disableExit(this.router,false);
        // http://79.127.100.182:83/Surface/Member/Members/LoginAndGoto?UserName=2279844486&Password=123123&act=_FormView&ctrl=MobileApi&ar=Logbook&id=39585

        // this.baseUrl = 'http://79.127.100.182:83/Surface/Logbook/MobileApi/_FormView?id=' + this.id;
        this.baseUrl = 'http://79.127.100.182:83/Surface/Member/Members/LoginAndGoto?UserName=' + this.username + '&Password=' + this.password + '&act=_FormView&ctrl=MobileApi&ar=Logbook&id=' + this.id;
    }
    attached() {
        this.f7.showPreloader('لطفا کمی صبر کنید');
        var that = this;
        $('#MainIframe').on('load', function () {
            that.f7.hidePreloader();
            $(this).contents().find('form').submit(function () {
                // setTimeout(function(){
                // that.navigateToList();
                // },2000)        
                that.f7.alert('فرم با موفقیت ارسال شد');
                return true; //return false prevents submit
            });
            $(this).contents().find('#cancel').on('click',function () {
                that.router.navigate(that.back);
                return true; //return false prevents submit
            });
        });
    }
    navigateToList() {
        this.f7.hidePreloader();
        this.router.navigate(this.back);
    }
}