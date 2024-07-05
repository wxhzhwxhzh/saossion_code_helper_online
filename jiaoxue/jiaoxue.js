var hook_cookie_code=`
(function() {
    // 严谨模式 检查所有错误
    'use strict';
    // document 为要hook的对象 这里是hook的cookie
 var cookieTemp = "";
    Object.defineProperty(document, 'cookie', {
  // hook set方法也就是赋值的方法 
  set: function(val) {
    console.log('Hook捕获到cookie设置->', val);
                debugger;
    cookieTemp = val;
    return val;
  },
  // hook get 方法也就是取值的方法 
  get: function()
  {
   return cookieTemp;
  }
    });
})();
`

window.init_browser=`
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

window.duoxianchengbiaoqianye=`
from threading import Thread

from DrissionPage import ChromiumPage
from DataRecorder import Recorder


def collect(tab, recorder, title):
    """用于采集的方法
    :param tab: ChromiumTab 对象
    :param recorder: Recorder 记录器对象
    :param title: 类别标题
    :return: None
    """
    num = 1  # 当前采集页数
    while True:
        # 遍历所有标题元素
        for i in tab.eles('.title project-namespace-path'):
            # 获取某页所有库名称，记录到记录器
            recorder.add_data((title, i.text, num))

        # 如果有下一页，点击翻页
        btn = tab('@rel=next', timeout=2)
        if btn:
            btn.click(by_js=True)
            tab.wait.load_start()
            num += 1

        # 否则，采集完毕
        else:
            break


def main():
    # 新建页面对象
    page = ChromiumPage()
    # 第一个标签页访问网址
    page.get('https://gitee.com/explore/ai')
    # 获取第一个标签页对象
    tab1 = page.get_tab()
    # 新建一个标签页并访问另一个网址
    tab2 = page.new_tab('https://gitee.com/explore/machine-learning')
    # 获取第二个标签页对象
    tab2 = page.get_tab(tab2)

    # 新建记录器对象
    recorder = Recorder('data.csv')

    # 多线程同时处理多个页面
    Thread(target=collect, args=(tab1, recorder, 'ai')).start()
    Thread(target=collect, args=(tab2, recorder, '机器学习')).start()


if __name__ == '__main__':
    main()
    `

window.yibu_digui_biaoqianye=`
import asyncio
from DrissionPage import ChromiumPage
from DataRecorder import Recorder


async def collect_data(tab, recorder,title, num=1):
      
    # 遍历所有标题元素
    for i in tab.eles('.title project-namespace-path'):
        # 获取某页所有库名称，记录到记录器
        recorder.add_data((title, i.text,title, num))

    # 查找下一页按钮
    btn = tab('@rel=next', timeout=2)
    if btn:
        # 如果有下一页，点击翻页
        btn.click(by_js=True)
        await asyncio.sleep(0.2)                
        await collect_data(tab, recorder,title, num + 1)

async def main():
    # 新建页面对象
    page = ChromiumPage()
    
    # 获取第一个标签页对象
    tab1 = page.new_tab('https://gitee.com/explore/ai')
    # 新建一个标签页并访问另一个网址
    tab2 = page.new_tab('https://gitee.com/explore/machine-learning')
    # 新建记录器对象
    recorder = Recorder('data.csv')
 
    task1=asyncio.create_task(collect_data(tab1, recorder, 'ai'))
    task2=asyncio.create_task(collect_data(tab2, recorder, '机器学习'))

    await task1
    await task2

if __name__ == '__main__':
    asyncio.run(main())
