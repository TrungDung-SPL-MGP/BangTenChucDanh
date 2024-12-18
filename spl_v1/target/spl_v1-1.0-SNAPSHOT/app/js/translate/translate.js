﻿function translate() {
    for (item in document.querySelectorAll('*')) {
        if (document.querySelectorAll('*')[item].childElementCount === 0) {
            document.querySelectorAll('*')[item].innerHTML = getLanguageContent(document.querySelectorAll('*')[item].innerHTML);
        }
    }
}
;


function setButtonLan() {
    // for (var i = 0; i < document.getElementsByTagName("button").length; i++) {
    //     var textContont = document.getElementsByTagName("button")[i].innerText
    //         .replace("*", "").replace(/\s+/g, '');
    //     textContont = getLanguageContent(textContont);
    //     document.getElementsByTagName("button")[i].innerText = textContont;
    // }
}


function setTittleLan() {
    /*for (var i = 0; i < document.getElementsByClassName("style-span-t").length; i++) {
     var textContont = document.getElementsByClassName("style-span-t")[i].innerText
     .replace("*", "").replace(/\s+/g, '');
     textContont = getLanguageContent(textContont);
     document.getElementsByClassName("style-span-t")[i].innerText = "   *"
     + textContont;
     }*/
}


function getLanguageContent(val) {
    var language = 0;
    try {
        language = localStorage.getItem("language");
    } catch (e) {

    }
    switch (language) {
        case "0":
            val = val;
            break;
        case "1":
            val = languageHK[val] ? languageHK[val] : val;
            break;
        case "2":
            val = languageEN[val] ? languageEN[val] : val;
            break;
        case "3":
            val = languageJP[val] ? languageJP[val] : val;
            break;
        case "4":
            val = languageKR[val] ? languageKR[val] : val;
            break;
        case "5":
            val = languageVN[val] ? languageVN[val] : val;
            break;
        default:
            val = val;
            break;
    }
    return val;
}


function setTagContent(val) {
    document.getElementsByClassName("tag-style")[0].innerText = getLanguageContent(val);
}


