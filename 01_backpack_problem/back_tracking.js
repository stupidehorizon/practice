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

/** 背包最大限制重量 */
const limitedWeight = 6;

/** 全局变量用来所有的组合中最大的价值 */
let maxValue = 0;

/** 回溯算法 */
const backtracking = (i, curWeight, curValue) => {
  /** 终止条件所有物品装完了，或者背包装满了 */
  if(i === Items.length || curWeight === limitedWeight) {
    if(curValue > maxValue) {
      maxValue = curValue;
    }
    return;
  }

  /** 不装第 i 个物品 */
  backtracking(i+1, curWeight, curValue);
  /** 装第 i 个物品 */
  if(curWeight + Items[i].weight <= limitedWeight) {
    backtracking(i+1, curWeight + Items[i].weight, curValue + Items[i].value);
  }
};

backtracking(0, 0, 0);
console.log(maxValue);