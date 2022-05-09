//注意每次调通$.get()或者$.post()、$.ajax()等
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //ps:options就是传递给ajax的配置对象
    //发亲真正的Ajax请求之前，同意拼接请求的根路径。
    options.url = 'http://www.liulongbin.top:3007' + options.url


    //统一为有权限的接口设置headers请求头,只有url中有my/的才需要权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //全局统一挂载complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete回调')
        // console.log(res)
        //在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的书数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空 token
            localStorage.removeItem('token')
            //2.强制跳转到登录页
            location.href = '/login.html'
        }
    }
}) 