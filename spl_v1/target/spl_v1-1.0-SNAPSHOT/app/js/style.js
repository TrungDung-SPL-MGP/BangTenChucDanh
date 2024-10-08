var htmlStr = "";
$(document).ready(function () {
    // 加载样式数据
    loadStyleData(1);
    loadSelectContent();
    loadTemplateContent();

    // 按回车键查询
    $("#search_name,#search_id").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadStyleData(1);
        }
    });
});

// 获取模板类型
function loadTemplateContent() {
    $.ajax({
        url: "style/queryStyleAlign",
        dataType: "json",
        success: function (data) {
            var ss = data.datalist;
            var innerHtml = "";
            var clen = data.datalist.length;
            var clist = data.datalist;
            for (let i = 0; i < clen; i++) {
                innerHtml += '<option id="' + clist[i].id + '" value="'
                        + clist[i].id + '">' + clist[i].description
                        + '</option>';
            }
            addStyleType.innerHTML = innerHtml;
            modifyStyleType.innerHTML = innerHtml;
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// 加载下拉框
function loadSelectContent() {
    $.ajax({
        url: "style/queryMappingType",
        dataType: "json",
        success: function (data) {
            var ss = data.datalist;
            var innerHtml = "";
            var clen = data.datalist.length;
            var clist = data.datalist;
            for (let i = 0; i < clen; i++) {
                innerHtml += '<option id="' + clist[i].id + '" value="'
                        + clist[i].mappingType + '">' + clist[i].mappingName
                        + '</option>';
            }
            addMappingType.innerHTML = innerHtml;
        },
        error: function (err) {
            console.log(err);
        }
    })
}

// 刷新
function refresh() {
    var queryData = $("#gridImport_body");
    queryData.html("");
    $("#search_name").val("");
    $("#search_id").val("");
    $("#search_style_id").val("");
    loadStyleData(1);
}

// 加载样式数据
function loadStyleData(current) {
    var id = $("#search_id").val();
    if (id.trim() == "") {
        $("#search_style_id").val(-1)
    } else {
        $("#search_style_id").val(cancelFormat(id));
    }
    $("#query_styles").ajaxSubmit({
        url: "style/queryStyles?currentPage=" + current,
        dataType: "text",
        success: function (data) {
            var queryData = $("#gridImport_body");
            queryData.html("");
            queryData.html(data);
            queryPage();
        }
    });
}

// 分页效果
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i
                    + "'><a href = 'javascript:loadStyleData(" + i + ");' >"
                    + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1)
                        + "'><a href = 'javascript:loadStyleData("
                        + Number(j + 1) + ");' >" + Number(j + 1)
                        + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadStyleData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadStyleData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadStyleData("
                            + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadStyleData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadStyleData("
                            + Number(pages - 6 + k) + ");' >"
                            + Number(pages - 6 + k) + "</a></span>";
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

// 删除样式
function delStyle(id) {
    htmlStr = "";
    htmlStr = delHtml();
    $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [1, 0.5, '#000'],
        shade: [true],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        page: {
            html: htmlStr
        }
    });
    this.confirm = function () {
        $.ajax({
            url: "style/deleteStyle",
            data: {
                "id": id
            },
            success: function (data) {
                if (data == 1) {
                    var cur = $("#page_currentPage").val();
                    loadStyleData(cur);
                }
                var index = layer.index; // 获取当前弹层的索引号
                layer.close(index); // 关闭当前弹层
            }
        });
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 编辑样式时获取样式信息
function getStyle(id) {
    $.ajax({
        url: "style/getStyleData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#mod_id").val(data.id);
            $("#mod_name").val(data.name);
            $("#mod_type").val(data.type);
            modifyStyleType.value = data.type;
            $("#mod_width").val(data.width);
            $("#mod_height").val(data.height);
            $("#mod_descriptor").val(data.descriptor);
            $("#mod_rotate").val(data.rotate);
            $('#modfyModal').modal({
                show: true,
                backdrop: false
            });
        },
        error: function () {
            alert("getStyleData error");
        }
    })
}

// 编辑样式保存
function modifyStyle() {
    /*
     * $("#modifyStyleForm").ajaxSubmit({ url : "style/updateStyle", contentType :
     * 'application/json', data : $("#modifyStyleForm").serialize(), dataType :
     * "json", success : function(data) { if (data == 1) { var cur =
     * $("#page_currentPage").val(); loadStyleData(cur); }
     * $('#modfyModal').modal('hide'); }, });
     */
    var ss = {};
    ss.name = mod_name.value;
    ss.type = modifyStyleType.value;
    ss.descriptor = mod_descriptor.value;
    ss.rotate = mod_rotate.value;
    ss.sid = mod_id.value;
    $.ajax({
        url: "style/updateStyle",
        type: "POST",
        data: JSON.stringify(ss),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadStyleData(cur);
            }
            $('#modfyModal').modal('hide');
        },
        error: function () {
            alert("getStyleData error");
        }
    })
}

// 新增样式层
function toAddStyle() {
    $('#addModal').modal({
        show: true,
        backdrop: false
    });
}

// 新增样式
function addStyle() {
    /*
     * $("#addStyleForm").ajaxSubmit({ url : "style/addStyle", contentType :
     * 'application/json', data : $("#addStyleForm").serialize(), dataType :
     * "json", success : function(data) { if (data == 1) { var cur =
     * $("#page_currentPage").val(); loadStyleData(cur); }
     * $('#addModal').modal('hide'); }, });
     */
    var ss = {};
    ss.name = addName.value;
    ss.type = addStyleType.value;
    ss.mappingtype = addMappingType.value;
    $.ajax({
        url: "style/addStyle",
        type: "POST",
        data: JSON.stringify(ss),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadStyleData(cur);
            }
            $('#addModal').modal('hide');
        },
        error: function () {
            alert("getStyleData error");
        }
    })
}

