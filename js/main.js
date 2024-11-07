
var code_frame =`
#!/usr/bin/env python
# -*- coding:utf-8 -*-
#title

# DrissionPage 库 文档地址 http://g1879.gitee.io/drissionpagedocs/

#-导入库
from DrissionPage import ChromiumPage,ChromiumOptions


#-配置类
class Config:    
    UA_android="Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36"
    UA_apple="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"


#-创建配置对象
co=ChromiumOptions()

#-启动配置
#浏览器路径
#端口
#代理地址
#UA
#静音

#-创建浏览器
page = ChromiumPage(addr_or_opts=co)

#-设置文件下载目录 默认是当前目录
page.set.download_path(".")

#cookie
#-打开网址

#启动网址

test=input('继续 ?')
  
`  


var init_ConfigDict = {  
  'title':"#骚神",
  '端口':'',
  '浏览器路径':'',
  '静音':'',
  'UA':'',
  '代理地址':'',
  '启动网址':'page.get("http://gitee.com")',
  'cookie':''

  
};


var resultCode=''

// 创建一个配置字典的对象
var ConfigDict = init_ConfigDict;

//工具函数

function writeToTextarea(character) {
    var textarea = document.getElementById('wenben');
    textarea.value = character;
  }

 function update_resultCode_from(dic){
   resultCode=code_frame;
  for(let k in dic){
    resultCode=resultCode.replace('#'+k,dic[k])
  }
  writeToTextarea(resultCode);

 } 

 

// 初始化 代码生成文本框
if (document.getElementById('wenben').value === '空的') update_resultCode_from(init_ConfigDict) ;


var copyCodeButton = document.getElementById('copy_code');
var textarea = document.getElementById('wenben');


// 监听复制代码按钮
copyCodeButton.addEventListener('click', function() {


    textarea.select();
    document.execCommand('copy');
    alert('代码文本已成功复制到剪贴板--！');
});  

function updateDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2); // 在个位数月份前添加 '0'
  var day = ('0' + now.getDate()).slice(-2); // 在个位数日期前添加 '0'
  var hours = ('0' + now.getHours()).slice(-2); // 在个位数小时前添加 '0'
  var minutes = ('0' + now.getMinutes()).slice(-2); // 在个位数分钟前添加 '0'
  var seconds = ('0' + now.getSeconds()).slice(-2); // 在个位数秒前添加 '0'
  
  var dateTimeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  
  document.getElementById('dateTimeDisplay').innerText = dateTimeString;
}

// 每秒钟更新一次日期和时间
setInterval(updateDateTime, 1000);




// 获取文本框或者输入框的值
function getTextValue(id) {
  var textBoxValue = document.getElementById(id).value;
  return textBoxValue;
}

// 获取复选框的值
function getCheckboxValue(id) {
  var checkbox = document.getElementById(id);
  var checkboxValue = checkbox.checked;
  return checkboxValue;
}

// 获取下拉框的值
function getSelectValue(id) {
  var selectElement = document.getElementById(id);
  var selectedText = selectElement.options[selectElement.selectedIndex].text;
  // var selectValue = select.value;
  return selectedText;
}

function update_config_dict(){
  let duankou=getTextValue('set_port');
  let url=getTextValue('set_url');
  let cookie=getTextValue('set_cookie');
  let  proxy=getTextValue('set_proxy');
  let  ua=getSelectValue('ua')
  let browser=getTextValue('set_browser')

              
  if(duankou.length>0 )ConfigDict['端口']= `co.set_local_port(${duankou})`;            
  if(url.includes('http') ) ConfigDict['启动网址']= `page.get("${url}")`;            
  if(browser.includes('.exe') ) ConfigDict['浏览器路径']= `co.set_browser_path(r"${browser}")`;            
  if(proxy.includes('http') ) ConfigDict['代理地址']= `co.set_proxy("${proxy}")`;            
  if(cookie.includes('=') ) ConfigDict['cookie']= `page.set.cookies(r"${cookie}")`;            
  if(ua.includes('安卓') ) ConfigDict['UA']= `co.set_user_agent(Config.UA_android)`;            
  if(ua.includes('苹果') ) ConfigDict['UA']= `co.set_user_agent(Config.UA_apple)`;            
             
}




