(() => {
  let burgerWidth = 0;
  let lastItemWidth = 0;

  const init = (menu, menuList, menuItems, menuBurger) => {
    menuItems.forEach(elem => {
      elem.classList.add('amenu__item');
    });
    menuBurger.classList.add('amenu__burger');

    const [burgerBtn, burgerList] = createBurgerMenu(menuBurger);

    updateMenu(menu, menuList, menuBurger, burgerBtn, burgerList);
    window.addEventListener('resize', updateMenu.bind(null, menu, menuList, menuBurger, burgerBtn, burgerList));
  }

  const createBurgerMenu = (menuBurger) => {
    const burgerBtn = document.createElement('button');
    menuBurger.append(burgerBtn);
    burgerBtn.classList.add('amenu__burger-btn');

    burgerBtn.addEventListener('click', () => {
      menuBurger.classList.toggle('amenu__burger-open');
    })

    const burgerList = document.createElement('ul');
    menuBurger.append(burgerList);
    burgerList.classList.add('amenu__burger-list');


    return [burgerBtn, burgerList];

  }

  const updateMenu = (menu, menuList, menuBurger, burgerBtn, burgerList) => {
    const menuItems = menuList.querySelectorAll('.amenu__item');
    const burgerItems = burgerList.querySelectorAll('.amenu__item');

    const menuWidth = menu.offsetWidth;
    burgerWidth = menuBurger.offsetWidth || burgerWidth;

    const allItemsWidth = [...menuItems].reduce((acc, item) => acc + item.offsetWidth + parseFloat(getComputedStyle(item).marginRight), 0) + burgerWidth;

    if (menuWidth < allItemsWidth) {
      const lastItem = menuItems[menuItems.length - 1];
      lastItemWidth = lastItem.offsetWidth + parseFloat(getComputedStyle(lastItem).marginRight);
      burgerList.prepend(lastItem);

      return updateMenu(menu, menuList, menuBurger, burgerBtn, burgerList);
    }

    if (menuWidth > allItemsWidth + lastItemWidth && burgerItems.length) {
      const firstItem = burgerItems[0];
      menuList.append(firstItem);
      return updateMenu(menu, menuList, menuBurger, burgerBtn, burgerList)
    }

    if (burgerItems.length) {
      menuBurger.style.display = '';
    } else {
      menuBurger.style.display = 'none';
    }

    checkBurgerItems(burgerItems.length, burgerBtn);
  }

  const checkBurgerItems = (burgerItemsLength, burgerBtn) => {
    if (burgerItemsLength) {
      burgerBtn.classList.add('amenu__burger-btn_active');
    } else {
      burgerBtn.classList.remove('amenu__burger-btn_active');
    }
  }

  window.amenu = (selectorMenu, selectorMenuList, selectorMenuItems, selectorMenuBurger) => {
    const menu = document.querySelector(selectorMenu),
      menuList = document.querySelector(selectorMenuList),
      menuItems = document.querySelectorAll(selectorMenuItems),
      menuBurger = document.querySelector(selectorMenuBurger);
    init(menu, menuList, menuItems, menuBurger);
  }
})();