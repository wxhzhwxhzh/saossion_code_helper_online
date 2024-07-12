var code_frame={
    ntp:`
#!/usr/bin/env python
# -*- coding:utf-8 -*-
# pip install  ntplib

import ntplib
import os
from time import ctime
from datetime import datetime
# from loguru import logger

# 获取 NTP 时间
def get_ntp_time():
    client = ntplib.NTPClient()  # 创建 NTP 客户端
    response = client.request('ntp.aliyun.com')  # 请求 NTP 服务器时间
    # 将 NTP 时间转换为 datetime 对象
    return datetime.strptime(ctime(response.tx_time), "%a %b %d %H:%M:%S %Y")

# 格式化时间
def format_time(ntp_time):
    return ntp_time.strftime("%Y-%m-%d %H:%M:%S")

# 获取和格式化 NTP 时间
ntp_time = get_ntp_time()  # 获取 NTP 时间
formatted_time = format_time(ntp_time)  # 格式化时间

print(" NTP 服务器时间:", formatted_time)
# logger.info(f" NTP 服务器时间:{formatted_time}")

# 提取日期和时间
new_date = ntp_time.strftime("%Y-%m-%d")  # 提取日期部分
new_time = ntp_time.strftime("%H:%M:%S")  # 提取时间部分

# 设置系统时间和日期
print(f'设置时间为 {new_time} ')

os.system(f'time {new_time} ')  # 设置系统时间

print(f'设置日期为 {new_date}')
os.system(f'date {new_date}')  # 设置系统日期

input('设置完毕.....')

`,
human_mouse:`

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
`,
get_plugin_list:`
def get_plugin_list(self):
    tab=self.page.new_tab('chrome://extensions/')
    tab.ele('t:body').ele('t:extensions-manager').sr('#toolbar').sr('t:cr-toolbar').ele('t:div').ele('t:cr-toggle').click()

    
    plugin_list=[]
    for plugin  in  tab.ele('t:extensions-manager').sr('#container').ele('t:cr-view-manager').ele('t:extensions-item-list').sr('t:div@@class=items-container').eles('t:extensions-item'):
        ss=plugin.sr('#content').text.split('\\n')[0:4]
        options=f'chrome-extension://{ss[3][3:]}/options.html'

        ss.append(options)

        plugin_list.append(ss)
    return plugin_list  
`,
get_bookmarks_list:`

def get_bookmarks_list(self):
    tab=self.page.new_tab('chrome://bookmarks/')


    bookmarks_list=[]
    for shu_qian  in  tab.ele('t:bookmarks-app').sr('tag:bookmarks-list').sr('#list').eles('tag:bookmarks-item'):
        ss=shu_qian.sr('#website-text').text
    
        bookmarks_list.append(ss)
    return bookmarks_list   
`,
get_json_by_fetch:`
def get_json_by_js_fetch(tab,fetch_code:str):
    if fetch_code.startswith('\\n'):
        fetch_code=fetch_code[1:]
    js_code='''
    async function fetchData() {
        try {
            const response = await fetch_code
            const data = await response.json();// 返回响应对象的json数据
            console.log(data); 

            return data; // 返回数据
        } catch (error) {
            console.error('获取数据时出错:', error);    
            throw error; // 如果有必要，重新抛出错误
        }
    }

    // 调用函数
    return  fetchData();

    '''.replace('fetch_code',fetch_code)

    json_data=tab.run_js(js_code)
    print(json_data)`,
    sr_iframe_tao_wa:`    
#!/usr/bin/env python
# -*- coding:utf-8 -*-

# DrissionPage 库 文档地址  https://drissionpage.cn/

#-导入库
from DrissionPage import ChromiumPage,ChromiumOptions

#-创建配置对象
co=ChromiumOptions()

#-创建浏览器
page = ChromiumPage(addr_or_opts=co)

#-设置文件下载目录 默认是当前目录
page.set.download_path(".")
#-打开网址


tab=page.new_tab('https://eservice.rclgroup.com/CargoTracking/')
aat=tab('t:div@@class=cf-turnstile-wrapper').sr('t:iframe')('t:body').sr('#success-text')
print(aat)


test=input('继续 ?')
  `

}