`    
window.debug_browser=`
"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"  --remote-debugging-port=7878 --remote-allow-origins=*
`
window.jianting_danmu=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-



#-导入库
import time
from DrissionPage import ChromiumPage,ChromiumOptions

#-配置类
class Config:

    url='https://live.douyin.com/318792010779'
    port=7878


#-创建配置对象
co=ChromiumOptions()

#-启动配置
co.set_local_port(Config.port)
co.ignore_certificate_errors(True)

#-创建浏览器
page = ChromiumPage(addr_or_opts=co)
#-创建标签页
tab=page.new_tab()



#-打开网址
tab.get(Config.url)

js_code='''
window.danmu=  new Array();
// 选择目标节点
var targetNode = document.querySelector('.webcast-chatroom___item-offset');


// 配置观察选项
var config = { childList: true, subtree: true, characterData: true };

// 创建一个回调函数来处理变化
var callback = function(mutationsList) {
    for (var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    var currentTime = new Date().toLocaleString();
                    var newText = currentTime + ' - ' + node.textContent; // 在新增的字符串前加上实时的日期时间
                    console.log('New text added: ', newText);
                    window.danmu.push(newText);
                } else {
                    var currentTime = new Date().toLocaleString();
                    var newText = currentTime + ' - ' + (node.innerText || node.textContent); // 在新增的字符串前加上实时的日期时间
                    console.log('New element added with text: ', newText);
                    window.danmu.push(newText);
                }
            });
        } else if (mutation.type === 'characterData') {
            var currentTime = new Date().toLocaleString();
            var newText = currentTime + ' - ' + mutation.target.data; // 在新增的字符串前加上实时的日期时间
            console.log('Character data changed: ', newText);
            window.danmu.push(newText);
        }
    }
};

// 创建一个MutationObserver实例并传入回调函数
var observer = new MutationObserver(callback);

// 开始观察目标节点
observer.observe(targetNode, config);

// 停止观察（如有需要）
// observer.disconnect();

'''

tab.wait(5)
tab.run_js(js_code)


# global danmu_list
danmu_list=tab.run_js( 'return window.danmu')


#每过3秒就打印出弹幕列表里新增的内容
while True:
    time.sleep(3)
    old_danmu_list=danmu_list
    danmu_list=tab.run_js( 'return window.danmu')
    old_len=len(old_danmu_list)
    new_len=len(danmu_list)
    if new_len>old_len:
        for item in  range(new_len-old_len):
            print(danmu_list[old_len+item])




`
window.human_mouse=`
import autoit
import time

# 打开记事本
autoit.run("notepad.exe")

# 等待记事本窗口打开
autoit.win_wait_active("[CLASS:Notepad]")

# 获取当前时间
current_time = time.strftime("%Y-%m-%d %H:%M:%S")
print(current_time)

# 输入当前时间到记事本
autoit.send(current_time)

# 等待一段时间，以便查看结果
time.sleep(20)

# 关闭记事本
autoit.win_close("[CLASS:Notepad]")
`


function update_code(code){
    document.getElementById('wenben').value='生成中..';
    setTimeout(() => {
        document.getElementById('wenben').value=code;        
    }, 500);
}

update_code(window.init_browser);

document.getElementById("ua").addEventListener("change", function() {
    var selectedValue = this.value;
    switch (selectedValue) {
        case "1":
            console.log("启动接管浏览器");
            update_code(window.init_browser);
            break;
        case "2":
            console.log("异步递归操作标签页");
            update_code(window.yibu_digui_biaoqianye);
            break;
        case "3":
            console.log("多线程操作标签页");
            update_code(window.duoxianchengbiaoqianye);
            break;
        case "4":
            console.log("模拟键盘操作");
            update_code(window.debug_browser);
            break;
        
        case "5":
            
            console.log("Hook Cookie");
            update_code(hook_cookie_code);
            break;
        case "6":
            console.log("弹幕");
            update_code(window.jianting_danmu)
            break;
        case "7":
            console.log("人类鼠标模拟");
            update_code(code_frame.human_mouse)
            break;
        case "8":
            console.log("ntp");
            update_code(code_frame.ntp);
            break;
        case "9":
            console.log("插件信息");
            update_code(code_frame.get_plugin_list);
            break;
        case "10":
            console.log("书签信息");
            update_code(code_frame.get_bookmarks_list);
            break;
        case "11":
            console.log("通过js的fetch获取json数据");
            update_code(code_frame.get_json_by_fetch);
            break;

        default:
            console.log("未识别的选项");
            break;
    }
});





// 首先获取按钮和文本区域的DOM元素
var copyButton = document.getElementById('copy_code');
var textArea = document.getElementById('wenben');

// 给按钮添加点击事件监听器
copyButton.addEventListener('click', function() {
  // 选中文本区域的内容
  textArea.select();
  
  // 执行浏览器的复制命令
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? '成功复制到剪贴板' : '复制失败';
    console.log(msg);
    alert(msg);
    // 这里可以添加更多的交互，比如显示一个提示信息
  } catch (err) {
    console.log('无法复制文本: ', err);
    alert(err);
  }
});