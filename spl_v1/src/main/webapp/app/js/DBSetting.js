function updDBConfig() {
    if ($("#db_pwd").val() != $("#db_repwd").val()) {
        alert("两次输入的密码不一致");
        return;
    }
    $.ajax({
        url: "DBSetting/setDBConfig",
        type: "POST",
        data: {
            user: $("#db_user").val(),
            pwd: $("#db_pwd").val(),
        },
        success: function (res) {
            var data = JSON.parse(res);
            if (data.resultCode == 10) {
                alert("保存并修改成功");
                $("#db_pwd").val(data);
                $("#db_repwd").val(data);
            } else {
                alert("加密解析出错");
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

/*function getAESPwd(val){
 $.ajax({
 url : "DBSetting/getAESPwd",
 type : "POST",
 data : {
 pwd : $("#db_pwd").val(),
 },
 success : function(data) {
 $("#db_pwd").val(data);
 },
 error : function(err) {
 console.log(err);
 }
 })
 }*/