document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const tabs = () => {
    const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
    const cardDetailsTitleElems = document.querySelector('.card-details__title');
    const cardImageItemElem = document.querySelector('.card__image_item');
    const cardDetailsPriceElem = document.querySelector('.card-details__price');
    const descriptionMemory = document.querySelector('.description__memory')

    const data = [
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
        img: 'img/iPhone-graphite.png',
        price: 95990,
        memoryROM: 128
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
        img: 'img/iPhone-silver.png',
        price: 120990,
        memoryROM: 256
      },
      {
        name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
        img: 'img/iPhone-blue.png',
        price: 99990,
        memoryROM: 128
      }
    ];

    const deactive = () => {
      cardDetailChangeElems.forEach(btn => {
        btn.classList.remove('active');
      });
    }

    cardDetailChangeElems.forEach((btn, i) => {
      btn.addEventListener('click', event => {
        if (!btn.classList.contains("active")) {
          deactive();
          btn.classList.add('active');
          cardDetailsTitleElems.textContent = data[i].name;
          cardImageItemElem.src = data[i].img;
          cardImageItemElem.alt = data[i].name;
          cardDetailsPriceElem.textContent = data[i].price + "₽";
          descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`;
        }
      });
    });
    // ОДИН ИЗ СПОСОБОВ ДЛЯ ТАБОВ
    // const hideAll = () => {
    //   for (let i = 0; i < cardDetailChangeElems.length; i++) {
    //     cardDetailChangeElems[i].classList.remove('active');
    //     cardDetailsTitleElems[i].classList.remove('active');
    //     cardImageElems[i].classList.remove('active');
    //   }
    // }
    // for (let i = 0; i < cardDetailChangeElems.length; i++) {
    //   cardDetailChangeElems[i].addEventListener('click', event => {
    //     hideAll();
    //     event.target.classList.add('active');
    //     cardDetailsTitleElems[i].classList.add('active');
    //     cardImageElems[i].classList.add('active');
    //   });

    // }

  };

  const accordion = () => {
    const characteristicsListElem = document.querySelector('.characteristics__list');
    const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

    //Если изначально в HTML дать какому-либо спойлеру active, то планвости не будет, так как не прописан height. Этот скрипт исправляет это:
    characteristicsItemElems.forEach(elem => {
      if (elem.children[1].classList.contains('active')) {
        elem.children[1].style.height = elem.children[1].scrollHeight + "px";
      }
    })

    const open = (button, dropDown) => {
      //Закрыть все спойлеры
      closeAllDrops(button, dropDown);

      //Изначально свойство height равно 0. Потом мы приравниваем его к scrollHeight, чтобы сработал transition. И лишь затем добавляяем класс active, который устанавливает height на auto
      dropDown.style.height = dropDown.scrollHeight + "px";
      button.classList.add('active');
      dropDown.classList.add('active');
    };

    const close = (button, dropDown) => {
      button.classList.remove('active');
      dropDown.classList.remove('active');
      dropDown.style.height = ''; //обнуляем значение, и он возьмет его из css(height: 0)
    };

    const closeAllDrops = (button, dropDown) => {
      characteristicsItemElems.forEach(elem => {
        if (elem.children[0] !== button && elem.children[1] !== dropDown) {
          //Закрыть все спойлеры кроме переданных button и dropDown. Здесь childern[0] и children[1] это кнопка и контент соответственно

          //Закрываем только те айтемы, у которых есть active
          if (elem.children[0].classList.contains("active")) close(elem.children[0], elem.children[1]);
        }
      });
    };

    characteristicsListElem.addEventListener('click', event => {
      const target = event.target;
      if (target.classList.contains('characteristics__title')) {
        const parent = target.closest('.characteristics__item');
        const dropDown = parent.querySelector('.characteristics__description');
        dropDown.classList.contains('active')
          ? close(event.target, dropDown)
          : open(event.target, dropDown);
      }

    });

    //Если нужно, чтобы аккордеон закрывался при клике мимо него
    document.addEventListener('click', event => {
      const target = event.target;
      if (!target.closest('.characteristics__list')) {
        closeAllDrops();
      }
    })



    //БЕЗ ДЕЛЕГИРОВАНИЯ
    // const characteristicsTitle = document.querySelectorAll('.characteristics__title');
    // const characteristicsDescription = document.querySelectorAll('.characteristics__description');

    // characteristicsTitle.forEach((elem, i) => {
    //   elem.addEventListener('click', () => {
    //     elem.classList.toggle('active');
    //     characteristicsDescription[i].classList.toggle('active');
    //   })
    // })
  };

  const modal = () => {
    const modal = document.querySelector('.modal');
    const cardDetailsFooter = document.querySelector('.card-details__footer');

    const closeModal = event => {
      if (event.type === "click") {
        if (event.target.closest('.modal__close') || event.target.classList.contains('modal')) {
          modal.classList.remove('open');
        }
      } else if (event.type === "keydown") {
        if (event.key === "Escape") {
          modal.classList.remove('open');
          document.removeEventListener('keydown', closeModal);
        }
      }
    }

    cardDetailsFooter.addEventListener('click', event => {
      if (!event.target.classList.contains('button')) return;

      const modalSubtitle = modal.querySelector('.modal__subtitle');
      if (event.target.classList.contains('card-details__button_buy')) {
        modalSubtitle.textContent = "Оплата";
      } else if (event.target.classList.contains('card-details__button_delivery')) {
        modalSubtitle.textContent = "Доставка и оплата";
      }

      modal.classList.add('open');
      document.addEventListener('keydown', closeModal);
    });

    //Закрытие модального окна
    modal.addEventListener('click', closeModal);

  };

  tabs();
  accordion();
  modal();
});