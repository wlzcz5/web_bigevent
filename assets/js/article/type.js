$(function () {
    var layer = layui.layer;
    var form = layui.form;
    //添加按钮的弹出事件
    var articleAdd = null;
    //编辑按钮的弹出事件
    var articleEdit = null;
    //调用分类文章的列表
    initArticleList();


    //添加文章分类方法开始
    $('#btn-artile').on('click', function (e) {
        e.preventDefault();
        articleAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        //表单提交
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败');
                }
                initArticleList();
                layer.close(articleAdd);
            }
        })
    })
    //添加文章分类方法结束---


    //编辑文章分类方法开始---
    $('body').on('click', '#btn-edit', function (e) {
        e.preventDefault();
        articleEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#tpl-edit').html()
        });
        var id = $(this).attr('data-id');
        //根据id请求文章分类，并赋值
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类失败');
                }
                console.log(id);
                //给表单赋值
                form.val("form-edit", res.data);
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        //表单提交
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('提交失败');
                }
                initArticleList();
                layer.close(articleEdit);
            }
        })
    })
    //编辑文章分类方法结束---

    //删除文章方法开始---
    $('body').on('click','#btn-delete',function (e) {
        var id = $(this).attr('data-id');
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){        
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/'+id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败失败');
                    }              
                    layer.close(index);
                    initArticleList();
                }
            })
            
          });
    })
    //删除文章方法结束---
})


//分类文章的列表
function initArticleList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {

                return layui.layer.msg('获取文章类型失败');
            }
            var htmlStr = template('tpl-table', res);

            $('#article-tbody').html(htmlStr);
        }

    })
}