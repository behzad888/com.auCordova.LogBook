export default class Closing{
    constructor(){
        this.close = true;
        this.router = {};        
    }
    disableExit(router,close){
        this.close = close;
        this.router = router;
    }
    closeApp(route, config, goto){
        if(route === config && this.close)
        {
             navigator.app.exitApp(); 
        }else {
           this.router.navigate(goto);         
        }
    }
}