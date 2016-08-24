import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { F7 } from 'services/f7'
@inject(HttpClient, Router, F7)
export class Welcome {
  constructor(httpClient, router, f7) {
    httpClient.configure(x => {
    });
    this.httpClient = httpClient;
    this.error = '';
    this.baseUrl = 'http://79.127.100.182:83/Surface/Logbook/MobileApi/'
    this.domain = {};
    this.router = router;
    this.f7 = f7;
  }

  login() {
    this.error = ''
    this.f7.showPreloader('لطفا کمی صبر کنید');
    // this.router.navigate("studentHome");
    let that = this;
    this.httpClient
      .post(this.baseUrl + 'Login?' + 'username=' + this.domain.username + '&pass=' + this.domain.pass)
      .then((response) => {
        that.f7.hidePreloader();
        if (response.content.indexOf('LogBookStudentMember') == 1) {
          var students = this.router.routes.find(x => x.name === 'students');
          students.username = that.domain.username;
          students.password = that.domain.pass;
          this.router.navigate("studentHome/" + encodeURIComponent(response.content[0]));
          this.error = '';
        }else if (response.content.indexOf('LogBookStaffMember') == 1) {
          var staffs = this.router.routes.find(x => x.name === 'staffs');
          staffs.username = that.domain.username;
          staffs.password = that.domain.pass;
          this.router.navigate("staffHome/" + encodeURIComponent(response.content[0]));
          this.error = '';
        } else {
          this.error = 'نام کاربری و یا رمز عبور معتبر نیست';
        }
      });
  }
}