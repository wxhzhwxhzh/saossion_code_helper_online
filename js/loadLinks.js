// 使用 async/await 改写代码
async function loadLinks(json_file,elementID) {
    try {
      // Fetch the JSON data
      const response = await fetch(json_file);

      // 解析 JSON 数据
      const data = await response.json();
      console.log(data);

  
      // 获取 ul 元素
      const ul = document.getElementById(elementID);
  
      // 遍历每个链接项并动态添加到页面
      data.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.target = "_blank";  // 新标签页打开链接
        a.textContent = item.text;
  
        li.appendChild(a);
        ul.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading the JSON data:', error);
    }
  }
  
  // 调用异步函数加载链接
  loadLinks('./json/links.json','sao_ul');
  loadLinks('./json/download_links.json','sao_dl_ul');
  