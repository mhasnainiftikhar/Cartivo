import Hero from './Home/Hero'
import ElectronicsCategory from './ElectronicCategory/ElectronicsCategory'
import Grid from './Grid/Grid'
import Deal from './Deals/Deal'

const Home = () => {
  return (
    <div className='space-y-10 pb-20'>
      <Hero />
      <div className='space-y-16'>
        <section>
          <ElectronicsCategory />
        </section>
        <div className='px-5 lg:px-10 space-y-20'>
          <section>
            <Grid />
          </section>
          <section>
            <Deal />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home
