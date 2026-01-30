import React from 'react'
import ElectronicsCategory from './ElectronicCategory/ElectronicsCategory'
import Grid from './Grid/Grid'
import Deal from './Deals/Deal'

const Home = () => {
  return (
    <div className='space-y-5'>
      <ElectronicsCategory />
      <div className='px-5 lg:px-10'>
        <section>
          <Grid />
        </section>
        <section>
          <Deal />
        </section>
      </div>
    </div>
  )
}

export default Home
