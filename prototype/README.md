# 233 乐园社区原型

这是一个使用 HTML 和 TailwindCSS 开发的 233 乐园社区发现页面原型。

## 功能特点

- 发现页瀑布流布局，两列自适应内容布局
- 上拉加载更多和下拉刷新功能
- 支持不同 URL 参数展示不同内容(`type=default`, `type=featured`, `type=games`)
- 支持视频内容播放
- 适配移动端 iPhone 15 Pro 尺寸
- 包含帖子详情页和创建帖子页面的原型

## 如何使用

直接打开 `index.html` 文件查看所有原型页面:

1. 发现页(默认内容)
2. 发现页(精选内容)
3. 发现页(游戏内容)
4. 帖子详情页
5. 创建帖子页

## 实现要求对照

- ✅ 实现上拉加载和下拉刷新
- ✅ 瀑布流效果，两列布局随内容自适应错开
- ✅ 使用 mock 数据模拟图文/视频内容
- ✅ 适配移动端屏幕
- ✅ 内容区域的视频可播放
- ✅ 提供多个不同的 URL 参数数据
  - discovery.html?type=default
  - discovery.html?type=featured
  - discovery.html?type=games

## 技术栈

- HTML5
- TailwindCSS (通过 CDN)
- TDesign 设计风格
- Remix Icon 图标库
