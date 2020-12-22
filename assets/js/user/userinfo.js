$(function () {
    // 验证表单
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '必须在6字符之内'
            }
        }
    })
    // 初始化信息
    inintUserInfo();
    $('#userinfo-reset').on('click',function (e) {
        //阻止默认事件
        e.preventDefault();
        inintUserInfo();
    })
    //表单提交
    $(".layui-form").on('submit',function (e) {
        //阻止默认事件
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('获取用户信息失败');
                } 
                //调用父页面的方法，重新渲染页面信息
                window.parent.getUserInfo();
            }
        })
    })
})

function inintUserInfo() {
    var form = layui.form;
    // 初始化信息
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败');
            } 
            form.val("formuserinfo",res.data)
        }

    })
}