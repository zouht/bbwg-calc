const lordData = [
  { name:"良好0星", silk:1500, thread:15, paper:0 },
  { name:"良好1星", silk:3800, thread:40, paper:0 },
  { name:"稀有0星", silk:7000, thread:70, paper:0 },
  { name:"稀有1星", silk:9700, thread:95, paper:0 },
  { name:"稀有2星", silk:1000, thread:10, paper:45 },
  { name:"稀有3星", silk:1000, thread:10, paper:50 },
  { name:"史诗0星", silk:1500, thread:15, paper:60 },
  { name:"史诗1星", silk:1500, thread:15, paper:70 },
  { name:"史诗2星", silk:6500, thread:65, paper:40 },
  { name:"史诗3星", silk:8000, thread:80, paper:50 },
  { name:"史诗1阶0星", silk:10000, thread:95, paper:60 },
  { name:"史诗1阶1星", silk:11000, thread:110, paper:70 },
  { name:"史诗1阶2星", silk:13000, thread:130, paper:85 },
  { name:"史诗1阶3星", silk:15000, thread:160, paper:100 },
  { name:"传说0星", silk:22000, thread:220, paper:40 },
  { name:"传说1星", silk:23000, thread:230, paper:40 },
  { name:"传说2星", silk:25000, thread:250, paper:45 },
  { name:"传说3星", silk:26000, thread:260, paper:45 },
  { name:"传说1阶0星", silk:28000, thread:280, paper:45 },
  { name:"传说1阶1星", silk:30000, thread:300, paper:55 },
  { name:"传说1阶2星", silk:32000, thread:320, paper:55 },
  { name:"传说1阶3星", silk:35000, thread:340, paper:55 },
  { name:"传说2阶0星", silk:38000, thread:360, paper:55 },
  { name:"传说2阶1星", silk:43000, thread:430, paper:75 },
  { name:"传说2阶2星", silk:45000, thread:460, paper:80 },
  { name:"传说2阶3星", silk:48000, thread:500, paper:85 },
  { name:"传说3阶0星", silk:60000, thread:600, paper:120 },
  { name:"传说3阶1星", silk:70000, thread:700, paper:140 },
  { name:"传说3阶2星", silk:80000, thread:800, paper:160 },
  { name:"传说3阶3星", silk:90000, thread:900, paper:180 },
  { name:"神话0星", silk:108000, thread:1080, paper:220 },
  { name:"神话1星", silk:114000, thread:1140, paper:230 },
  { name:"神话2星", silk:121000, thread:1210, paper:240 },
  { name:"神话3星", silk:128000, thread:1280, paper:250 },
  { name:"神话1阶0星", silk:154000, thread:1540, paper:300 },
  { name:"神话1阶1星", silk:163000, thread:1630, paper:320 },
  { name:"神话1阶2星", silk:173000, thread:1730, paper:340 },
  { name:"神话1阶3星", silk:183000, thread:1830, paper:360 },
  { name:"神话2阶0星", silk:220000, thread:2200, paper:430 },
  { name:"神话2阶1星", silk:233000, thread:2330, paper:460 },
  { name:"神话2阶2星", silk:247000, thread:2470, paper:490 },
  { name:"神话2阶3星", silk:262000, thread:2620, paper:520 },
  { name:"神话3阶0星", silk:288000, thread:2880, paper:570 },
  { name:"神话3阶1星", silk:302000, thread:3020, paper:600 },
  { name:"神话3阶2星", silk:317000, thread:3170, paper:630 },
  { name:"神话3阶3星", silk:333000, thread:3330, paper:660 },
  { name:"神话4阶0星", silk:366000, thread:3660, paper:730 },
  { name:"神话4阶1星", silk:384000, thread:3840, paper:770 },
  { name:"神话4阶2星", silk:403000, thread:4030, paper:810 },
  { name:"神话4阶3星", silk:423000, thread:4230, paper:850 },
  { name:"神话5阶0星", silk:465000, thread:4650, paper:940 },
  { name:"神话5阶1星", silk:479000, thread:4790, paper:970 },
  { name:"神话5阶2星", silk:493000, thread:4930, paper:1000 },
  { name:"神话5阶3星", silk:508000, thread:5080, paper:1030 },
  { name:"神话6阶0星", silk:549000, thread:5490, paper:1110 },
  { name:"神话6阶1星", silk:565000, thread:5650, paper:1140 },
  { name:"神话6阶2星", silk:582000, thread:5820, paper:1170 },
  { name:"神话6阶3星", silk:599000, thread:5990, paper:1210 }
]

Page({
  data: {
    levelNames: lordData.map(d => d.name),
    currIndex: 0,
    targetIndex: 1,
    errorMsg: '',
    showResult: false,
    res1: 0, res2: 0, res3: 0,
    upgradeDetail: ''
  },

  onCurrChange(e) {
    this.setData({ currIndex: parseInt(e.detail.value) })
  },

  onTargetChange(e) {
    this.setData({ targetIndex: parseInt(e.detail.value) })
  },

  onCalc() {
    const currIdx = this.data.currIndex
    const tarIdx = this.data.targetIndex

    if (tarIdx <= currIdx) {
      this.setData({ errorMsg: '❌ 目标等级不能低于或等于当前等级', showResult: false })
      return
    }

    let totalSilk = 0, totalThread = 0, totalPaper = 0, stepList = []
    for (let i = currIdx + 1; i <= tarIdx; i++) {
      const item = lordData[i]
      totalSilk += item.silk
      totalThread += item.thread
      totalPaper += item.paper
      stepList.push(item.name)
    }

    this.setData({
      errorMsg: '',
      showResult: true,
      res1: totalSilk,
      res2: totalThread,
      res3: totalPaper,
      upgradeDetail: '升级路径：' + stepList.join(' → ')
    })
  },

  onShareAppMessage() {
    return {
      title: '领主装备等级计算器',
      path: '/pages/lz/lz'
    }
  }
})
