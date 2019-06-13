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