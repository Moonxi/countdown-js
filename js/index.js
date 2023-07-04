;(function () {
  // 倒计时结束日期
  var overDateStr = prompt('请输入倒计时结束日期(格式:2024-01-01 00:00:00)')
  var over = new Date(overDateStr)
  // 定时器
  var timer = null
  // 数字图片路径数组
  var numberImages = [
    './images/0.png',
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
    './images/5.png',
    './images/6.png',
    './images/7.png',
    './images/8.png',
    './images/9.png'
  ]
  // 获取需要操作的dom元素
  var countdownHourLeft = document.querySelector('.countdown-hour-left')
  var countdownMinuteLeft = document.querySelector('.countdown-minute-left')
  var countdownSecondLeft = document.querySelector('.countdown-second-left')
  var countdownHourRight = document.querySelector('.countdown-hour-right')
  var countdownMinuteRight = document.querySelector('.countdown-minute-right')
  var countdownSecondRight = document.querySelector('.countdown-second-right')
  var init = function () {
    // 初始化时分秒倒计时数字图片
    for (var i = numberImages.length; i >= 0; i--) {
      var img = document.createElement('img')
      img.src = i < numberImages.length ? numberImages[i] : numberImages[0]
      countdownHourLeft.children[0].append(img.cloneNode(true))
      if (i > 5) {
        var imgZero = document.createElement('img')
        imgZero.src = numberImages[0]
        countdownMinuteLeft.children[0].append(imgZero.cloneNode(true))
        countdownSecondLeft.children[0].append(imgZero.cloneNode(true))
      } else {
        countdownMinuteLeft.children[0].append(img.cloneNode(true))
        countdownSecondLeft.children[0].append(img.cloneNode(true))
      }
      countdownHourRight.children[0].append(img.cloneNode(true))
      countdownMinuteRight.children[0].append(img.cloneNode(true))
      countdownSecondRight.children[0].append(img.cloneNode(true))
    }
    initEvents()
    setCorrectTime()
    if (!timer) {
      timer = setInterval(setCorrectTime, 1000)
    }
  }
  // 事件处理函数
  var eventHandlers = {
    /**
     * 无缝滚动
     * @param {Event} e
     * @this {HTMLElement}
     */
    makeSuccessive(e) {
      if (this.getAttribute('status') == 0) {
        this.style.transition = 'none'
        if (
          this.parentElement === countdownMinuteLeft ||
          this.parentElement === countdownSecondLeft
        ) {
          this.style.top =
            '-' +
            (numberImages.length - 6) * this.parentElement.clientHeight +
            'px'
        } else {
          this.style.top = '0'
        }
      }
    }
  }
  // 初始化事件函数
  function initEvents() {
    countdownSecondRight.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
    countdownMinuteRight.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
    countdownHourRight.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
    countdownSecondLeft.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
    countdownMinuteLeft.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
    countdownHourLeft.children[0].addEventListener(
      'transitionend',
      eventHandlers.makeSuccessive
    )
  }

  // 设置显示正确时间的函数
  function setCorrectTime() {
    var now = new Date()
    // 剩余时间
    var remainTime = over.valueOf() - now.valueOf()
    if (remainTime <= 0) {
      clearInterval(timer)
      timer = null
      return
    }
    // 小时
    var hour = Math.floor(remainTime / 1000 / 60 / 60)
      .toString()
      .padStart(2, '0')
    // 分钟
    var minute = Math.floor((remainTime / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0')
    // 秒
    var second = Math.floor((remainTime / 1000) % 60)
      .toString()
      .padStart(2, '0')
    setTimeImage.call(countdownSecondRight, second[1])
    setTimeImage.call(countdownMinuteRight, minute[1])
    setTimeImage.call(countdownHourRight, hour[1])
    setTimeImage.call(countdownSecondLeft, second[0])
    setTimeImage.call(countdownMinuteLeft, minute[0])
    setTimeImage.call(countdownHourLeft, hour[0])
  }
  // 设置对应时间图片的函数
  /**
   *
   * @param {string|number} index
   * @this {HTMLElement}
   */
  function setTimeImage(index) {
    if (this.children[0].getAttribute('status') == 0 && index == 0) {
      return
    }
    if (
      !this.children[0].style.transition ||
      this.children[0].style.transition == 'none 0s ease 0s'
    ) {
      this.children[0].style.transition = 'all 0.3s linear'
    }
    this.children[0].style.top =
      '-' + (numberImages.length - index) * this.clientHeight + 'px'
    this.children[0].setAttribute('status', index)
  }
  init()
})()
