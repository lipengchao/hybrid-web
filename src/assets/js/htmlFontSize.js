// 定义最大的fontSize
const MAX_FONT_SIZE = 42

// 监听html文档被解析完成事件
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  // 获取根元素fontSize标准
  let fontSize = window.innerWidth / 10
  // 获取到的fontSize不允许超过最大值
  fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素(html) fontSize的大小
  html.style.fontSize = fontSize + 'px'
})
