import { Background } from './Background'
import { Header } from './Header'
import { About } from './About'
import { Title } from './Title'
import { Works } from './Works'
import { Contact } from './Contact'

const Home = () => (
  <>
    <Background />
    <Header />
    <Title />
    <main>
      <About />
      <Works />
      <Contact />
    </main>
  </>
)

export default Home
