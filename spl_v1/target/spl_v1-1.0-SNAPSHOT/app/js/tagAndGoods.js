var interval = new Object();
var wakingUp = new Object();
var success = new Object();
var routerTest = new Object();
var ids = new Array();
var htmlStr = "";
$(document).ready(function () {

    // 复选框点击事件
    $("#gridImport_body").click(function (e) {
        var target = $(e.target);
        if (target.is("input")) {
            var id = target.attr("data-flag");
            var status = target.attr("data-stateflag");
            var p = $("#text_" + id);
            dealNullTag(id, target);
            if (target.is(":checked")) {
                $.ajax({
                    url: "good/checkBoxUpdate",
                    dataType: "json",
                    data: {param: id},
                    success: function (data) {
                        if (data == true) {
                            p.removeAttr("class");
                            p.text(getLanguageContent("等待更新"));
                            p.attr("class", "update_wait");
                        }
                    }
                });
            } else {
                $.ajax({
                    url: "good/checkBoxCancel",
                    dataType: "json",
                    data: {param: id, sta: status},
                    success: function (data) {
                        p.removeAttr("class");
                        if (data == true) {
                            if (status == 1) {
                                p.text(getLanguageContent("等待更新"));
                                p.attr("class", "update_wait");
                            } else if (status == 2) {
                                p.text(getLanguageContent("正在更新"));
                                p.attr("class", "updating");
                            } else if (status == 3) {
                                p.text(getLanguageContent("更新失败"));
                                p.attr("class", "update_failed");
                            } else if (status == 0) {
                                p.text(getLanguageContent("未更新"));
                            } else {
                                p.text(getLanguageContent("更新完成"));
                                p.attr("class", "update_success");
                            }
                        }
                    }
                });
            }
        }
    });

    // 设置定时任务查询标签
    interval = setInterval(function () {
        getupdateResult();
    }, 1000);

    // 成功率检测
    success = setInterval(function () {
        successful();
    }, 1500);

    // 加载绑定标签的数据
    loadTagAndGoodData(1);

    // 按回车键查询
    $("#search_name,#search_id,#search_tag").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadTagAndGoodData(1);
        }
    });

});

// 查询更新结果
function getupdateResult() {
    var current = $("#page_currentPage").val();
    var name = $("#search_name").val();
    var id = $("#search_good_id").val();
    var tag = $("#search_good_tag").val();
    var mac = cancelFormatTag(tag);
    $.ajax({
        url: 'tagAndGood/getUpdateResult?currentPage=' + current,
        type: 'get',
        dataType: "json",
        data: {name: name, mac: mac, id: id},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].status == 1) {
                    $("#text_" + data[i].id).html(getLanguageContent("等待更新"));
                    $("#text_" + data[i].id).attr("class", "update_wait");
                    $(".checkboxes.check_" + data[i].id).attr("checked", true);
                } else if (data[i].status == 2) {
                    $("#text_" + data[i].id).html(getLanguageContent("正在更新"));
                    $("#text_" + data[i].id).attr("class", "updating");
                    $(".checkboxes.check_" + data[i].id).attr("checked", false);
                } else if (data[i].status == 5) {
                    $("#text_" + data[i].id).html(getLanguageContent("正在更新"));
                    $("#text_" + data[i].id).attr("class", "updating");
                    $(".checkboxes.check_" + data[i].id).attr("checked", false);
                } else if (data[i].status == 3) {
                    $("#text_" + data[i].id).html(getLanguageContent("更新失败"));
                    $("#text_" + data[i].id).attr("class", "update_failed");
                    $(".checkboxes.check_" + data[i].id).attr("checked", true);
                } else if (data[i].status == 4) {
                    $("#text_" + data[i].id).html(getLanguageContent("更新完成"));
                    $("#text_" + data[i].id).attr("class", "update_success");
                    $(".checkboxes.check_" + data[i].id).attr("checked", false);
                } else {
                    $("#test_" + data[i].id).html(getLanguageContent("未更新"));
                    $("#text_" + data[i].id).attr("class", "null_tag");
                }
            }
        }
    });
}

