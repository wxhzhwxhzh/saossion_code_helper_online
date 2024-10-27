window.code0=`
`;
window.code6=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
# 骚神网 https://wxhzhwxhzh.github.io/saossion_code_helper_online/

from DrissionPage import Chromium

# 连接浏览器并获取浏览器对象
browser = Chromium()  

# 获取标签页对象并打开网址

tab = browser.new_tab('https://spiderapi.cn/captcha/turnstile-managed/')


不知名的p=tab.ele('@id=cf-wait')
不知名的div=不知名的p.after(1)
print(不知名的div.html)




iframe_ele=不知名的div.sr("t:iframe")
print(iframe_ele)

`;

window.code5=`

#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
# 骚神网 https://wxhzhwxhzh.github.io/saossion_code_helper_online/

from DrissionPage import Chromium

# 连接浏览器并获取浏览器对象
browser = Chromium()  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://drissionpage.cn/demos/iframe_diff_domain.html')


iframe = tab.get_frame('t:iframe') #最规范
ele = iframe.ele('网易首页')
print(ele)



iframe = tab.ele('t:iframe') #最简洁

ele = iframe('网易首页')
print(ele)



iframe = tab.eles('t:iframe')[0]  # 成功率最高
ele = iframe('网易首页')
print(ele)
`;

window.code1=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0

from DrissionPage import Chromium

# 连接浏览器并获取浏览器对象
browser = Chromium()  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://www.baidu.com')



input('Press any key to quit') 
`;


window.code2=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 
# 骚神DP教学
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
#  骚神网 https://wxhzhwxhzh.github.io/saossion_code_helper_online/

from DrissionPage import Chromium
from DrissionPage import ChromiumOptions


# 创建浏览器启动配置对象
options = ChromiumOptions()
# 配置浏览器启动选项
options.set_browser_path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')  # 设置浏览器路径
options.ignore_certificate_errors() # 忽略证书错误
options.no_imgs()  # 禁用图片
options.headless(False)  # 无头模式
options.set_local_port(9696)  # 设置浏览器debug端口
# 更多配置请参考 http://drissionpage.cn/browser_control/browser_options


# 连接浏览器并获取浏览器对象
browser = Chromium(options) 

# 获取标签页对象并打开网址
tab = browser.new_tab('https://www.baidu.com')



input('Press any key to quit')  

`;

window.code3=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0

from DrissionPage import Chromium

# 连接浏览器并获取浏览器对象
browser = Chromium()  

# 获取标签页对象并打开网址

tab1 = browser.new_tab('https://www.baidu.com')
tab2 = browser.new_tab('https://www.bing.com')
tab3 = browser.latest_tab

print(tab1.title)
print(tab2.title)
print(tab3.title)
print(browser.latest_tab.title)

browser.latest_tab.close()  # 关闭最新的标签页


# 标签页没有Selenium所谓的焦点的概念，多个标签页可以并行操作，所以可以多线程同时打开多个标签页


from concurrent.futures import ThreadPoolExecutor


def open_url(browser,url): 
    
    browser.new_tab(url)

chinese_websites = [
    "https://www.taobao.com",     # 淘宝
    "https://www.tmall.com",      # 天猫
    "https://www.jd.com",          # 京东
]    

# 使用线程池
with ThreadPoolExecutor(max_workers=3) as executor:
    for url in chinese_websites:
        executor.submit(open_url, browser,url)



input('请按任意键继续')
`;
window.code4=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
# 骚神网 https://wxhzhwxhzh.github.io/saossion_code_helper_online/

from DrissionPage import Chromium

# 连接浏览器并获取浏览器对象
browser = Chromium()  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://www.baidu.com')

wenku_button=tab.ele('文库')  #最简单
wenku_button.click()



input_box=tab.ele('@id=kw') #最常用
input_box.input('1234')


search_button=tab.ele('tag:input@@type=submit@@id=su@@value=百度一下')  #最精确
search_button.click()

`;