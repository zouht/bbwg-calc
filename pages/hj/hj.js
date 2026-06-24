const goldData = {
  "城镇中心": {"30-1":132,"30-2":132,"30-3":132,"30-4":132,"黄金1":132,"黄金1-1":158,"黄金1-2":158,"黄金1-3":158,"黄金1-4":158,"黄金2":158,"黄金2-1":238,"黄金2-2":238,"黄金2-3":238,"黄金2-4":238,"黄金3":238,"黄金3-1":280,"黄金3-2":280,"黄金3-3":280,"黄金3-4":280,"黄金4":280,"黄金4-1":335,"黄金4-2":335,"黄金4-3":335,"黄金4-4":335,"黄金5":335},
  "使馆": {"30-1":33,"30-2":33,"30-3":33,"30-4":33,"黄金1":33,"黄金1-1":39,"黄金1-2":39,"黄金1-3":39,"黄金1-4":39,"黄金2":39,"黄金2-1":59,"黄金2-2":59,"黄金2-3":59,"黄金2-4":59,"黄金3":59,"黄金3-1":70,"黄金3-2":70,"黄金3-3":70,"黄金3-4":70,"黄金4":70,"黄金4-1":83,"黄金4-2":83,"黄金4-3":83,"黄金4-4":83,"黄金5":83},
  "步兵营": {"30-1":59,"30-2":59,"30-3":59,"30-4":59,"黄金1":59,"黄金1-1":71,"黄金1-2":71,"黄金1-3":71,"黄金1-4":71,"黄金2":71,"黄金2-1":107,"黄金2-2":107,"黄金2-3":107,"黄金2-4":107,"黄金3":107,"黄金3-1":126,"黄金3-2":126,"黄金3-3":126,"黄金3-4":126,"黄金4":126,"黄金4-1":150,"黄金4-2":150,"黄金4-3":150,"黄金4-4":150,"黄金5":150},
  "骑兵营": {"30-1":59,"30-2":59,"30-3":59,"30-4":59,"黄金1":59,"黄金1-1":71,"黄金1-2":71,"黄金1-3":71,"黄金1-4":71,"黄金2":71,"黄金2-1":107,"黄金2-2":107,"黄金2-3":107,"黄金2-4":107,"黄金3":107,"黄金3-1":126,"黄金3-2":126,"黄金3-3":126,"黄金3-4":126,"黄金4":126,"黄金4-1":150,"黄金4-2":150,"黄金4-3":150,"黄金4-4":150,"黄金5":150},
  "弓兵营": {"30-1":59,"30-2":59,"30-3":59,"30-4":59,"黄金1":59,"黄金1-1":71,"黄金1-2":71,"黄金1-3":71,"黄金1-4":71,"黄金2":71,"黄金2-1":107,"黄金2-2":107,"黄金2-3":107,"黄金2-4":107,"黄金3":107,"黄金3-1":126,"黄金3-2":126,"黄金3-3":126,"黄金3-4":126,"黄金4":126,"黄金4-1":150,"黄金4-2":150,"黄金4-3":150,"黄金4-4":150,"黄金5":150},
  "战争学院": {"30-1":0,"30-2":0,"30-3":0,"30-4":0,"黄金1":0,"黄金1-1":71,"黄金1-2":71,"黄金1-3":71,"黄金1-4":71,"黄金2":71,"黄金2-1":107,"黄金2-2":107,"黄金2-3":107,"黄金2-4":107,"黄金3":107,"黄金3-1":126,"黄金3-2":126,"黄金3-3":126,"黄金3-4":126,"黄金4":126,"黄金4-1":150,"黄金4-2":150,"黄金4-3":150,"黄金4-4":150,"黄金5":150},
  "野战医院": {"30-1":26,"30-2":26,"30-3":26,"30-4":26,"黄金1":26,"黄金1-1":31,"黄金1-2":31,"黄金1-3":31,"黄金1-4":31,"黄金2":31,"黄金2-1":47,"黄金2-2":47,"黄金2-3":47,"黄金2-4":47,"黄金3":47,"黄金3-1":56,"黄金3-2":56,"黄金3-3":56,"黄金3-4":56,"黄金4":56,"黄金4-1":67,"黄金4-2":67,"黄金4-3":67,"黄金4-4":67,"黄金5":67},
  "指挥部": {"30-1":26,"30-2":26,"30-3":26,"30-4":26,"黄金1":26,"黄金1-1":31,"黄金1-2":31,"黄金1-3":31,"黄金1-4":31,"黄金2":31,"黄金2-1":47,"黄金2-2":47,"黄金2-3":47,"黄金2-4":47,"黄金3":47,"黄金3-1":56,"黄金3-2":56,"黄金3-3":56,"黄金3-4":56,"黄金4":56,"黄金4-1":67,"黄金4-2":67,"黄金4-3":67,"黄金4-4":67,"黄金5":67}
}

