Page({
  data: {
    hours: 12,
    minutes: 35,
    resultDisplay: '— : — —',
    formulaDetail: '公式: 24 - ((H + M/60) × 3 - 24)'
  },

  onHoursInput(e) {
    let v = parseInt(e.detail.value) || 0
    v = Math.min(23, Math.max(0, v))
    this.setData({ hours: v })
  },

  onMinutesInput(e) {
    let v = parseInt(e.detail.value) || 0
    v = Math.min(59, Math.max(0, v))
    this.setData({ minutes: v })
  },

  onQuick(e) {
    const h = parseInt(e.currentTarget.dataset.hours)
    const m = parseInt(e.currentTarget.dataset.mins)
    this.setData({ hours: h, minutes: m })
    this.doCalc(h, m)
  },

  onCalc() {
    this.doCalc(this.data.hours, this.data.minutes)
  },

  doCalc(hours, minutes) {
    const singleDuration = hours + minutes / 60.0
    const innerValue = singleDuration * 3 - 24
    let totalHours = 24 - innerValue
    if (totalHours < 0) totalHours = 0

    const totalMinutesRaw = totalHours * 60
    const totalMin = Math.round(totalMinutesRaw * 100) / 100
    const hrs = Math.floor(totalMin / 60)
    let mins = Math.round(totalMin % 60)
    if (mins >= 60) mins = 0
    const minsStr = mins < 10 ? '0' + mins : '' + mins

    const singleFixed = singleDuration.toFixed(4)
    const triple = (singleDuration * 3).toFixed(4)
    const subtract24 = (singleDuration * 3 - 24).toFixed(4)
    const finalVal = totalHours.toFixed(4)

    this.setData({
      resultDisplay: hrs + ' ： ' + minsStr + ' ⏳',
      formulaDetail: '📐 单次=' + hours + 'h ' + minutes + 'm → ' + singleFixed + 'h · 24-((' + singleFixed + '×3)-24) = ' + finalVal + ' 小时'
    })
  },

  onLoad() {
    this.doCalc(12, 35)
  },

  onShareAppMessage() {
    return {
      title: '练兵扩容时长计算器',
      path: '/pages/lbsc/lbsc'
    }
  }
})