var languageHK = {
    "序号": "序號",
    "桌牌地址": "桌牌地址",
    "所属AP": "所屬AP",
    "电池电量": "電池電量",
    "绑定状态": "綁定狀態",
    "标签状态": "標籤狀態",
    "桌牌信息": "桌牌資訊",
    "样式名称": "樣式名稱",
    "操作": "操作",
    "显示信息": "顯示資訊",
    "AP地址": "AP地址",
    "AP_IP": "AP_IP",
    "所属公司": "所屬公司",
    "状态": "狀態",
    "描述": "描述",
    "会议名称": "會議名稱",
    "会议室": "會議室",
    "开始时间": "開始時間",
    "结束时间": "結束時間",
    "模板": "範本",
    "桌牌数量": "桌牌數量",
    "尺寸": "尺寸",
    "创建时间": "創建時間",
    "修改密码": "修改密碼",
    "退出": "退出",
    "首页": "首頁",
    "会议管理": "會議管理",
    "设备管理": "設備管理",
    "我的桌牌": "我的桌牌",
    "我的AP": "我的AP",
    "系统设置": "系統設置",
    "模板管理": "範本管理",
    "帮助文档": "幫助文檔",
    "修改会议内容": "修改會議內容",
    "修改标牌内容": "修改標牌內容",
    "查询": "査詢",
    "选择模板": "選擇範本",
    "保存": "保存",
    "添加桌牌": "添加桌牌",
    "移除桌牌": "移除桌牌",
    "刷新桌牌数据": "重繪桌牌數據",
    "导出桌牌表格": "匯出桌牌表格",
    "导入桌牌表格": "導入桌牌表格",
    "模板类型": "範本類型",
    "7.5寸黑白红": "7.5寸黑白紅",
    "7.5寸黑白": "7.5寸黑白",
    "4.2寸黑白红": "4.2寸黑白紅",
    "4.2寸黑白": "4.2寸黑白",
    "TFT屏": "TFT屏",
    "会议时间": "會議時間",
    "添加会议": "添加會議",
    "保存": "保存",
    "尾页": "尾頁",
    "导入": "導入",
    "导出": "匯出",
    "关闭": "關閉"
}
// 英语
var languageEN = {
    "序号": "ID",
    "桌牌地址": "LABEL ADDRESS",
    "所属AP": "AFFILIATED AP",
    "电池电量": "BATTERY LEVEL",
    "绑定状态": "BINDING STATE",
    "标签状态": "LABEL STATUS",
    "桌牌信息": "TABLE INFORMATION",
    "操作": "OPERATION",
    "样式名称": "STYLE NAME",
    "显示信息": "DISPLAY INFORMATION",
    "AP地址": "AP ADDRESS",
    "AP_IP": "AP_IP",
    "所属公司": "AFFILIATED COMPANY",
    "状态": "STATE",
    "描述": "DESCRIBE",
    "会议名称": "LABEL ASSIGNMENT NAME",
    "会议室": "LABEL ASSIGNMENT ROOM",
    "开始时间": "START TIME",
    "结束时间": "END TIME",
    "模板": "TEMPLATE",
    "选择模板类型：": "Choose template type:",
    "桌牌数量": "LABEL NUMBER",
    "尺寸": "SIZE",
    "创建时间": "CREATION TIME",
    "修改密码": "CHANGE PASSWORD",
    "退出": "EXIT",
    "首页": "HOME PAGE",
    "会议管理": "LABEL ASSIGNMENTS MANA",
    "设备管理": "DEVICE MANA",
    "我的桌牌": "MY LABEL",
    "我的AP": "MY AP",
    "系统设置": "SYSTEM SETUP",
    "模板管理": "TEMPLATE MANA",
    "帮助文档": "HELP DOCUMENT",
    "修改会议内容": "MODIFY ",
    "修改标牌内容": "MODIFY ",
    "查询": "QUERY",
    "选择模板": "SELECT ",
    "保存": "SAVE",
    "添加桌牌": "ADD ",
    "移除桌牌": "REMOVE ",
    "刷新桌牌数据": "REFRESH ",
    "导出桌牌表格": "EXPORT ",
    "导入桌牌表格": "IMPORT ",
    "模板类型": "TEMPLATE TYPE",
    "7.5寸黑白红": "7.5 inches black and white red",
    "7.5寸黑白": "7.5 inches black and white",
    "4.2寸黑白红": "4.2 inches black and white red",
    "4.2寸黑白": "4.2 inches black and white",
    "TFT屏": "TFT screen",
    "会议时间": "LABEL ASSIGNMENT TIME",
    "添加会议": "ADD ASSIGNMENT",
    "保存": "SAVE",
    "尾页": "TAIL PAGE",
    "导入": "IMPORT",
    "导出": "EXPORT",
    "关闭": "CLOSE",
    "选择": "SELECT",
    "共": " ALL ",
    "页": " PAGE ",
    "取消": "CANCEL",
    "正在更新": "UPDATING",
    "等待更新": "WAITING FOR UPDATING",
    "更新失败": "UPDATE FAILED",
    "更新完成": "UPDATE COMPLETE",
    "更新中...": "UPDATING ...",
    "未更新": "NOT UPDATED",
    "保存模板": "SAVE TEMPLATE",
    "预览": "PREVIEW",
    "添加字段": "ADD FIELDS",
    "字段名：": "FIELD NAME：",
    "预览内容：": "PREVIEW CONTENT：",
    "字段类型：": "FIELD TYPE：",
    "文本": "TEXT",
    "图片": "PICTURE",
    "二维码": "QR CODE",
    "条形码": "BAR CODE",
    "确定": "DETERMINE",
    "上传背景": "UPLOAD BACKGROUND",
    "背景名称：": "BACKGROUND NAME",
    "*暂不支持中文名称": "*Chinese name is not supported temporarily",
    "宽度：": "WIDTH：",
    "高度：": "HEIGHT：",
    "宽度": "WIDTH",
    "高度": "HEIGHT",
    "上传背景：": "UPLOAD BACKGROUND：",
    "红色图片：": "RED PICTURE：",
    "勾选": "CHECKLIST",
    "项目名字": "PROJECT NAME",
    "预览字段": "PREVIEW FIELD",
    "数据源表名": "DATASOURCE TABLE NAME",
    "数据源列名": "DATASOURCE COLUMN NAME",
    "模板名称": "TEMPLATE NAME",
    "添加模板": "ADD",
    "屏幕类型": "SCREEN TYPE",
    "背景": "BACKGROUND",
    "上传图片": "UPLOAD PICTURES",
    "地址：": "ADDRESS：",
    "代码：": "CODE：",
    "隐藏": "HIDE",
    "属性": "ATTRIBUTE",
    "基本设置": "BASIC SETTING",
    "选择图片": "SELECT PICTURES",
    "更多设置": "MORE SETTINGS",
    "前缀": "PREFIX",
    "后缀": "SUFFIX",
    "字体大小": "FONTSIZE",
    "加粗": "BOLD",
    "字体颜色": "FONT COLOR",
    "黑": "BLACK",
    "白": "WHITE",
    "红": "RED",
    "背景颜色": "BACKGROUND COLOR",
    "字体": "FONT FAMILY",
    "宋体": "song style",
    "黑体": "blackbody",
    "微软雅黑": "microsoft YaHei",
    "楷体": "regular script",
    "仿宋": "imitation song",
    "华文楷体": "chinese script",
    "新宋体": "nSimSun",
    "等线": "new Tahoma isoline",
    "对齐": "ALIGNMENT",
    "靠左": "LEFT",
    "居中": "CENTER",
    "靠右": "RIGHT",
    "边框粗细": "BORDER ",
    "模态框（Modal）标题": "MODAL TITLE",
    "在这里添加一些文本": "add some text here",
    "模板属性": "TEMPLATE ATTRIBUTE",
    "接口代码": "INTERFACE FACE",
    "文本预览": "TEXT PREVIEW",
    "删除所有标签": "DELETE ALL TAGS",
    "标签信息": "TAG INFORMATION",
    "标签地址": "MAC",
    "样式名称": "STYLE NAME",
    "宽  度": "WIDTH",
    "高  度": "HEIGHT",
    "电池电量": "POWER",
    "信号强度": "RSSI",
    "硬件版本": "HARD VERSION",
    "软件版本": "SOFTWARE VERSION",
    "序列号": "SERIAL NUMBER",
    "生产日期": "DATE OF MANUFACTURE",
    "所属基站": "BELONG ROUTER",
    "工作模式": "WORKING MODE",
    "刪除线": "STRIKETHROUGH",
    "在线": "ONLINE",
    "离线": "OFFLINE",
    "快速模式": "QUICK MODE",
    "常规模式": "NORMAL MODE",
    "节能模式": "POWER SAVING MODE",
    "正面": "FRONT SIDE",
    "反面": "BACK SIDE",
    "双面": "BOTH SIDE",
    "导入成功": "Import successful",
    "请填写会议名称": "Please fill in the name of the meeting.",
    "请填写会议时间": "Please fill in the time of the meeting.",
    "请填写会议室": "Please fill out the conference room.",
    "请选择桌牌": "Please select table cards.",
    "登陆过期或未登录": "Log in expired or not logged in.",
    "基站不在线": "The base station is not online.",
    "请选择要导出的标签": "Please select the label you want to export",
    "是否删除": "Whether to delete",
    "是否添加新模板": "Whether to add a new template",
    "是否添加新模板?": "Whether to add a new template?",
    "请添加字段名！": "Please add the field name!",
    "该字段名已存在": "The field name already exists",
    "模板名称不能重复，请填写其他模板名称！": "Template name can not be repeated, please fill in other template name!",
    "上传成功！": "Upload complete!",
    "上传失败！": " Failed to upload!",
    "取消预览": "Cancel the preview",
    "字体名称": "FONT NAME",
    "系统字体路径": "System Font files path",
    "选择字体文件": "choose the Font File",
    "添加字体": "Add font file ",
    "请输入字段名：": "Please enter a field name:",
    "图片名称：": "IMAGE NAME",
    "上传图片：": "Upload a picture",
    "保存成功!": "Save success!",
    "保存失败!": "Save failure!",
    "确认要删除吗?": "Are you sure you want to delete this?",
    "删除成功": "Delete success",
    "删除失败": "Delete failure",
    "确认要删除所有标签吗?": "Are you sure you want to delete all?",
    "注册开关": "Registration switch",
    "开启": "OPEN",
    "关闭": "CLOSE",
    "是否开启注册开关?": "Do you want to turn on the registration switch?",
    "是否关闭注册开关?": "Do you want to turn off the registration switch?",
    "设置失败": "Setting failed",
    "价签升级": "Price tag upgrade",
    "升级": "Upgrade",
    "价签地址": "Tag address",
    "登录超时，请重新登录": "Login timeout, please log in again",
    "正在巡检": "Inspection",
    "正在巡检,请勿进行其他操作": "In the inspection, please do not perform other operations",
    "巡检": "Inspection",
    "路由器离线，请检查路由器状态": "The router is offline, please check the router status",
    "标签巡检": "Tag inspection",
    "升级成功": "update successed",
    "正在升级": "upgrading",
    "等待升级": "Waiting Upgrade",
    "升级失败": "Upgrade failed",
    "没有可用路由器": "No available router",
    "请选择文件": "Please select the file",
    "扫描枪升级": "Scanning Gun Upgrade",
    "扫描枪名称": "Scan the name of the gun",
    "当前硬件版本号": "The current hardware version number",
    "当前软件版本号": "Current Software Version Number",
    "升级状态": "Upgrade status",
    "软件版本号": "Software version number",
    "硬件版本号": "Hardware version number",
    "出厂批次": "Facts from the factory",
    "生产商": "manufacturer",
    "扫描枪状态": "Scan the status of the gun",
    "扫描枪地址": "Scanning gun address",
    "扫描枪详情": "Scanning Gun Details",
    "确认": "confirm",
    "是否删除扫描枪？": "Delete the scan gun?",
    "正在设置周期": "Setting period",
    "秒": "seconds",
    "路由器离线，请检查路由器状态": "Router is offline, please check router status",
    "绑定店铺失败": "Failed to bind shop",
    "恢复出厂设置": "reset",
    "确认恢复出厂设置": "Confirm factory reset",
    "设置": "Settings",
    "功率": "Power",
    "频率": "frequency",
    "休眠时间": "sleep time",
    "唤醒时间": "wake-up time",
    "接收波特率": "received baud rate",
    "发送波特率": "Send baud rate",
    "433参数设置": "433 parameter setting",
    "路由器升级": "Router upgrade",
    "路由器名称": "router name",
    "路由器设置": "router settings",
    "路由器地址": "router address",
    "路由器ip地址": "router IP address",
    "路由器端口": "router port",
    "路由器状态": "router status",
    "升级状态": "Upgrade Status",
    "路由器序列号": "router serial number",
    "长周期": "Long cycle",
    "短周期": "short cycle",
    "确认删除路由器": "Confirm to delete router",
    "推荐": "Recommended",
    // "  ":"",
    // "  ":"",
    // "  ":"",
    // "  ":"",
}

