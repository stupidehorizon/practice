
/** 物品列表 */
const Items = [
  {
    weight: 1,
    value: 2,
  },
  {
    weight: 2,
    value: 4,
  },
  {
    weight: 3,
    value: 2,
  },
  {
    weight: 4,
    value: 3,
  },
  {
    weight: 4,
    value: 3,
  },

];

/** 动态规划算法 */
const dynamicPlanning = (items, limitedWeight) => {
  /** 物品个数 */
  const len = items.length;
  /** 构建状态数组 */
  const status = Array.from({length: len}, () => Array.from({length: limitedWeight + 1}, () => -1));
  /** 初始化状态 */
  status[0][0] = 0;
  if(items[0].weight <= limitedWeight) {
    status[0][items[0].weight] = items[0].value;
  }
  for(let i = 1; i < len; i++) {
    /** 不装第 i 个物品 */
    for(let j = 0; j < limitedWeight + 1; j++) {
      if(status[i-1][j] >= 0) {
        status[i][j] = status[i-1][j];
      }
    }
    /** 装第 i 个物品 */
    for(let j = 0; j <= limitedWeight - items[i].weight; j++) {
      if(status[i-1][j] >= 0) {
        status[i][j + items[i].weight] = status[i-1][j] + items[i].value;
      }
    }
  }
  /** 最大的 value 值就是数组最后一行的最大值 */
  return Math.max(...status.map(arr => Math.max(...arr)));
}
  /** 不装第 i 个物品 */
  const maxValue = dynamicPlanning(Items, 6);
  console.log(maxValue); // 8
