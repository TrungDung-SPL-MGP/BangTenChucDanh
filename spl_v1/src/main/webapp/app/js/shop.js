var htmlStr = "";
$(document).ready(function () {
    //加载店铺数据
    loadShopData(1);

    //按回车键查询
    $("#search_shop_name,#search_number").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadShopData(1);
        }
    });
});

//刷新页面
function refresh() {
    var position = $(".user_position", window.parent.document).html();
    if (position != "" && position == 1) {
        var queryData = $("#gridImport_body");
        queryData.html("");
        $("#search_shop_name").val("");
        $("#search_number").val("");
    } else {
        $(".portlet-body.body_size").empty();
    }
    loadShopData(1);
}

//加载店铺数据
function loadShopData(current) {
    var name = $("#search_shop_name").val();
    var number = $("#search_number").val();
    var position = $(".user_position", window.parent.document).html();
    if (Number(position) == 2 || Number(position) == 1) {
        $.ajax({
            url: "shop/queryShops?currentPage=" + current,
            data: {name: name, number: number},
            dataType: "text",
            success: function (data) {
                var dataSite = $("#gridImport_body");
                dataSite.empty();
                dataSite.html(data);
                queryPage();
            },
            error: function () {
                var dataSite = $(".portlet-body.body_size");
                dataSite.empty();
                dataSite.html("<tr><td>没有可用的数据</td><td>请尝试<a href='javascript:loadShopData(1);'>重新加载</a></td></tr>");
            }
        });
    } else {
        $.ajax({
            url: 'shop/queryShops',
            dataType: "text", data: new Object(),
            success: function (data) {
                $(".query_shop").remove();
                $(".btn.dark.add").hide();
                var dataSite = $(".portlet-body.body_size");
                dataSite.empty();
                dataSite.html(data);
                $(".save_button").hide();
            },
            error: function () {
                var dataSite = $(".portlet-body.body_size");
                dataSite.empty();
                dataSite.html("<tr><td>没有可用的数据</td><td>请尝试<a href='javascript:loadShopData(1);'>重新加载</a></td></tr>");
            }
        });
    }
}

//分页
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var next = parseInt(current) + 1;
    var prev = parseInt(current) - 1;
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i + "'><a href = 'javascript:loadShopData("
                    + i + ");' >" + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1) + "'><a href = 'javascript:loadShopData("
                        + Number(j + 1) + ");' >" + Number(j + 1) + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadShopData(" + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadShopData(" + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadShopData(" + Number(current - 3 + k)
                            + ");' >" + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadShopData(" + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadShopData(" + Number(pages - 6 + k)
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

//获取店铺信息(修改店铺信息)
function getShop(id) {
    $.ajax({
        url: "shop/getShopData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#mod_id").val(data.shop.id);
            $("#mod_name").val(data.shop.name);
            $("#mod_manager").val(data.shop.manager);
            $("#mod_type").val(data.shop.type);
            if (data.shop.type == 0) {
                if (data.father.length > 0) {
                    var option = "";
                    for (var i = 0; i < data.father.length; i++) {
                        option += "<option value=" + data.father[i].number + ">" + data.father[i].name + "</option>";
                    }
                }
                $("#mod_selFather").empty();
                $("#mod_selFather").append(option);
            }
            $("#mod_number").val(data.shop.number);
            $("#mod_address").val(data.shop.address);
            $("#mod_phone").val(data.shop.phone);
        },
        error: function () {
            alert("getShopData error");
        }
    });
    $('#modfyModal').modal({show: true, backdrop: false});
    this.changeType = function (type) {
        if (type == 1) {
            $("#mod_selFather").empty();
            $("#mod_selFather").append("<option value=" + $("#mod_number").val()
                    + ">" + $("#mod_name").val() + "</option>");
        } else {
            $.ajax({
                url: "shop/getShopFather",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    var option = "";
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].number == $("#mod_number").val()) {
                                continue;
                            }
                            option += "<option value=" + data[i].number + ">" + data[i].name + "</option>";
                        }
                    }
                    $("#mod_selFather").empty();
                    $("#mod_selFather").append(option);
                }
            });
        }
    }
}

function modifyShop() {
    $("#modifyShopForm").ajaxSubmit({
        url: "shop/updateShop",
        contentType: 'application/json',
        data: $("#modifyShopForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == true) {
                var cur = $("#page_currentPage").val();
                loadShopData(cur);
            }
            $('#modfyModal').modal('hide');
        },
    });
}

//添加店铺
function toAddShop() {
    $('#addModal').modal({show: true, backdrop: false});
    this.selFather = function (type) {
        if (type == 0) {
            $.ajax({
                url: "shop/getShopFather",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.length > 0) {
                        var option = "";
                        for (var i = 0; i < data.length; i++) {
                            option += "<option value=" + data[i].number + ">" + data[i].name + "</option>";
                        }
                    }
                    $("#select_father").empty();
                    $("#select_father").append(option);
                }
            });
        } else {
            $("#select_father").empty();
        }
    }
}

function addShop() {
    $("#addShopForm").ajaxSubmit({
        url: "shop/addShop",
        contentType: 'application/json',
        data: $("#addShopForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadShopData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}

//删除店铺
function delShop(id) {
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
            url: "shop/deleteShop",
            data: {"id": id},
            dataType: "json",
            success: function (data) {
                if (data == true) {
                    var cur = $("#page_currentPage").val();
                    loadShopData(cur);
                }
                var index = layer.index;			//获取当前弹层的索引号
                layer.close(index); 				//关闭当前弹层
            }
        })
    }
    this.cancel = function () {
        var index = layer.index;			//获取当前弹层的索引号
        layer.close(index); 				//关闭当前弹层
    }
}

//修改信息
function modifyU() {
    $(".shop_table input").attr("readonly", false);
    $(".shop_table .sex").attr("disabled", false);
    $(".sequence").attr("readonly", "readonly");
    $(".modify_button").hide();
    $(".save_button").show();
}
//提交修改店铺信息
function submitU() {
    var name = $("#shop_name").val();
    if (name == "root") {
        alert('店铺名不能为"root"');
        return false;
    }
    $("#mod_Shop").ajaxSubmit({
        url: "shop/updateShop",
        success: function (resp) {
            if (resp == 1) {
                parent.window.location.reload();
            }
        }
    });
}

//初始化删除店铺提示页面
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;删除店铺</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>是否删除店铺？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="确认" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="取消" onclick="cancel()"></div></div></div>';
    return htmlStr;
}