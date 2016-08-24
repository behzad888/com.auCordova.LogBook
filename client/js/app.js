export class App {
   configureRouter(config, router) {
    config.title = 'سامانه لاگ بوک';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: './login', nav: true, title: 'ورود' },
      { route: 'studentHome/:id/', name: 'students', moduleId: './students/students', nav: false, title: 'دانشجویان' },
      { route: 'staffHome/:id/', name: 'staffs', moduleId: './staffs/staffs', nav: false, title: 'پرسنل' },
      { route: 'forms/:id/', name: 'forms', moduleId: './forms/forms', nav: false, title: 'فرم ورود اطلاعات' , settings:{user:'' , hash : ''} }
    ]);

    this.router = router;
  }  
}
