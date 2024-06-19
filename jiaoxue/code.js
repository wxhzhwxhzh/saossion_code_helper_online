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
`

}