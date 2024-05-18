import React from 'react'
import BlueCard from '../components/BlueCard'

function Tendencias({PeliTendencias}) {
  return (
    <>
      <h1>tendencias</h1>
      <BlueCard Peliculas={PeliTendencias}></BlueCard>

    </>
  )
}

export default Tendencias
