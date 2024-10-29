function updDBConfig() {
    if ($("#db_pwd").val() != $("#db_repwd").val()) {
        alert("The passwords you entered twice do not match");
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
                alert("Save and modify successfully");
                $("#db_pwd").val(data);
                $("#db_repwd").val(data);
            } else {
                alert("Encryption parsing error");
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