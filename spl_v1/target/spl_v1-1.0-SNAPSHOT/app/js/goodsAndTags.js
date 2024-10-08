var interval = new Object();
var updateOne = new Object();
var doUpdate = new Object();
var idArray = new Array();
var ids = new Array();
var htmlStr = "";
$(document).ready(
        function () {

            // 加载等待更新数据
            loadWaitGood();

            // 设置定时任务查询标签
            doUpdate = setInterval(function () {
                getUpdateResult();
            }, 1000);

            // 按回车键查询
            $("#search_name,#search_id,#search_tag").bind('keypress',
                    function (event) {
                        if (event.keyCode == 13) {
                            loadTagAndGoodData();
                        }
                    });

            // 复选框点击事件
            $(".right_content").click(
                    function (e) {
                        var target = $(e.target);
                        if (target.is("input")) {
                            var id = target.attr("data-flag");
                            var status = target.attr("data-stateflag");
                            var p = $("#text_" + id);
                            var inputs = $(".right_content").find(
                                    "input[type='checkbox']:checked");
                            $("#selected").val(inputs.length);
                        }
                    });

        });

// 查询更新结果
function getUpdateResult() {
    $.ajax({
        url: 'tagAndGood/queryWaitGoodResult',
        dataType: "JSON",
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status == 1) {
                        $("#text_" + data[i].id).html(
                                getLanguageContent("等待更新"));
                        $(".good_text_" + data[i].id).css("background",
                                "#e2ec54");
                    } else if (data[i].status == 2) {
                        $("#text_" + data[i].id).html(
                                getLanguageContent("正在更新"));
                        $(".good_text_" + data[i].id).css("background",
                                "rgba(75, 247, 248, 0.74)");
                    } else if (data[i].status == 5) {
                        $("#text_" + data[i].id).html(
                                getLanguageContent("正在更新"));
                        $(".good_text_" + data[i].id).css("background",
                                "rgba(75, 247, 248, 0.74)");
                    } else if (data[i].status == 3) {
                        $("#text_" + data[i].id).html(
                                getLanguageContent("更新失败"));
                        $(".good_text_" + data[i].id).css("background",
                                "rgb(234, 141, 141)");
                    } else if (data[i].status == 4) {
                        $("#text_" + data[i].id).html(
                                getLanguageContent("更新完成"));
                        $(".good_text_" + data[i].id).css("background",
                                "rgb(172, 243, 120)");
                    }
                }
            }
        }
    });
}

// 刷新
function refreshGoods() {
    clearInterval(interval)
    var queryData = $(".left_content");
    queryData.html("");
    var result = $(".right_content");
    result.empty();
    loadTagAndGoodData();
    loadWaitGood();
}

// 查询商品信息入口
function loadTagAndGoodData() {
    var id = $("#search_id").val();
    var tag = $("#search_tag").val();
    if (id == null || id.trim() == "") {
        $("#search_good_id").val("-1");
    } else {
        id = cancelFormatGood(id);
        $("#search_good_id").val(id);
    }
    if (tag == null || tag.trim() == "") {
        $("#search_good_tag").val("-1");
    } else {
        tag = cancelFormatTag(tag.trim());
        $("#search_good_tag").val(tag);
    }
    var goodid = $("#search_good_id").val();
    var goodtag = $("#search_good_tag").val();
    var goodname = $("#search_name").val();
    if (goodid != -1 || goodtag != -1 || goodname != "") {
        executeQuery();
    }
}

// 查询商品执行
function executeQuery() {
    $("#queryGoods").ajaxSubmit({
        url: 'tagAndGood/queryTagAndGoodData',
        type: "get",
        dataType: "text",
        success: function (data) {
            var queryData = $(".left_content");
            queryData.html("");
            queryData.html(data);
            $(".format_mac").each(function () {
                var mac = Number($(this).html());
                if (isNaN(mac)) {
                    return true;
                }
                var str = "CWT";
                str += mac >> 24 & 0xff;
                str += ".";
                str += mac >> 16 & 0xff;
                str += ".";
                str += mac >> 8 & 0xff;
                str += ".";
                str += mac & 0xff;
                $(this).html(str);
            })
        }
    });
}

