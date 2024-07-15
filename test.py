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
tab=page.new_tab('https://drissionpage.cn/')
#启动网址

test=input('继续 ?')

def bypass_cf(tab: ChromiumTab):
    # 查找页面上是否存在类名为 'cf-turnstile-wrapper' 的元素，并设置超时时间为 10 秒
    if i := tab('.cf-turnstile-wrapper', timeout=10):    
        # 等待 3 秒
        tab.wait(3)
        # 在找到的元素中查找 iframe 标签，并在该 iframe 中查找 body 标签，然后查找类型为 checkbox 的元素
        e = i.sr('t:iframe')('t:body').sr('@type=checkbox')
        # 点击找到的 checkbox 元素
        e.click()
    else:
        print('没检测到Cloudflare 页面,跳过...')
        pass    