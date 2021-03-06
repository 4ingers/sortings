import '@styles/Collection.css';
import Item from '@components/Item';

const Collection = ({ collection }) => {
  return (
    //TODO: Серега уронил тут, пошагово выполняя `insertion`
    <div className='container'>
      {collection.map(({ value, color }) => (
        <Item
          value={value}
          size={collection.length}
          color={color}
          key={value}
        />
      ))}
    </div>
  );
};

export default Collection;
