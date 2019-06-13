## 进出栈问题

今天在网上看见一个问题，发现还很有意思。刚好自己最近学了回溯算法和动态规划，试试能不能用这个思路来解决问题。

### 问题定义

A,B,C,D,E五个元素，按照顺序进栈，进栈是可以出栈，问有几种出栈方式

答案选项如下：
a 41
b 42
c 43
d 44

### 问题分析

这个问题第一眼看起来就和 01 背包问题很像，当栈有元素时，我们有两种选择进栈或出栈。没有元素时则只能进栈，当所有元素都进栈后，任务结束。

### 回溯算法

```js
const items = ['A', 'B', 'C', 'D', 'E'];
let maxCount = 0;
const backTracking = (items, stack) => {
  const itemsLen = items.length;
  const stackLen = stack.length;
  /** 所有元素已入栈，出栈顺序一定了 */
  if(itemsLen === 0) {
    maxCount++;
    return;
  }

  /** 入栈 */
  const tmpItems = [...items];
  const shitfItem = tmpItems.shift();
  backTracking(tmpItems, [...stack, shitfItem]);

  /** 出栈 */
  if(stackLen > 0) {
    const tmpStack = [...stack];
    tmpStack.pop();
    backTracking([...items], tmpStack);
  }
};

backTracking(items, []);
console.log(maxCount); // 42
```

### 结论

一共有 42 种出栈顺序。下次再考虑动态规划应该怎么解。
