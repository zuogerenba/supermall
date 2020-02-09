# supermarket

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 九.tabControl的吸顶效果

```
9.1 获取到tabControl的offsetTop
  ·必须知道滚动到多少时，开始有吸顶效果,这个时候就需要获取tabControl的offsetTop
  ·但是如果直接在mounted中获取，会漏掉图片的高度，导致不正确
  ·如何获取正确的值？
    ·监听HomeSwiper中img的加载完成
    ·加载完成后，发出事件，在Home中获取正确的值
    ·补充：
      ·为了不让HomeSwiper不发出多次事件，设置isLoad控制发出的次数
    ·注意：
      ·这里控制多次调用和debounce(防抖)的区别：
        ·防抖是让多次图片加载等待至最后一次加载再调用refresh
        ·控制多次发送事件是第一次获取到高度就停止发送事件
9.2 监听滚动，动态改变tabControl的样式
  ·动态改变tabControl出现的两个问题
    ·问题一:tabControl下面的商品会突然上移
    ·问题二:tabControl虽然设置了fixed，但是随着better-scroll一起滚出去了
  ·其他方案解决停留问题
    ·在最上面，多放一份tabControl组件，实现停留效果
    ·当用户滚动到一定位置时上面的tabControl显示出来，下面的消失掉
    ·当用户没达到位置是上面的tabControl隐藏起来


```
