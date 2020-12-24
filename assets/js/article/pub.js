$(function (params) {
    var layer = layui.layer;
    var form = layui.form;
    initEditor();
    initTypesSelect();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btn-image').on('click', function (params) {
        $('#covserfile').click();
    })
    $('#covserfile').on('change', function (e) {
        var file = e.target.files[0];
        if (file.length == 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var status = '已发布';

    $('#btnSave2').click(function (e) {
        status = '草稿';

    })
    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', status);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob)
            })

    })
    function initTypesSelect() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg('获取文章类型失败');
                }
                var htmlStr = template('tpl-table', res);
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }
})
