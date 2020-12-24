$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };

    initList();
    initCate();
    //初始化文章列表
    function initList(e) {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败');
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }
    // 初始化文章类别
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类失败');
                }

                var htmlStr = template('tpl-type', res);
                console.log($('#type-div'));
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    //筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        q.state = $('[name=state]').val();
        q.cate_id = $('[name=cate_id]').val();
        initList();
    })

    // 分页方法
    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pagebox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5],
            jump: function (obj,first) {
                q.pagenum = obj.curr;
                q.pagesize=obj.limit;
                if(!first){
                    initList();
                }
            }
        });
    }

    $('body').on('click','.btn-delete',function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/delete/'+id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg('删除文章失败');
                    }
                  var btndelete = $(".btn-delete").length;
                  if(btndelete==1){
                    if(p.pagenum!=1){
                        p.pagenum -=1;
                    }
                  }
                    initList();
                    layer.close(index);
                }
            })                 
          });
    })

})

