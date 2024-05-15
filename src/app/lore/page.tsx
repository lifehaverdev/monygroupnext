import Header from '../../components/header'
import LoreContent from './lore'
import '../globals.css'

const Lore = () => {
  return (
    <>
      <Header navigation={
        [
            {name: 'Lore', href: '/lore'},
            {name: 'Merch', href: '/merch'},
            {name: 'Mint',href: '/mint'}
        ]
      }/>
      <LoreContent/>
      
    </>
  )
}

export default Lore