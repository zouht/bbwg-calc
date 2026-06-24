const spec = [
  {name:"专精1",hammer:10,orange:0,num:1},
  {name:"专精2",hammer:10,orange:0,num:2},
  {name:"专精3",hammer:10,orange:0,num:3},
  {name:"专精4",hammer:10,orange:0,num:4},
  {name:"专精5",hammer:10,orange:0,num:5},
  {name:"专精6",hammer:60,orange:0,num:6},
  {name:"专精7",hammer:70,orange:0,num:7},
  {name:"专精8",hammer:80,orange:0,num:8},
  {name:"专精9",hammer:90,orange:0,num:9},
  {name:"专精10",hammer:100,orange:0,num:10},
  {name:"专精11",hammer:110,orange:1,num:11},
  {name:"专精12",hammer:120,orange:2,num:12},
  {name:"专精13",hammer:130,orange:3,num:13},
  {name:"专精14",hammer:140,orange:4,num:14},
  {name:"专精15",hammer:150,orange:5,num:15},
  {name:"专精16",hammer:160,orange:6,num:16},
  {name:"专精17",hammer:170,orange:7,num:17},
  {name:"专精18",hammer:180,orange:8,num:18},
  {name:"专精19",hammer:190,orange:9,num:19},
  {name:"专精20",hammer:200,orange:10,num:20}
]
const cast = [
  {name:"熔铸1级",silver:0,orange:2,need:10,num:1},
  {name:"熔铸20级",silver:10,orange:3,need:11,num:20},
  {name:"熔铸40级",silver:20,orange:5,need:12,num:40},
  {name:"熔铸60级",silver:30,orange:5,need:13,num:60},
  {name:"熔铸80级",silver:40,orange:10,need:14,num:80},
  {name:"熔铸100级",silver:50,orange:10,need:15,num:100}
]
const all = spec.map(i => ({...i, type:"spec"})).concat(cast.map(i => ({...i, type:"cast"})))

function weight(i) {
  return i.type == "spec" ? i.num : 1000 + i.num
}

Page({
  data: {
    levelNames: all.map(d => d.name),
    currIndex: 0,
    targetIndex: 1,
    errorMsg: '',
    showResult: false,
    rHammer: 0, rSilver: 0, rOrange: 0,
    rDetail: ''
  },

  onCurrChange(e) {
    this.setData({ currIndex: e.detail.value })
  },

  onTargetChange(e) {
    this.setData({ targetIndex: e.detail.value })
  },

  onCalc() {
    const c = all[this.data.currIndex]
    const t = all[this.data.targetIndex]

    if (weight(t) <= weight(c)) {
      this.setData({ errorMsg: '❌ 目标等级不能低于当前等级', showResult: false })
      return
    }

    let h = 0, s = 0, o = 0
    const cSpec = c.type == "spec" ? c.num : c.need
    const tSpec = t.type == "spec" ? t.num : t.need
    const log = []

    for (let i = cSpec + 1; i <= tSpec; i++) {
      const sp = spec.find(x => x.num == i)
      h += sp.hammer
      o += sp.orange
      log.push(sp.name)
    }

    if (t.type == "cast") {
      const cNum = c.type == "cast" ? c.num : 0
      cast.filter(x => x.num > cNum && x.num <= t.num).forEach(x => {
        s += x.silver
        o += x.orange
        log.push(x.name)
      })
    }

    this.setData({
      errorMsg: '',
      showResult: true,
      rHammer: h,
      rSilver: s,
      rOrange: o,
      rDetail: '升级：' + log.join(' → ')
    })
  },

  onShareAppMessage() {
    return {
      title: '英雄装备升级材料计算器',
      path: '/pages/yxzb/yxzb'
    }
  }
})
