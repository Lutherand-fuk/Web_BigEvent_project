
$(function () {
    //调用getUserInfo
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                //清空本地存储的token
                localStorage.removeItem('token')
                //重新跳转到登录页面
                location.href = '/login.html'
                //关闭confirm询问框
                layer.close(index);
            });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // 在自己的js前导入baseAPI
        url: '/my/userinfo',
        // // headers首字母小写 
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }

            //调用渲染用户头像
            renderAvatar(res.data)
        },
        //无论成功还是失败，ajax都会调用complete函数
        // complete: function (res) {
        //     // console.log('执行了complete回调')
        //     // console.log(res)
        //     //在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的书数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空 token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
    //3.按需渲染用户的投降
    //3.1渲染图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show();
    }
}