// 空标签处理
function dealNullTag(id, target) {
    if ($("#text_" + id).html() == getLanguageContent("未更新")) {
        target.attr("checked", false);
    } else if ($("#text_" + id).html() == getLanguageContent("更新完成")) {
        target.attr("checked", false);
    }
}

// 刷新
function refreshGoods() {
    var queryData = $("#gridImport_body");
    var current = $("#page_currentPage").val();
    queryData.html("");
    $("#search_id").val("");
    loadTagAndGoodData(current);
}

// 查询商品信息入口
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

// 查询商品执行
function executeQuery(current) {
    $("#queryGoods").ajaxSubmit({
        url: 'tagAndGood/queryTagAndGoods?currentPage=' + current,
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

// 查询商品分页
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var pages = $("#pages").val();
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i + "'><a href = 'javascript:loadTagAndGoodData(" + i
                    + ");' >" + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1) + "'><a href = 'javascript:loadTagAndGoodData("
                        + Number(j + 1) + ");' >" + Number(j + 1) + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadTagAndGoodData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadTagAndGoodData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadTagAndGoodData(" + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadTagAndGoodData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadTagAndGoodData(" + Number(pages - 6 + k) + ");' >"
                            + Number(pages - 6 + k) + "</a></span>";
                }
            }
        }
    }
    $(".showPage").html(showPage);
    $(".current_" + current).css("background", "#dbffd6");
    $(".last_page").val(pages);
    $(".next").val(Number(current + 1));
    $(".prev").val(Number(current - 1));
    $(".total_p").val(pages);
    $(".skip_to").val(current);
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
    $.ajax({
        url: "tagAndGood/getTagAndGoodData?id=" + id,
        type: "POST",
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
            $("#bind-id").val(data['good'].id);
            $("#bind-name").val(data['good'].name);
            $("#bind-origin").val(data['good'].origin);
            $("#bind-provider").val(data['good'].provider);
            $("#bind-unit").val(data['good'].unit);
            $("#bind-price").val(data['good'].price);
            $("#bind-barcode").val(data['good'].barcode);
            if (data['good'].promotion) {
                $("#bind-promotion").find("option[value='true']").attr("selected", true);
            } else {
                $("#bind-promotion").find("option[value='false']").attr("selected", true);
            }
            $("#bind-qrCode").val(data['good'].qrCode);
            $("#bind-promotionReason").val(data['good'].promotionReason);
            $("#bind-promotePrice").val(data['good'].promotePrice);
            var bind = data['bind'];
            var free = data['free'];
            $("#bind-tagSelect").empty();
            $("#bind-tagSelect").append("<option value='0' style='color:red;'> ———null——— </option>");
            if (free != null) {
                $.each(free, function (i, t) {
                    $("#bind-tagSelect").append("<option value='" + t + "'>" + PrefixInteger(t, 6) + "</option>");
                });
            }
            if (bind != null) {
                $.each(bind, function (i, t) {
                    if (parseInt(data['tagid']) == parseInt(t)) {
                        $("#bind-tagSelect").append("<option value='" + t
                                + "' selected style='background:#efabab;'>" + PrefixInteger(t, 6) + "</option>");
                    } else {
                        $("#bind-tagSelect").append("<option value='"
                                + t + "' style='background:#efabab;'>" + PrefixInteger(t, 6) + "</option>");
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

// 绑定标签->编辑->保存
function bindTag() {
    var price = $("#bind-price").val();
    var promotePrice = $("#bind-promotePrice").val();
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

// 更新按钮（多条数据）
function updateAll() {
    ids = [];
    var inputs = $("#gridImport").find("input[type='checkbox']:checked");
    for (var i = 0; i < inputs.size(); i++) {
        var input = inputs.eq(i);
        ids[i] = input.attr("data-flag");
        $(".check_" + ids[i]).attr("checked", false);
    }
    updateAllTagScreen(ids);
}

// 更新多条记录发送数据
function updateAllTagScreen(ids) {
    var shtmlStr = "";
    preperUpd.style.display = "block";
    if (ids.length == 0) {
        $(".updateAll").attr("disabled", false);
        return;
    }
    var send = false;
    var wakeTime = $.cookie("wakeTime");
    var outTime = $.cookie("outTime");
    $.ajax({
        url: "router/getOneRouter",
        dataType: "json",
        success: function (resp) {
            if (resp) {
                var period = Number(resp.longPeriod);
                wakeTime = resp.shortPeriod;
                outTime = period * 2;
            } else {
                wakeTime = 0.5;
                outTime = 10;
            }
            $.ajax({
                url: "associate/prepareUpdateAll",
                type: "get",
                traditional: true,
                data: {ids: ids, wakeTime: wakeTime, outTime: outTime},
                success: function (str) {
                    var index = layer.index; // 获取当前弹层的索引号
                    layer.close(index);
                    preperUpd.style.display = "none";
                    var o = JSON.parse(str);
                    if (o.state) {
                        $(".updateAll").attr("disabled", false);
                        openLayer(getLanguageContent("信息"), getLanguageContent("路由器离线") + "！");
                        return;
                    }
                    if (o.edit) {
                        $(".updateAll").attr("disabled", false);
                        openLayer(getLanguageContent("信息"), getLanguageContent("数据编辑异常，请编辑后更新") + "！");
                        return;
                    }
                    if (o.flag) {
                        preperUpd.style.display = "none";
                        $(".updateAll").attr("disabled", true);
                        var count = o.count;
                        htmlStr = "";
                        htmlStr = wakeHtml();
                        if (wakeTime > 0) {
                            layer.open({
                                type: 1,
                                title: false,
                                area: ["auto", "auto"],
                                border: [1, 0.5, '#000'],
                                shade: [0],
                                shift: 'top',
                                move: '#title',
                                closeBtn: 0,
                                content: htmlStr
                            });
                            $("#wakeTime").val(wakeTime);
                            wakingUp = setInterval(function () {
                                $("#wake_timing").val(outTime);
                                outTime--;
                                if (outTime < 0) {
                                    clearInterval(wakingUp);
                                    var index = layer.index; // 获取当前弹层的索引号
                                    layer.close(index);
                                }
                            }, 1000);
                        }
                        var updateAll = setInterval(function () {
                            $.ajax({
                                url: "router/prepareUpdateResult",
                                dataType: "text",
                                success: function (data) {
                                    if (data == '"true"') {
                                        send = true;
                                        preperUpd.style.display = "none";
                                        /*
                                         * var index = layer.index; //
                                         * 获取当前弹层的索引号 layer.close(index);
                                         * clearInterval(updateAll);
                                         */
                                        $.ajax({
                                            url: "associate/updateAllTagScreen",
                                            type: "POST",
                                            traditional: true,
                                            data: {count: count},
                                            success: function (response) {
                                                console.log(response);
                                            }
                                        });
                                    } else if (data == '"false"') {
                                        send = true;
                                        $(".updateAll").attr("disabled", false);
                                        openLayer(getLanguageContent("信息"), getLanguageContent("请求过程失败") + "");
                                        layer.closeAll();
                                        clearInterval(updateAll);
                                    }
                                }
                            });
                        }, 1000);
                        setTimeout(function () {
                            clearInterval(updateAll);
                            $.ajax({
                                url: "associate/checkRouter",
                                data: {type: 2, count: count},
                                dataType: "json",
                                success: function (resp) {
                                    if (resp == 0 && !send) {
                                        $(".updateAll").attr("disabled", false);
                                        openLayer(getLanguageContent("信息"), getLanguageContent("网络通讯异常，请检查路由器状态！"));
                                    }
                                }
                            });
                        }, outTime * 1000 + 3000);
                    } else {
                        $(".updateAll").attr("disabled", false);
                        openLayer(getLanguageContent("信息"), getLanguageContent("网络通讯异常，请检查路由器状态！"));
                        return;
                    }
                }
            });
        }
    });
}

// 更新成功率
function successful() {
    $.ajax({
        url: "associate/getSuccess",
        dataType: "JSON",
        success: function (resp) {
            if (resp.total > 0 && resp.count >= 0 && resp.fail >= 0) {
                var count = Number(resp.count);
                var total = Number(resp.total);
                var fail = Number(resp.fail);
                var time = Number(resp.time);
                var rate = parseInt(count * 100 / total);
                if (rate > 100) {
                    rate = 100;
                }
                $("#update_remain").val(rate + "%");
                $("#update_total").val(total);
                $("#update_failed").val(fail);
                if (count + fail < total && time != 1) {
                    $(".updateAll").attr("color", "red");
                    $(".updateAll").attr("disabled", true);
                    $(".tag_save").attr("disabled", true);
                    $(".update_tagOne").attr("disabled", true);
                } else {
                    $(".tag_save").attr("disabled", false);
                    $(".updateAll").attr("color", "#fff");
                    $(".updateAll").attr("disabled", false);
                    $(".update_tagOne").attr("disabled", false);
                }
            }
        }
    });
}

// 获取标签图片
function updateTagScreen(id) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src", "associate/showImage?id=" + id + "&time=" + new Date().getTime());
    $("#update-id").val(id);
    $('#updateModal').modal({show: true, backdrop: false});
}

// 更新按钮
function doUpdateScreen() {
    preperUpd.style.display = "block";
    $('#updateModal').modal('hide');
    var id = $("#update-id").val();
    var wakeTime = $.cookie("wakeTime");
    var outTime = $.cookie("outTime");
    var send = false;
    $.ajax({
        url: "router/getOneRouter",
        dataType: "json",
        success: function (resp) {
            if (resp) {
                var period = Number(resp.longPeriod);
                wakeTime = resp.shortPeriod;
                outTime = period * 2;
            } else {
                wakeTime = 0.5;
                outTime = 10;
            }
            $.ajax({
                url: "associate/prepareUpdate",
                data: {id: id, wakeTime: wakeTime, outTime: outTime},
                dataType: "json",
                success: function (resp) {
                    preperUpd.style.display = "none";
                    if (resp == "noRouter") {
                        openLayer(getLanguageContent("信息"), getLanguageContent("路由器已离线"));
                        return;
                    } else if (resp == "null") {
                        openLayer(getLanguageContent("信息"), getLanguageContent("标签不能为空"));
                        return;
                    } else if (resp == "edit") {
                        openLayer(getLanguageContent("信息"), getLanguageContent("请编辑后更新"));
                        return;
                    }
                    if (wakeTime > 0) {
                        htmlStr = "";
                        htmlStr = wakeHtml();
                        layer.open({
                            type: 1,
                            title: false,
                            area: ["auto", "auto"],
                            border: [1, 0.5, '#000'],
                            shade: [0],
                            shift: 'top',
                            move: '#title',
                            closeBtn: 0,
                            content: htmlStr
                        });
                        $("#wakeTime").val(wakeTime);
                        wakingUp = setInterval(function () {
                            $("#wake_timing").val(outTime);
                            outTime--;
                            if (outTime < 0) {
                                clearInterval(wakingUp);
                                var index = layer.index; // 获取当前弹层的索引号
                                layer.close(index);
                            }
                        }, 1000);
                    }
                    var updateAll = setInterval(function () {
                        $.ajax({
                            url: "router/prepareUpdateResult",
                            dataType: "text",
                            success: function (data) {
                                if (data == '"true"') {
                                    send = true;
                                    var index = layer.index; // 获取当前弹层的索引号
                                    layer.close(index);
                                    clearInterval(updateAll);
                                    $.get("associate/updateTagScreenData?id=" + id, function (data) {
                                        var p = $("#text_" + id);
                                        p.removeAttr("class");
                                        if (data == '"success"') {
                                            p.text(getLanguageContent("正在更新"));
                                            p.attr("class", "updating");
                                            $(".check_" + id).attr("checked", false);
                                        } else if (data == '"failed"') {
                                            p.text(getLanguageContent("正在更新"));
                                            p.attr("class", "updating");
                                            $(".check_" + id).attr("checked", "checked");
                                        }
                                    });
                                } else if (data == '"false"') {
                                    send = true;
                                    openLayer(getLanguageContent("信息"), getLanguageContent("请求过程失败"));
                                    layer.closeAll();
                                    clearInterval(updateAll);
                                }
                            }
                        });
                    }, 1000);
                    setTimeout(function () {
                        clearInterval(updateAll);
                        $.ajax({
                            url: "associate/checkRouter",
                            data: {type: 1, count: id},
                            dataType: "json",
                            success: function (resp) {
                                if (resp == 0 && !send) {
                                    $(".updateAll").attr("disabled", false);
                                    openLayer(getLanguageContent("信息"), getLanguageContent("网络通讯异常，请检查路由器状态！"));
                                }
                            }
                        });
                    }, outTime * 1000 + 3000);
                }
            });
        }
    });
}

// 准备更新设置
function prepareUpdate() {
    var wake = $.cookie("wakeTime");
    var out = $.cookie("outTime");
    layer.open({
        type: 1,
        title: false,
        area: ["520px", "352px"],
        border: [0],
        shade: [0],
        shift: 'top',
        move: '#_showPrepare',
        closeBtn: 0,
        content: $("._showPrepare")
    });
    $.ajax({
        url: "router/getOneRouter",
        dataType: "json",
        success: function (resp) {
            if (resp) {
                var period = Number(resp.longPeriod);
                var short = resp.shortPeriod;
                $("#wake_period").val(period);
                $("#wakeTime").val(short);
                $("#limit_outTime").html(period * 2);
                $("#out_time").val(period * 2);
            } else {
                $("#wakeTime").val(0.5);
                $("#out_time").val(10);
                $("#limit_outTime").html(out);
            }
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
        wakeTime = $("#wakeTime").val();
        outTime = $("#out_time").val();
        var date = 1000 * 24 * 60 * 60 * 1000;
        $.cookie('wakeTime', wakeTime, {
            expires: date
        });
        $.cookie('outTime', outTime, {
            expires: date
        });
        $.ajax({
            url: "router/setPrepareUpdate",
            data: {wakeTime: wakeTime, outTime: outTime},
            dataType: "json",
            success: function (resp) {

            }
        });
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index);
    }
    // 取消按鈕
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

function addPrice() {
    layer.open({
        type: 1,
        title: false,
        area: ["500px", "330px"],
        border: [0],
        shade: [0],
        shift: 'top',
        move: '#_discountTitle',
        closeBtn: 0,
        content: $("#discount_window")
    });
    document.getElementById("canselBtn").style.display = "block";
    document.getElementById("operateBtn").style.display = "block";
    document.getElementById("finishBtn").style.display = "none";
    document.getElementById("operateBtn").disabled = "";
}

// 折扣价
function comfirmDiscount() {
    document.getElementById("operateBtn").disabled = "disabled";
    var text = $(".red_span").html();
    var rate = $("#adjust_Price").val();
    var mRate = $("#major_Price").val();
    if (!rate) {
        rate = 1;
    }
    if (!mRate) {
        mRate = 1;
    }
    $.ajax({
        url: "tagAndGood/addPrice",
        data: {rate: rate, mRate: mRate},
        dataType: "json",
        success: function (resp) {
            $(".comfirm_button").hide();
            $(".content_show").hide();
            $(".message_show").show();
            if (resp == 1) {
                $(".msg_success").show();
                document.getElementById("canselBtn").style.display = "none";
                document.getElementById("operateBtn").style.display = "none";
                document.getElementById("finishBtn").style.display = "block";
            } else {
                $(".msg_failed").show();
            }
        }
    });
}

function closeWindow() {
    document.getElementById("canselBtn").style.display = "none";
    document.getElementById("operateBtn").style.display = "none";
    document.getElementById("finishBtn").style.display = "none";
    $(".comfirm_button").show();
    $(".content_show").show();
    $(".message_show").hide();
    var index = layer.index; // 获取当前弹层的索引号
    layer.close(index); // 关闭当前弹层
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
function wakeHtml() {
    htmlStr += '<div style="width:500px;height:288px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;"' + getLanguageContent("正在唤醒") + '';
    htmlStr += '&nbsp;&nbsp;&nbsp;</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" ><div>';
    htmlStr += '<table style="margin:20px auto;" ><tr><td></td><td>&nbsp;</td></tr>';
    htmlStr += '<tr><td colspan = "2">' + getLanguageContent("正在进行空中唤醒，请勿进行其他操作") + '...</td></tr>';
    htmlStr += '<tr style="height: 50px;"><td>&nbsp;' + getLanguageContent("剩余时间") + '</td><td>';
    htmlStr += '<input type ="text" id="wake_timing" style="height:100px;width:100px;font-size:50px;">' + getLanguageContent("秒") + '</td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;align:center;height:50px;"></div></div></div></div>';
    return htmlStr;
}

function openLayer(title, content) {
    //在这里面输入任何合法的js语句
    layer.open({
        type: 1 //Page层类型
        , area: ['500px', '300px']
        , title: title
        , shade: 0.6 //遮罩透明度
        , anim: 1 //0-6的动画形式，-1不开启
        , content: '<div style="padding:50px;">' + content + '</div>'
        , btn: getLanguageContent("确认")
    });

}


// ********************************************************* 测试
// *****************************************************
/*
 * function testClear() { $.ajax({ url:"associate/testClear", success:function() { }
 * }); testAll(); success = setInterval(function() { successful(); }, 2000); }
 * 
 * function testAll() { $(".updateAll").attr("color", "red");
 * $(".updateAll").attr("disabled",true); $(".tag_save").attr("disabled",true);
 * $(".update_tagOne").attr("disabled",true); var wakeTime = 0.5; var outTime =
 * 10; $.ajax({ url : "router/getOneRouter", dataType : "json", success :
 * function(resp) { if (resp) { var period = Number(resp.longPeriod); wakeTime =
 * resp.shortPeriod; outTime = period * 2; } $.ajax({ url :
 * "associate/testPrepareAll", type : "get", traditional : true, data : {
 * wakeTime : wakeTime, outTime : outTime }, success : function(str) { var o =
 * JSON.parse(str); if (o.isNull) { $(".updateAll").attr("disabled",false); var
 * alerts = layer.alert("请编辑后更新", 1, function() { layer.close(alerts); });
 * return; } if (o.flag) { var count = o.count; htmlStr = ""; htmlStr =
 * wakeHtml(); if (wakeTime > 0) { $.layer({ type : 1, title : false, area : [
 * "auto", "auto" ], border : [ 1, 0.5, '#000' ], shade : [ true ], shift :
 * 'top', move : '#title', closeBtn : 0, page : {html : htmlStr} });
 * $("#wakeTime").val(wakeTime); wakingUp = setInterval(function() {
 * $("#wake_timing").val(outTime); outTime--; if (outTime < 0) {
 * clearInterval(wakingUp); } }, 1000); } var updateAll = setInterval(function() {
 * $.ajax({ url : "router/prepareUpdateResult", dataType : "text", success :
 * function(data) { if (data == '"true"') { var index = layer.index; //
 * 获取当前弹层的索引号 layer.close(index); clearInterval(updateAll); $.ajax({ url :
 * "associate/testupdateAllScreen", type : "POST", traditional : true, data :
 * {count:count}, success : function(response) { } }); } else if (data ==
 * '"false"') { $(".updateAll").attr("disabled",false); var alerts =
 * layer.alert("请求过程失败", 1,function() { layer.close(alerts); }); // 关闭所有弹出层 var
 * layerObj = $('.xubox_layer'); $.each(layerObj, function() { var i =
 * $(this).attr('times'); layer.close(i); }); clearInterval(updateAll); } } }); },
 * 1000); } else { $(".updateAll").attr("disabled",false); var alerts =
 * layer.alert("请求更新过程失败", 1, function() { layer.close(alerts); }); return; } }
 * }); } }); }
 * 
 * //更新成功率 function successful() { $.ajax({ url : "associate/getTestResult",
 * dataType:"JSON", success: function(resp) { if (resp.total > 0 && resp.count >=
 * 0 && resp.fail >= 0) { var count = Number(resp.count); var total =
 * Number(resp.total); var fail = Number(resp.fail); var number =
 * Number(resp.number); var next = Number(resp.next); var rate =
 * parseInt((Number(count) * 100) / total); $("#update_remain").val(rate + "%");
 * $("#update_total").val(total); $("#update_failed").val(fail);
 * $("#test_count").val(number); if (fail > 0) { clearInterval(success);
 * $(".tag_save").attr("disabled", false); $(".updateAll").attr("color",
 * "#fff"); $(".updateAll").attr("disabled", false);
 * $(".update_tagOne").attr("disabled", false); } if (next == 1) { testAll(); } } }
 * }); }
 */


