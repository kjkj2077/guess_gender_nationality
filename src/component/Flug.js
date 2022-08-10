
export const Flug = ({item}) => {
  const flagImg=`https://countryflagsapi.com/png/${item.country_id} `
  return (
    <div className='app'>
       <img  className='flug' src={flagImg}/>
       <h1>{item.country_id}</h1>
       <h1> {(item.probability * 100).toFixed(1)}%</h1>
    </div>
  )
}