// Vietnamese
var languageVN = {
    "序号": "ID",
    "桌牌地址": "ĐIA CHỈ BẢNG",
    "所属AP": "LIÊN KẾT AP",
    "电池电量": "MỨC NĂNG LƯỢNG",
    "绑定状态": "TRẠNG THÁI RÀNG BUỘC",
    "标签状态": "TRẠNG THÁI  NHÃN HIỆU",
    "桌牌信息": "THÔNG TIN BẢNG",
    "操作": "HOẠT ĐỘNG",
    "样式名称": "TÊN KIỂU MẪU",
    "显示信息": "THÔNG TIN HIỂN THỊ",
    "AP地址": "ĐIA CHỈ AP",
    "AP_IP": "AP_IP",
    "所属公司": "CÔNG TY HỢP TÁC",
    "状态": "TRẠNG THÁI",
    "描述": "MÔ TẢ",
    "会议名称": "TÊN HỘI NGHỊ",
    "会议室": "PHÒNG HỘI NGHỊ",
    "开始时间": "THỜI GIAN BẮT ĐẦU",
    "结束时间": "THỜI GIAN KẾT THÚC",
    "模板": "BẢN MẪU",
    "选择模板类型：": "Chọn Mẫu:",
    "桌牌数量": "Số Lượng Thẻ",
    "尺寸": "KÍCH THƯỚC",
    "创建时间": "THỜI GIAN KHỞI TẠO",
    "修改密码": "ĐỔI MẬT KHẨU",
    "退出": "THOÁI",
    "首页": "TRANG CHỦ",
    "会议管理": "QUẢN LÝ CUỘC HỌP",
    "设备管理": "QUẢN LÝ THIẾT BỊ",
    "我的桌牌": "THẺ CỦA TÔI",
    "我的AP": "AP CỦA TÔI",
    "系统设置": "CÀI ĐẶT HỆ THỐNG",
    "模板管理": "QUẢN LÝ MẪU SẴN",
    "帮助文档": "TÀI LIỆU HỖ TRỢ",
    "修改会议内容": "SỬA NỘI DUNG CUỘC HỌP ",
    "修改标牌内容": "SỬA NỘI DUNG CUỘC HỌP ",
    "查询": "TRUY VẤN",
    "选择模板": "CHỌN MẪU ",
    "保存": "LƯU",
    "添加桌牌": "THÊM MỚI ",
    "移除桌牌": "XÓA ",
    "刷新桌牌数据": "LÀM MỚI ",
    "导出桌牌表格": "XUẤT FILE ",
    "导入桌牌表格": "NHẬP FILE ",
    "模板类型": "LOẠI MẪU",
    "7.5寸黑白红": "7.5 in đen, trắng và đỏ",
    "7.5寸黑白": "7.5 in đen và trắng",
    "4.2寸黑白红": "4.2 in đen, trắng và đỏ",
    "4.2寸黑白": "4.2 in đen và trắng",
    "TFT屏": "MÀN HÌNH TFT",
    "会议时间": "THỜI GIAN HỌP",
    "添加会议": "THÊM CUỘC HỌP",
    "保存": "LƯU",
    "尾页": "TRANG CUỐI",
    "导入": "NHẬP",
    "导出": "XUẤT",
    "关闭": "ĐÓNG ",
    "选择": "CHỌN",
    "共": " TẤT CẢ ",
    "页": " TRANG ",
    "取消": "HỦY BỎ",
    "正在更新": "ĐANG CẬP NHẬP",
    "等待更新": "CHỜ CẬP NHẬP",
    "更新失败": "CẬP NHẬP THẤT BẠI",
    "更新完成": "CẬP NHẬP HOÀN THÀNH",
    "更新中...": "CẬP NHẬP ...",
    "未更新": "KHÔNG ĐƯỢC CẬP NHẬP",
    "保存模板": "LƯU MẪU",
    "预览": "XEM TRƯỚC",
    "添加字段": "THÊM LĨNH VỰC",
    "字段名：": "TÊN LĨNH VỰC：",
    "预览内容：": "XEM TRƯỚC NỘI DUNG：",
    "字段类型：": "LOẠI LĨNH VỰC：",
    "文本": "VĂN BẢN",
    "图片": "HÌNH ẢNH",
    "二维码": "MÃ QR",
    "条形码": "MÃ VẠCH",
    "确定": "CHẮC CHẮN",
    "上传背景": "TẢI PHONG NỀN",
    "背景名称：": "TÊN PHONG NỀN",
    "*暂不支持中文名称": "*Chinese name is not supported temporarily",
    "宽度：": "CHIỀU RỘNG：",
    "高度：": "CHIỀU CAO：",
    "宽度": "CHIỀU RỘNG",
    "高度": "CHIỀU CAO",
    "上传背景：": "TẢI PHONG NỀN：",
    "红色图片：": "HÌNH ẢNH ĐỎ：",
    "勾选": "ĐÁNH DẤU",
    "项目名字": "TÊN DỰ ÁN",
    "预览字段": "XEM TRƯỚC LĨNH VỰC",
    "数据源表名": "TÊN NGUỒN DỮ LIỆU BẢNG",
    "数据源列名": "TÊN NGUỒN DỮ LIỆU CỘT",
    "模板名称": "TÊN MẪU",
    "添加模板": "THÊM MẪU",
    "屏幕类型": "LOẠI MÀN HÌNH",
    "背景": "PHONG NỀN",
    "上传图片": "TẢI HÌNH ẢNH",
    "地址：": "ĐIA CHỈ：",
    "代码：": "MÃ：",
    "隐藏": "ẨN",
    "属性": "THUỘC TÍNH",
    "基本设置": "CÀI ĐẶT CƠ BẢN",
    "选择图片": "CHỌN HÌNH ẢNH",
    "更多设置": "CÀI ĐẶT KHÁC",
    "前缀": "TIỀN TỐ",
    "后缀": "HẬU TỐ",
    "字体大小": "CỠ CHỮ",
    "加粗": "IN ĐẬM",
    "字体颜色": "MÀU CHỮ",
    "黑": "ĐEN",
    "白": "TRẮNG",
    "红": "ĐỎ",
    "背景颜色": "MÀU NỀN",
    "字体": "NÉT CHỮ",
    "宋体": "Times New Roman",
    "黑体": "KHUNG ĐEN",
    "微软雅黑": "microsoft YaHei",
    "楷体": "regular script",
    "仿宋": "imitation song",
    "华文楷体": "chinese script",
    "新宋体": "Arial",
    "等线": "new Tahoma isoline",
    "对齐": "CĂN CHỈNH",
    "靠左": "TRÁI",
    "居中": "GIỮA",
    "靠右": "PHẢI",
    "边框粗细": "ĐỘ ĐÀY VIỀN ",
    "模态框（Modal）标题": "TIÊU ĐỀ PHƯƠNG THỨC",
    "在这里添加一些文本": "Thêm Văn Bản Ở Đây",
    "模板属性": "THUỘC TÍNH MẪU",
    "接口代码": "MẶT GIAO DIỆN",
    "文本预览": "XEM TRƯỚC VĂN BẢN",
    "删除所有标签": "XÓA TOÀN BỘ ",
    "标签信息": "THÔNG TIN THẺ",
    "标签地址": " ĐỊA CHỈ MAC",
    "样式名称": "TÊN PHONG CÁCH",
    "宽  度": "CHIỀU RỘNG",
    "高  度": "CHIỀU CAO",
    "电池电量": "NGUỒN",
    "信号强度": "CƯỜNG ĐỘ TÍN HIỆU",
    "硬件版本": "PHIÊN BẢN PHẦN CỨNG",
    "软件版本": "PHIÊN BẢN PHẦN MỀN",
    "序列号": "SỐ Seris",
    "生产日期": "NGÀY SẢN XUẤT",
    "所属基站": "BỘ ĐỊNH TUYẾN",
    "工作模式": "CHẾ ĐỘ HOẠT ĐỌNG",
    "刪除线": "GẠCH NGANG",
    "在线": "ĐANG HOẠT ĐỘNG",
    "离线": "TẠM NGHỈ",
    "快速模式": "CHẾ ĐỘ NHANH",
    "常规模式": "CHẾ ĐỘ CƠ BẢN",
    "节能模式": "TIẾP KIỆM NĂNG LƯỢNG",
    "正面": "MẶT TRƯỚC",
    "反面": "MẶT SAU",
    "双面": "HAI BÊN",
    "导入成功": "Nhập thành công",
    "请填写会议名称": "Vui lòng điền tên cuộc họp",
    "请填写会议时间": "Vui lòng điền thời gian cuộc họp",
    "请填写会议室": "Vui lòng điền vào phòng họp.",
    "请选择桌牌": "Vui lòng chọn thẻ bàn",
    "登陆过期或未登录": "Đăng nhập hết hạn hoặc chưa đăng nhập.",
    "基站不在线": "Trạm  điều khiển không hoạt động.",
    "请选择要导出的标签": "Vui lòng chọn thẻ để xuất.",
    "是否删除": "Xóa hay không",
    "是否添加新模板": "Có thêm mẫu mới hay không?",
    "是否添加新模板?": "Có thêm mẫu mới hay không?",
    "请添加字段名！": "Vui lòng thêm tên lĩnh vực!",
    "该字段名已存在": "Tên lĩnh vực đã tồn tại",
    "模板名称不能重复，请填写其他模板名称！": "Tên mẫu không được lặp lại, vui lòng điền tên mẫu khác!",
    "上传成功！": "Tải lên thành công!",
    "上传失败！": " Tải lên thất bại!",
    "取消预览": "Hủy xem trước",
    "字体名称": "Tên phông chữ",
    "系统字体路径": "Đường dẫn tệp phông chữ hệ thống",
    "选择字体文件": "Chọn tập tin phông chữ",
    "添加字体": "Thêm phông chữ",
    "请输入字段名：": "Vui lòng  nhập tên lĩnh vực:",
    "图片名称：": "Tên hình ảnh",
    "上传图片：": "tải ảnh lên",
    "保存成功!": "Lưu thành công!",
    "保存失败!": "Luu thất bại!",
    "确认要删除吗?": "bạn có muốn xóa không?",
    "删除成功": "Xóa thành công",
    "删除失败": "Xóa thất bại",
    "确认要删除所有标签吗?": "Bạn có muốn xóa tất cả không?",
    "注册开关": "NÚT ĐĂNG KÍ",
    "开启": "MỞ",
    "关闭": "ĐÓNG",
    "是否开启注册开关?": "Bạn có muốn bật công tắc đăng ký không?",
    "是否关闭注册开关?": "Bạn có muốn tắt công tắc đăng ký không?",
    "设置失败": "Thiết lập hông thành công",
    "价签升级": "Cập nhập bảng giá",
    "升级": "Nâng cấp",
    "价签地址": "Địa chỉ báo giá",
    "登录超时，请重新登录": "Đã hết thời gian đăng nhập, vui lòng đăng nhập lại",
    "正在巡": "Kiểm tra",
    "正在巡检,请勿进行其他操作": "In the inspection, please do not perform other operations",
    "巡检": "Điều tra",
    "路由器离线，请检查路由器状态": "Bộ định tuyến đang ngoại tuyến, vui lòng kiểm tra trạng thái bộ định tuyến",
    "标签巡检": "Kiểm trả thẻ",
    "升级成功": "cập nhập thành công",
    "正在升级": "đang nâng cấp",
    "等待升级": "Chờ nâng cấp",
    "升级失败": "Nâng cấp không thành công",
    "没有可用路由器": "Không có bộ định tuyến",
    "请选择文件": "Vui lòng chọn một file",
    "扫描枪升级": "Nâng cấp máy quét",
    "扫描枪名称": "Tên máy quét",
    "当前硬件版本号": "Số phiên bản phần cứng hiện tại",
    "当前软件版本号": "Số phiên bản phần mềm hiện tại",
    "升级状态": "Trạng thái nâng cấp",
    "软件版本号": "Số phiên bản phần mềm",
    "硬件版本号": "Số phiên bản phần cứng",
    "出厂批次": "Lô nhà máy",
    "生产商": "Nhà sản xuất",
    "扫描枪状态": "Tình trạng quét",
    "扫描枪地址": "Địa chỉ máy quét",
    "扫描枪详情": "Thông tin chi tiết máy quét",
    "确认": "xác nhận",
    "是否删除扫描枪？": "Có nên xóa máy quét hay không?",
    "正在设置周期": "Thiết lập chu kỳ",
    "秒": "Hai",
    "路由器离线，请检查路由器状态": "Bộ định tuyến đang ngoại tuyến, vui lòng kiểm tra trạng thái bộ định tuyến",
    "绑定店铺失败": "Không liên kết được cửa hàng",
    "恢复出厂设置": "Thiết lập lại",
    "确认恢复出厂设置": "Xác nhận khôi phục cài đặt gốc",
    "设置": "Nài đặt",
    "功率": "Nguồn",
    "频率": "Tần số",
    "休眠时间": "Thời gian ngủ",
    "唤醒时间": "Thời gian thức dậy",
    "接收波特率": "Nhận được tốc độ truyền",
    "发送波特率": "Gửi tốc độ truyền",
    "433参数设置": "Cài đặt tham số 433",
    "路由器升级": "Nâng cấp bộ định tuyến",
    "路由器名称": "Tên bộ định tuyến",
    "路由器设置": "Cài đặt bộ định tuyến",
    "路由器地址": "Địa chỉ bộ định tuyến",
    "路由器ip地址": "Địa chỉ IP bộ định tuyến",
    "路由器端口": "Cổng bộ định tuyến",
    "路由器状态": "Trạng thái bộ định tuyến",
    "升级状态": "Trạng thái nâng cấp",
    "路由器序列号": "số seris bộ định tuyến",
    "长周期": "Chu kỳ dài",
    "短周期": "Chu kỳ ngắn",
    "确认删除路由器": "Xác nhận xóa bộ định tuyến",
    "推荐": "khuyên dùng",
    // "  ":"",
    // "  ":"",
    // "  ":"",
    // "  ":"",
}

