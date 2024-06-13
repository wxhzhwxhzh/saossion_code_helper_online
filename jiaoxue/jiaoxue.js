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
        case "option1":
            console.log("启动接管浏览器");
            update_code(window.init_browser);
            break;
        case "option2":
            console.log("异步递归操作标签页");
            update_code(window.yibu_digui_biaoqianye);
            break;
        case "option3":
            console.log("多线程操作标签页");
            update_code(window.duoxianchengbiaoqianye);
            break;
        case "option4":
            console.log("模拟键盘操作");
            update_code(window.debug_browser);
            break;
        case "option5":
            console.log("小说下载");
            break;
        case "option10":
            // 这里是 option10 的事件处理逻辑
            console.log("Hook Cookie");
            update_code(hook_cookie_code);
            break;
        case "option6":
            console.log("代理设置");
            break;
        case "option7":
            console.log("操作插件");
            break;
        default:
            console.log("未识别的选项");
            break;
    }
});