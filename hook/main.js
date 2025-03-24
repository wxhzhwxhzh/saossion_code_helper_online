// 文档加载完成后执行
$(document).ready(function() {
    /* ======================
       代码块复制功能
    ====================== */
    $('pre').each(function() {
        const $pre = $(this);
        // 创建复制按钮
        const $btn = $('<button>', {
            class: 'copy-btn',
            text: '复制代码'
        }).appendTo($pre); // 将按钮插入到pre元素中

        // 点击复制事件处理
        $btn.on('click', function() {
            // 获取代码内容
            const code = $pre.find('code').text();
            
            // 创建临时textarea实现兼容性复制方案
            const $temp = $('<textarea>')
                .val(code)
                .css({
                    position: 'fixed',  // 防止页面滚动
                    left: '-9999px'    // 移出可视区域
                })
                .appendTo('body');

            try {
                // 选择文本（兼容移动端）
                $temp[0].select();
                // 执行复制命令（兼容旧版浏览器）
                const successful = document.execCommand('copy');
                
                // 反馈复制状态
                if (successful) {
                    $btn.text('已复制!');
                    setTimeout(() => $btn.text('复制代码'), 2000);
                } else {
                    console.error('复制失败');
                }
            } catch (err) {
                console.error('复制失败:', err);
            } finally {
                $temp.remove(); // 清理临时元素
            }
        });
    });

    /* ======================
       目录生成模块
    ====================== */
    // 创建侧边栏容器
    const $sidebar = $('<div>', { id: 'toc-sidebar' });
    $('<h3>').text('📚 目录导航').appendTo($sidebar);
    
    // 创建目录列表
    const $tocList = $('<ul>', { class: 'toc-list' }).appendTo($sidebar);

    // 遍历所有标题元素
    $('h1, h2, h3').each(function(index) {
        const $heading = $(this);
        
        // 自动生成唯一锚点ID
        if (!$heading.attr('id')) {
            $heading.attr('id', `heading-${index}-${Math.random().toString(36).substr(2, 5)}`);
        }

        // 创建列表项和链接
        const $listItem = $('<li>');
        const $link = $('<a>', {
            href: `#${$heading.attr('id')}`,
            text: $heading.text()
        });

        // 根据标题级别设置缩进
        switch ($heading.prop('tagName')) {
            case 'H1':
                $listItem.css('margin', '10px 0');  // 一级标题间距
                break;
            case 'H2':
                $listItem.css('padding-left', '20px'); // 二级标题缩进
                break;
            case 'H3':
                $listItem.css('padding-left', '40px'); // 三级标题缩进
                break;
        }

        // 平滑滚动到锚点
        $link.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $heading.offset().top
            }, 500); // 500毫秒滚动动画
        });

        $listItem.append($link);
        $tocList.append($listItem);
    });

    // 将目录插入页面
    $sidebar.appendTo('body');

    /* ======================
       响应式处理
    ====================== */
    $(window).on('resize', function() {
        // 小屏幕隐藏目录
        $sidebar.css('display', $(window).width() < 1024 ? 'none' : 'block');
    }).trigger('resize'); // 初始化时立即执行

    /* ======================
       滚动高亮当前章节
    ====================== */
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100; // 增加偏移量
        
        // 遍历所有标题元素
        $('h1, h2, h3').each(function() {
            const $heading = $(this);
            const elementTop = $heading.offset().top;
            const elementHeight = $heading.outerHeight();

            // 判断当前可见的标题
            if (elementTop <= scrollPos && (elementTop + elementHeight) > scrollPos) {
                // 更新激活状态
                $tocList.find('a').removeClass('active');
                $tocList.find(`a[href="#${$heading.attr('id')}"]`).addClass('active');
            }
        });
    });
});
