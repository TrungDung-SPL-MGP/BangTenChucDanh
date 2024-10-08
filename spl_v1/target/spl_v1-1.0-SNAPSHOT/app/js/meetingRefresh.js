var useColumn;

window.onload = function () {
      let otxt = document.getElementById("excelUpload");
      otxt.onchange = function () {
        realizeExcel();
        alert(getLanguageContent("导入成功"));
      }
};

var a;

function clearJindu() {
    if (1) {
        clearInterval(a);
    }
}

function addJindu() {
    a = setInterval(function () {
        addJindus("jindutiaos");
    }, 50);
}

function addTableCard() {
    loadTagAdd(1);
    document.getElementById("addTags").style.display = "block";
}
function closeAddDiv() {
    document.getElementById("addTags").style.display = "none";
}
$('.J-datepickerTime-range').datePicker({
    format: 'YYYY-MM-DD HH:mm',
    isRange: true
});

var tableHead_Add = ["序号", "标签地址", "路由器地址", "电池电量", "绑定状态", "标签状态",
    "样式名称", "操作"];

var tableData_Add = [];

function loadstyle() {
    var sid = document.getElementById("styleid").value;
    var mid = document.getElementById("meetid").value;
    $
            .ajax({
                url: 'mms/queryStyleById?id=' + sid + "&mid="
                        + mid,
                type: "get",
                contentType: 'application/json; charset=UTF-8',
                dataType: "json",
                success: function (data) {
                    useColumn = data.datalist[0].columnUsing;
                    document.getElementById("styleImg").src = data.data
                            + ".png";
                    document.getElementById("startDay").value = getLocalTime(data.datalist[0].startTime);
                    document.getElementById("endDay").value = getLocalTime(data.datalist[0].endTime);
                    document.getElementById("meetingName").value = data.datalist[0].meetingName;
                    document.getElementById("meetingRoom").value = data.datalist[0].meetingRoom;
                    var temptype = data.datalist[0].templateType;
                    set(temptype);
                    let swidth = data.datalist[0].Width;
                    let sheight = data.datalist[0].Height;
                    let rate = calRate(swidth, sheight);
                    /*document.getElementById("styleImg").style = "width:"
                     + 500
                     * (swidth / 640)
                     + "px;height:"
                     + 320
                     * (sheight / 384) + "px";*/
                    document.getElementById("styleImg").style = "width:"
                            + swidth * rate + "px;height:"
                            + sheight * rate + "px";
                    LoadTagsByMeeting(1);
                },
                error: function (err) {
                    console.log(err);
                }
            });
}

function calRate(width, height) {
    let rate1 = 1;
    let rate2 = 1;
    if (width > 500) {
        rate1 = 500 / width;
    } else {
        rate1 = width / 500;
    }
    if (height > 320) {
        rate2 = 320 / height;
    } else {
        rate2 = height / 320;
    }
    return Math.max(rate1, rate2);
}

function setTableHeadAdd() {
    var headHtml = "<tr>";
    var len = tableHead_Add.length;
    for (let i = 0; i < len; i++) {
        headHtml += "<td class='tb-head-style'>" + tableHead_Add[i]
                + "</td>";
    }
    headHtml += "</tr>"
    document.getElementById("tableHead-Add").innerHTML = headHtml;
}

