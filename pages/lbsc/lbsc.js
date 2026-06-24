Page({
  data: {
    hours: 12,
    minutes: 35,
    minutesDisplay: '35',
    targetDate: '',
    resultDisplay: '',
    totalDurationText: ''
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

  onDateChange(e) {
    this.setData({ targetDate: e.detail.value })
  },

  onQuick(e) {
    const h = parseInt(e.currentTarget.dataset.hours)
    const m = parseInt(e.currentTarget.dataset.mins)
    this.setData({ hours: h, minutes: m, minutesDisplay: this.pad2(m) })
  },

  onCalc() {
    const { hours, minutes, targetDate } = this.data

    if (!targetDate) {
      wx.showToast({ title: '请先选择截止日期', icon: 'none' })
      return
    }

    // 总练兵时长 = 单次时长 × 3
    const singleDuration = hours + minutes / 60.0
    const totalHours = singleDuration * 3

    // 截止日期设为当天 00:00:00
    const parts = targetDate.split('-')
    const endDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]), 0, 0, 0)

    // 开始时间 = 截止时间 - 总练兵时长
    const totalMs = totalHours * 60 * 60 * 1000
    const startDate = new Date(endDate.getTime() - totalMs)

    // 格式化输出
    const yyyy = startDate.getFullYear()
    const MM = this.pad2(startDate.getMonth() + 1)
    const dd = this.pad2(startDate.getDate())
    const hh = this.pad2(startDate.getHours())
    const mm = this.pad2(startDate.getMinutes())

    const totalH = Math.floor(totalHours)
    const totalM = Math.round((totalHours - totalH) * 60)
    const durationText = totalH + '小时' + (totalM > 0 ? totalM + '分钟' : '')

    this.setData({
      resultDisplay: yyyy + '-' + MM + '-' + dd + '  ' + hh + ':' + mm,
      totalDurationText: durationText
    })
  },

  onShareAppMessage() {
    return {
      title: '练兵扩容时长计算器',
      path: '/pages/lbsc/lbsc'
    }
  }
})

