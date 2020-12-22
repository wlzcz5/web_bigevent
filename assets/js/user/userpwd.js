$(function () {
    var form = layui.form;

    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status != 0) {

                    return layui.layer.msg('获取用户信息失败');
                }
                console.log(res);
            }

        })
    })

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            //获取密码框
            var pwd = $("[name='oldPwd']").val();
            console.log(pwd + '--' + value);
            if (pwd == value) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            //获取密码框
            var pwd = $("[name='newPwd']").val();
            console.log(pwd + '--' + value);
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })
    //修改密码
    // $('.layui-form').on('submit',function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         method:'POST',
    //         url:'/my/updatepwd',
    //         data:$(this).serialize(),
    //         success:function (res) {
    //             // if (res.status != 0) {
    //             //     return layer.msg(res.message);
    //             // }
    //             // $('.layui-form')[0].reset();
    //         }
    //     })
    // })
    

})