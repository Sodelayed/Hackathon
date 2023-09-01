import './styles.css'
import { Menu } from "./core/menu"

// Временная мера для понимания работы)

let work = new Menu('ul')

document.body.addEventListener("contextmenu", event => {
    event.preventDefault()
    work.open()
  })

