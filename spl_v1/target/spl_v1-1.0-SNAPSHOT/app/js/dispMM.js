$(document).ready(function () {
    //加载字段数据
    loadDispMMData(1);

    //按回车键查询
    $("#search_name,#search_type").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadDispMMData(1);
        }
    });
});

//预览
function showImg(tid) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src", "dispMM/showImage?dispmId=" + tid);
    $('#updateModal').modal({show: true, backdrop: false});
}

//刷新
function refresh() {
    var queryData = $("#gridImport_body");
    queryData.html("");
    $("#search_name").val("");
    $("#search_type").val("");
    loadDispMMData(1);
}

//加载字段数据信息
function loadDispMMData(current) {
    $("#query_dispMMs").ajaxSubmit({
        url: "dispMM/querydispMMs?currentPage=" + current,
        dataType: "text",
        success: function (data) {
            var queryData = $("#gridImport_body");
            queryData.html("");
            queryData.html(data);
            queryPage();
        }
    });
}

//分页效果
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i + "'><a href = 'javascript:loadDispMMData("
                    + i + ");' >" + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1) + "'><a href = 'javascript:loadDispMMData("
                        + Number(j + 1) + ");' >" + Number(j + 1) + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadDispMMData(" + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadDispMMData(" + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadDispMMData(" + Number(current - 3 + k)
                            + ");' >" + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadDispMMData(" + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadDispMMData(" + Number(pages - 6 + k)
                            + ");' >" + Number(pages - 6 + k) + "</a></span>";
                }
            }
        }
    }
    var next = Number(current + 1);
    var prev = Number(current - 1);
    $(".showPage").html(showPage);
    $(".current_" + current).css("background", "#dbffd6");
    $(".last_page").val(pages);
    $(".next").val(next);
    $(".prev").val(prev);
    $(".total_p").val(pages);
    $(".skip_to").val(current);
}

//添加字段层
function toAdd() {
    $("#addModal").modal({show: true, backdrop: false});
}

//添加字段保存
function addDispMM() {
    $("#addDispMMForm").ajaxSubmit({
        url: "dispMM/addDispMM",
        contentType: 'application/json',
        data: $("#modifyStyleForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadDispMMData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}

//编辑字段显示
function get(id) {
    $.ajax({
        url: "dispMM/getDispMMData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#add_id").val(data.id);
            $("#add_name").val(data.name);
            $("#add_source").val(data.source);
            $("#add_sourceColumn").val(data.sourceColumn);
            $("#add_columnType").val(data.columnType);
            $('#modifyModal').modal({show: true, backdrop: false});
        },
        error: function () {
            alert("getStyleData error");
        }
    })
}

//编辑字段保存
function modifyDispMM() {
    $("#modifyDispMM").ajaxSubmit({
        url: "dispMM/updateDispMM",
        contentType: 'application/json',
        data: $("#modifyDispMM").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadDispMMData(cur);
            }
            $('#modifyModal').modal('hide');
        },
    });
}

//删除字段
function del(id) {
    htmlStr = "";
    htmlStr = delHtml();
    $.layer({
        type: 1, title: false,
        area: ['auto', 'auto'],
        border: [1, 0.5, '#000'],
        shade: [true],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        page: {html: htmlStr}
    });
    this.confirm = function () {
        $.ajax({
            url: "dispMM/deleteDispMMData?id=" + id,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data == 1) {
                    var cur = $("#page_currentPage").val();
                    loadDispMMData(cur);
                }
                var index = layer.index;			//获取当前弹层的索引号
                layer.close(index); 				//关闭当前弹层
            },
            error: function () {
                alert("deleteDispMMData error");
            }
        })
    }
    this.cancel = function () {
        var index = layer.index;			//获取当前弹层的索引号
        layer.close(index); 				//关闭当前弹层
    }
}
//删除字段提示
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;删除字段</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>是否删除字段？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="确认" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="取消" onclick="cancel()"></div></div></div>';
    return htmlStr;
}