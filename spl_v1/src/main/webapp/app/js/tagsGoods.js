var interval = new Object();
var updateOne = new Object();
var doUpdate = new Object();
var idArray = new Array();
var ids = new Array();
var htmlStr = "";
$(document).ready(function () {
    //复选框点击事件
    $("#gridImport_body").click(function (e) {
        var target = $(e.target);
        if (target.is("input")) {
            var id = target.attr("data-flag");
            var status = target.attr("data-stateflag");
            var p = $("#text_" + id);
            dealNullTag(id, target);
            if (target.is(":checked")) {
                $.ajax({
                    url: "good/checkBoxUpdate", dataType: "json",
                    data: {param: id}, success: function (data) {
                        if (data == true) {
                            p.removeAttr("class");
                            p.text("等待更新");
                            p.attr("class", "update_wait");
                        }
                    }
                });
            } else {
                $.ajax({
                    url: "good/checkBoxCancel", dataType: "json",
                    data: {param: id, sta: status}, success: function (data) {
                        p.removeAttr("class");
                        if (data == true) {
                            if (status == 1) {
                                p.text("等待更新");
                                p.attr("class", "update_wait");
                            } else if (status == 2) {
                                p.text("正在更新");
                                p.attr("class", "updating");
                            } else if (status == 3) {
                                p.text("更新失败");
                                p.attr("class", "update_failed");
                            } else if (status == 0) {
                                p.text("未更新");
                            } else {
                                p.text("更新完成");
                                p.attr("class", "update_success");
                            }
                        }
                    }
                });
            }
        }
    });

    //加载绑定标签的数据
    loadTagAndGoodData(1);

    //按回车键查询
    $("#search_name,#search_id,#search_tag").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadTagAndGoodData(1);
        }
    });
});

//空标签处理
function dealNullTag(id, target) {
    if ($("#text_" + id).html() == "未更新") {
        target.attr("checked", false);
    } else if ($("#text_" + id).html() == "更新完成") {
        target.attr("checked", false);
    }
}

//刷新
function refreshGoods() {
    clearInterval(interval)
    var queryData = $("#gridImport_body");
    var current = $("#page_currentPage").val();
    queryData.html("");
    $("#search_name").val("");
    $("#search_id").val("");
    $("#search_tag").val("");
    loadTagAndGoodData(current);
}

//查询商品信息入口
function loadTagAndGoodData(current) {
    var id = $("#search_id").val();
    var tag = $("#search_tag").val();
    if (id == null || id.trim() == "") {
        $("#search_good_id").val(-1);
    } else {
        id = cancelFormatGood(id);
        $("#search_good_id").val(id);
    }
    if (tag == null || tag.trim() == "") {
        $("#search_good_tag").val(-1);
    } else {
        tag = cancelFormatTag(tag.trim());
        $("#search_good_tag").val(tag);
    }
    executeQuery(current);
}

//查询商品执行
function executeQuery(current) {
    $("#queryGoods").ajaxSubmit({
        url: 'good/queryTagsGoods?currentPage=' + current,
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

//查询商品分页
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var pages = $("#pages").val();
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i + "'><a href = 'javascript:loadTagAndGoodData("
                    + i + ");' >" + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1) + "'><a href = 'javascript:loadTagAndGoodData("
                        + Number(j + 1) + ");' >" + Number(j + 1) + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadTagAndGoodData(" + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadTagAndGoodData(" + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadTagAndGoodData(" + Number(current - 3 + k)
                            + ");' >" + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadTagAndGoodData(" + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadTagAndGoodData(" + Number(pages - 6 + k)
                            + ");' >" + Number(pages - 6 + k) + "</a></span>";
                }
            }
        }
    }
    var last = "<a href='javascript:loadTagAndGoodData(" + pages + ")'>尾页</a>";
    var next = "<a href='javascript:loadTagAndGoodData(" + Number(current + 1) + ")'>下一页</a>";
    var prev = "<a href='javascript:loadTagAndGoodData(" + Number(current - 1) + ")'>上一页</a>";
    $(".showPage").html(showPage);
    $(".current_" + current).css("background", "#dbffd6");
    $(".last_page").html(last);
    $(".next").html(next);
    $(".prev").html(prev);
    $(".total_p").val(pages);
    $(".skip_to").val(current);
}

