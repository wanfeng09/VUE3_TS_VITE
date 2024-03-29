# 一级标题 --- md文件基础学习

<https://www.runoob.com/markdown/md-tutorial.html>

## 二级标题

(###### 六级标题 不起作用注意空格的使用)
> 这是一段引用 有竖线

有序列表

1. a
2. b

无序列表 -/ *

- a
- a

多选框

- [ ] 吃饭
- [x] b

代码块

```js
init main(){
    reutrn n
}
```

数学公式
$$
\frac{\partial f}{\partial x} = 2\sqrt{a}x
$$

表格
|姓名|年龄|成绩|
|:---|---:|:---:|
|a|19|100|
|b|20|90|

脚注
a[^b]
[^b]:   跳转到的位置【文档最底部】

横线

---
hahah

---

链接
[baidu](baidu.com "提示文字")

引用链接【等同上方，多次引用可以方便更改】
[baidu][id]

[id]: baidu.com "提示"

锚点 需注意文字等同

请参考[锚点](#二级标题)

url：
<https://www.baidu.com>

图片
![百度](https://www.baidu.com/img/pcdoodle_2a77789e1a67227122be09c5be16fe46.png "图片提示")

*斜体*
**加粗**
编写行内代码
`print()`
表情符号 表情官网 <https://unicode.org/emoji/charts/full-emoji-list.html>
:smile:
行内数学公式 $\theta=x^2$
下标、上标 H~2~O X^2^
==高亮==

> Markdown 中使用内联的 HTML，特别是不允许在 Markdown 文件中直接嵌入某些 HTML 元素，比如 <u>（下划线）/ iframe

<u>下划线</u>

嵌入视频
选择分享视频的嵌入代码粘贴【部分支持】

<iframe src="//player.bilibili.com/player.html?aid=327623069&bvid=BV1JA411h7Gw&cid=171385214&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