const levelList = [
  "30-1","30-2","30-3","30-4","黄金1",
  "黄金1-1","黄金1-2","黄金1-3","黄金1-4","黄金2",
  "黄金2-1","黄金2-2","黄金2-3","黄金2-4","黄金3",
  "黄金3-1","黄金3-2","黄金3-3","黄金3-4","黄金4",
  "黄金4-1","黄金4-2","黄金4-3","黄金4-4","黄金5"
]

const buildingNames = ["城镇中心","使馆","步兵营","骑兵营","弓兵营","战争学院","野战医院","指挥部"]

function initBuildings() {
  return buildingNames.map(name => ({
    name,
    currIndex: 0,
    tarIndex: 0,
    result: 0
  }))
}

Page({
  data: {
    levelList: levelList,
    buildings: initBuildings(),
    errorMsg: '',
    showResult: false,
    resTotal: 0
  },

  onCurrChange(e) {
    const idx = e.currentTarget.dataset.idx
    const val = parseInt(e.detail.value)
    const key = `buildings[${idx}].currIndex`
    this.setData({ [key]: val })
  },

  onTarChange(e) {
    const idx = e.currentTarget.dataset.idx
    const val = parseInt(e.detail.value)
    const key = `buildings[${idx}].tarIndex`
    this.setData({ [key]: val })
  },

  calcBuildingConsume(buildName, currLvl, targetLvl) {
    const currIndex = levelList.indexOf(currLvl)
    const targetIndex = levelList.indexOf(targetLvl)
    if (targetIndex < currIndex) return -1
    if (targetIndex === currIndex) return 0
    let sumGold = 0
    for (let i = currIndex + 1; i <= targetIndex; i++) {
      sumGold += goldData[buildName][levelList[i]]
    }
    return sumGold
  },

  onCalc() {
    const buildings = this.data.buildings
    let totalAllGold = 0
    let errorMsg = ''
    const updates = []

    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i]
      const curr = levelList[b.currIndex]
      const tar = levelList[b.tarIndex]
      const gold = this.calcBuildingConsume(b.name, curr, tar)

      if (gold === -1) {
        errorMsg = '❌ ' + b.name + '：目标等级不能低于当前等级'
        break
      }
      updates.push({ key: `buildings[${i}].result`, val: gold })
      totalAllGold += gold
    }

    if (errorMsg) {
      this.setData({ errorMsg, showResult: false })
      return
    }

    const obj = { errorMsg: '', showResult: true, resTotal: totalAllGold }
    updates.forEach(u => { obj[u.key] = u.val })
    this.setData(obj)
  },

  onReset() {
    this.setData({
      buildings: initBuildings(),
      errorMsg: '',
      showResult: false,
      resTotal: 0
    })
  },

  onShareAppMessage() {
    return {
      title: '黄金消耗计算器',
      path: '/pages/hj/hj'
    }
  }
})
