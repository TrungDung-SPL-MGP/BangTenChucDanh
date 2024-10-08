var htmlStr = "";
$(function () {
    // 普通用户不能修改商品数据信息
    var position = $(".user_position", window.parent.document).html();
    if (Number(position) == 0) {
        $(".hidden1").hide();
        $(".hidden2").hide();
    }

    // 加载商品数据
    loadGoodData(1);

    // 按回车键查询
    $("#search_name,#search_id").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadGoodData(1);
        }
    });

});

function setAContent(val) {
    document.getElementById("a_file").text = val;
}

// 修改商品信息自动提交
function onSubmit(id) {
    var price = $(".edit" + id).val();
    $.ajax({
        url: "good/eidtGood",
        data: {
            id: id,
            price: price
        },
        dataType: "json",
        success: function () {
            refreshOne(id);
        },
        error: function () {
            refreshOne(id);
        }
    });
}

function refreshOne(id) {
    $.ajax({
        url: "good/getGoodData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $(".edit" + id).val(data.price);
            $(".editOper" + id).html(data.operator);
        }
    });
}

// 刷新按钮
function refreshGood() {
    var queryData = $("#gridImport_body");
    var current = $("#page_currentPage").val();
    queryData.html("");
    $("#search_name").val("");
    $("#search_id").val("");
    loadGoodData(current);
}

// 加载商品数据
function loadGoodData(current) {
    var param = new Object();
    param.name = $("#search_name").val().trim();
    param.id = cancelFormat($("#search_id").val());
    var goodData = $("#gridImport_body");
    $
            .ajax({
                url: "good/getGoodPage?currentPage=" + current,
                data: param,
                dataType: "text",
                success: function (data) {
                    goodData.empty();
                    goodData.html(data);
                    goodPage();
                },
                error: function () {
                    goodData.empty();
                    goodData
                            .html("<tr><td>数据加载失败</td><td>请点击"
                                    + "<a href='javascript:loadGoodData(1);'>重新加载</a></td></tr>");
                }
            });
}

// 分页效果
function goodPage() {
    var current = Number($("#page_currentPage").val());
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i
                    + "'><a href = 'javascript:loadGoodData(" + i + ");' >" + i
                    + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1)
                        + "'><a href = 'javascript:loadGoodData("
                        + Number(j + 1) + ");' >" + Number(j + 1)
                        + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadGoodData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadGoodData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadGoodData("
                            + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadGoodData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadGoodData("
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

// 是否促销
function getString(promotion) {
    if (promotion) {
        return "是";
    } else {
        return "否";
    }
}

// 格式化日期格式
function formatDate(timestamp) {
    var date = new Date(timestamp);
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }

    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }

    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }

    var currentdate = year + seperator1 + month + seperator1 + strDate + " "
            + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}

// 格式化价格标志
function formatCurrency(num) {
    if (isNaN(num))
        return "￥" + "0.00";
    return "￥" + num.toFixed(2);
}

// 格式化商品编号
function formatGoodId(id) {
    var str = "CWS"
    var idStr = id + "";
    var length = idStr.length;

    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    return str + id;
}

// 获取商品详情
function getGood(id) {
    $.ajax({
        url: "good/getGoodData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#mod_id").val(data.id);
            $("#mod_name").val(data.name);
            $("#mod_origin").val(data.origin);
            $("#mod_provider").val(data.provider);
            $("#mod_unit").val(data.unit);
            $("#mod_price").val(data.price).FormatNumber({
                decimal: 2
            });
            $("#mod_barcode").val(data.barcode);

            if (data.promotion) {
                $("#mod_promotion").find("option[value='true']").attr(
                        "selected", true);
            } else {
                $("#mod_promotion").find("option[value='false']").attr(
                        "selected", true);
            }

            $("#mod_qrCode").val(data.qrCode);
            $("#mod_promotionReason").val(data.promotionReason);
            $("#mod_promotePrice").val(data.promotePrice).FormatNumber({
                decimal: 2
            });
        },
        error: function () {
            alert("getGood error");
        }
    });
    $('#modfyModal').modal({
        show: true,
        backdrop: false
    });
}