function setTableDataAdd() {
    var headHtml = "";
    var blen = tableData_Add.length;
    var hlen = tableHead_Add.length;
    var power_s = [];
    for (let i = 0; i < blen; i++) {
        headHtml += "<tr>"
        for (let j = 0; j < hlen; j++) {
            for (var key in tableData_Add[i]) {
                if (key == tableHead_Add[j]) {
                    if (key == "电池电量") {
                        headHtml += '<td><div id="power'
                                + (i + 1)
                                + '_out" class="erli-i bar-container">'
                                + '<div id="power'
                                + (i + 1)
                                + '_container" class="bar-container-in">'
                                + tableData_Add[i][key] + '%</div>'
                                + '</div><li id="power' + (i + 1)
                                + '_top" class="erli-i bar-top"></li>';
                        power_s[i] = tableData_Add[i][key];
                    } else {
                        headHtml += "<td class=''>"
                                + tableData_Add[i][key] + "</td>";
                    }
                }
                console.info(key + ":" + tableData_Add[i][key]);
            }
        }
        headHtml += '<td><button class="fa fa-pencil update-style-small"></button>'
                + '<button class="fa fa-trash-o del-style-small"></button><td>';
        headHtml += "</tr>"
    }
    document.getElementById("tableData-Add").innerHTML = headHtml;
    for (let cc = 0; cc < power_s.length; cc++) {
        percentPower("power" + (cc + 1), power_s[cc])
    }
}

//按照百分比绘制电池电量样式
function percentPower(tid, percent) {
    try {
        document.getElementById(tid + "_container").style.width = (2.5 * percent)
                / 100 + "rem";
        if (percent < 20) {
            document.getElementById(tid + "_out").style.borderColor = "#e73453";
            document.getElementById(tid + "_top").style.background = "#e73453";
            document.getElementById(tid + "_container").style.background = " linear-gradient(45deg, #e74353,#e74353 )";
        }
    } catch (e) {
    }
}

// 设置Table body隔层换色
function setTbodyBg() {
    var len = document.getElementById("main_tb").tBodies[0].rows.length;
    for (var i = 0; i < len; i++) {
        if (i % 2 != 0) {
            document.getElementById("main_tb").tBodies[0].rows[i].style.background = "Seashell";
        }
    }
}

// 加载下面的Table分页
function loadPageNumAdd(num) {
    var ihtml = "<ul><li  onclick='selectPageAdd(1)'>首页</li>";
    for (let i = 0; i < num; i++) {
        ihtml += '<li class="style-page-num-add" onclick="selectPageAdd( '
                + (i + 1)
                + ' )" id="pgadd_'
                + (i + 1)
                + '">'
                + (i + 1)
                + '</li>';
    }
    ihtml += "<li onclick='selectPageAdd(" + num + ")'>尾页</li></ul>";
    document.getElementById("pageContainer-Add").innerHTML = ihtml;
}

function selectPageAdd(current) {
    var len = document.getElementsByClassName("style-page-num-add").length;
    for (let i = 0; i < len; i++) {
        document.getElementById("pgadd_" + (i + 1)).style.background = "";
        document.getElementById("pgadd_" + (i + 1)).style.color = "cornflowerblue";
    }
    document.getElementById("pgadd_" + current).style.background = "lightsteelblue";
    document.getElementById("pgadd_" + current).style.color = "ghostwhite";
}

// 添加选中的桌牌
function addUseTableCard() {
    var mid = document.getElementById("meetid").value;
    var ids = "";
    var clen = document.getElementsByClassName("checkbox-ck").length;
    for (let i = 0; i < clen; i++) {
        if (document.getElementsByClassName("checkbox-ck")[i].checked == true) {
            ids += document.getElementsByClassName("checkbox-ck")[i].id
                    + ",";
        }
    }
    $.ajax({
        url: "mms/addTableCard",
        type: "POST",
        data: {
            mid: mid,
            ids: ids
        },
        success: function (resp) {
            document.getElementById("addTags").style.display = "none";
            location.reload();
        }
    });
}

// 移除已经选中的桌牌
function removeUseTableCard() {
    var mid = document.getElementById("meetid").value;
    var ids = "";
    var clen = document.getElementsByClassName("checkbox-tg").length;
    for (let i = 0; i < clen; i++) {
        if (document.getElementsByClassName("checkbox-tg")[i].checked == true) {
            ids += document.getElementsByClassName("checkbox-tg")[i].id
                    + ",";
        }
    }
    $.ajax({
        url: "mms/removeTableCard",
        type: "POST",
        data: {
            mid: mid,
            ids: ids
        },
        success: function (resp) {
            location.reload();
        }
    });
}

