function copyCode(cc) {
    const textArea = document.createElement('textarea');
    textArea.value = cc.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

}

function addNewSection(h2_title, code_str, section_id) {
    // 目录创建
    let mulu=document.querySelector('#mulu');
    let a=document.createElement('a');
    a.href='#'+section_id;
    a.textContent=h2_title;

    let mulu_li=document.createElement('li');
    mulu_li.appendChild(a);
    mulu.appendChild(mulu_li);

    



//    内容创建
    const main = document.querySelector('.content');
    const newSection = document.createElement('section');
    newSection.id = section_id;

    const h2 = document.createElement('h2');
    h2.textContent = h2_title;

    const codeContainer = document.createElement('div');
    codeContainer.classList.add('code-container');

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.id = 'codeBlock';
    code.textContent = code_str;

    pre.appendChild(code);
    codeContainer.appendChild(pre);

    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-btn');
    copyButton.textContent = '复制代码';
    copyButton.addEventListener('click', ()=>{copyCode(code);
        copyButton.textContent = '已复制';

        setTimeout(()=>{
            copyButton.textContent = '复制代码';
        },1500)
    })

    codeContainer.appendChild(copyButton);
    newSection.appendChild(h2);
    newSection.appendChild(codeContainer);
    main.appendChild(newSection);
}

addNewSection('第一课 控制浏览器', window.code1,'section1');
addNewSection('第二课 浏览器启动配置', window.code2,'section2');
addNewSection('第三课 操作标签页', window.code3,'section3');
addNewSection('第四课 元素定位之普通定位', window.code4,'section4');
addNewSection('第五课 元素定位之ifram定位', window.code5,'section5');
addNewSection('第六课 元素定位之shadow root 定位', window.code6,'section6');
addNewSection('第七课 元素定位之 xpath 定位', window.code7,'section7');
addNewSection('第八课 获取元素信息', window.code8,'section8');
addNewSection('第九课 鼠标操作之操作验证码', window.code9,'section9');
addNewSection('第十课 数据监听和抓包', window.code10,'section10');
addNewSection('第11课 多线程操作标签页', window.code11,'section11');
addNewSection('第12课 DP加载插件并控制插件小窗', window.code12,'section12');
addNewSection('第13课 异步操作浏览器标签页', window.code13,'section13');
addNewSection('第14课 批量抓取某东商品评论', window.code14,'section14');
addNewSection('第15课 线程池+消息队列 采集网页数据', window.code15,'section15');
addNewSection('第16课 DP监听浏览器console数据和异步函数返回值抓包', window.code16,'section16');
