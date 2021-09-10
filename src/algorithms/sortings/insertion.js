import { setColor } from '@algorithms/misc';

function* insertion(arr) {
  setColor(arr, 'sorted', 0);

  for (let i = 1; i < arr.length; i++) {
    setColor(arr, 'current', i);
    yield [...arr];

    if (arr[i - 1].value > arr[i].value) {
      setColor(arr, 'swap', i);
      yield [...arr];
      
      for (let j = 0; j < i; j++) {
        setColor(arr, 'current', j);
        yield [...arr];
        setColor(arr, 'sorted', j);
        
        if (arr[j].value > arr[i].value) {
          setColor(arr, 'swap', j);
          yield [...arr];
          
          const item = arr.splice(i, 1)[0];
          arr.splice(j, 0, item);
          
          setColor(arr, 'sorted', j, j + 1);
          break;
        }
      }
    }
    else {
      setColor(arr, 'sorted', i);
    }
    yield [...arr];
  }
  setColor(arr, 'default');
  yield [...arr];
  return;
}

export { insertion };
