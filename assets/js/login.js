$(function () {
    //点击“注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击“登录”
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],
        //校验密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还要拿到密码框中的内容
            //还要进行一次相等判断
            //如果判断失败,return一个错误
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return "您输入的两次密码不一致！"
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1.阻止默认的提交行为
        e.preventDefault()
        //2.发起Aja的POST请求
        var data = { username: $('#form_reg [name = username]').val(), password: $('#form_reg [name = password]').val() }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录！")
                //模拟点击
                $('#link_login').click();
            })
    })

    //监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //jQuery方法：快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功！')
                //将登陆成功得到的token字符串保存到localstorage
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})