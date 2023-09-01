import { Module } from "../core/module"

export class Menu {
  constructor(selector) {
    this.menu = document.querySelector(selector)

    document.body.addEventListener('click', event => {
      if (event.target.offsetParent !== this.menu) {
        this.close()
      }
    })

  }

  // Выбрасывание ошибки пока оставил, позже можно либо удалить, либо исправить

  open() {
    if (this.menu){
      this.menu.classList.add('open')
      this.menu.style.top = `${event.clientY}px`
      this.menu.style.left = `${event.clientX}px`
    } else throw new Error(`"open" method should be implemented in Menu"`)
  }

  close() {
    if (this.menu.classList.contains('open')) {
    this.menu.classList.remove('open')
    } else throw new Error(`"close" method should be implemented in Menu"`)
  }

  add(moduleClass) {
      if (moduleClass instanceof Module) {
        this.menu.innerHTML ( moduleClass.toHTML() )
      } else throw new Error(`"add" method should be implemented in Menu"`)
  }
}