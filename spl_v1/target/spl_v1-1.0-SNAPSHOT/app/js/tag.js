var htmlStr = "";
var addTag = new Object();
var insp_time = new Object();
$(document).ready(function () {
    var position = $(".user_position", window.parent.document).html();
    if (position != "" && position == 1) {
        $("#upgrade_set").show();
    }

    // 标签注册提示
    tagRegisterTip();

    // 加载标签数据信息
    loadTagData(1);

    insp_time = setInterval(function () {
        getInspectResult();
    }, 1500);

    // 按回车键查询
    $("#search_mac,#search_id").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadTagData(1);
        }
    });

    // 升级标签按钮
    this.updateTag = function (id) {
        updateTag(id);
    }

    // 巡检超时时间
    $.ajax({
        url: "router/inspTimeout",
        type: "POST",
        dataType: "json",
        success: function (resp) {
            $("#insp_timeout").val(resp);
        }
    });
});

function tagRegisterTip() {
    var turnOff = -1;
    var wakingUp = new Object();
    addTag = setInterval(function () {
        $.ajax({
            url: 'tag/getAddTag',
            dataType: 'json',
            success: function (resp) {
                if (resp.length > 0) {
                    if (turnOff < 0) {
                        turnOff = 3;
                        layer.open({
                            type: 1,
                            title: false,
                            area: ['auto', 'auto'],
                            border: [1, 0.5, '#000'],
                            shade: [0],
                            shift: 'top',
                            move: '#title',
                            closeBtn: 0,
                            content: $("._showRegister")
                        });
                        wakingUp = setInterval(function () {
                            $("#turnOff").val(turnOff + "秒");
                            turnOff--;
                            if (turnOff < 0) {
                                clearInterval(wakingUp);
                                var index = layer.index; // 获取当前弹层的索引号
                                layer.close(index);
                            }
                        }, 1000);
                    } else {
                        turnOff = 3;
                    }
                    // 添加新注册的标签信息
                    var data = "";
                    for (var i = 0; i < resp.length; i++) {
                        data += '<tr><td></td><td><input type="text" value="'
                                + tformatTagAddress(resp[i].mac)
                                + '"></td><td>' + getLanguageContent("注册成功") + '</td></tr>';
                    }
                    $("#register_list").append(data);
                } else {
                    // alert("no");
                }
                // 如果有注册的标签，显示出来并设置 turnOff 值为 3
                // 设置超时时间 为3
            }
        });
    }, 2000);
}

// 刷新
function refresh() {
    var queryData = $("#gridImport_body");
    var current = $("#page_currentPage").val();
    queryData.html("");
    $("#search_mac").val("");
    $("#search_tag_mac").val("");
    $("#search_id").val("");
    $("#search_tag_router").val("");
    loadTagData(current);
}

// 获取巡检结果
function getInspectResult() {
    var mac = $("#search_mac").val();
    var router = $("#search_id").val();
    var current = $("#page_currentPage").val();
    if (mac.trim() == "") {
        $("#search_tag_mac").val(-1);
    } else {
        $("#search_tag_mac").val(cancelFormatTag(mac.trim()));
    }
    if (router.trim() == "") {
        $("#search_tag_router").val(-1);
    } else {
        $("#search_tag_router").val(cancelFormatRouter(router));
    }
    $("#query_tags").ajaxSubmit(
            {
                url: 'tag/queryInspectTags?currentPage=' + current,
                type: "post",
                dataType: "json",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].wakeState == 3) {
                            $("#wakeState" + data[i].id).html(getLanguageContent("离线"));
                            $("#insp_tag" + data[i].id).attr("style",
                                    "background:#ccc !important;");
                        } else {
                            $("#wakeState" + data[i].id).html(getLanguageContent("在线"));
                            $("#insp_tag" + data[i].id).removeAttr("style");
                        }
                    }
                }
            });
}

