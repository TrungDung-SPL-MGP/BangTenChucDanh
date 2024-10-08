var htmlStr = "";
var interval = new Object();
$(document).ready(function () {
    // 加载路由器数据信息
    loadRouterData(1);

    // 设置定时任务更新在线情况
    setTimer();

    // 显示路由器信息
    this.getRouter = function (id) {
        getRouter(id);
    };

    // 恢复出厂设置
    this.restore = function (id) {
        restore(id);
    };

    // 获取433M参数
    this.getParameter = function (id) {
        getParameter(id);
    };

    // 路由器升级
    this.initUpdate = function (id) {
        initUpdate(id);
    };

    // 路由器删除
    this.deleteRouter = function (id) {
        deleteRouter(id);
    };

    // 按回车键查询
    $("#search_router_name").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadRouterData(1);
        }
    });
});

// 查看路由器信息
function getRouter(id) {
    var param = new Object();
    param.id = id;
    htmlStr = "";
    htmlStr = init();
    $.layer({
        type: 1,
        title: false,
        area: ["auto", "auto"],
        border: [1, 0.5, '#000'],
        shade: [true],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        page: {
            html: htmlStr
        }
    });
    $.ajax({
        url: "router/getRouterById",
        dataType: "json",
        data: param,
        success: function (response) {
            var mac = formatRouter(response.router.mac);
            var hard = formatRouterVersion(response.router.hardVersion);
            var soft = formatRouterVersion(response.router.softVersion);
            $("#routerName").val(mac);
            $("#mac").val(response.router.mac);
            $("#routerId").val(response.router.id);
            $("#ip").val(response.router.ip);
            $("#port").val(response.router.port);
            if (response.router.state) {
                $("#state").val("true");
            } else {
                $("#state").val("false");
            }
            $("#channelId").val(response.router.channelId);
            $("#serialNumber").val(response.router.serialNumber);
            $("#productor").val(response.router.productor);
            $("#softVersion").val(soft);
            $("#hardVersion").val(hard);
            $("#productBatch").val(response.router.productBatch);
            $("#sendBaudrate").val(response.router.sendBaudrate);
            $("#receiveBaudrate").val(response.router.receiveBaudrate);
            $("#wakeup").val(response.router.shortPeriod);
            $("#enterSleep").val(response.router.longPeriod);
            $("#frequency").val(response.router.frequency + "M");
            $("#power").val(response.router.power);
            if (response.router.updateState == 3) {
                $("#updateState").val("升级成功");
            } else if (response.router.updateState == 4) {
                $("#updateState").val("升级失败");
            } else if (response.router.updateState == 2) {
                $("#updateState").val("正在升级");
            } else {
                $("#updateState").val("等待升级");
            }
        }
    });
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

function restore(id) {
    htmlStr = "";
    htmlStr = restoreHtml();
    $.layer({
        type: 1,
        title: false,
        area: ["auto", "auto"],
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
        var param = new Object();
        param.id = id;
        $.ajax({
            url: "router/restore",
            dataType: "text",
            data: param,
            success: function (data) {
                var alerts = layer.alert(data, 1, function () {
                    layer.close(alerts);
                    location.href = "router/getRouters";
                });
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

function getParameter(id) {
    htmlStr = "";
    htmlStr = initParamHtml();
    $.layer({
        type: 1,
        title: false,
        borderWidth: 0,
        area: ["auto", "auto"],
        border: [1, 0.5, '#000'],
        shade: [true],
        shift: "top",
        move: '#title',
        closeBtn: 0,
        page: {
            html: htmlStr
        }
    });
    var param = new Object();
    param.id = id;
    $.ajax({
        url: "router/getRouterById",
        dataType: "json",
        data: param,
        success: function (data) {
            if (data) {
                $("#sendBaudrate").val(data.router.sendBaudrate);
                $("#receiveBaudrate").val(data.router.receiveBaudrate);
                $("#enterSleep").val(data.router.longPeriod);
                $("#wakeup").val(data.router.shortPeriod);
                $("#frequency").val(data.router.frequency);
                $("#power").val(data.router.power);
            }
        }
    });
    this.setting = function () {
        var obj = new Object();
        obj.id = id;
        obj.sendBaudrate = $("#sendBaudrate").val();
        obj.receiveBaudrate = $("#receiveBaudrate").val();
        obj.enterSleep = $("#enterSleep").val();
        obj.wakeup = $("#wakeup").val();
        obj.frequency = $("#frequency").val();
        obj.power = $("#power").val();
        $.ajax({
            url: "router/parameterSetting",
            dataType: "text",
            data: obj,
            success: function (data) {
                var alerts = layer.alert(data, 1, function () {
                    layer.close(alerts);
                    location.href = "router/getRouters";
                });
            },
            error: function () {
                var alerts = layer.alert("设置错误", 2, function () {
                    layer.close(alerts);
                });
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

function initUpdate(id) {
    htmlStr = "";
    htmlStr = initHtml();
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
    var param = new Object();
    param.id = id;
    $.ajax({
        url: "router/getRouterById",
        dataType: "json",
        data: param,
        success: function (response) {
            var mac = formatRouter(response.router.mac);
            var hard = formatRouterVersion(response.router.hardVersion);
            var soft = formatRouterVersion(response.router.softVersion);
            $("#routerId").val(response.router.id);
            $("#routerName").val(mac);
            $("#hardVersion").val(hard);
            $("#softVersion").val(soft);
        }
    });
    this.update = function () {
        var routerId = $("#routerId").val();
        var file = $("#file").val();
        if (routerId == "" || routerId == null) {
            return false;
        } else if (file == null || file == "") {
            var alerts = layer.alert(getLanguageContent("请选择文件"), 1, function () {
                layer.close(alerts);
            });
        } else {
            $("#router_update").ajaxSubmit(
                    {
                        type: "post",
                        url: "router/update",
                        dataType: "text",
                        success: function () {
                            var index = layer.index; // 获取当前弹层的索引号
                            layer.close(index); // 关闭当前弹层
                            interval = setInterval("checkUpdate(" + routerId
                                    + ")", 1000);
                        }
                    });
        }
    }
    this.cancel = function () { // 关闭所有弹出层
        var layerObj = $('.xubox_layer');
        $.each(layerObj, function () {
            var i = $(this).attr('times');
            layer.close(i);
        });
    }
}

function deleteRouter(id) {
    htmlStr = "";
    htmlStr = deleteHtml();
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
            url: "router/deleteById",
            dataType: "json",
            data: {
                'id': id
            },
            success: function (response) {
                if (response == 1) {
                    var current = $("#page_currentPage").val();
                    loadRouterData(current);
                } else {
                    alert(`  ${getLanguageContent("删除失败")} !  `);
                }
            }
        });
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
    this.cancel = function () {
        // 关闭所有弹出层
        var layerObj = $('.xubox_layer');
        $.each(layerObj, function () {
            var i = $(this).attr('times');
            layer.close(i);
        });
    }
}

// 刷新
function refresh() {
    var queryData = $("#gridImport_body");
    queryData.html("");
    $("#search_router_name").val("");
    $("#search_router_mac").val(-1);
    loadRouterData(1);
}

// 加载路由器数据信息
function loadRouterData(current) {
    var position = $(".user_position", window.parent.document).html();
    if (position != "" && position == 1 || position == 2) {
        $("#add_Update").show();
    }
    var mac = $("#search_router_name").val();
    $("#search_router_mac").val(cancelFormat(mac));
    $("#query_routers").ajaxSubmit({
        url: "router/queryRouters?currentPage=" + current,
        dataType: "text",
        success: function (data) {
            var queryData = $("#gridImport_body");
            queryData.html("");
            queryData.html(data);
            var user = $(".username", window.parent.document).html();
            if (user.trim() == "root") {
                $(".parameter_btn").show();
            }
            $("[class ^= 'status']").each(function () {
                if ($(this).html().trim() == getLanguageContent("在线")) {
                    $(this).css("color", "red");
                }
            });
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
                    + "'><a href = 'javascript:loadRouterData(" + i + ");' >"
                    + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1)
                        + "'><a href = 'javascript:loadRouterData("
                        + Number(j + 1) + ");' >" + Number(j + 1)
                        + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadRouterData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadRouterData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadRouterData("
                            + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadRouterData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadRouterData("
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

// 添加路由器层
function toAddRouter() {
    $('#addModal').modal({
        show: true,
        backdrop: false
    });
}

// 添加路由器
function addRouter() {
    $("#addRouterForm").ajaxSubmit({
        url: "router/addRouter",
        contentType: 'application/json',
        data: $("#addRouterForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadRouterData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}

// 检查更新状态（定时器）
function checkUpdate(router) {
    var param = new Object();
    param.id = router;
    $.ajax({
        url: "router/getRouterById",
        async: true,
        type: "GET",
        dataType: "json",
        data: param,
        success: function (data) {
            if (data.router.updateState == 2) {
                $("." + data.router.id + "updateState").html(getLanguageContent("正在升级"));
                $("." + data.router.id + "updateState").css("color", "blue");
            } else if (data.router.updateState == 3) {
                $("." + data.router.id + "updateState").html(getLanguageContent("升级成功"));
                $("." + data.router.id + "updateState").css("color", "green");
                clearInterval(interval);
            } else if (data.router.updateState == 4) {
                $("." + data.router.id + "updateState").html(getLanguageContent("升级失败"));
                $("." + data.router.id + "updateState").css("color", "red");
                clearInterval(interval);
            } else {
                $("." + data.router.id + "updateState").html(getLanguageContent("等待升级"));
                $("." + data.router.id + "updateState").css("color", "orange");
                clearInterval(interval);
            }
        }
    });
}

// 定时器查询路由器在线状态
function setTimer() {
    setInterval(function () {
        $.ajax({
            url: "router/getOnlineState",
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    if (data[i].state) {
                        $(".status" + id).html(getLanguageContent("在线"));
                        $(".status" + id).css("color", "red");
                    } else {
                        $(".status" + id).html(getLanguageContent("离线"));
                        $(".status" + id).css("color", "#111");
                    }
                }
            }
        });
    }, 5000);
}

// 周期设置
function setPeriod() {
    htmlStr = "";
    htmlStr = periodHtml();
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
    $.ajax({
        url: "router/getOneRouter",
        dataType: "json",
        success: function (resp) {
            var period = resp.longPeriod;
            $("#wake_period").val(period);
            $("#out_time").val(period * 2);
            $("#limit_outTime").html(period * 2);
        }
    });
    this.checkOutTime = function (value) {
        var time = Number($("#limit_outTime").html());
        if (value < time) {
            $("#out_time").val(time);
        }
    }
    // 保存按钮
    this.save = function () {
        var wakePeriod = $("#wake_period").val();
        wakeTime = $("#wakeTime").val();
        outTime = $("#out_time").val();
        $("#show_cont").empty();
        $("#update_btn").hide();
        $("#set_button").hide();
        $
                .ajax({
                    url: 'associate/tagWakePeriod',
                    data: {
                        wakePeriod: wakePeriod,
                        outTime: outTime
                    },
                    dataType: "JSON",
                    success: function (resp) {
                        if (resp == "user") {
                            $("#show_cont")
                                    .append(
                                            '<table><tr style="height: 50px;"><td><input type ="text" id="wake_text" '
                                            + `style="border:none;font-size:20px;width:170px;" value="${getLanguageContent("登录超时，请重新登录")}!"></td><td></td></tr></table>`);
                            $("#update_btn").show();
                            $("#update_btn").html(getLanguageContent("确定"));
                        }
                        if (resp == "true") {
                            $("#show_cont")
                                    .append(
                                            '<table><tr style="height: 50px;"><td><input type ="text" id="wake_text" '
                                            + `style="border:none;font-size:20px;width:170px;" value="${getLanguageContent("正在设置周期")}..."></td><td><input id="wake_timing" `
                                            + `style="font-size:50px;border:none;width:80px;height:60px;">&nbsp;${getLanguageContent("秒")}</td></tr></table>`);
                            $("#wake_timing").val(outTime);
                            wakingUp = setInterval(function () {
                                outTime--;
                                $("#wake_timing").val(outTime);
                                if (outTime < 0) {
                                    clearInterval(wakingUp);
                                    var index = layer.index; // 获取当前弹层的索引号
                                    layer.close(index);
                                }
                            }, 1000);
                        } else if (resp == "router") {
                            $("#show_cont")
                                    .append(
                                            '<table><tr style="height: 50px;"><td><input type ="text" id="wake_text" '
                                            + `style="border:none;font-size:20px;width:300px;" value="${getLanguageContent("路由器离线，请检查路由器状态")}"></td></tr></table>`);
                            $("#update_btn").show();
                            $("#update_btn").html(getLanguageContent("确定"));
                        }

                    }
                });
    }
    // 取消按鈕
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 绑定店铺
function selectShop(router, id) {
    $.ajax({
        url: "router/selectShop",
        data: {
            router: router,
            id: id
        },
        dataType: "json",
        success: function (resp) {
            if (resp == false) {
                alert(getLanguageContent('绑定店铺失败'));
            }
        }
    });
}

// 设置频率
function setFrequency(id, f) {
    var freq = parseInt(f.replace(/[^0-9]/ig, ""));
    $.ajax({
        url: "router/setFrequency",
        data: {
            id: id,
            freq: freq
        },
        success: function (resp) {
            // alert(resp);
        }
    });
}

// 取消格式化mac
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

// 格式化路由器名称mac
function formatRouter(mac) {
    var str = "CWR";
    var idStr = mac + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + mac;
}

// 格式化版本号
function formatRouterVersion(version) {
    if (isNaN(version)) {
        return version;
    }
    var main = version >> 24 & 0xff;
    var sub = version >> 16 & 0xff;
    var ver = version & 0xffff;
    return main + "." + sub + "." + ver;
}

// 初始化恢复出厂设置弹出层
function restoreHtml() {
    htmlStr += `<div style="width:300px;height:230px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("恢复出厂设置")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" >`;
    htmlStr += `<table><tr style="height:50px;"><td colspan="2"><p>${getLanguageContent("确认恢复出厂设置")}？</p></td></tr>`;
    htmlStr += `<tr style="height:50px;"><td></td><td></td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;text-align:center;">`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("确认")}" onclick="confirm();">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel();"></div></div></div>`;
    return htmlStr;
}

// 初始化433参数设置弹出层
function initParamHtml() {
    htmlStr += `<div style="width:300px;height:354px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;${getLanguageContent("433参数设置")}</div>';
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" ><div>`;
    htmlStr += `<table style='margin:20px auto;'><tr><td>${getLanguageContent("发送波特率")}：`;
    htmlStr += `</td><td><select style='height: 22px;width: 100px;margin-top:10px;' id='sendBaudrate'>`;
    htmlStr += `<option value='1' selected='selected'>10k</option>`;
    htmlStr += `<option value='2'>25k</option>`;
    htmlStr += `</select></td></tr><tr><td>${getLanguageContent("接收波特率")}：`;
    htmlStr += `</td><td><select style='height: 22px;width: 100px;margin-top:10px;' id='receiveBaudrate'>`;
    htmlStr += `<option value='2' selected='selected'>25k</option>`;
    htmlStr += `<option value='1'>10k</option>`;
    htmlStr += `</select></td></tr><tr><td>${getLanguageContent("唤醒时间")}：</td><td>`;
    htmlStr += `<input type='text' style='height: 22px;width: 100px;' id='wakeup'>`;
    htmlStr += `</td></tr><tr><td>${getLanguageContent("休眠时间")}：</td><td>`;
    htmlStr += `<input type='text' style='height: 22px;width: 100px;' id='enterSleep'></td></tr><tr><td>`;
    htmlStr += `${getLanguageContent("频率")}：</td><td><select style='height: 22px;width: 100px;margin-top:10px;' id='frequency'>`;
    htmlStr += `<option value='1' selected='selected'>433M</option>`;
    htmlStr += `<option value='2'>434M</option>`;
    htmlStr += `<option value='3'>436M</option>`;
    htmlStr += `<option value='4'>439M</option>`;
    htmlStr += `</select></td></tr><tr><td>`;
    htmlStr += `${getLanguageContent("功率")}：</td><td><select style='height: 22px;width: 100px;margin-top:10px;' id='power'>`;
    htmlStr += `<option value='1' selected='selected'>11db</option>`;
    htmlStr += `<option value='2'>9db</option>`;
    htmlStr += `<option value='3'>7db</option>`;
    htmlStr += `</select></td></tr></table><div style='background-color:#aaa;text-align:center;'>`;
    htmlStr += `<input style='margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;'`;
    htmlStr += `type='button' value='${getLanguageContent("设置")}' onclick='setting();'/>`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += ` type="button" value="${getLanguageContent("取消")}" onclick="cancel();"></div></div></div></div>`;
    return htmlStr;
}

// 初始化路由器升级弹出层
function initHtml() {
    htmlStr += `<div style="width:500px;height:285px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("路由器升级")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" ><div>`;
    htmlStr += `<form action="" encType="multipart/form-data" method="post" id="router_update">`;
    htmlStr += `<table style="margin:20px auto;"><tr><td><input type="hidden" name="routerId" id="routerId" width="50px"/>`;
    htmlStr += `${getLanguageContent("路由器名称")}：</td><td><input type="text" id="routerName" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("当前硬件版本号")}：</td><td><input type="text" name="hard" id="hardVersion" width="50px">`;
    htmlStr += `</td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("当前软件版本号")}：</td><td><input type="text" id="softVersion" name="soft" width="50px">`;
    htmlStr += `</td></tr><tr><td></td><td><input type="file" name="file" id="file" width="50px">`;
    htmlStr += `</td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;align:center"><input style="margin:10px auto;height:40px;`;
    htmlStr += `width:60px;background-color:#4d90fe;border:0px;" type="button" value="${getLanguageContent("升级")}" onclick="update();">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;" `;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel();" id="update_btn"></div></form></div></div></div>`;
    return htmlStr;
}

// 初始化路由器信息显示弹出层
function init() {
    htmlStr += `<div style="width:650px;height:430px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("路由器设置")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" ><div>`;
    htmlStr += `<table style="margin:20px auto;"><tr><td><input type="hidden" id="routerId" width="50px"/>`;
    htmlStr += `${getLanguageContent("路由器地址")}：</td><td><input type="text" id="routerName" width="50px">`;
    htmlStr += `<input type="hidden" id="mac"></td><td>`;
    htmlStr += `${getLanguageContent("路由器ip地址")}：</td><td><input type="text" id="ip" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("路由器端口")}：</td><td><input type="text" id="port" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("路由器状态")}：</td><td><select id="state" style="width:162px;height:25px;margin-top:10px;">`;
    htmlStr += `<option value="true">${getLanguageContent("在线")}</option><option value="false">${getLanguageContent("离线")}</option></select></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("升级状态")}：</td><td><input type="text" id="updateState" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("路由器序列号")}：</td><td><input type="text" id="serialNumber" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("生产商")}：</td><td><input type="text" id="productor" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("出厂批次")}：</td><td><input type="text" id="productBatch" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("硬件版本号")}：</td><td><input type="text" id="hardVersion" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("软件版本号")}：</td><td><input type="text" id="softVersion" width="50px"></td></tr><tr><td>`;
    htmlStr += `${getLanguageContent("发送波特率")}：</td><td><select style="height: 25px;width: 162px;margin-top:10px;" id="sendBaudrate">`;
    htmlStr += `<option value="1">50K</option><option value="2">25k</option></select></td><td>`;
    htmlStr += `${getLanguageContent("接收波特率")}：</td><td><select style="height: 25px;width: 162px;margin-top:10px;" id="receiveBaudrate">`;
    htmlStr += `<option value="1">50K</option><option value="2">10k</option></select></td><td>`;
    htmlStr += `<tr><td>${getLanguageContent("长周期")}：</td><td><input type="text" id="enterSleep" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("短周期")}：</td><td><input type="text" id="wakeup" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("功率")}：</td><td><select style="height: 25px;width: 162px;margin-top:10px;" id="power">`;
    htmlStr += `<option value="1">11db</option><option value="2">9db</option>`;
    htmlStr += `<option value="3">7db</option></select></td><td>`;
    htmlStr += `${getLanguageContent("频率")}：</td><td><input type="text" id="frequency" width="50px"></td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;align:center">`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("退出")}" onclick="cancel();"></div></div></div></div>`;
    return htmlStr;
}

// 初始化删除路由器弹出层
function deleteHtml() {
    htmlStr += `<div style="width:300px;height:230px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("恢复出厂设置")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" >`;
    htmlStr += `<table><tr style="height:50px;"><td colspan="2"><p>${getLanguageContent("确认删除路由器")}？</p></td></tr>`;
    htmlStr += `<tr style="height:50px;"><td></td><td></td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;text-align:center;">`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("确认")}" onclick="confirm();">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel();"></div></div></div>`;
    return htmlStr;
}

// 初始化设置周期弹出层
function periodHtml() {
    htmlStr += '<div style="width:500px;height:234px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;'
            + getLanguageContent("周期设置") + '</div>';
    htmlStr += '<div id="show_cont" style="width:330px;height:92px;margin:0px auto;"><table><tr>';
    htmlStr += '<td>'
            + getLanguageContent("唤醒周期")
            + '：</td><td><input value="5" width="50px" id="wake_period">&nbsp;秒</td>';
    htmlStr += `<td style="color:red;">&nbsp;${getLanguageContent("推荐")}&nbsp;10&nbsp;s</td></tr><tr><td>`
            + getLanguageContent("超时时间") + '：</td>';
    htmlStr += '<td><input width="50px" id="out_time" onchange="checkOutTime(this.value);">&nbsp;'
            + getLanguageContent("秒") + '</td>';
    htmlStr += '<td style="color:red;">' + getLanguageContent("不小于")
            + '&nbsp;<span id="limit_outTime"></span>&nbsp;s</td></tr></table>';
    htmlStr += '</div><div style="display:block; padding-bottom:5px;" align="center" ><div>';
    htmlStr += '<div style="background-color:#aaa;align:center;height:72px;"><input style="margin:10px auto;height:40px;';
    htmlStr += 'width:60px;background-color:#4d90fe;border:0px;" type="button" value="'
            + getLanguageContent("设置") + '" onclick="save();" id="set_button">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="' + getLanguageContent("取消")
            + '" onclick="cancel();" id="update_btn"></div></div></div></div>';
    return htmlStr;
}