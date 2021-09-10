import { swapValues, setColor } from '@algorithms/misc';

function* bubble(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setColor(arr, 'current', j, j + 1);
      yield [...arr];
      if (arr[j].value > arr[j + 1].value) {
        setColor(arr, 'swap', j, j + 1);
        yield [...arr];
        swapValues(arr, j, j + 1);
        yield [...arr];
      }
      setColor(arr, 'default', j, j + 1);
    }
    yield [...arr];
  }
  return [...arr];
}

export { bubble };