// 日语
var languageJP = {
    "序号": "番号付け",
    "桌牌地址": "テーブルの住所",
    "所属AP": "所属AP",
    "电池电量": "バッテリ残量",
    "绑定状态": "結合状態",
    "标签状态": "ラベルの状態",
    "桌牌信息": "テーブルの情報",
    "样式名称": "スタイル名",
    "桌牌地址": "テーブルの住所",
    "操作": "操作",
    "显示信息": "メッセージを表示",
    "AP地址": "APアドレス",
    "AP_IP": "AP_IP",
    "所属公司": "所属会社",
    "状态": "状態",
    "描述": "説明",
    "会议名称": "会議の名前",
    "会议室": "会議室",
    "开始时间": "開始時間",
    "结束时间": "終了時間",
    "模板": "テンプレート",
    "桌牌数量": "テーブルの数",
    "尺寸": "サイズ",
    "创建时间": "作成時間",
    "修改密码": "パスワードを変更",
    "退出": "終了",
    "首页": "最初のページ",
    "会议管理": "会議の管理",
    "设备管理": "設備管理",
    "我的桌牌": "私のテーブルプレート",
    "我的AP": "私のAP",
    "系统设置": "システム設定",
    "模板管理": "テンプレート管理",
    "帮助文档": "ヘルプドキュメント",
    "修改会议内容": "変更",
    "修改标牌内容": "変更",
    "查询": "クエリー",
    "选择模板": "テンプレートを選択",
    "保存": "保存",
    "添加桌牌": "テーブルプレートを追加",
    "移除桌牌": "テーブルプレートを削除",
    "刷新桌牌数据": "テーブルのデータを更新",
    "导出桌牌表格": "テーブルの表をエクスポート",
    "导入桌牌表格": "テーブルカードのインポート",
    "模板类型": "テンプレートのタイプ",
    "7.5寸黑白红": "7.5インチ白黒赤",
    "7.5寸黑白": "7.5寸の白黒",
    "4.2寸黑白红": "4.2インチ白黒赤",
    "4.2寸黑白": "4.2寸の白黒",
    "TFT屏": "TFTパネル",
    "会议时间": "会議の時間",
    "添加会议": "会議を追加",
    "保存": "保存",
    "尾页": "最後のページ",
    "导入": "インポート",
    "导出": "エクスポート",
    "关闭": "閉じる"
}

