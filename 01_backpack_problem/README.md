## 01 背包问题

### 问题定义

现在有 n 个物品，每个物品的重量和价值不一样。现在我们往一个最大载重为 w 的背包中装这些物品，如何在保证总重量不超过 w 的的情况下，尽可能试的背包中的物品价值最大。

对于这种问题，物品是不可分割的所以每个物品只有两种状态装或是不装，所以叫 01 背包问题。

### 算法一：回溯算法

由于每个物品都有两种状态，装或者不装。所以一共就会有 2^n 种装法。我们只要穷举出这 2^n 个装法，然后从中找到价值最大的一种就是我们的解。


```js
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
console.log(maxValue); // 8
```

### 算法二: 动态规划

解决 01 问题最佳算法应该就是动态规划了，动态规划相比于回溯算法时间复杂度更低。动态规划的基本思路就是将一个问题拆分为很多步，每一步的状态都基于上一步的能够达到的状态来决定。直接看代码可能更好理解。

```js
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
  /** 不装第 i 个物品, Items 见上面那段代码 */
  const maxValue = dynamicPlanning(Items, 6);
  console.log(maxValue); // 8
```

### 总结

这两个算法其实感觉很像，不过回溯算法是采用穷举发，列出了所有可能。而动态规划则是更具上一步状态来推到下一步的状态。



