var htmlStr = "";
var interval = new Object();
$(document).ready(function () {
    //加载扫描枪数据信息
    loadScanData(1);

    //显示扫描枪信息
    this.getScan = function (id) {
        var param = new Object();
        param.id = id;
        htmlStr = "";
        htmlStr = init();
        $.layer({
            type: 1, title: false,
            area: ["auto", "auto"],
            border: [1, 0.5, '#000'],
            shade: [true],
            shift: "top",
            move: '#title',
            closeBtn: 0,
            page: {html: htmlStr}
        });
        $.ajax({
            url: "scan/getScanById",
            async: true,
            type: "GET",
            dataType: "json",
            data: param,
            success: function (response) {
                var mac = formatMac(response.scan.mac);
                $("#mac").val(mac);
                $("#name").val(response.scan.name);
                $("#serialNumber").val(response.scan.serialNumber);
                if (response.scan.status == 1) {
                    $("#state").val("true");
                } else {
                    $("#state").val("false");
                }
                $("#manufacture").val(response.scan.manufacture);
                $("#softVersion").val(formatVersion(response.scan.softwareVersion));
                $("#hardVersion").val(formatVersion(response.scan.hardwareVersion));
                $("#productBatch").val(response.scan.productionBatch);
                if (response.scan.updateState == 3) {
                    $("#updateState").val(getLanguageContent("升级成功"));
                } else if (response.scan.updateState == 4) {
                    $("#updateState").val(getLanguageContent("升级失败"));
                } else if (response.scan.updateState == 2) {
                    $("#updateState").val(getLanguageContent("正在升级"));
                } else {
                    $("#updateState").val(getLanguageContent("等待升级"));
                }
            }
        });
        this.cancel = function () {
            var index = layer.index;       //获取当前弹层的索引号
            layer.close(index);            //关闭当前弹层
        }
    }

    //扫描枪升级
    this.initUpdate = function (id) {
        var mac = $(".router_" + id).val();
        htmlStr = "";
        htmlStr = initHtml();
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
        var param = new Object();
        param.id = id;
        $.ajax({
            url: "scan/getScanById",
            async: true,
            type: "GET",
            dataType: "json",
            data: param,
            success: function (response) {
                $("#scanId").val(response.scan.id);
                $("#name").val(response.scan.name);
                $("#hardwareVersion").val(response.scan.hardwareVersion);
                $("#softwareVersion").val(response.scan.softwareVersion);
            }
        });
        this.update = function () {
            if (mac == null || mac == "") {
                var alerts = layer.alert(getLanguageContent("没有可用路由器"), 2, function () {
                    layer.close(alerts);
                });
                return false;
            }
            var scanId = $("#scanId").val();
            $("#scan_mac").val(mac);
            var file = $("#file").val();
            if (scanId == "" || scanId == null) {
                return false;
            } else if (file == null || file == "") {
                var alerts = layer.alert(getLanguageContent("请选择文件"), 1, function () {
                    layer.close(alerts);
                });
            } else {
                $("#scan_update").ajaxSubmit({
                    type: "post",
                    url: "scan/update",
                    dataType: "text",
                    success: function () {
                        var index = layer.index; //获取当前弹层的索引号
                        layer.close(index); //关闭当前弹层
                        interval = setInterval("checkUpdate(" + scanId + ")", 1000);
                    }
                });
            }
            ;
        };
        this.cancel = function () {
            //关闭所有弹出层
            var layerObj = $('.xubox_layer');
            $.each(layerObj, function () {
                var i = $(this).attr('times');
                layer.close(i);
            });
        }
    }

    //删除扫描枪
    this.delScan = function (id) {
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
                url: "scan/deleteScan",
                data: {"id": id},
                success: function (data) {
                    if (data == 1) {
                        var cur = $("#page_currentPage").val();
                        loadScanData(cur);
                    }
                    var index = layer.index;			//获取当前弹层的索引号
                    layer.close(index); 				//关闭当前弹层
                }
            });
        }
        this.cancel = function () {
            var index = layer.index;			//获取当前弹层的索引号
            layer.close(index); 				//关闭当前弹层
        }
    }

    //按回车键查询
    $("#search_scan_name,#search_mac").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadScanData(1);
        }
    });

    //设置定时任务更新在线情况
    setTimer();
});