// 批量修改价格
function modifyPrice() {
    layer.open({
        type: 1,
        title: false,
        area: ['520px', '380px'],
        border: [0],
        shade: [0],
        shift: "top",
        move: '#_showModifyPrice',
        closeBtn: 0,
        content: $("._showModifyPrice")
    });
    this.confirm = function () {
        var price = $("#modify_price").val();
        var promotion = $("#modify_price_promotion").val();
        var start = $("#priceStart").val();
        var end = $("#priceEnd").val();
        if (!price || price <= 0 || !start || start <= 0 || !end || end <= 0
                || !promotion || promotion <= 0) {
            alert("请输入正确的数值！");
        }
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index);
        $.ajax({
            url: "good/modifyPrice",
            data: {
                price: price,
                promotion: promotion,
                start: start,
                end: end
            },
            success: function (resp) {
                if (resp == 1) {
                    var current = $("#page_currentPage").val();
                    loadGoodData(current);
                    alert("修改完成!");
                }
            }
        });
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 删除商品
function delGood(id) {
    layer.open({
        type: 1,
        title: false,
        area: ['480px', '330px'],
        border: [0],
        shade: [0],
        shift: "top",
        move: '#_showDeleteGood',
        closeBtn: 0,
        content: $("._showDeleteGood")
    });
    this.confirm = function () {
        $.ajax({
            url: "good/deleteGood?id=" + id,
            success: function (resp) {
                var index = layer.index; // 获取当前弹层的索引号
                layer.close(index); // 关闭当前弹层
                if (resp == 1) {
                    var current = $("#page_currentPage").val();
                    loadGoodData(current);
                }
            }
        });
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 添加商品
function addGood() {
    $('#addModal').modal({
        show: true,
        backdrop: false
    });
}

// 修改商品保存
function submitModifyGood() {
    var price = $("#mod_price").val();
    var promotePrice = $("#mod_promotePrice").val();
    price = parseFloat(price.split(",").join(""));
    promotePrice = parseFloat(promotePrice.split(",").join(""));
    $("#good_price").val(price);
    $("#good_promotePrice").val(promotePrice);
    $.ajax({
        url: "good/updateGoodData",
        type: "POST",
        data: $('#modifyGoodForm').serialize(),
        dataType: "json",
        success: function (data) {
            if (data == -1) {
                location.href = "login/toLogin";
            } else if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadGoodData(cur);
            }
            $('#modfyModal').modal("hide");
        },
        error: function () {
            alert("submitModifyGood error");
        }
    });
}

// 导入商品
function importGood() {
    layer.open({
        type: 1,
        title: false,
        area: ['480px', '310px'],
        border: [0],
        shade: [0],
        shift: "top",
        move: '#_showImport',
        closeBtn: 0,
        content: $("._showImport")
    });
    this.imports = function () {
        var fileName = $("#file").val();
        if (!fileName) {
            var alerts = layer.alert("请选择文件!", 1, function () {
                layer.close(alerts);
            });
            return false;
        }
        if (fileName.indexOf("xls") < 0 && fileName.indexOf("xlsx") < 0) {
            alert("请选择 Excel 文件！");
            return;
        }
        $("#good_import").ajaxSubmit({
            url: 'good/importGood',
            dataType: "json",
            success: function (resp) {
                if (resp == 1) {
                    var pages = $("#pages").val();
                    loadGoodData(pages);
                } else {
                    alert("导入商品失败");
                }
            }
        });
        layer.closeAll();
    }
    this.cancelImport = function () {
        layer.closeAll();
    }
}

// 导出商品模板
function exportGood() {
    window.location = "/esls_new/good/exportGood";
}

// 绑定标签
function getBind(id) {
    good_tag.innerHTML = "";
    layer.open({
        type: 1,
        title: false,
        area: ['600px', '320px'],
        border: [0],
        shade: [0],
        shift: "top",
        move: '#_showBind',
        closeBtn: 0,
        content: $("._showBind")
    });
    $.ajax({
        url: "good/getBind",
        data: {
            id: id
        },
        dataType: 'json',
        success: function (resp) {
            $("#good_id").val(resp[0].id);
            $("#good_name").val(resp[0].name);
            var tag = "";
            if (resp[1]) {
                for (var i = 0; i < resp[1].length; i++) {
                    console.log(resp[1][i].tagAndGood);
                    if (resp[1][i].tagAndGood) {
                        tag += "<option value=" + resp[1][i].id
                                + " style='background:#efabab;'>"
                                + formatMac(resp[1][i].mac) + "</option>";
                    } else {
                        tag += "<option value=" + resp[1][i].id + ">"
                                + formatMac(resp[1][i].mac) + "</option>";
                    }
                }
            }
            $("#good_tag").css('width', '160px');
            $("#good_tag").append(tag);
        }
    });
    this.confirm = function () {
        var tag = $("#good_tag").val();
        $.ajax({
            url: "tagAndGood/bindTagAndGood",
            data: {
                id: id,
                tagId: tag
            },
            success: function (resp) {
                var index = layer.index; // 获取当前弹层的索引号
                layer.close(index); // 关闭当前弹层
                if (resp == 1) {
                    var current = $("#page_currentPage").val();
                    loadGoodData(current);
                }
            }
        });
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

// 格式化标签mac
function formatMac(mac) {
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

// 取消格式化
function cancelFormat(num) {
    if (Number(num) > 0) {
        return num;
    }
    var str = num.substr(0, 3);
    var id = /\d+(?:\.\d+)?/.exec(num);
    if (Number(id) > 0) {
        return Number(id);
    }
    return -1;
}