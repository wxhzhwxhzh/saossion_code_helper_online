document.addEventListener('DOMContentLoaded', () => {
    // 复制功能实现
    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制代码';
        
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code').textContent;
            navigator.clipboard.writeText(code)
                .then(() => {
                    btn.textContent = '已复制!';
                    setTimeout(() => btn.textContent = '复制代码', 2000);
                })
                .catch(err => console.error('复制失败:', err));
        });
        pre.appendChild(btn);
    });

    // 目录生成实现
    const sidebar = document.createElement('div');
    sidebar.id = 'toc-sidebar';
    
    const title = document.createElement('h3');
    title.textContent = '📚 目录导航';
    sidebar.appendChild(title);

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    let lastH1 = null;
    document.querySelectorAll('h1, h2, h3').forEach((heading, index) => {
        // 自动生成锚点
        if(!heading.id) {
            heading.id = `heading-${index}-${Math.random().toString(36).substr(2, 5)}`;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        // 层级缩进
        switch(heading.tagName) {
            case 'H1':
                listItem.style.margin = '10px 0';
                break;
            case 'H2':
                listItem.style.paddingLeft = '20px';
                break;
            case 'H3':
                listItem.style.paddingLeft = '40px';
                break;
        }

        // 平滑滚动
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    sidebar.appendChild(tocList);
    document.body.appendChild(sidebar);

    // 响应式处理
    window.addEventListener('resize', () => {
        sidebar.style.display = window.innerWidth < 1024 ? 'none' : 'block';
    });

    // 高亮当前章节
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            const { top, height } = heading.getBoundingClientRect();
            const elementTop = top + window.scrollY;
            
            if (elementTop <= scrollPos && (elementTop + height) > scrollPos) {
                const activeLink = tocList.querySelector(`a[href="#${heading.id}"]`);
                tocList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                activeLink.classList.add('active');
            }
        });
    });
});
