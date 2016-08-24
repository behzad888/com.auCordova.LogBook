import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { F7 } from 'services/f7'
import  Closing from 'services/closing';
import 'jquery';
@inject(HttpClient, Router, F7, Closing)
export class StaffsHome {
    constructor(httpClient, router, f7, closing) {
        httpClient.configure(x => {
            // x.withCredentials();
            // x.withHeader('Access-Control-Allow-Origin','*');
            // x.withHeader('charset', 'UTF-8');
            // x.withHeader('Content-Type', 'application/x-www-form-urlencoded');
            // x.withHeader('Host', '79.127.100.182:83');
        });
        this.httpClient = httpClient;
        this.baseUrl = 'http://79.127.100.182:83/Surface/Logbook/MobileApi/'
        this.router = router;
        this.f7 = f7;
        this.f7.hidePreloader();
        this.removeAdditionalModal();
        this.appVersion = 'browser';
        try {
            this.appVersion = cordova.Device.version.toLocaleLowerCase();
        } catch (err) { }
        this.closing = closing;
    }

    removeAdditionalModal() {
        if ($('body .modal-overlay').length > 1) {
            $('body .modal-overlay')[1].remove()
        }
    }

    action(id, approvalStatus) {
        let that = this;
        this.Id = id;
        var controls = [{
            text: 'امکانات',
            label: true
        }, {
                text: 'ورود به فرم',
                color: 'blue',
                onClick: function () {
                    that.navigateToForm(that.Id);
                }
            }];

        controls.push({
            text: 'بررسی نشده',
            onClick: function () {
                that.activityApproved(1,that.Id);
            }
        });
        controls.push({
            text: 'تایید شده',
            onClick: function () {
                that.activityApproved(2,that.Id);
            }
        });
        controls.push({
            text: ' عدم تایید',
            onClick: function () {
                that.activityApproved(3,that.Id);
            }
        });

        this.actionSheetButtons = [
            controls,
            // Second group
            [
                {
                    text: 'لغو'
                }
            ]
        ];
        this.f7.actions(this.actionSheetButtons);
    }

    navigateToForm(id) {
        var forms = this.router.routes.find(x => x.name === 'forms');
        forms.settings.user = 'staffHome';
        forms.settings.hash = this.hash;
        forms.settings.username = this.username;
        forms.settings.password = this.password;
        this.router.navigate('forms/' + id);
    }

    activityApproved(approved, id) {
        var that = this;
        that.f7.closeModal('.popover');
        that.httpClient
            .post(that.baseUrl + 'Activity_Update?' + 'hash=' + that.hash + '&Id=' + id + '&ApprovalStatus=' + approved)
            .then((response) => {
                that.getData();
            });
    }
    activate(params, routeConfig, $navigationInstruction) {
        this.hash = params.id;
        this.username = routeConfig.username;
        this.password = routeConfig.password;


        this.closing.disableExit({}, true);
        document.removeEventListener('backbutton', OnBackPress, false);
        var that = this;
        function OnBackPress(e) {
            that.closing.closeApp(routeConfig.name, 'staffs', 'staffHome/' + that.hash);
        }
        document.addEventListener("backbutton", OnBackPress, false);
    }
    getData() {
        var that = this;
        this.f7.showPreloader('لطفا کمی صبر کنید');

        // this.f7.hidePreloader();

        this.httpClient
            .post(this.baseUrl + 'Activity_Read?' + 'hash=' + this.hash)
            .then((response) => {
                that.collection = response.content;
                that.f7.hidePreloader();
            }).catch(err => {
                that.f7.hidePreloader();
            });
        this.removeAdditionalModal();
    }
    attached() {
        this.getData();
        var that = this;
        $('.pull-to-refresh-content').on('refresh', function (e) {
            that.getData();
            that.f7.pullToRefreshDone();
        });
        this.f7.initPullToRefresh($('.page'));
    }
}