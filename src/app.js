import './styles.css'
import { ContextMenu } from "./menu"

// Временная мера для понимания работы)

let work = new ContextMenu('ul')

document.body.addEventListener("contextmenu", event => {
    event.preventDefault()
    work.open()
  })

