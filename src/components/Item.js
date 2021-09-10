import '@styles/Item.css'

const Item = ({value, size, color}) => {
  const blue = 120 + (value * (100 / size));
  const backgroundColor = {
    'default': `rgb(100, 100, ${blue})`,
    'current': 'cyan',
    'sorted': '#d6af00',
    'swap': 'white',
  }[color]

  return (
    <div className='item'>
      <div 
        className='data'
        style={{
          backgroundColor,
          height: Math.floor(value / size * 100) + '%'
        }}
      />
    </div>
  )
}

export default Item;