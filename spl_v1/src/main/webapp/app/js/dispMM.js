$(document).ready(function () {
    //Tải dữ liệu trường
    loadDispMMData(1);

    //Nhấn phím Enter để truy vấn
    $("#search_name, #search_type").on('keypress', function (event) {
    if (event.key === 'Enter') {
        loadDispMMData(1);
    }
});

});


function showImg(tid) {
    $("#showImage").removeAttr("src");
    $("#showImage").attr("src", "dispMM/showImage?dispmId=" + tid);
    $('#updateModal').modal({show: true, backdrop: false});
}


function refresh() {
    var queryData = $("#gridImport_body");
    queryData.html("");
    $("#search_name").val("");
    $("#search_type").val("");
    loadDispMMData(1);
}

//加载字段数据信息
function loadDispMMData(current) {
    $.ajax({
        url: "dispMM/querydispMMs?currentPage=" + current,
        type: 'POST',  // Thêm method POST
        dataType: "text",
        success: function (data) {
            var queryData = $("#gridImport_body");
            queryData.html(data);
            queryPage();
        },
        error: function () {
            console.error("Failed to load data");
        }
    });
}



function queryPage() {
    var current = Number($("#page_currentPage").val()) || 1;
    var pages = Number($("#pages").val()) || 1;
    var showPage = "";

    // Logic đơn giản hóa
    if (pages <= 7) {
        for (var i = 1; i <= pages; i++) {
            showPage += `<span class="current_${i}"><a href="javascript:loadDispMMData(${i});">${i}</a></span>`;
        }
    } else {
        // Hiển thị dấu "..." khi có quá nhiều trang
        if (current <= 4) {
            for (var j = 1; j <= 7; j++) {
                showPage += `<span class="current_${j}"><a href="javascript:loadDispMMData(${j});">${j}</a></span>`;
            }
            showPage += '<a href="javascript:loadDispMMData(' + (current + 4) + ');">...</a>';
        } else {
            showPage += '<a href="javascript:loadDispMMData(' + (current - 4) + ');">...</a>';
            for (var k = Math.max(current - 3, 1); k <= Math.min(current + 3, pages); k++) {
                showPage += `<span class="current_${k}"><a href="javascript:loadDispMMData(${k});">${k}</a></span>`;
            }
            if (current + 3 < pages) {
                showPage += '<a href="javascript:loadDispMMData(' + (current + 4) + ');">...</a>';
            }
        }
    }

    // Cập nhật giao diện trang
    $(".showPage").html(showPage);
    $(`.current_${current}`).css("background", "#dbffd6");
    $(".last_page").val(pages);
    $(".next").val(current + 1);
    $(".prev").val(current - 1);
    $(".total_p").val(pages);
    $(".skip_to").val(current);
}



function toAdd() {
    $("#addModal").modal({show: true, backdrop: false});
}


function addDispMM() {
    $("#addDispMMForm").ajaxSubmit({
        url: "dispMM/addDispMM",
        contentType: 'application/json',
        data: $("#modifyStyleForm").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadDispMMData(cur);
            }
            $('#addModal').modal('hide');
        },
    });
}


function get(id) {
    $.ajax({
        url: "dispMM/getDispMMData?id=" + id,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#add_id").val(data.id);
            $("#add_name").val(data.name);
            $("#add_source").val(data.source);
            $("#add_sourceColumn").val(data.sourceColumn);
            $("#add_columnType").val(data.columnType);
            $('#modifyModal').modal({show: true, backdrop: false});
        },
        error: function () {
            alert("getStyleData error");
        }
    })
}


function modifyDispMM() {
    $("#modifyDispMM").ajaxSubmit({
        url: "dispMM/updateDispMM",
        contentType: 'application/json',
        data: $("#modifyDispMM").serialize(),
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                var cur = $("#page_currentPage").val();
                loadDispMMData(cur);
            }
            $('#modifyModal').modal('hide');
        },
    });
}


function del(id) {
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
            url: "dispMM/deleteDispMMData?id=" + id,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data == 1) {
                    var cur = $("#page_currentPage").val();
                    loadDispMMData(cur);
                }
                var index = layer.index;			
                layer.close(index); 				
            },
            error: function () {
                alert("deleteDispMMData error");
            }
        })
    }
    this.cancel = function () {
        var index = layer.index;			
        layer.close(index); 				
    }
}
//删除字段提示
function delHtml() {
    htmlStr += '<div style="width:300px;height:230px" >';
    htmlStr += '<div id="title" style=" line-height:50px; text-indent:10px;font-size:18px;font-weight:bold;';
    htmlStr += 'margin-bottom:20px; background-color:#93ff93; position:relative;">&nbsp;&nbsp;删除字段</div>';
    htmlStr += '<div style="display:block; padding-bottom:5px;" align="center" >';
    htmlStr += '<table><tr style="height:50px;"><td colspan="2"><p>是否删除字段？</p></td></tr>';
    htmlStr += '<tr style="height:50px;"><td></td><td></td></tr></table>';
    htmlStr += '<div style="background-color:#aaa;text-align:center;">';
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#4d90fe;border:0px;"';
    htmlStr += 'type="button" value="确认" onclick="confirm()">';
    htmlStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    htmlStr += '<input style="margin:10px auto;height:40px;width:60px;background-color:#93ff93;border:0px;"';
    htmlStr += 'type="button" value="取消" onclick="cancel()"></div></div></div>';
    return htmlStr;
}