$(function () {
    var layer = layui.layer;
    // 获取用户信息，渲染头像
    getUserInfo();
    //为退出登入绑定事件
    $('#btn-out').on('click', function (params) {
        //弹出询问框
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //清空loacl
            localStorage.removeItem('token');
            //跳转到登入页面
            location.href = '/login.html';

            layer.close(index);
        });

    })


})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {

                return layui.layer.msg('获取用户信息失败');
            }
            //渲染头像
            renderAvater(res.data);
        }
       
    })
}
//渲染头像
function renderAvater(user) {
    //  获取用户名称
    var name = user.nickname || user.username;
    //渲染用户名
    $('#welcome').html('欢迎，' + name);
    //渲染头像图片
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }

}
