window.code0=`
`;
window.code16=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0


from DrissionPage import Chromium,ChromiumOptions
from  loguru import logger

options=ChromiumOptions()

# 连接浏览器并获取浏览器对象
browser = Chromium(options)  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://spa1.scrape.center/')


tab.console.start()

# 一条日志信息
# logger.info(tab.console.wait().text)

js_code='''
console.log(window.location.href);
'''

tab.run_js(js_code)

logger.info(tab.console.wait().text)


# 所有日志信息
for data  in  tab.console.messages:
    logger.info(data.text)


fetch_code=r'''fetch("https://spa1.scrape.center/api/movie/?limit=10&offset=0", {
  "referrer": "https://spa1.scrape.center/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
'''

#立即调用的箭头函数形式
response_code='''
(async ()=>{
    var res = await fetch_code

    let data = await res.text();
    console.log(data);
})()
'''.replace('fetch_code',fetch_code)

tab.run_js(response_code)

tab.wait(3)
logger.info(tab.console.wait().text)




input('请按回车键继续')

`;
window.code15=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
 

from DrissionPage import Chromium, ChromiumOptions
import threading
import concurrent.futures
import time
import queue
from loguru import logger

# 创建一个队列用于存储标签页对象
标签页队列= queue.Queue()

# 启动浏览器并获取标签页对象
co = ChromiumOptions()
browser = Chromium(co)

tab_instance = browser.new_tab('https://www.bigee.cc/book/20233/')

# 获取所有章节链接


链接列表=[i.link   for i in  tab_instance('t:div@@class=listmain').eles('t:a')   if 'book' in i.link]
# 链接列表=链接列表[:15]
print(链接列表)


def 打开网页(url):
    if url is None:
        return
    t = browser.new_tab(url)
    标签页队列.put(t)    
    logger.info(f'{t.title} 该网页已经打开')
    time.sleep(2)

def 采集网页数据():
    while True:
        t = 标签页队列.get()
        if t is None: # 如果获取的消息为None，则退出循环
            break
        logger.error(t.ele('#chaptercontent').text[:15])        
        threading.Thread(target=t.close).start()
        
        logger.warning(f'{t.title} 已经完成抓取...')
    print('数据采集完成')    




采集线程数=6

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor1,   concurrent.futures.ThreadPoolExecutor(max_workers=采集线程数) as executor2:
    
    # 提交任务到网页打开线程池
    pool1 =  [executor1.submit(打开网页, chapter_url)   for  chapter_url in  链接列表]  

    time.sleep(1)

    # 提交任务到第网页数据采集线程池
    pool2 =  [executor2.submit(采集网页数据)   for  i in  range(采集线程数)]

    # 等待线程池1所有任务完成
    concurrent.futures.wait(pool1)

    # 批量添加结束标记，通知线程池2关闭
    [标签页队列.put(None)   for _ in range(采集线程数)]

  


    

input('按任意键退出.......') 
`;
window.code14=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0


import time
from DrissionPage import Chromium
from loguru import logger

# 设置日志记录到文件
logger.add("JD_comment.log", format="{time} {message}")

# 初始化浏览器
browser = Chromium()

# 打开京东首页
main_tab = browser.new_tab('https://www.jd.com/')

# 获取搜索框并输入关键词
search_input = main_tab.ele('tag:input@@id=key')
search_input.input('小米手机')

# 点击搜索按钮
main_tab('tag:button@@aria-label=搜索').click()

# 获取搜索结果列表
search_results = main_tab.eles('t:li@@class=gl-item')

# 打印每个搜索结果的文本
# for result in search_results:
#     logger.info(result)

# 点击搜索结果中的第二个商品以打开商品详情页
product_detail_tab = search_results[1].ele('t:a').click.for_new_tab()
# 点击评论标签页
product_detail_tab.ele('@data-anchor=#comment').click()

