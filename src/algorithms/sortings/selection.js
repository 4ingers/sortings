import { setColor, swapValues } from '@algorithms/misc';

function* selection(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    setColor(arr, 'swap', min);
    yield [...arr];

    for (let j = i + 1; j < arr.length; j++) {
      setColor(arr, 'current', j);
      yield [...arr];
      if (arr[j].value < arr[min].value) {
        if (min != i)
          setColor(arr, 'default', min);
        min = j;
        setColor(arr, 'swap', min);
        yield [...arr];
      } else setColor(arr, 'default', j);
    }
    yield [...arr];
    if (min != i) {
      swapValues(arr, i, min);
      yield [...arr];
    }
    setColor(arr, 'default', min);
    setColor(arr, 'sorted', i);
  }
  yield [...arr];
  setColor(arr, 'default');
  yield [...arr];
  return;
}

export { selection };
