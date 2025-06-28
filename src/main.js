import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import './tailwind.css'


document.querySelector('#app').innerHTML = `
  <div>

    <p>
      We're not just making a portfolio.
      We're making a damn movement.
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