//添加或保存
function saveOrUpdateMeeting() {
    var styleid = document.getElementById("styleid").value;
    var meetingName = document.getElementById("meetingName").value;
    var meetingRoom = document.getElementById("meetingRoom").value;
    var startDay = document.getElementById("startDay").value;
    var endDay = document.getElementById("endDay").value;
    var meetid = document.getElementById("meetid").value;
    var templateType = document.getElementById("templateType").value;
    if (!meetingName) {
        alert(getLanguageContent("请填写会议名称"));
        return;
    }
    if (!startDay || !endDay) {
        alert(getLanguageContent("请填写会议时间"));
        return;
    }
    if (!meetingRoom) {
        alert(getLanguageContent("请填写会议室"));
        return;
    }
    var sdata = {};
    sdata.styleid = styleid;
    sdata.meetingName = meetingName;
    sdata.meetingRoom = meetingRoom;
    sdata.startDay = startDay;
    sdata.endDay = endDay;
    sdata.meetid = meetid;
    sdata.templateType = templateType;
    $.ajax({
        url: "mms/updateMeeting",
        type: "POST",
        data: sdata,
        success: function (resp) {
            if (resp == -1) {
                location.reload();
            }
            meetingUpdate(resp);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

var rd = 0.5;

// 刷新数据
function updateAllContent() {
    var inputContents = document.getElementsByClassName("columnContentClass");
    var ilen = document.getElementsByClassName("columnContentClass").length;
    for (let i = 0; i < ilen; i++) {
        document.getElementsByClassName("columnContentClass")[i].onchange();
    }
}

//查询刷新进度(){}
function loadTagComplete(macArr, num) {
    $.ajax({
        url: "mms/loadTagComplete",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(macArr),
        success: function (data) {
            document.getElementById("refreshJindu").innerText = getLanguageContent("更新中...") + data[0] + "/" + num;
            if (data[0] + data[1] >= num) {
                document.getElementById("refresh-tittle-pop").children[0].style.display = "none";
                document.getElementById("refreshJindu").innerText = getLanguageContent("更新完成");
                waitReduce();
                clearState();
                var blen = document.getElementsByClassName("checkbox-tg").length;
                for (let j = 0; j < blen; j++) {
                    document.getElementsByClassName("checkbox-tg")[j].checked = "";
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//开始刷新屏幕
function updateScreen() {
    safeStay.style.display = "block";
    var sdata = "[";
    var clen = document.getElementById("main_tb").getElementsByClassName("checkbox-tg").length;
    var smappingtype = document.getElementById("mappingtype").value;
    var styleid = document.getElementById("styleid").value;
    let deskCardNum = 0;
    var macArr = [];
    var color = "";
    /* if(fourColor.checked){
     color = "'4Color': '1',";
     } */
    var ABDFlag = "";
    if (tagType.value == 161 || tagType.value == 162 || tagType.value == 163) {
        ABDFlag = "'ABDisplayFlag':'" + tagType.value + "',";
    }
    for (let i = 0; i < clen; i++) {
        if (document.getElementById("main_tb").getElementsByClassName("checkbox-tg")[i].checked == true && document.getElementsByClassName("checkbox-tg")[i].id != "selectAllAddUpd") {
            var sid = document.getElementsByClassName("checkbox-tg")[i].id;
            setInputToTextarea(sid);
            var smac = document.getElementsByClassName("tableMac")[i].innerText;
            sdata += "{'mac':'" + smac.replace("CWT", "") + "'," + color
                    + "'styleid':" + styleid + "," + ABDFlag
                    + document.getElementById("textarea" + sid).value
                    + "},";
            smac = smac.replace("CWT", "") + ",";
            macArr += smac.replace(/'/g, '"');
            deskCardNum++;
        }
    }
    if (deskCardNum < 1) {
        alert(getLanguageContent("请选择桌牌"));
        safeStay.style.display = "none";
        return;
    }
    sdata = sdata.substring(0, sdata.length - 1) + "]";
    sdata = sdata.replace(/'/g, '"');
    /* alert(JSON.stringify(sdata)); */
    document.getElementById("refreshJindu").innerText = getLanguageContent("更新中...") + "0/" + deskCardNum;
    $.ajax({
        url: "mms/queryIsOnlineRouter",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(macArr),
        success: function (resp) {
            if (resp.resultCode != 10) {
                if (resp.resultCode == 4) {
                    alert(getLanguageContent("登陆过期或未登录"));
                    safeStay.style.display = "none";
                    window.open('http://localhost/esls_new/mms/', '_self');
                    return;
                }
                alert(getLanguageContent("基站不在线"));
                safeStay.style.display = "none";
                return;
            } else {
                $.ajax({
                    url: "associate/updateScreen",
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(sdata),
                    success: function (resp) {
                        initTextarea();
                        refreshState(macArr, deskCardNum);
                        document.getElementById("refresh-tittle-pop").children[0].style.display = "block";
                        document.getElementById("refresh-tittle-pop").style.display = "block";
                        //标准刷新内容模板
                        var cval = localStorage.getItem("refreshContent");
                        for (let i = 0; i < clen; i++) {
                            var sid = document.getElementsByClassName("checkbox-tg")[i].id;
                            document.getElementById("textarea" + sid).value = cval;
                        }
                    }
                });
            }
        }
    });
}

function exportExcel() {
    var sdata = "";
    var smappingtype = document.getElementById("mappingtype").value;
    var smeetid = document.getElementById("meetid").value;
    var clen = document.getElementsByClassName("checkbox-tg").length;
    for (let i = 0; i < clen; i++) {
        if (document.getElementsByClassName("checkbox-tg")[i].checked == true) {
            var sid = document.getElementsByClassName("checkbox-tg")[i].id
            var smac = document.getElementsByClassName("tableMac")[i].innerText;
            if (sdata.indexOf(smac + ",") > -1) {
                continue;
            }
            sdata += smac.replace("CWT", "") + ",";
        }
    }
    if (sdata.length < 1) {
        alert(getLanguageContent("请选择要导出的标签"));
        return;
    }
    sdata = sdata.substring(0, sdata.length - 1);
    var surl = "mms/exportExcelXlsxForRefreshContent?mappingtype="
            + smappingtype + "&macArr=" + sdata + "&meetid=" + smeetid;
    window.open(surl);
}

// 读取 excel文件
function outputWorkbook(workbook) {
    var sheetNames = workbook.SheetNames; // 工作表名称集合
    sheetNames.forEach(name => {
        var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
        for (var key in worksheet) {
            // v是读取单元格的原始值
            console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
        }
    });
}

//解析Excel
function realizeExcel() {
    var smappingtype = document.getElementById("mappingtype").value;
    var tid = document.getElementsByClassName("checkbox-tg")[0].id;
    $.ajax({
        url: 'mms/queryUsingColumn?&tid=' + tid
                + '&mappingtype=' + smappingtype,
        type: "get",
        contentType: 'application/json; charset=UTF-8',
        dataType: "json",
        success: function (sdata) {
            var columnArr = sdata.data.split(",");
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                try {
                    if (callback)
                        callback(workbook);
                } catch (e) {
                    //TODO handle the exception
                }
                //转成Json的Excel
                var jsonobj = XLSX.utils.sheet_to_json(workbook.Sheets.刷新屏幕数据表);
                var jlen = document.getElementsByClassName("checkbox-tg").length / 2;
                for (let i = 0; i < jlen; i++) {
                    //页面上的MAC
                    var imac = document.getElementsByClassName("tableMac")[i].innerText;
                    var tagid = document.getElementsByClassName("tableMac")[i].id.replace("Mac", "");
                    var icontent = document.getElementsByTagName("textarea")[i].value;
                    document.getElementById("textarea" + tagid).value = localStorage
                            .getItem("refreshContent");
                    /*  */
                    for (let j = 0; j < jsonobj.length; j++) {
                        if (imac == jsonobj[j].mac) {
                            document.getElementsByClassName("checkbox-tg")[i].checked = true;
                            try {
                                for (let k = 0; k < columnArr.length; k++) {
                                    document.getElementById(tagid + "_" + columnArr[k]).value = jsonobj[j][columnArr[k]];
                                    saveColumnContent(tagid, jsonobj[j][columnArr[k]], columnArr[k]);
                                    //console.log(columnArr[k]+"Content," + jsonobj[j][columnArr[k]]);
                                }
                            } catch (e) {
                                console.log(e);
                                continue;
                            }
                        }
                    }
                }
            };
            try {
                reader.readAsBinaryString(document.getElementById("excelUpload").files[0]);
            } catch (e) {
                //TODO handle the exception
                console.log(e);
            } finally {
                excelUpload.value = null
            }
        }
    })
}

//打开模板选择页面
function loadStyle() {
    document.getElementsByClassName("container")[0].style.display = "block";
    loadchooseStyle(1, "refresh");
}

//关闭模板选择页面
function cancleStyle() {
    document.getElementsByClassName("container")[0].style.display = "none";
}


//选择模板界面分页
function selectPageRefresh(current) {
    var len = document.getElementsByClassName("style-page-num-refresh").length;
    for (let i = 0; i < len; i++) {
        if (document.getElementById("pg_refresh" + (i + 1)) == null) {
            break;
        }
        document.getElementById("pg_refresh" + (i + 1)).style.background = "";
        document.getElementById("pg_refresh" + (i + 1)).style.color = "cornflowerblue";
    }
    document.getElementById("pg_refresh" + current).style.background = "lightsteelblue";
    document.getElementById("pg_refresh" + current).style.color = "ghostwhite";
    loadchooseStyle(current, "refresh");
}

function addJindus(tid) {
    var bWidth = document.getElementById(tid).style.width.replace("px", '');
    if (!bWidth) {
        bWidth = 0;
    }
    bWidth = parseFloat(bWidth);
    if (bWidth > document.getElementsByTagName("body")[0].clientWidth + 250) {
        bWidth = 0;
        clearJindu(a);
        //return;
    }
    document.getElementById(tid).style.width = bWidth + 5 + "px";
}

//格式化时间
function getLocalTime(nS) {
    var sdate = new Date(parseInt(nS));
    var smonth = sdate.getMonth() + 1;
    var sday = sdate.getDate();
    var shour = sdate.getHours();
    var smin = sdate.getMinutes();
    var ssec = sdate.getSeconds();
    if (smonth < 10) {
        smonth = "0" + smonth;
    }
    if (sday < 10) {
        sday = "0" + sday;
    }
    if (shour < 10) {
        shour = "0" + shour;
    }
    if (smin < 10) {
        smin = "0" + smin;
    }
    if (ssec < 10) {
        ssec = "0" + ssec;
    }
    var dateStr = sdate.getFullYear() + "-" + smonth + "-" + sday + " "
            + shour + ":" + smin + ":" + ssec;
    return dateStr;
}

//选择模板类型
function selectTemplateType(val) {
    var mid = document.getElementById("meetid").value;
    if (!mid) {
        mid = 0;
    }
    $.ajax({
        url: "mms/selectTemplateType",
        type: "POST",
        data: {
            templateType: val,
            mid: mid
        },
        success: function (resp) {
            saveOrUpdateMeeting();
        }
    });
}

////设置选择框内容
function set(val) {
    var slen = document.getElementsByTagName("option").length;
    for (let j = 0; j < slen; j++) {
        document.getElementsByTagName("option")[j].selected = "";
    }
    for (let i = 0; i < slen; i++) {
        if (document.getElementsByTagName("option")[i].value == val) {
            document.getElementsByTagName("option")[i].selected = "selected";
        }
    }
}