//价签地址格式
function PrefixInteger(num, length) {
    var str = "CWT";
    str += num >> 24 & 0xff;
    str += ".";
    str += num >> 16 & 0xff;
    str += ".";
    str += num >> 8 & 0xff;
    str += ".";
    str += num & 0xff;
    return str;
}

//绑定标签->编辑按钮
function getTagAndGoodData(id) {
    $.ajax({
        url: "associate/getTagAndGoodData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#bind-id").val(data['good'].id);
            $("#bind-name").val(data['good'].name);
            $("#bind-origin").val(data['good'].origin);
            $("#bind-provider").val(data['good'].provider);
            $("#bind-unit").val(data['good'].unit);
            $("#bind-price").val(data['good'].price).FormatNumber({decimal: 2});
            $("#bind-barcode").val(data['good'].barcode);
            if (data['good'].promotion) {
                $("#bind-promotion").find("option[value='true']").attr("selected", true);
            } else {
                $("#bind-promotion").find("option[value='false']").attr("selected", true);
            }
            $("#bind-qrCode").val(data['good'].qrCode);
            $("#bind-promotionReason").val(data['good'].promotionReason);
            $("#bind-promotePrice").val(data['good'].promotePrice).FormatNumber({decimal: 2});

            var tags = data['tagList'];
            if (tags != null) {
                $("#bind-tagSelect").empty();
                $.each(tags, function (i, t) {
                    if (parseInt(data['tagid']) == parseInt(t)) {
                        $("#bind-tagSelect").append("<option value='" + t + "' selected>"
                                + PrefixInteger(t, 6) + "</option>");
                    } else {
                        $("#bind-tagSelect").append("<option value='" + t + "'>"
                                + PrefixInteger(t, 6) + "</option>");
                    }
                });
            }
            $('#bindModal').modal({show: true, backdrop: false});
        },
        error: function () {
            alert("bingTag error");
        }
    });
}

//绑定标签->编辑->保存
function bindTag() {
    var price = $("#bind-price").val();
    var promotePrice = $("#bind-promotePrice").val();
    price = parseFloat(price.split(",").join(""));
    promotePrice = parseFloat(promotePrice.split(",").join(""));
    $("#tagAndGood_promotePrice").val(promotePrice);
    $("#format_price").val(price);
    $("#bindTagForm").ajaxSubmit({
        url: "associate/updateTagAndGoodByMac",
        contentType: 'application/json',
        data: $("#bindTagForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == -1) {
                if (self.frameElement && self.frameElement.tagName == "IFRAME") {
                    window.parent.location.href = "login/toLogin";
                    return;
                }
                window.location.href = "login/toLogin";
            } else if (data == 0) {
                alert("没有绑定标签");
            } else if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadTagAndGoodData(cur);
            }
            $('#bindModal').modal('hide');
        },
    });
}

//更新按钮（多条数据）
function updateAll() {
    var inputs = $("#gridImport").find("input[type='checkbox']:checked");
    for (var i = 0; i < inputs.size(); i++) {
        var input = inputs.eq(i);
        ids[i] = input.attr("data-flag");
        $(".checked").removeAttr("class");
    }
    updateAllTagScreen(ids);
}

//更新多条记录发送数据
function updateAllTagScreen(ids) {
    if (ids.length == 0) {
        return;
    }
    $.ajax({
        url: "associate/updateAllTagScreen",
        type: "POST",
        traditional: true,
        data: {ids: ids},
        success: function (response) {
            var resp = JSON.parse(response);
            for (var i = 0; i < resp.length; i++) {
                for (var j = 0; j < ids.length; j++) {
                    if (ids[j] == resp[i].id) {
                        if (resp[i].status == 1) {
                            ids.splice(j, 1);
                        }
                    }
                }
            }
        }
    });
    idArray = [];
    interval = setInterval(function () {					//定时器开始执行
        checkUpdateState(ids);
    }, 2000);
}

