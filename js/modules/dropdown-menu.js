import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events){
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    // define touchstart e click como argumento
    //padrao de events caso o usuario nao defina
    if (events === undefined) {
      this.events = ['touchstart', 'click']
    }
    else {
      this.events = events
    }

    this.activeClass = 'active'

    this.activeDropDownMenu = this.activeDropDownMenu.bind(this)
  }

  // ativa o dropdownmenu e adiciona
  // a funcao que observa o clique fora dele
  activeDropDownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdown menu
  addDropDownMenusEvent() {
    this.dropdownMenus.forEach(menu => {
      this.events.forEach(userEvent => {
        menu.addEventListener(userEvent, this.activeDropDownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropDownMenusEvent()
    }
    return this
  }
}
