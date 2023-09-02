import {Menu} from './core/menu'

export class ContextMenu extends Menu {
    open() {
        this.el.classList.add('open')
        this.el.style.top = `${event.clientY}px`
        this.el.style.left = `${event.clientX}px`
      }
    
    close() {
        this.el.classList.remove('open')
    }
      
    add(moduleClass) {
        if (moduleClass instanceof Module) {
            this.el.innerHTML ( moduleClass.toHTML() )
          }
    } 
}
  