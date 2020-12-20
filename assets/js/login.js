$(function () {
    //点击注册账号的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击登入账号的链接
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //获取密码框
            var pwd = $(".reg-box [name='password']").val();
            console.log(pwd + '--' + value);
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单事件
    $("#form-reg").on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //模拟登入
                $('#link-login').click();
            }
        })
    })
//    监听登入事件
$(".layui-form").on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/api/login',
        data:$(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            localStorage.setItem('token',res.token);
            //跳转后台主页
            location.href='/index.html';
        }
    })
})

})