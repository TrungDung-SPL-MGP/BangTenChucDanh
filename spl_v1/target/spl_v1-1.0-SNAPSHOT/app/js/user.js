var htmlStr = "";
$(document).ready(function () {
    // 加载用户数据
    loadUserData(1);

    // 按回车键查询
    $("#search_user_name,#search_department").bind('keypress', function (event) {
        if (event.keyCode == 13) {
            loadUserData(1);
        }
    });
});

// 刷新页面
function refresh() {
    var position = $(".user_position", window.parent.document).html();
    if (position != "" && position == 1) {
        var queryData = $("#gridImport_body");
        queryData.html("");
        $("#search_user_name").val("");
        $("#search_department").val("");
    } else {
        $(".portlet-body.body_size").empty();
    }
    loadUserData(1);
}

// 加载用户数据
function loadUserData(current) {
    var position = $(".user_position", window.parent.document).html();
    if (Number(position) == 2 || Number(position) == 1) {
        $("#query_users")
                .ajaxSubmit(
                        {
                            url: "user/queryUsers?currentPage=" + current,
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
                                dataSite
                                        .html("<tr><td>没有可用的数据</td><td>请尝试<a href='javascript:loadUserData(1);'>重新加载</a></td></tr>");
                            }
                        });
    } else {
        $
                .ajax({
                    url: 'user/queryUsers',
                    dataType: "text",
                    data: new Object(),
                    success: function (data) {
                        $(".query_user").remove();
                        $(".btn.dark.add").hide();
                        var dataSite = $(".portlet-body.body_size");
                        dataSite.empty();
                        dataSite.html(data);
                        $(".save_button").hide();
                    },
                    error: function () {
                        var dataSite = $(".portlet-body.body_size");
                        dataSite.empty();
                        dataSite
                                .html("<tr><td>没有可用的数据</td><td>请尝试<a href='javascript:loadUserData(1);'>重新加载</a></td></tr>");
                    }
                });
    }
}

// 分页
function queryPage() {
    var current = Number($("#page_currentPage").val());
    var next = parseInt(current) + 1;
    var prev = parseInt(current) - 1;
    var pages = Number($("#pages").val());
    var showPage = "";
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += "<span class = 'current_" + i
                    + "'><a href = 'javascript:loadUserData(" + i + ");' >" + i
                    + "</a></span>";
        }
    } else {
        if (current <= 4) {
            for (var j = 0; j < 7; j++) {
                showPage += "<span class = 'current_" + Number(j + 1)
                        + "'><a href = 'javascript:loadUserData("
                        + Number(j + 1) + ");' >" + Number(j + 1)
                        + "</a></span>";
            }
            showPage += "</span><a href = 'javascript:loadUserData("
                    + Number(current + 4) + ");' >...</a></span>";
        } else {
            showPage += "</span><a href = 'javascript:loadUserData("
                    + Number(current - 4) + ");' >...</a></span>";
            if (pages - current > 3) {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(current - 3 + k)
                            + "'><a href = 'javascript:loadUserData("
                            + Number(current - 3 + k) + ");' >"
                            + Number(current - 3 + k) + "</a></span>";
                }
                showPage += "</span><a href = 'javascript:loadUserData("
                        + Number(current + 4) + ");' >...</a></span>";
            } else {
                for (var k = 0; k < 7; k++) {
                    showPage += "<span class = 'current_"
                            + Number(pages - 6 + k)
                            + "'><a href = 'javascript:loadUserData("
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

// 获取用户信息(修改用户信息)
function getUser(id) {
    $.ajax({
        url: "user/getUserData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#mod_id").val(data.user.id);
            $("#mod_name").val(data.user.name);
            $("#mod_passwd").val(data.user.passwd);
            if (data.user.sex) {
                $("#mod_sex").find("option[value='true']").attr("selected",
                        true);
            } else {
                $("#mod_sex").find("option[value='false']").attr("selected",
                        true);
            }

            $("#mod_department").val(data.user.department);
            $("#mod_telephone").val(data.user.telephone);
            $("#mod_address").val(data.user.address);
            $("#mod_position").val(data.user.position);
            if (data.shops.length > 0) {
                var option = "";
                if (data.user.shop) {
                    option += "<option value=" + data.user.shop.id + ">"
                            + data.user.shop.name + "</option>";
                }
                for (var i = 0; i < data.shops.length; i++) {
                    option += "<option value=" + data.shops[i].id + ">"
                            + data.shops[i].name + "</option>";
                }
            }
            $("#mod_shop").empty();
            $("#mod_shop").append(option);
        },
        error: function () {
            alert("getUserData error");
        }
    })
    $('#modfyModal').modal({
        show: true,
        backdrop: false
    });
}

function modifyUser() {
    var name = $("#mod_name").val();
    if (name == "root") {
        alert('用户名不能为"root"');
        return false;
    }
    var pass = $("#mod_passwd").val();
    if (!md5(pass) && pass != "") {
        return;
    }
    if (pass == "") {
        pass = null;
    }
    $("#modifyUserForm").ajaxSubmit({
        url: "user/updateUser",
        contentType: 'application/json',
        data: $("#modifyUserForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data.resultCode == 10) {
                var cur = $("#page_currentPage").val();
                loadUserData(cur);
            } else {
                alert(resp.data);
            }
            $('#modfyModal').modal('hide');
        },
    });
}

