export function shuffle(arr) {
  return [...arr].reduceRight(
    (res, _, __, s) => (
      res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res
    ),
    []
  );
}

export function swapValues(arr, i, j) {
  const tmp = arr[i].value;
  arr[i].value = arr[j].value;
  arr[j].value = tmp;
}

export function setColor(arr, color, ...indices) {
  if (indices.length !== 0) indices.forEach((i) => (arr[i].color = color));
  else arr.forEach((item) => (item.color = color), arr);
}
