const gemData = [
  { level: 1, name: "1级宝石", book: 5, draw: 5 },
  { level: 2, name: "2级宝石", book: 40, draw: 15 },
  { level: 3, name: "3级宝石", book: 60, draw: 40 },
  { level: 4, name: "4级宝石", book: 80, draw: 100 },
  { level: 5, name: "5级宝石", book: 100, draw: 200 },
  { level: 6, name: "6级宝石", book: 120, draw: 300 },
  { level: 7, name: "7级宝石", book: 140, draw: 400 },
  { level: 8, name: "8级宝石", book: 200, draw: 400 },
  { level: 9, name: "9级宝石", book: 300, draw: 400 },
  { level: 10, name: "10级宝石", book: 420, draw: 420 },
  { level: 11, name: "11级宝石", book: 560, draw: 420 },
  { level: 12, name: "12级宝石", book: 580, draw: 600 },
  { level: 13, name: "13级宝石", book: 610, draw: 780 },
  { level: 14, name: "14级宝石", book: 645, draw: 960 },
  { level: 15, name: "15级宝石", book: 685, draw: 1140 },
  { level: 16, name: "16级宝石", book: 730, draw: 1320 },
  { level: 17, name: "17级宝石", book: 780, draw: 1500 },
  { level: 18, name: "18级宝石", book: 835, draw: 1680 },
  { level: 19, name: "19级宝石", book: 895, draw: 1860 },
  { level: 20, name: "20级宝石", book: 960, draw: 2040 },
  { level: 21, name: "21级宝石", book: 1030, draw: 2220 },
  { level: 22, name: "22级宝石", book: 1105, draw: 2400 }
]

Page({
  data: {
    levelNames: gemData.map(d => d.name),
    currIndex: 0,
    targetIndex: 1,
    errorMsg: '',
    showResult: false,
    resBook: 0,
    resDraw: 0,
    upgradeDetail: ''
  },

  onCurrChange(e) {
    this.setData({ currIndex: parseInt(e.detail.value, 10) })
  },

  onTargetChange(e) {
    this.setData({ targetIndex: parseInt(e.detail.value, 10) })
  },

  onCalc() {
    const currIdx = parseInt(this.data.currIndex, 10)
    const tarIdx = parseInt(this.data.targetIndex, 10)
    const curr = gemData[currIdx]
    const tar = gemData[tarIdx]

    if (!curr || !tar) {
      this.setData({ errorMsg: '❌ 请选择有效的等级', showResult: false })
      return
    }

    if (tar.level <= curr.level) {
      this.setData({ errorMsg: '❌ 目标等级不能低于或等于当前等级', showResult: false })
      return
    }

    let totalBook = 0, totalDraw = 0, stepList = []
    for (let lv = curr.level + 1; lv <= tar.level; lv++) {
      const row = gemData.find(d => d.level === lv)
      totalBook += row.book
      totalDraw += row.draw
      stepList.push(row.name)
    }

    this.setData({
      errorMsg: '',
      showResult: true,
      resBook: totalBook,
      resDraw: totalDraw,
      upgradeDetail: '升级路径：' + stepList.join(' → ')
    })
  },

  onShareAppMessage() {
    return {
      title: '宝石等级计算器',
      path: '/pages/bs/bs'
    }
  }
})