// 韩语
var languageKR = {
    "序号": "??",
    "桌牌地址": "??? ??",
    "所属AP": "??AP",
    "电池电量": "??? ??",
    "绑定状态": "?? ??",
    "标签状态": "ESL? ??",
    "桌牌信息": "??? ??",
    "操作": "??",
    "样式名称": "??? ??",
    "显示信息": "?? ??",
    "AP地址": "AP??",
    "AP_IP": "AP_IP",
    "所属公司": "?? ??",
    "状态": "??",
    "描述": "??",
    "会议名称": "?? ??",
    "会议室": "???",
    "开始时间": "????",
    "结束时间": "????",
    "模板": "???",
    "桌牌数量": "??? ??",
    "尺寸": "???",
    "创建时间": "?? ??",
    "修改密码": "???? ??",
    "退出": "??",
    "首页": "?????",
    "会议管理": "?? ??",
    "设备管理": "?? ??",
    "我的桌牌": "?? ??? ??",
    "我的AP": "?? AP",
    "系统设置": "??? ??",
    "模板管理": "??? ??",
    "帮助文档": "??? ??",
    "修改会议内容": "?? ?? ??",
    "修改标牌内容": "ESL? ?? ??",
    "查询": "??",
    "选择模板": "??? ??",
    "保存": "??",
    "添加桌牌": "??? ??",
    "移除桌牌": "??? ??",
    "刷新桌牌数据": "ESL? ??",
    "导出桌牌表格": "?? ?? ????",
    "导入桌牌表格": "?? ?? ????",
    "模板类型": "??? ??",
    "模板类型：": "??? ??：",
    "7.5寸黑白红": "7.5?? ???",
    "7.5寸黑白": "7.5?? ??",
    "4.2寸黑白红": "4.2?? ???",
    "4.2寸黑白": "4.2?? ??",
    "TFT屏": "TFT?????",
    "会议时间": "?? ??",
    "添加会议": "?? ??",
    "保存": "??",
    "尾页": "??? ???",
    "导入": "????",
    "导出": "????",
    "关闭": "??",
    "选择": "??",
    "共": " ? ",
    "页": " ??? ",
    "取消": "??",
    "正在更新": "???? ???",
    "等待更新": "???? ???",
    "更新失败": "???? ??",
    "更新完成": "???? ??",
    "未更新": "???? ???",
    "保存模板": "??? ??",
    "预览": "????",
    "添加字段": "?? ??",
    "字段名：": "?? ??：",
    "预览内容：": "?? ????：",
    "字段类型：": "?? ??：",
    "文本": "???",
    "图片": "???",
    "二维码": "QR??",
    "条形码": "???",
    "确定": "??",
    "上传背景": "?? ???",
    "图片名称：": "?? ??",
    "背景名称：": "?? ??:",
    "上传背景：": "?? ???：",
    "上传图片：": "?? ???：",
    "*暂不支持中文名称": "*??? ??? ???? ????.",
    "宽度": "??",
    "高度": "??",
    "宽度：": "??:",
    "高度：": "??:",
    "上传背景：": "??? ??：",
    "红色图片：": "?? ??：",
    "勾选": "?? ??",
    "项目名字": "???? ??",
    "预览字段": "???? ??",
    "数据源表名": "??? ?? ??? ??",
    "数据源列名": "??? ?? ? ??",
    "模板名称": "?? ?? ??",
    "屏幕类型": "?? ??",
    "背景": "??",
    "上传图片": "?? ???",
    "地址：": "?? ：",
    "代码：": "code ：",
    "隐藏": "???",
    "属性": "??",
    "基本设置": "?? ??",
    "选择图片": "?? ??",
    "更多设置": "?? ??",
    "前缀": "???",
    "后缀": "???",
    "字体大小": "?? ??",
    "加粗": "??",
    "字体颜色": "?? ?",
    "黑": "black",
    "白": "??",
    "红": "???",
    "背景颜色": "???",
    "字体": "??",
    "宋体": "?? ???",
    "黑体": "blackbody",
    "微软雅 黑": "microsoft YaHei",
    "楷体": "?? ????",
    "仿宋": "?? ??",
    "华文楷 体": "??? ????",
    "新宋体": "nSimSun",
    "等线": "??? ?? ? ???",
    "对齐": "??",
    "靠左": "??",
    "居中": "center",
    "靠右": "???",
    "边框粗细": "??? ??",
    "模态框（??） 标题": "?? ??",
    "在这里添加 一些文本": "??? ???? ??????",
    "模板属性": "?? ?? ??",
    "接口代码": "????? ??",
    "文本预览": "??? ????",
    "选择模板类型：": "??? ??? ??????:",
    "添加模板": "??? ??",
    "添加字体": "?? ??",
    "在线": "???",
    "离线": "????",
    "升级": "?????",
    "删除样式": "??? ??",
    "是否删除样式": "???? ?? ??????",
    "确认": "?",
    "取消": "???",
    "图片名称": "?????",
    "黑白图片": "?????",
    "红色图片": "?????",
    "选择文件": "????",
    "未选择任何图片": "??? ??? ????",
    "信息": "??",
    "请求过程失败": "?? ??",
    "网络通讯异常，请检查路由器状态！": "???? ??? ??????. ??? ??? ??????.",
    "数据编辑异常，请编辑后更新": "??? ??? ??? ????. ?? ?? ?? ? ???? ????.",
    "路由器离线": "??? ????",
    "路由器已离线": "??? ????",
    "标签不能为空": " ESL? ?? ?????. ??????.",
    "正在进行空中唤醒，请勿进行其他操作": "ESL ?? ????. ??? ??? ??????.",
    "正在唤醒 ": "?? ????.",
    "剩余时间": "????",
    "秒": "?",
    "请编辑后更新": "?? ?? ?? ? ???? ????.",
    "标签巡检": "ESL ??",
    "正在巡检，请勿进行其他操作": "?? ?. ??? ??? ??????.",
    "巡检": "??",
    "周期设置": "?? ??",
    "唤醒周期": "?? ??",
    "超时时间": "?? ??",
    "设置": "??",
    "推荐": "??",
    "不小于": "?? ???",
    "删除": "??"
}