# 获取并打印商品评论
def get_comments(tab):
    for comment in tab.eles('t:div@@class=comment-item'):
        # logger.info(comment)
        
        logger.info(comment('.comment-con').text)  # 记录评论内容
        if recomment:=comment.ele('.recomment',timeout=2):
            logger.error(recomment.text)
        
        time.sleep(2)

# 获取第一页评论并点击下一页
get_comments(product_detail_tab)
product_detail_tab.ele('t:a@@rel=2').click()

# 循环获取剩余页码的评论
for _ in range(4):
    get_comments(product_detail_tab)
    product_detail_tab.ele('下一页').click()`;
window.code13=`

#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0

# datarecorder 库使用文档 https://drissionpage.cn/DataRecorderDocs/usage/introduction/

import asyncio
from DrissionPage import Chromium
from DataRecorder import Recorder
from loguru import logger

# 定义异步采集方法
async def collect(tab, recorder, title, page=1):

    # 遍历所有标题元素
    for i in tab.eles('.title project-namespace-path'):
        # 获取某页所有库名称，记录到记录器
        recorder.add_data((title, i.text, page))
        logger.info((title, i.text, page))
        
    # 获取下一页按钮
    btn = tab('@rel=next', timeout=2)
    # 如果有下一页，点击翻页并递归调用自身
    if btn:
        btn.click(by_js=True)
        await asyncio.sleep(1)  # 异步等待
        # 增加页数并递归调用
        await collect(tab, recorder, title, page + 1)

# 主函数
async def main():
    # 新建浏览器对象
    browser = Chromium()

    # 第一个标签页访问网址
    tab1=browser.new_tab('https://gitee.com/explore/ai')
    # 新建一个标签页并访问另一个网址，返回其对象
    tab2 = browser.new_tab('https://gitee.com/explore/machine-learning')

    # 新建记录器对象
    recorder = Recorder('data.csv')

    # 创建异步任务
    task1 = asyncio.create_task(collect(tab1, recorder, 'ai'))
    task2 = asyncio.create_task(collect(tab2, recorder, '机器学习'))

    # 等待任务完成
    await task1
    await task2

    print("所有任务完成")
    recorder.record()

# 运行主函数
if __name__ == '__main__':
    asyncio.run(main())`;

window.code12=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0


from DrissionPage import Chromium,ChromiumOptions

options=ChromiumOptions().add_extension(r'C:\Users\Administrator\Desktop\插件\Proxy SwitchyOmega 2.5.21')    # 插件下载  https://www.crxsoso.com/

# 连接浏览器并获取浏览器对象
browser = Chromium(options)  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://www.baidu.com/')



tab.wait(3)
插件url='chrome-extension://padekgcemlokbadohgkifijomclgjgif/options.html'

tab.get(插件url)

tab.ele(' 通用').click()
tab.ele('新建情景模式…').click()
tab.ele('PAC情景模式').click()



input('请按回车键继续')`;
window.code11=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0
from DrissionPage import Chromium, ChromiumOptions
from pprint import pprint
import threading
import concurrent.futures

# 设置Chromium浏览器选项，使用系统用户路径
co = ChromiumOptions().use_system_user_path()

# 连接浏览器并获取浏览器对象
browser = Chromium(co)

# 获取标签页对象并打开目标网址
tab_instance = browser.new_tab('https://xiaoaojianghu.chibaba.cn/')

# XPath定位到章节列表的无序列表
chapters_xpath = 'x:/html/body/div[2]/div[3]/div[1]/ul'
chapter_dict = {}

# 从网页中提取章节标题和链接
for chapter in tab_instance(chapters_xpath).eles('t:a@@rel=nofollow'):
    chapter_dict[chapter.text] = chapter.link

# 打印提取到的章节字典
pprint(chapter_dict)
list_chapter = list(chapter_dict.keys())