//监听 刷新按钮 写入代码框
document.getElementById('shengcheng').addEventListener('click', function () {
  update_config_dict();
  textarea.value='代码重新生成中...';
  setTimeout(() => {
    update_resultCode_from(ConfigDict);
    
  }, 1000);
  
   
  
});  


//监听 show_config按钮 
document.getElementById('show_config').addEventListener('click', function () {
  update_config_dict();
  let info='';
  for( let k in ConfigDict){
    if (k !='code')   info += k+ ": "+ConfigDict[k]+'\n';    

  }
  alert(info);
  
});  

//监听 reset_config按钮 
document.getElementById('reset_config').addEventListener('click', function () {
  // 刷新当前页面
  location.reload();

});  


//添加网址url


function appendLinkToUL(href, textContent) {
  // 创建一个新的 li 元素
  var newLi = document.createElement('li');

  // 创建一个新的 a 元素
  var newA = document.createElement('a');
  newA.href = href;
  newA.target = '_blank'; // 在新窗口打开链接
  newA.textContent = textContent;

  // 将 a 元素添加为 li 元素的子元素
  newLi.appendChild(newA);

  // 获取 ul 元素
  var ul = document.getElementById('sao_ul');

  // 确保 ul 元素存在，然后将新的 li 元素追加到 ul 元素的末尾
  if (ul) {
      ul.appendChild(newLi);
  } else {
      console.error('未找到 id 为 sao_ul 的 ul 元素');
  }
}

// 调用函数，传入相应的参数
appendLinkToUL('https://linux.do/t/topic/9103', '最新gpt网址大全22');
appendLinkToUL('https://curlconverter.com/powershell-webrequest/', 'CURL converter');
appendLinkToUL('https://cuiqingcai.com/', '崔庆才 爬虫博客');
appendLinkToUL('https://scrape.center/', '爬虫 练习场');
appendLinkToUL('https://www.suyin-tools.cn/', '优雅的软件分享站点');
appendLinkToUL('https://python3webspider.cuiqingcai.com/', 'Python3网络爬虫开发实战');
appendLinkToUL('https://blog.haoji.me/chrome-plugin-develop.html', 'Chrome 插件开发指南');
appendLinkToUL('https://github.com/wxhzhwxhzh/Sarasa-Mono-SC-Nerd', '等距更纱黑体 SC');
appendLinkToUL('https://cook.aiursoft.cn/', '程序员做饭指南');
appendLinkToUL('https://spiderapi.cn/pages/js-hook/#hook-setinterval', 'JS_hook 代码大全');



const link_obj = {  
  'DP助手7.9':'https://github.com/wxhzhwxhzh/saossion_code_helper_online/releases/download/7.9/DP_helper_7.9.rar/'

};

for (let key in link_obj) {
  console.log(key + ': ' + link_obj[key]);
  appendLinkToUL(link_obj[key],key);
}

// 动态网站背景切换代码



let img_urls = [];  // 定义全局变量 img_urls

// 定义一个函数来随机选择一个图片 URL
function getRandomImageUrl() {
  if (img_urls.length === 0) {
    console.error('img_urls 尚未加载');
    return '';
  }
  return img_urls[Math.floor(Math.random() * img_urls.length)];
}

// 定义一个函数来设置背景图片
function setBackgroundImage() {
  // 使用过渡效果
  document.body.style.transition = "background-image 1s ease-in-out";  // 1秒的过渡时间，过渡方式为ease-in-out
  document.body.style.backgroundImage = "url('" + getRandomImageUrl() + "')";
}


async function fetchDataAndSetBackground() {
  try {
    const response = await fetch('./js/img_url_list.json');
    if (!response.ok) {
      throw new Error('网络响应不是ok');
    }
    const jsonData = await response.json(); // 解析 JSON
    console.log(jsonData); // 使用读取到的 JSON 数据

    img_urls = [...jsonData.images,...jsonData.mac,...jsonData.animals]; // 使用展开运算符...将两个数组合并为一个数组
    
    // 初始化时设置一次背景图片
    setBackgroundImage();

    // 每隔 5 秒更换一次背景图片
    setInterval(setBackgroundImage, 8000);
  } catch (error) {
    console.error('读取文件时出错:', error);
  }
}

fetchDataAndSetBackground();





