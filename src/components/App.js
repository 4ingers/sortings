import { useEffect, useState } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Dropdown from 'react-dropdown';
import Collection from '@components/Collection';

import Sortings from '@algorithms/sortings';
import { shuffle } from '@algorithms/misc';

import 'react-awesome-button/dist/themes/theme-c137.css';
import 'react-dropdown/style.css';
import '@styles/App.css';

let generator = null;
const sortingMethods = {
  Bubble: Sortings.bubble,
  Insertion: Sortings.insertion,
  Selection: Sortings.selection,
};

function resetPainting(collection) {
  return collection.map((item) => ({
    value: item.value,
    color: 'default',
  }));
}

function App() {
  const [collection, setCollection] = useState(
    [...Array(9)].map((_, i) => ({
      value: i + 1,
      color: 'default',
    }))
  );
  const [sortingMethod, setSortingMethod] = useState('Bubble');
  const [timer, setTimer] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const resetted = resetPainting(collection);
    setCollection(resetted);
    resetGenerator(resetted);
  }, [sortingMethod]);

  function resetGenerator(collection) {
    generator = sortingMethods[sortingMethod](collection);
  }

  function onShuffle() {
    const shuffled = shuffle(resetPainting(collection));
    setCollection(shuffled);
    resetGenerator(shuffled);
  }

  function onPlay() {
    if (!paused && timer) return;
    setPaused(false);
    let currentTimer = setInterval(() => {
      const yielded = generator.next();
      if (!yielded.done) setCollection(yielded.value);
      else {
        clearInterval(currentTimer);
        console.log(currentTimer);
        setTimer(null);
        resetGenerator(collection);
      }
    }, 200);
    setTimer(currentTimer);
  }

  function onStep() {
    const generation = generator.next();
    setCollection(generation.value);
    if (generation.done) resetGenerator(collection);
  }

  function onPause() {
    setPaused(true);
    if (timer) clearInterval(timer);
    setTimer(null);
  }

  function onStop() {
    if (paused) setPaused(false);
    if (timer) clearInterval(timer);
    setTimer(null);
    const repaintedCollection = resetPainting(collection);
    setCollection(repaintedCollection);
    resetGenerator(repaintedCollection);
  }

  function onSortingMethodChanged(option) {
    setSortingMethod(option.value);
  }

  return (
    <div className='App'>
      <Collection collection={collection} />
      <div className='actions-container'>
        <AwesomeButton onPress={onShuffle} disabled={timer != null}>
          SHUFFLE
        </AwesomeButton>
        <AwesomeButton onPress={onStep}>⏭</AwesomeButton>
        <AwesomeButton onPress={onPlay}>▶</AwesomeButton>
        <AwesomeButton onPress={onPause}>⏸</AwesomeButton>
        <AwesomeButton onPress={onStop}>⏹</AwesomeButton>
      </div>
      <div>
        <Dropdown
          className='dropdown'
          controlClassName='dropdown-control'
          arrowClassName='dropdown-arrow'
          menuClassName='dropdown-menu'
          options={Object.keys(sortingMethods)}
          onChange={onSortingMethodChanged}
          value='Bubble'
        />
      </div>
    </div>
  );
}

export default App;