//格式化版本格式
function formatVersion(version) {
    if (isNaN(version)) {
        return version;
    }
    var ver1 = version >> 4 & 0x0f;
    var ver2 = version & 0x0f;
    return ver1 + "." + ver2;
}

//刷新
function refresh() {
    var queryData = $("#gridImport_body");
    queryData.html("");
    $("#search_scan_name").val("");
    $("#search_mac").val("");
    $("#search_scan_mac").val(-1);
    loadScanData(1);
}

//加载扫描枪数据
function loadScanData(current) {
    var position = $(".user_position", window.parent.document).html();
    if (position != "" && position == 1 || position == 2) {
        $("#add_update").show();
    }
    var mac = $("#search_mac").val();
    $("#search_scan_mac").val(cancelFormat(mac));
    $("#query_scans").ajaxSubmit({
        url: "scan/queryScans?currentPage=" + current,
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
    var current = $("#page_currentPage").val();
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i + "'><a href = 'javascript:loadScanData("
                    + i + ");' >" + i + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1) + "'><a href = 'javascript:loadScanData("
                        + Number(j + 1) + ");' >" + Number(j + 1) + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadScanData(" + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadScanData(" + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadScanData(" + Number(current - 3 + k)
                            + ");' >" + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadScanData(" + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_" + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadScanData(" + Number(pages - 6 + k)
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

//添加扫描枪
function toAddScan() {
    $('#addModal').modal({show: true, backdrop: false});
}

//添加扫描枪
function addScan() {
    $("#addScanForm").ajaxSubmit({
        url: "scan/addScan",
        contentType: 'application/json',
        data: $("#addScanForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadScanData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}

//检查更新状态（定时器）
function checkUpdate(scanId) {
    var param = new Object();
    param.id = scanId;
    $.ajax({
        url: "scan/getScanById",
        dataType: "json", data: param,
        success: function (data) {
            if (data.scan.updateState == 2) {
                $("." + data.scan.id + "updateState").html(getLanguageContent("正在升级"));
                $("." + data.scan.id + "updateState").css("color", "blue");
            } else if (data.scan.updateState == 3) {
                $("." + data.scan.id + "updateState").html(getLanguageContent("升级成功"));
                $("." + data.scan.id + "updateState").css("color", "green");
                clearInterval(interval);
            } else if (data.scan.updateState == 4) {
                $("." + data.scan.id + "updateState").html(getLanguageContent("升级失败"));
                $("." + data.scan.id + "updateState").css("color", "red");
                clearInterval(interval);
            } else {
                $("." + data.scan.id + "updateState").html(getLanguageContent("等待升级"));
                $("." + data.scan.id + "updateState").css("color", "orange");
                clearInterval(interval);
            }
        }
    });
}

//设置定时任务更新在线情况
function setTimer() {
    setInterval(function () {
        $.ajax({
            url: "scan/getOnlineState",
            type: "GET",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var id = data[i].id;
                    if (data[i].status == 1) {
                        $(".status" + id).html(getLanguageContent("在线"));
                        $(".status" + id).css("color", "red");
                    } else {
                        $(".status" + id).html(getLanguageContent("离线"));
                        $(".status" + id).css("color", "#222");
                    }
                }
            }
        });
        $.ajax({
            url: "scan/getRouters", dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].state) {
                        if ($(".router_" + data[i].mac).val() == data[i].mac) {
                        } else {
                            $(".router_list").append('<option class="router_'
                                    + data[i].mac + '" value="' + data[i].mac + '">' + formatMac(data[i].mac) + '</option>');
                        }
                    } else {
                        if ($(".router_" + data[i].mac).val() == data[i].mac) {
                            $(".router_" + data[i].mac).remove();
                        }
                    }
                }
            }
        });
    }, 2000);
}

//取消格式化
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

//格式化扫描枪名称
function formatMac(mac) {
    var str = "CWR";
    var idStr = mac + "";
    var length = idStr.length;
    for (var i = 0; i < 6 - length; i++) {
        str = str + "0";
    }
    if (mac < 0) {
        mac = -mac;
    }
    return str + mac;
}

//初始化扫描枪升级弹出层
function initHtml() {
    htmlStr += '<div style="width:500px;height:293px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("扫描枪升级")}</div>`;
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" ><div>';
    htmlStr += '<form action="" enctype="multipart/form-data" method="post" id="scan_update">';
    htmlStr += '<table style="margin:20px auto;" ><tr><td><input type="hidden" name="scanId" id="scanId" width="50px"/>';
    htmlStr += `${getLanguageContent("扫描枪名称")}：</td><td><input type="text" id="name" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("当前硬件版本号")}：</td><td><input type="text" id="hardwareVersion" width="50px">`;
    htmlStr += `<input type="hidden" name="mac" id="scan_mac" width="50px"/></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("当前软件版本号")}：</td><td><input type="text" id="softwareVersion" width="50px">`;
    htmlStr += '</td></tr><tr><td></td><td><input type="file" name="file" id="file" width="50px">';
    htmlStr += `</td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;align:center"><input style="margin:10px auto;height:40px;`;
    htmlStr += `width:60px;background-color:#4d90fe;border:0px;" type="button" value="${getLanguageContent("升级")}" onclick="update()">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;" `;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel()" id="update_btn"></div></form></div></div></div>`;
    return htmlStr;
}

//初始化扫描枪信息显示弹出层
function init() {
    htmlStr += '<div style="width:550px;height:331px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("扫描枪详情")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" ><div>`;
    htmlStr += `<table style="margin:20px auto;"><tr><td>`;
    htmlStr += `${getLanguageContent('扫描枪地址')}：</td><td><input type="text" id="mac" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("扫描枪名称")}：</td><td><input type="text" id="name" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("序列号")}：</td><td><input type="text" id="serialNumber" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("扫描枪状态")}：</td><td><select id="state" style="width:162px;height:25px;margin-top:10px;">`;
    htmlStr += `<option value="true">${getLanguageContent("在线")}</option><option value="false">${getLanguageContent("离线")}</option></select></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("生产商")}：</td><td><input type="text" id="manufacture" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("出厂批次")}：</td><td><input type="text" id="productBatch" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("硬件版本号")}：</td><td><input type="text" id="hardVersion" width="50px"></td><td>`;
    htmlStr += `${getLanguageContent("软件版本号")}：</td><td><input type="text" id="softVersion" width="50px"></td></tr>`;
    htmlStr += `<tr><td>${getLanguageContent("升级状态")}：</td><td>`;
    htmlStr += `<input type="text" id="updateState" width="50px"></td><td></td><td></td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;align:center">`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("退出")}" onclick="cancel()"></div></div></div></div>`;
    return htmlStr;
}

//删除扫描枪提示
function delHtml() {
    htmlStr += `<div style="width:300px;height:230px" >`;
    htmlStr += `<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;`;
    htmlStr += `margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;${getLanguageContent("删除扫描枪")}</div>`;
    htmlStr += `<div style="display:block; padding-bottom:5px;" align="center" >`;
    htmlStr += `<table><tr style="height:50px;"><td colspan="2"><p>${getLanguageContent("是否删除扫描枪？")}</p></td></tr>`;
    htmlStr += `<tr style="height:50px;"><td></td><td></td></tr></table>`;
    htmlStr += `<div style="background-color:#aaa;text-align:center;">`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("确认")}" onclick="confirm()">`;
    htmlStr += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    htmlStr += `<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"`;
    htmlStr += `type="button" value="${getLanguageContent("取消")}" onclick="cancel()"></div></div></div>`;
    return htmlStr;
}