function loadWaitGood() {
    $
            .ajax({
                url: 'tagAndGood/queryWaitGood',
                success: function (data) {
                    var result = $(".right_content");
                    result.empty()
                    result.html(data);
                    $("[id^=text_]")
                            .each(
                                    function () {
                                        var status = $(this).html();
                                        if (status.trim() == "等待更新") {
                                            $(".good_" + $(this).attr("ID"))
                                                    .css("background",
                                                            "#e2ec54");
                                        } else if (status.trim() == getLanguageContent("更新失败")) {
                                            $(".good_" + $(this).attr("ID"))
                                                    .css("background",
                                                            "rgb(234, 141, 141)");
                                        } else if (status.trim() == getLanguageContent("更新完成")) {
                                            $(".good_" + $(this).attr("ID"))
                                                    .css("background",
                                                            "rgb(172, 243, 120)");
                                        } else if (status.trim() == getLanguageContent("正在更新")) {
                                            $(".good_" + $(this).attr("ID"))
                                                    .css("background",
                                                            "rgba(75, 247, 248, 0.74)");
                                        }
                                    });
                    var total = $(".add_total").html();
                    $("#total").val(Number(total));
                    var inputs = $(".right_content").find(
                            "input[type='checkbox']:checked");
                    $("#selected").val(inputs.length);
                }
            });
}

// 价签地址格式
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

// 绑定标签->编辑按钮
function getTagAndGoodData(id) {
    $
            .ajax({
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
                    $("#bind-price").val(data['good'].price).FormatNumber({
                        decimal: 2
                    });
                    $("#bind-barcode").val(data['good'].barcode);
                    if (data['good'].promotion) {
                        $("#bind-promotion").find("option[value='true']").attr(
                                "selected", true);
                    } else {
                        $("#bind-promotion").find("option[value='false']")
                                .attr("selected", true);
                    }
                    $("#bind-qrCode").val(data['good'].qrCode);
                    $("#bind-promotionReason")
                            .val(data['good'].promotionReason);
                    $("#bind-promotePrice").val(data['good'].promotePrice)
                            .FormatNumber({
                                decimal: 2
                            });

                    var bind = data['bind'];
                    var free = data['free'];
                    $("#bind-tagSelect").empty();
                    $("#bind-tagSelect")
                            .append(
                                    "<option value='0' style='color:red;'> ———null———</option>");
                    if (free != null) {
                        $.each(free, function (i, t) {
                            $("#bind-tagSelect")
                                    .append(
                                            "<option value='" + t + "'>"
                                            + PrefixInteger(t, 6)
                                            + "</option>");
                        });
                    }
                    if (bind != null) {
                        $
                                .each(
                                        bind,
                                        function (i, t) {
                                            if (parseInt(data['tagid']) == parseInt(t)) {
                                                $("#bind-tagSelect")
                                                        .append(
                                                                "<option value='"
                                                                + t
                                                                + "' selected style='background:#efabab;'>"
                                                                + PrefixInteger(
                                                                        t,
                                                                        6)
                                                                + "</option>");
                                            } else {
                                                $("#bind-tagSelect")
                                                        .append(
                                                                "<option value='"
                                                                + t
                                                                + "' style='background:#efabab;'>"
                                                                + PrefixInteger(
                                                                        t,
                                                                        6)
                                                                + "</option>");
                                            }
                                        });
                    }
                    $('#bindModal').modal({
                        show: true,
                        backdrop: false
                    });
                },
                error: function () {
                    alert("bingTag error");
                }
            });
}

