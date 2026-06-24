Page({
  data: {
    hours: 12,
    minutes: 35,
    minutesDisplay: '35',
    resultDisplay: '— : — —',
    formulaDetail: '公式: 24 - ((H + M/60) × 3 - 24)'
  },

  pad2(v) {
    return (v < 10 ? '0' : '') + v
  },

  onHoursInput(e) {
    let v = parseInt(e.detail.value) || 0
    v = Math.min(23, Math.max(0, v))
    this.setData({ hours: v })
  },

  onMinutesInput(e) {
    const raw = e.detail.value
    if (raw === '') {
      this.setData({ minutesDisplay: '', minutes: 0 })
      return
    }
    let v = parseInt(raw, 10)
    if (isNaN(v)) return
    const clamped = Math.min(59, Math.max(0, v))
    this.setData({
      minutes: clamped,
      minutesDisplay: clamped !== v ? String(clamped) : raw
    })
  },

  onMinutesBlur() {
    const v = Math.min(59, Math.max(0, this.data.minutes))
    this.setData({ minutes: v, minutesDisplay: this.pad2(v) })
  },

  onQuick(e) {
    const h = parseInt(e.currentTarget.dataset.hours)
    const m = parseInt(e.currentTarget.dataset.mins)
    this.setData({ hours: h, minutes: m, minutesDisplay: this.pad2(m) })
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

    const isNextDay = totalHours >= 24
    const displayHrs = Math.floor(totalHours % 24)
    let displayMins = Math.round((totalHours * 60) % 60)
    if (displayMins >= 60) displayMins = 0
    const minsStr = this.pad2(displayMins)

    const timeStr = displayHrs + ':' + minsStr
    const dayPrefix = isNextDay ? '前一天 ' : '当天 '
    const resultDisplay = dayPrefix + timeStr + ' ⏳'

    const singleFixed = singleDuration.toFixed(4)
    const finalVal = totalHours.toFixed(4)
    const singleTimeStr = hours + ':' + this.pad2(minutes)

    this.setData({
      resultDisplay,
      formulaDetail: '📐 单次=' + singleTimeStr + ' → ' + singleFixed + 'h · 24-((' + singleFixed + '×3)-24) = ' + finalVal + ' 小时'
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