// 加载标签数据
function loadTagData(current) {
    var mac = $("#search_mac").val();
    var router = $("#search_id").val();
    if (mac.trim() == "") {
        $("#search_tag_mac").val(-1);
    } else {
        $("#search_tag_mac").val(cancelFormatTag(mac.trim()));
    }
    if (router.trim() == "") {
        $("#search_tag_router").val(-1);
    } else {
        $("#search_tag_router").val(cancelFormatRouter(router));
    }
    $("#query_tags").ajaxSubmit({
        url: 'tag/queryTags?currentPage=' + current,
        type: "get",
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
                    + "'><a href = 'javascript:loadTagData(" + i + ");' >" + i
                    + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1)
                        + "'><a href = 'javascript:loadTagData("
                        + Number(j + 1) + ");' >" + Number(j + 1)
                        + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadTagData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadTagData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadTagData("
                            + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadTagData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadTagData("
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

function updateTag(id) {
    var tag = new Object();
    tag.id = id;
    $.ajax({
        url: "tag/getTagById",
        type: "get",
        data: tag,
        dataType: "json",
        success: function (response) {
            htmlStr = "";
            /*
             * if (response.tag && response.tag.screentype == 2) { htmlStr =
             * tipHtml(); } else {
             */
            htmlStr = initHtml();
            /* } */
            layer.open({
                type: 1,
                title: false,
                area: ['auto', 'auto'],
                border: [1, 0.5, '#000'],
                shade: [0],
                shift: 'top',
                move: '#title',
                closeBtn: 0,
                content: htmlStr
            });
            if (response.tag) {
                $("#tagId").val(response.tag.id);
                $("#tagAddress").val(tformatTagAddress(response.tag.mac));
                $("#routerMac").val(formatRouter(response.tag.router.mac));
            }
        }
    });

    this.update = function () {
        var file = $("#file").val();
        if (file == null || file == "") {
            var alerts = layer.alert(getLanguageContent("请选择文件"), 1, function () {
                layer.close(alerts);
            });
        } else {
            $("#tag_update").ajaxSubmit({
                type: "post",
                url: "tag/update",
                dataType: "text",
                success: function (data) {
                    if (data == "升级成功") {
                        var layerObj = $('.xubox_layer');
                        $.each(layerObj, function () {
                            var i = $(this).attr('times');
                            layer.close(i);
                        });
                        updateProgress(id);
                    }
                    if (data == "升级失败") {
                        var layerObj = $('.xubox_layer');
                        $.each(layerObj, function () {
                            var i = $(this).attr('times');
                            layer.close(i);
                        });
                        alert(data);
                    }
                }
            });
        }
    };
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
        /*
         * //关闭所有弹出层 var layerObj = $('.xubox_layer'); $.each(layerObj,
         * function(){ var i = $(this).attr('times'); layer.close(i); });
         */
    }
}

// 删除价签
function delTag(id) {
    htmlStr = "";
    htmlStr = delHtml();
    layer.open({
        type: 1,
        title: false,
        area: ['auto', 'auto'],
        border: [1, 0.5, '#000'],
        shade: [0],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        content: htmlStr
    });
    this.confirm = function () {
        $.ajax({
            url: "tag/deleteTag",
            data: {
                "id": id
            },
            success: function (data) {
                if (data == 1) {
                    var cur = $("#page_currentPage").val();
                    loadTagData(cur);
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

// 编辑标签时获取标签信息
function getTag(id) {
    $.ajax({
        url: "tag/getTagData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var hard = data['tag'].hardwareVersion;
            var soft = data['tag'].softwareVersion;
            $("#mod_id").val(data['tag'].id);
            $("#mod_formatmac").val(tformatTagAddress(data['tag'].mac));
            $("#mod_mac").val(data['tag'].mac);
            $("#mod_width").val(data['tag'].width);
            $("#mod_height").val(data['tag'].height);
            $("#mod_power").val(data['tag'].power);
            $("#mod_rssi").val(data['tag'].rssi).FormatNumber({
                decimal: 2
            });
            $("#mod_state").val("'" + data['tag'].state + "'");
            $("#mod_name").val(data['tag'].name);
            $("#mod_hardwareVersion").val(formatVersion(hard));
            $("#mod_softwareVersion").val(formatVersion(soft));
            $("#mod_softVersion").val(soft);
            $("#mod_hardVersion").val(hard);
            $("#mod_serialNumber").val(data['tag'].serialNumber);
            $("#mod_productionBatch").val(data['tag'].productionBatch);
            $("#mod_manufacture").val(data['tag'].manufacture);
            if (data['tag'].state) {
                $("#mod_state").val("true");
            } else {
                $("#mod_state").val("false");
            }
            var idxList = data['idxList'];
            var nameList = data['nameList'];
            var vr = data['tag'].routers;
            if (idxList != null) {
                $("#bind-styleSelect").empty();
                $.each(idxList, function (i, item) {
                    if (parseInt(data['styleid']) == parseInt(item)) {
                        $("#bind-styleSelect").append(
                                "<option value='" + item + "' selected>"
                                + nameList[i] + "</option>");
                    } else {
                        $("#bind-styleSelect").append(
                                "<option value='" + item + "'>" + nameList[i]
                                + "</option>");
                    }
                });
            }
            if (vr != null) {
                $("#mod_activerouter").empty();
                $.each(vr, function (i, item) {
                    $("#mod_activerouter").append(
                            "<option value='" + item + "'>"
                            + formatRouter(vr[i].routerMac)
                            + "</option>");
                });
            }
        },
        error: function () {
            alert("getTagData error");
        }
    });
    $('#modfyModal').modal({
        show: true,
        backdrop: false
    });
}

// 修改标签
function modifyTag() {
    $("#modifyTagForm").ajaxSubmit({
        url: "tag/updateTag",
        contentType: 'application/json',
        data: $("#modifyTagForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadTagData(cur);
            }
            $('#modfyModal').modal('hide');
        }
    });
}

// 添加标签时获取显示样式信息
function toAddTag() {
    $.ajax({
        url: "style/getStylesData",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var idxList = data['idxList'];
            var nameList = data['nameList'];
            if (idxList != null) {
                $("#add-styleSelect").empty();
                $.each(idxList, function (i, item) {
                    $("#add-styleSelect").append(
                            "<option value='" + item + "'>" + nameList[i]
                            + "</option>");
                });
            }
        },
        error: function () {
            alert("getStylesData error");
        }
    });
    $('#addModal').modal({
        show: true,
        backdrop: false
    });
}

// 添加标签
function addtag() {
    $("#form_mac").val(cancelFormatTag($("#mac").val()));
    $("#addTagForm").ajaxSubmit({
        url: "tag/addTag",
        contentType: 'application/json',
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadTagData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}

// 更新进度条
function updateProgress(id) {
    var progress = setInterval(function () {
        $.ajax({
            url: "tag/getProgress",
            data: {
                "id": id
            },
            dataType: "json",
            success: function (data) {
                console.log("data = " + data);
                if (data >= 0 && data < 100) {
                    $(".up_border_" + id).show();
                    $(".update_btn_" + id).hide();
                    $("#progress_width_" + id).attr("style",
                            "width:" + data + "%;");
                    $("#progress_value_" + id).html(data + "%");
                    $(".up_pro_" + id).show();
                }
                if (data == 100) {
                    clearInterval(progress);
                    $(".up_pro_" + id).hide();
                    $(".up_border_" + id).hide();
                    $(".update_btn_" + id).html(getLanguageContent("升级成功"));
                    $(".update_btn_" + id).show();
                }
            }
        });
    }, 1000);
}

// 发送标签条形码
function sendBarCode(id) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src",
            "tag/showImage?id=" + id + "&time=" + new Date().getTime());
    $("#update-id").val(id);
    $('#updateModal').modal({
        show: true,
        backdrop: false
    });
}

function doUpdate() {
    $('#updateModal').modal('hide');
    var id = $("#update-id").val();
    $.ajax({
        url: "tag/sendBarcode",
        data: {
            "id": id
        },
        dataType: "json",
        success: function (data) {
            $(".sendButton" + id).hide();
        }
    });
}

// 巡检
function inspectTag() {
    var insp_timeout = Number($("#insp_timeout").val());
    $.ajax({
        url: "tag/inspect",
        type: "post",
        data: {
            reporttime: insp_timeout
        },
        dataType: "JSON",
        success: function (resp) {
            htmlStr = "";
            htmlStr = inspectHtml();
            layer.open({
                type: 1,
                title: false,
                area: ['auto', 'auto'],
                border: [1, 0.5, '#000'],
                shade: [0],
                shift: "top",
                move: '#title',
                closeBtn: 0,
                content: htmlStr
            });
            if (resp == -1) {
                $(".countDown").html(getLanguageContent("登录超时，请重新登录"));
                $("#update_btn").show();
            } else if (resp > 0) {
                $("#insp_button").html(getLanguageContent("正在巡检"));
                $(".countDown").html(getLanguageContent("正在巡检,请勿进行其他操作") + "...");
                setTimeout(function () {
                    $("#insp_button").html(getLanguageContent("巡检"));
                    var index = layer.index; // 获取当前弹层的索引号
                    layer.close(index); // 关闭当前弹层
                }, resp * 1000);
            } else {
                $(".countDown").html(getLanguageContent("路由器离线，请检查路由器状态"));
                $("#update_btn").show();
            }
        }
    });
    // 取消按鈕
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 格式化路由器名称
function formatRouter(mac) {
    var str = "CWR";
    var idStr = mac + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + mac;
}

// 升级设置
function upGradeSet() {
    layer.open({
        type: 1,
        title: false,
        area: ['500px', '350px'],
        border: [0],
        shade: [0],
        shift: "top",
        move: '#_showUpgradeSet',
        closeBtn: 0,
        content: $("._showUpgradeSet")
    });
    this.setUpGrade = function () {
        var version = $("#set_version").val();
        var array = new Array();
        array = version.split(".");
        var mac = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] != 0) {
                mac += array[i] << (array.length - i - 1) * 4;
            }
        }
        $.ajax({
            url: "tag/setupGrade",
            data: {
                version: mac
            },
            dataType: "json",
            success: function (data) {
                if (data == 1) {
                    var current = $("#page_currentPage").val();
                    loadTagData(current);
                } else {
                    alert(getLanguageContent("设置失败") + "!");
                }
            }
        });
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 取消格式化路由器
function cancelFormatRouter(num) {
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

// 取消格式化标签
function cancelFormatTag(num) {
    var mac = 0;
    var str = num.substr(0, 3);
    if (str == "CWT" || str == "cwt") {
        num = num.substring(3);
    }
    var array = new Array();
    array = num.split(".");
    for (var i = 0; i < array.length; i++) {
        if (array[i] != 0) {
            mac += array[i] << (array.length - i - 1) * 8;
        }
    }
    return mac;
}

// 格式化标签
function tformatTagAddress(mac) {
    var str = "";
    str += mac >> 24 & 0xff;
    str += ".";
    str += mac >> 16 & 0xff;
    str += ".";
    str += mac >> 8 & 0xff;
    str += ".";
    str += mac & 0xff;
    return str;
}

// 格式化版本格式
function formatVersion(version) {
    if (isNaN(version)) {
        return version;
    }
    var ver1 = version >> 4 & 0x0f;
    var ver2 = version & 0x0f;
    return ver1 + "." + ver2;
}

// 初始化价签升级弹出层
function initHtml() {
    htmlStr += `<div style="width:500px;height:263px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("价签升级")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" ><div>`;
    htmlStr += `<form action="" enctype="multipart/form-data" method="post" id="tag_update">`;
    htmlStr += `<table style="margin:20px auto;"><tr><td><input type="hidden" name="tagId" id="tagId" width="50px"/>`;
    htmlStr += `${getLanguageContent("价签地址")}：</td><td><input type="text" id="tagAddress" name="tagAddress" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("所属基站")}：</td><td><"input type="text" name="routerMac" id="routerMac" width="50px">`;
    htmlStr += `</td></tr><tr><td></td><td><input type="file" name="file" id="file" width="50px">`;
    htmlStr += `</td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;align:center"><input style="margin:10px auto;height:40px;`;
    htmlStr += `width:60px;background-color:#4d90fe;border:0px;" type="button" value="${getLanguageContent("升级")}" onclick="update();">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;" `;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel();"></div></form></div></div></div>`;
    return htmlStr;
}

// 初始化价签升级提示层
function tipHtml() {
    htmlStr += '<div style="width:500px;height:263px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;价签升级提示</div>';
    htmlStr += '<div style="display:block;" align="center" ><div>';
    htmlStr += '<table style="margin:20px auto;"><tr><td></td colspan="2"></tr>';
    htmlStr += '<tr><td>三色屏暂时不支持升级！</td><td></td></tr><tr style="height:80px;"><td></td><td>';
    htmlStr += '</td></tr></table><div style="background-color:#aaa;align:center">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;" ';
    htmlStr += 'type="button" value="取消" onclick="cancel();"></div></div></div></div>';
    return htmlStr;
}

// 删除价签提示
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;' + getLanguageContent("删除标签") + '</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>' + getLanguageContent("是否删除标签") + '？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("确认") + '" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("取消") + '" onclick="cancel()"></div></div></div>';
    return htmlStr;
}

// 巡检价签提示
function inspectHtml() {
    htmlStr += '<div style="width:400px;height:300px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;' + getLanguageContent("标签巡检") + '</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:150px;"><td colspan="2"><span class="countDown" ';
    htmlStr += 'style="display:inline-block;height: 100px;color:red;font-size: 20px;border:none;">';
    htmlStr += ' </span></td></tr></table>';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;';
    htmlStr += 'display:none;" type="button" value="' + getLanguageContent("取消") + '" onclick="cancel();" id="update_btn">';
    htmlStr += '<div style="background-color:#aaa;text-align:center;"></div></div></div>';
    return htmlStr;
}