// 添加用户
function toAddUser() {
    $('#addModal').modal({
        show: true,
        backdrop: false
    });
    $.ajax({
        url: "shop/queryAll",
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                var option = "";
                for (var i = 0; i < data.length; i++) {
                    option += "<option value=" + data[i].id + ">"
                            + data[i].name + "</option>";
                }
            }
            $("#add_shop").empty();
            $("#add_shop").append(option);
        }
    });
}

function addUser() {
    var userName = $(".addUserName").val();
    var pass = $("#user_passwd").val();
    if (userName == "root") {
        alert('用户名不能为"root"');
        return false;
    }
    if (userName == "") {
        alert('用户名不能为空');
        return false;
    }
    if (pass == "") {
        return false;
    }
    if (!md5(pass)) {
        return;
    }
    $("#addUserForm").ajaxSubmit({
        url: "user/addUser",
        contentType: 'application/json',
        data: $("#addUserForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data.resultCode == 10) {
                var cur = $("#page_currentPage").val();
                loadUserData(cur);
                $('#addModal').modal('hide');
            } else {
                alert(data.data);
            }

        },
    });
}

// 删除用户
function delUser(id) {
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
            url: "user/deleteUser",
            data: {
                "id": id
            },
            success: function (data) {
                if (data == 1) {
                    var cur = $("#page_currentPage").val();
                    loadUserData(cur);
                }
                var index = layer.index; // 获取当前弹层的索引号
                layer.close(index); // 关闭当前弹层
            }
        })
    }
    this.cancel = function () {
        var index = layer.index; // 获取当前弹层的索引号
        layer.close(index); // 关闭当前弹层
    }
}

function md5(pass) {
    if (pass == null || pass.trim() == "") {
        $("#user_passwd").val("");
        return false;
    }
    if (!checkPass(pass)) {
        alert("密码必须同时包含数字和字母并且不少于6位");
        return false;
    }
    var passwd = hex_md5(pass);
    $("#user_passwd").val(passwd);
    $("#mod_passwd").val(passwd);
    return true;
}

// 检查密码是否符合标准
function checkPass(pass) {
    var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}/;
    return pattern.test(pass);
}

// 修改信息
function modifyU() {
    $(".user_table input").attr("readonly", false);
    $(".user_table .sex").attr("disabled", false);
    $(".sequence").attr("readonly", "readonly");
    $(".modify_button").hide();
    $(".save_button").show();
}
// 提交修改用户信息
function submitU() {
    var name = $("#user_name").val();
    if (name == "root") {
        alert('用户名不能为"root"');
        return false;
    }
    var pass = $("#mod_passwd").val();
    if (!md5(pass)) {
        return;
    }
    $("#mod_User").ajaxSubmit({
        url: "user/updateUser",
        success: function (resp) {
            if (resp.resultCode == 1) {
                parent.window.location.reload();
            } else {
                alert(resp.data);
            }
        }
    });
}

// 初始化删除用户提示页面
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;删除用户</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>是否删除用户？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="确认" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="取消" onclick="cancel()"></div></div></div>';
    return htmlStr;
}