def fetch_and_save_chapter(chapter_title, chapter_url):
    
    new_tab = browser.new_tab(chapter_url)  # 打开章节链接
    chapter_content = new_tab('@id=TextContent').text  # 获取章节内容
    print(chapter_content)

    print(f"正在下载笑傲江湖 {chapter_title}")
    tab_instance.wait(1)
    
    # 将章节内容写入文件
    with open(f'./笑傲江湖_{chapter_title}.txt', 'w', encoding='utf-8') as file:
        file.write(chapter_content)
       
    # threading.Thread(target=new_tab.close).start()  # 关闭新标签页
    new_tab.close()
    
#- 单线程


# for aa in  list_chapter:
#     fetch_and_save_chapter(aa, chapter_dict[aa])


#- 多线程

def main():
    # 创建一个线程池，最多允许 4 个线程同时运行
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        # 提交多个任务到线程池
        futures = [executor.submit(fetch_and_save_chapter, chapter_title, chapter_url) 
                   for chapter_title, chapter_url in chapter_dict.items()]

if __name__ == "__main__":
    main()
    input("按下回车键退出")

          
`;


window.code10=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0


from DrissionPage import Chromium,ChromiumOptions
from pprint import pprint

options=ChromiumOptions()

# 连接浏览器并获取浏览器对象
browser = Chromium(options) 

tab=browser.latest_tab
tab.listen.start('spa1.scrape.center/api/movie')  # 开始监听，指定获取包含该文本的数据包,    注意：要先开启监听再打开对应的页面

tab.get('https://spa1.scrape.center/')  # 访问网址，这行产生的数据包不监听




for packet in tab.listen.steps():
    pprint(packet.response.body)  # 打印数据包url
   
  



input('请按回车键继续')
`;
window.code9=`
#!/usr/bin/env python
# -*- coding:utf-8 -*-# 

# 骚神DP教学
# 电脑内需要提取安装谷歌浏览器或者其他chromium内核的浏览器  比如 edge浏览器  qq浏览器  360浏览器
# Drissionpage官网  http://drissionpage.cn/
# Drissionpage 版本需要大于等于 4.1.0.0


from DrissionPage import Chromium,ChromiumOptions

options=ChromiumOptions().use_system_user_path()

# 连接浏览器并获取浏览器对象
browser = Chromium(options)  

# 获取标签页对象并打开网址
tab = browser.new_tab('https://dun.163.com/trial/sense')

tab.wait(1)
tab.ele('可疑用户-滑动拼图').click()

tab.ele('点击完成验证').click()


滑块_xpath='x:/html/body/main/div[1]/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/div[2]/div[3]/div/div/div[2]/div/div/div[2]/div[2]'
滑块=tab.ele(滑块_xpath)

平移距离=676-526  # 计算滑块平移距离
tab.actions.move_to(滑块).hold(滑块).move(offset_x=平移距离,offset_y=4,duration=2.5).release()  # 执行滑动操作

input('请按回车键继续')
`;
window.code8=`

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
tab = browser.new_tab('https://baidu.com/')

AI助手元素=tab.ele('@id=csaitab')

print(AI助手元素.text)
print(AI助手元素.link)
print(AI助手元素.attr("class"))
print(AI助手元素.html)


print(AI助手元素.rect.viewport_midpoint)# 视口坐标
print(AI助手元素.rect.screen_location)  # 屏幕坐标


baidu_logo = tab.ele('@id=s_lg_img')  
baidu_logo.save(name='baidu_logo')  # 保存图片元素到当前目录下


input('Press any key to quit')  



`;
window.code7=`
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
tab = browser.new_tab('https://ahrefs.com/backlink-checker/?input=baidu.com&mode=subdomains')


xpath ='x://*[@id="root"]/div[1]/section[1]/div/div/div/div/div/div[2]/div[2]/div[2]/form/div[1]/div/div'

div元素=tab.ele(xpath)
print(div元素)




input('Press any key to quit')  

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