$.ajaxPrefilter( function( options ) { 
    options.url = 'http://ajax.frontend.itheima.net'+options.url;
    // 统一为有权限的接口，设置header请求头
    if(options.url.indexOf('/my/')!==-1){
      options.headers={
        Authorization: localStorage.getItem('token')
      }
    }
    //全局统一挂在
    options.complete= function (res) {
      if (res.responseJSON.status == 1) {
          //清空loacl
          localStorage.removeItem('token');
          //跳转到登入页面
          location.href = '/login.html';
      }
  }
  });