// 绑定标签->编辑->保存
function bindTag() {
    var price = $("#bind-price").val();
    var promotePrice = $("#bind-promotePrice").val();
    price = parseFloat(price.split(",").join(""));
    promotePrice = parseFloat(promotePrice.split(",").join(""));
    $("#tagAndGood_promotePrice").val(promotePrice);
    $("#format_price").val(price);
    $("#bindTagForm").ajaxSubmit(
            {
                url: "associate/updateTagAndGoodByMac",
                contentType: 'application/json',
                data: $("#bindTagForm").serialize(),
                dataType: "json",
                success: function (data) {
                    if (data == -1) {
                        if (self.frameElement
                                && self.frameElement.tagName == "IFRAME") {
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

// 更新按钮（多条数据）
function updateAll() {
    var inputs = $(".right_content").find("input[type='checkbox']:checked");
    for (var i = 0; i < inputs.size(); i++) {
        var input = inputs.eq(i);
        ids[i] = input.attr("data-flag");
        $(".checked").removeAttr("class");
    }
    updateAllTagScreen(ids);
}

// 更新多条记录发送数据
function updateAllTagScreen(ids) {
    if (ids.length == 0) {
        return;
    }
    var wakeTime = 0.5;
    var outTime = 10;
    $
            .ajax({
                url: "router/getOneRouter",
                dataType: "json",
                success: function (resp) {
                    if (resp) {
                        var period = Number(resp.longPeriod);
                        wakeTime = resp.shortPeriod;
                        outTime = period * 2;
                    }
                    $
                            .ajax({
                                url: "associate/prepareUpdateAll",
                                type: "get",
                                traditional: true,
                                data: {
                                    ids: ids,
                                    wakeTime: wakeTime,
                                    outTime: outTime
                                },
                                success: function (str) {
                                    var o = JSON.parse(str);
                                    if (o.isNull) {
                                        $(".updateAll").attr("disabled", false);
                                        var alerts = layer.alert("请编辑后更新", 1,
                                                function () {
                                                    layer.close(alerts);
                                                });
                                        return;
                                    }
                                    if (o.flag) {
                                        var goodNum = "";
                                        var arr = new Array();
                                        htmlStr = "";
                                        htmlStr = wakeHtml();
                                        if (wakeTime > 0) {
                                            $.layer({
                                                type: 1,
                                                title: false,
                                                area: ["auto", "auto"],
                                                border: [1, 0.5, '#000'],
                                                shade: [true],
                                                shift: 'top',
                                                move: '#title',
                                                closeBtn: 0,
                                                page: {
                                                    html: htmlStr
                                                }
                                            });
                                            $("#wakeTime").val(wakeTime);
                                            wakingUp = setInterval(function () {
                                                $("#wake_timing").val(outTime);
                                                outTime--;
                                                if (outTime < 0) {
                                                    clearInterval(wakingUp);
                                                }
                                            }, 1000);
                                        }
                                        var updateAll = setInterval(
                                                function () {
                                                    $
                                                            .ajax({
                                                                url: "router/prepareUpdateResult",
                                                                dataType: "text",
                                                                success: function (
                                                                        data) {
                                                                    if (data == '"true"') {
                                                                        var index = layer.index; // 获取当前弹层的索引号
                                                                        layer
                                                                                .close(index);
                                                                        clearInterval(updateAll);
                                                                        $
                                                                                .ajax({
                                                                                    url: "associate/updateAllTagScreen",
                                                                                    type: "POST",
                                                                                    traditional: true,
                                                                                    data: {
                                                                                        ids: ids
                                                                                    },
                                                                                    success: function (
                                                                                            response) {

                                                                                    }
                                                                                });
                                                                    } else if (data == '"false"') {
                                                                        $(
                                                                                ".updateAll")
                                                                                .attr(
                                                                                        "disabled",
                                                                                        false);
                                                                        var alerts = layer
                                                                                .alert(
                                                                                        "请求过程失败",
                                                                                        1,
                                                                                        function () {
                                                                                            layer
                                                                                                    .close(alerts);
                                                                                        });
                                                                        // 关闭所有弹出层
                                                                        var layerObj = $('.xubox_layer');
                                                                        $
                                                                                .each(
                                                                                        layerObj,
                                                                                        function () {
                                                                                            var i = $(
                                                                                                    this)
                                                                                                    .attr(
                                                                                                            'times');
                                                                                            layer
                                                                                                    .close(i);
                                                                                        });
                                                                        clearInterval(updateAll);
                                                                    }
                                                                }
                                                            });
                                                }, 1000);
                                    } else {
                                        $(".updateAll").attr("disabled", false);
                                        var alerts = layer.alert("请求更新过程失败", 1,
                                                function () {
                                                    layer.close(alerts);
                                                });
                                        return;
                                    }
                                }
                            });
                }
            });
    /*
     * $.ajax({ url : "associate/updateAllTagScreen", type: "POST", traditional:
     * true, data : {ids: ids}, success : function(response) { var resp =
     * JSON.parse(response); for (var i = 0 ; i < resp.length; i++) { for (var j =
     * 0; j < ids.length; j++) { if (ids[j] == resp[i].id) { if (resp[i].status ==
     * 1) { ids.splice(j, 1); } } } } } }); idArray = []; interval =
     * setInterval(function() { //定时器开始执行 checkUpdateState(ids); }, 2000);
     */
}

// 设置定时任务
function checkUpdateState(ids) {
    if (ids.length <= 0) {
        clearInterval(interval);
        return;
    }
    $.ajax({
        url: "associate/getGoodsState",
        type: "GET",
        traditional: true,
        data: {
            ids: ids
        },
        dataType: "json",
        success: function (data) {
            var flag = true;
            for (var i = 0; i < ids.length; i++) {
                if (data[i] == 1) {
                    $("#text_" + ids[i]).html(getLanguageContent("等待更新"));
                    $(".good_text_" + ids[i]).css("background", "#87ef3c");
                    $(".check_" + ids[i]).attr("checked", false);
                    flag = false;
                } else if (data[i] == 2) {
                    $("#text_" + ids[i]).html(getLanguageContent("正在更新"));
                    $(".good_text_" + ids[i]).css("background", "#95b1de");
                    $(".check_" + ids[i]).attr("checked", "checked");
                    flag = false;
                } else if (data[i] == 3) {
                    var hav = true;
                    $("#text_" + ids[i]).html(getLanguageContent("正在更新"));
                    $(".good_text_" + ids[i]).css("background", "#87ef3c");
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
                    $("#text_" + ids[i]).html(getLanguageContent("更新完成"));
                    $(".good_text_" + ids[i]).css("background", "#ddd");
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

// 批量更新失败重发
function doUpdateResendAll(idArray) {
    $.ajax({
        url: "associate/updateAllTagScreen",
        type: "POST",
        traditional: true,
        data: {
            ids: idArray
        },
        success: function () {

        }
    });
    interval = setInterval(function () { // 定时器开始执行
        doUpdateCheckAll(idArray);
    }, 2000);
}

// 批量更新失败检测
function doUpdateCheckAll(idArray) {
    $.ajax({
        url: "associate/getGoodsState",
        type: "GET",
        traditional: true,
        data: {
            ids: idArray
        },
        dataType: "json",
        success: function (data) {
            var flag = true;
            for (var i = 0; i < idArray.length; i++) {
                var status = $("#text_" + idArray[i]);
                if (data[i] == 1) {
                    status.html(getLanguageContent("等待更新"));
                    $(".good_text_" + idArray[i]).css("background", "#87ef3c");
                    $(".check_" + idArray[i]).attr("checked", false);
                    flag = false;
                } else if (data[i] == 2) {
                    status.html(getLanguageContent("正在更新"));
                    $(".good_text_" + idArray[i]).css("background", "#95b1de");
                    $(".check_" + idArray[i]).attr("checked", "checked");
                    flag = false;
                } else if (data[i] == 3) {
                    status.html(getLanguageContent("更新失败"));
                    $(".good_text_" + idArray[i]).css("background", "#e61631");
                    $(".check_" + idArray[i]).attr("checked", "checked");
                } else {
                    status.html(getLanguageContent("更新完成"));
                    $(".good_text_" + idArray[i]).css("background", "#ddd");
                    $(".check_" + idArray[i]).attr("checked", false);
                }
            }
            if (flag) {
                clearInterval(interval);
            }
        }
    });
}

// 获取标签图片
function updateTagScreen(id) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src",
            "associate/showImage?id=" + id + "&time=" + new Date().getTime());
    $("#update-id").val(id);
    $('#updateModal').modal({
        show: true,
        backdrop: false
    });
}

// 更新失败检测
function doUpdateCheck(id) {
    $.get("associate/updateTagScreenData?id=" + id, function (data) {
        var p = $("#text_" + id);
        p.removeAttr("class");
        if (data == '"success"') {
            p.text(getLanguageContent("正在更新"));
            $(".good_text_" + id).css("background", "#95b1de");
            $(".check_" + id).attr("checked", false);
            doUpdate = setInterval(function () {
                doUpdateOne(id);
            }, 1000);
        } else if (data == '"failed"') {
            p.text(getLanguageContent("更新失败"));
            $(".good_text_" + id).css("background", "#e61631");
            $(".check_" + id).attr("checked", "checked");
        }
    });
}

function doUpdateOne(id) {
    $.ajax({
        url: "associate/updateResult?id=" + id,
        success: function (data) {
            var status = $("#text_" + id);
            if (data == 1) {
                status.html(getLanguageContent("等待更新"));
                $(".good_text_" + id).css("background", "#87ef3c");
                $(".check_" + id).attr("checked", "checked");
            } else if (data == 2) {
                status.html(getLanguageContent("正在更新"));
                $(".good_text_" + id).css("background", "#95b1de");
                $(".check_" + id).attr("checked", false);
            } else if (data == 3) {
                status.html(getLanguageContent("更新失败"));
                $(".good_text_" + id).css("background", "#e61631");
                $(".check_" + id).attr("checked", "checked");
                clearInterval(doUpdate);
            } else if (data == 0) {
                $("#text_" + id).html(getLanguageContent("未更新"));
                $(".check_" + id).attr("checked", false);
                clearInterval(doUpdate);
            } else {
                $("#text_" + id).html(getLanguageContent("更新完成"));
                $(".good_text_" + id).css("background", "#ddd");
                $(".check_" + id).attr("checked", false);
                clearInterval(doUpdate);
            }
        }
    });
}

// 更新按钮
function doUpdateScreen() {
    var id = $("#update-id").val();
    $('#updateModal').modal('hide');
    var isSuccess = true;
    $.get("associate/updateTagScreenData?id=" + id, function (data) {
        var p = $("#text_" + id);
        p.removeAttr("class");
        if (data == '"success"') {
            p.text(getLanguageContent("正在更新"));
            $(".good_text_" + id).css("background", "#95b1de");
            $(".check_" + id).attr("checked", false);
            isSuccess = true;
        } else if (data == '"failed"') {
            p.text(getLanguageContent("正在更新"));
            $(".good_text_" + id).css("background", "#95b1de");
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

// 更新图片检测
function doUpdateOneTest(id) {
    $.ajax({
        url: "associate/updateResult?id=" + id,
        success: function (data) {
            if (data == 1) {
                status.html(getLanguageContent("等待更新"));
                $(".good_text_" + id).css("background", "#87ef3c");
                $(".check_" + id).attr("checked", "checked");
            } else if (data == 2) {
                status.html(getLanguageContent("正在更新"));
                $(".good_text_" + id).css("background", "#95b1de");
                $(".check_" + id).attr("checked", false);
            } else if (data == 3) {
                status.html(getLanguageContent("正在更新"));
                $(".good_text_" + id).css("background", "#95b1de");
                $(".check_" + id).attr("checked", "checked");
                clearInterval(updateOne);
                doUpdateCheck(id);
            } else if (data == 0) {
                status.html(getLanguageContent("未更新"));
                $(".check_" + id).attr("checked", false);
                clearInterval(updateOne);
            } else {
                status.html(getLanguageContent("更新完成"));
                $(".good_" + $(this).attr("ID")).css("background", "#ddd");
                $(".check_" + id).attr("checked", false);
                clearInterval(updateOne);
            }
        }
    });
}

// 添加到等待更新
function addGoodData(id) {
    var tr = $("#good" + id);
    var tag = $(".tag_null" + id).html().trim();
    if (tag == "") {
        alert("请先绑定标签");
        return;
    }
    $
            .ajax({
                url: 'tagAndGood/waitUpdate',
                type: 'post',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (resp) {
                    var gridAdd_body = $(".right_content");
                    tr.remove();
                    var data = "<tr id='good"
                            + id
                            + "' class='odd gradeX text-center data_tr good_text_"
                            + id + "'>";
                    data += "<td class='check_box right_td1'> <input type='checkbox' class='checkboxes check_"
                            + id + "'";
                    data += "data-flag='" + id + "' data-stateflag='"
                            + resp.status + "'";
                    if (resp.status == 1) {
                        data += "checked='checked'";
                    }
                    data += "></td><td class='right_td2'>" + formatGoodNum(id)
                            + "</td>";
                    data += "<td class='right_td3'>" + resp.name
                            + "</td><td class='tag_null right_td4'>";
                    data += "<span class='format_tag_mac'>"
                            + formatTagAddress(resp.tag.mac) + "</span></td>";
                    data += "<td class='right_td5'>" + resp.tag.style.name
                            + "</td><td class='right_td6'>";
                    if (resp.status == 1) {
                        data += "<p id='text_" + id + "'>"
                                + getLanguageContent("等待更新") + "</p>";
                    } else if (resp.status == 2) {
                        data += "<p id='text_" + id + "'>"
                                + getLanguageContent("正在更新") + "</p>";
                    } else if (resp.status == 3) {
                        data += "<p id='text_" + id + "'>"
                                + getLanguageContent("更新失败") + "</p>";
                    } else if (resp.status == 0) {
                        data += "<p id='text_" + id + "' null_tag'>"
                                + getLanguageContent("未更新") + "</p>";
                    } else {
                        data += "<p id='text_" + id + "'> "
                                + getLanguageContent("更新完成") + "</p>";
                    }
                    data += "</td><td class='right_td7'><button onclick='javascript:getTagAndGoodData("
                            + id
                            + ")' class='good_text_"
                            + id
                            + "'><i class='fa fa-pencil'></i></button>";
                    data += "<button onclick='javascript:updateTagScreen(" + id
                            + ")' class='good_text_" + id
                            + "'><i class='fa fa-repeat'></i></button>";
                    data += "<button onclick='javascript:removeGood(" + id
                            + ")' class='good_text_" + id
                            + "'><i>移除</i></button></td></tr>";
                    gridAdd_body.prepend(data);
                    var total = Number($("#total").val());
                    total = total + 1;
                    $("#total").val(total);
                    var inputs = $(".right_content").find(
                            "input[type='checkbox']:checked");
                    $("#selected").val(inputs.length);
                    var status = $("#text_" + id).html();
                    if (status.trim() == getLanguageContent("等待更新")) {
                        $(".good_text_" + id).css("background", "#e2ec54");
                    } else if (status.trim() == getLanguageContent("更新失败")) {
                        $(".good_text_" + id).css("background",
                                "rgb(234, 141, 141)");
                    } else if (status.trim() == getLanguageContent("更新完成")) {
                        $(".good_text_" + id).css("background",
                                "rgb(172, 243, 120)");
                    } else if (status.trim() == getLanguageContent("正在更新")) {
                        $(".good_text_" + id).css("background",
                                "rgba(75, 247, 248, 0.74)");
                    }
                }
            });
}

// 等待更新移除
function removeGood(id) {
    var rt = $("#good" + id);
    $.ajax({
        url: 'tagAndGood/removeGood',
        data: {
            id: id
        },
        dataType: "json",
        success: function (data) {
            if (data) {
                var total = Number($("#total").val());
                total = total - 1;
                $("#total").val(total);
                rt.remove();
                var inputs = $(".right_content").find(
                        "input[type='checkbox']:checked");
                $("#selected").val(inputs.length);
            } else {
                alert("移除失败");
            }
        }
    });
}

// 移除
function removeGoodData(id) {
    var tr = $("#good" + id);
    tr.remove();
}

// 取消格式化商品编号
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
function formatTagAddress(mac) {
    var str = "CWT";
    str += mac >> 24 & 0xff;
    str += ".";
    str += mac >> 16 & 0xff;
    str += ".";
    str += mac >> 8 & 0xff;
    str += ".";
    str += mac & 0xff;
    return str;
}

// 格式化商品序号
function formatGoodNum(id) {
    var str = "CWS";
    var idStr = id + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + id;
}

// 格式化标签mac
function formatGoodRouterMac(mac) {
    var str = "CWR";
    var idStr = mac + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + mac;
}

// 初始化更新时间弹出层
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