// 上传图片
function uploadPhoto() {
    htmlStr = "";
    htmlStr = uploadPhotoHtml();
    $.layer({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [1, 0.5, '#000'],
        shade: [true],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        page: {
            html: htmlStr
        }
    });
    this.cancel = function () {
        // 关闭所有弹出层
        var layerObj = $('.xubox_layer');
        $.each(layerObj, function () {
            var i = $(this).attr('times');
            layer.close(i);
        });
    }
    this.confirm = function () {
        $("#upload_Photo").ajaxSubmit({
            url: "style/uploadPhoto",
            type: "post",
            data: $("#upload_Photo").serialize(),
            dataType: "JSON",
            success: function (resp) {
                // 关闭所有弹出层
                var layerObj = $('.xubox_layer');
                $.each(layerObj, function () {
                    var i = $(this).attr('times');
                    layer.close(i);
                });
                if (resp == 1) {
                    alert("success");
                } else if (resp == 0) {
                    alert("上传失败！");
                }
            }
        });
    }
}

// 配置模板
function openComponentStyle(id) {
    window
            .open(
                    'style/getDispMs?id=' + id + '',
                    'newWindow',
                    'width='
                    + (window.screen.availWidth)
                    * 0.9
                    + ',height='
                    + (window.screen.availHeight)
                    * 0.8
                    + ',top=40,left=40,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
}

// 导出模板
function exportStyle(id) {
    window.location.href = "/ESLS/style/exportStyle?id=" + id;
    // alert("导出模本");
    /*
     * $,ajax({ url : "style/styleId", type : "post", async : true, data : {id :
     * id}, dataType : "json", success : function (resp) { } });
     */
}

// 取消格式化样式
function cancelFormat(num) {
    if (Number(num) > 0) {
        return num;
    }
    var str = num.substr(0, 3);
    var id = /\d+(?:\.\d+)?/.exec(num);
    if (Number(id) > 0) {
        return id;
    }
    return -1;
}

// 删除样式提示
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;' + getLanguageContent("删除样式") + '</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>' + getLanguageContent("是否删除样式") + '？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("确认") + '" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("取消") + '" onclick="cancel()"></div></div></div>';
    return htmlStr;
}

function setAContent(val) {
    document.getElementById("a_file").text = val;
}

function setBContent(val) {
    document.getElementById("b_file").text = val;
}


// 上传图片
function uploadPhotoHtml() {
    htmlStr += '<div style="width:500px;height:401px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;' + getLanguageContent("上传图片") + '</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<form id="upload_Photo" action="" enctype="multipart/form-data">';
    htmlStr += '<table style="margin:43px;"><tr style="height:50px;"><td>' + getLanguageContent("图片名称") + '：</td>'
    htmlStr += '<td><input type="text" name="name"></td></tr>';
    htmlStr += '<tr style="height:50px;"><td>' + getLanguageContent("宽度") + '：</td><td><input type="text" name="width"></td></tr>';
    htmlStr += '<tr><td>' + getLanguageContent("高度") + '：</td><td><input type="text" name="height"></td></tr><tr><td>' + getLanguageContent("黑白图片") + '：</td>';
    htmlStr += '<td><button type="button" onclick="javascript:document.getElementById(' + "photoFile" + ').click()">'
            + getLanguageContent("选择文件") + '</button><a id="b_file" style="font-weight: bold">' + getLanguageContent("未选择任何文件")
            + '</a><input id="photoFile" onchange="setBContent(value);" style="display:none" type="file" name = "photo"></td></tr>';
    htmlStr += '<tr><td>' + getLanguageContent("选择文件")
            + '：</td><td><button type="button" onclick="javascript:document.getElementById(' + "redphotoFile" + ').click()">' + getLanguageContent("选择文件")
            + '</button><a id="a_file" style="font-weight: bold">' + getLanguageContent("未选择任何文件")
            + '</a><input id="redphotoFile" onchange="setAContent(value);" style="display:none" type="file" name="redphoto" ></tr></table></form>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("确认") + '" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("取消") + '" onclick="cancel()"></div></div></div>';
    return htmlStr;
}