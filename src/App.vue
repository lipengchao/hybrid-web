<template>
  <div id="app">
    <!--
      页面跳转的状态保存：
      1、所有的组件中数据都会被保存下来
      2、需要在组件中创建一个变量(会被keepAlive保存起来)，通过这个变量来记录当前页面一个状态
      3、当后退回该组件的时候，使用这个变量来改变当前页面的一个滑动距离
          (1)应该在什么时机去改变当前页面的滑动距离
          (2)在组件的activated(keep-alive组件被激活时调用)方法中去指定页面滑动模块的滑动距离
     -->
    <transition :name="transitionName">
      <!-- 所有通过router-view加载的组件都会被缓存 -->
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: '',
      // 虚拟任务栈
      virtualTaskStack: ['Main']
    }
  },
  watch: {
    // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
    $route (to, from) {
      if (to.meta.index > from.meta.index) {
        // 当进入新页面的时候，保存新页面名称到虚拟任务栈
        this.virtualTaskStack.push(to.name)
        // 跳转动画
        this.transitionName = 'fold-left'
      } else {
        // 执行后退操作的时候,把最后一个页面从任务栈中弹出
        this.virtualTaskStack.pop()
        // 后退动画
        this.transitionName = 'fold-right'
      }
      // 当接收到清空任务栈指令的时候，重置虚拟任务栈
      if (to.params.clearTask) {
        this.virtualTaskStack = ['Main']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  // push页面时：新页面的进入动画
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .4s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0)
    }
  }
  // push页面时：原页面的退出动画
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: .4s;
  }
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0)
    }
  }
  // 后退页面时：即将展示页面的动画
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: .4s;
  }
  @keyframes fold-right-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0)
    }
  }
  // 后退页面时：后退页面的动画
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: .4s;
  }
  @keyframes fold-right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0)
    }
  }
}
</style>
