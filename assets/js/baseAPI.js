//注意每次调通$.get()或者$.post()、$.ajax()等
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //ps:options就是传递给ajax的配置对象
    //发亲真正的Ajax请求之前，同意拼接请求的根路径。
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
}) 