//设置定时任务
function checkUpdateState(ids) {
    if (ids.length <= 0) {
        clearInterval(interval);
        return;
    }
    $.ajax({
        url: "associate/getGoodsState",
        type: "GET",
        traditional: true,
        data: {ids: ids},
        dataType: "json",
        success: function (data) {
            var flag = true;
            for (var i = 0; i < ids.length; i++) {
                if (data[i] == 1) {
                    $("#text_" + ids[i]).html("等待更新");
                    $("." + ids[i] + "UpdateState").attr("class", "update_wait");
                    $(".check_" + ids[i]).attr("checked", false);
                    flag = false;
                } else if (data[i] == 2) {
                    $("#text_" + ids[i]).html("正在更新");
                    $("#text_" + ids[i]).attr("class", "updating");
                    $(".check_" + ids[i]).attr("checked", "checked");
                    flag = false;
                } else if (data[i] == 3) {
                    var hav = true;
                    $("#text_" + ids[i]).html("正在更新");
                    $("#text_" + ids[i]).attr("class", "updating");
                    $(".check_" + ids[i]).attr("checked", "checked");
                    for (var j = 0; j < idArray.length; j++) {
                        if (idArray[j] == ids[i]) {
                            hav = false;
                            break;
                        }
                    }
                    if (hav) {
                        idArray.push(ids[i]);
                    }
                } else {
                    $("#text_" + ids[i]).html("更新完成");
                    $("#text_" + ids[i]).attr("class", "update_success");
                    $(".check_" + ids[i]).attr("checked", false);
                }
            }
            if (flag) {
                clearInterval(interval);
                if (idArray.length > 0) {
                    doUpdateResendAll(idArray);
                }
            }
        }
    });
}

//批量更新失败重发
function doUpdateResendAll(idArray) {
    $.ajax({
        url: "associate/updateAllTagScreen",
        type: "POST",
        traditional: true,
        data: {ids: idArray},
        success: function () {

        }
    });
    interval = setInterval(function () {		//定时器开始执行
        doUpdateCheckAll(idArray);
    }, 2000);
}

//批量更新失败检测
function doUpdateCheckAll(idArray) {
    $.ajax({
        url: "associate/getGoodsState",
        type: "GET",
        traditional: true,
        data: {ids: idArray},
        dataType: "json",
        success: function (data) {
            var flag = true;
            for (var i = 0; i < idArray.length; i++) {
                if (data[i] == 1) {
                    $("#text_" + idArray[i]).html("等待更新");
                    $("." + idArray[i] + "UpdateState").attr("class", "update_wait");
                    $(".check_" + idArray[i]).attr("checked", false);
                    flag = false;
                } else if (data[i] == 2) {
                    $("#text_" + idArray[i]).html("正在更新");
                    $("#text_" + idArray[i]).attr("class", "updating");
                    $(".check_" + idArray[i]).attr("checked", "checked");
                    flag = false;
                } else if (data[i] == 3) {
                    $("#text_" + idArray[i]).html("更新失败");
                    $("#text_" + idArray[i]).attr("class", "update_failed");
                    $(".check_" + idArray[i]).attr("checked", "checked");
                } else {
                    $("#text_" + idArray[i]).html("更新完成");
                    $("#text_" + idArray[i]).attr("class", "update_success");
                    $(".check_" + idArray[i]).attr("checked", false);
                }
            }
            if (flag) {
                clearInterval(interval);
            }
        }
    });
}

//获取标签图片
function updateTagScreen(id) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src", "associate/showImage?id=" + id + "&time=" + new Date().getTime());
    $("#update-id").val(id);
    $('#updateModal').modal({show: true, backdrop: false});
}

//更新失败检测
function doUpdateCheck(id) {
    $.get("associate/updateTagScreenData?id=" + id, function (data) {
        var p = $("#text_" + id);
        p.removeAttr("class");
        if (data == '"success"') {
            p.text("正在更新");
            p.attr("class", "updating");
            $(".check_" + id).attr("checked", false);
            doUpdate = setInterval(function () {
                doUpdateOne(id);
            }, 1000);
        } else if (data == '"failed"') {
            p.text("更新失败");
            p.attr("class", "update_failed");
            $(".check_" + id).attr("checked", "checked");
        }
    });
}


function doUpdateOne(id) {
    $.ajax({
        url: "associate/updateResult?id=" + id,
        success: function (data) {
            if (data == 1) {
                $("#text_" + id).html("等待更新");
                $("." + id + "UpdateState").attr("class", "update_wait");
                $(".check_" + id).attr("checked", "checked");
            } else if (data == 2) {
                $("#text_" + id).html("正在更新");
                $("#text_" + id).attr("class", "updating");
                $(".check_" + id).attr("checked", false);
            } else if (data == 3) {
                $("#text_" + id).html("更新失败");
                $("#text_" + id).attr("class", "update_failed");
                $(".check_" + id).attr("checked", "checked");
                clearInterval(doUpdate);
            } else if (data == 0) {
                $("#text_" + id).html("未更新");
                $(".check_" + id).attr("checked", false);
                clearInterval(doUpdate);
            } else {
                $("#text_" + id).html("更新完成");
                $("#text_" + id).attr("class", "update_success");
                $(".check_" + id).attr("checked", false);
                clearInterval(doUpdate);
            }
        }
    });
}

//更新按钮
function doUpdateScreen() {
    var id = $("#update-id").val();
    $('#updateModal').modal('hide');
    var isSuccess = true;
    $.get("associate/updateTagScreenData?id=" + id, function (data) {
        var p = $("#text_" + id);
        p.removeAttr("class");
        if (data == '"success"') {
            p.text("正在更新");
            p.attr("class", "updating");
            $(".check_" + id).attr("checked", false);
            isSuccess = true;
        } else if (data == '"failed"') {
            p.text("正在更新");
            p.attr("class", "updating");
            $(".check_" + id).attr("checked", "checked");
            isSuccess = false;
        }
    });
    clearInterval(interval);
    if (isSuccess) {
        updateOne = setInterval(function () {
            doUpdateOneTest(id);
        }, 1000);
    } else {
        doUpdateCheck(id);
    }
}

//更新图片检测
function doUpdateOneTest(id) {
    $.ajax({
        url: "associate/updateResult?id=" + id,
        success: function (data) {
            if (data == 1) {
                $("#text_" + id).html("等待更新");
                $("." + id + "UpdateState").attr("class", "update_wait");
                $(".check_" + id).attr("checked", "checked");
            } else if (data == 2) {
                $("#text_" + id).html("正在更新");
                $("#text_" + id).attr("class", "updating");
                $(".check_" + id).attr("checked", false);
            } else if (data == 3) {
                $("#text_" + id).html("正在更新");
                $("#text_" + id).attr("class", "updating");
                $(".check_" + id).attr("checked", "checked");
                clearInterval(updateOne);
                doUpdateCheck(id);
            } else if (data == 0) {
                $("#text_" + id).html("未更新");
                $(".check_" + id).attr("checked", false);
                clearInterval(updateOne);
            } else {
                $("#text_" + id).html("更新完成");
                $("#text_" + id).attr("class", "update_success");
                $(".check_" + id).attr("checked", false);
                clearInterval(updateOne);
            }
        }
    });
}

//取消格式化商品编号
function cancelFormatGood(num) {
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

//取消格式化标签
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

//格式化商品序号
function formatGoodNum(id) {
    var str = "CWS";
    var idStr = id + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + id;
}

//格式化标签mac
function formatGoodRouterMac(mac) {
    var str = "CWR";
    var idStr = mac + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + mac;
}

//初始化更新时间弹出层
function initHtml() {
    htmlStr += '<div style="width:500px;height:222px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;参数设置</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" ><div>';
    htmlStr += '<table style="margin:20px auto;" ><tr><td>唤醒时间：</td><td>';
    htmlStr += '<input type="text" id="wakeTime" width="50px" value="2">&nbsp;秒</td></tr>';
    htmlStr += '<tr><td>更新个数：</td><td><input type="text" id="updateNumber" value="1" width="50px">';
    htmlStr += '&nbsp;个</td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;align:center"><input style="margin:10px auto;height:40px;';
    htmlStr += 'width:60px;background-color:#4d90fe;border:0px;" type="button" value="设置" onclick="save()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;" ';
    htmlStr += 'type="button" value="取消" onclick="cancel()" id="update_btn"></div></div></div></div>';
    return htmlStr;
}
