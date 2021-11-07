// window.addEventListener('load', function () {
document.addEventListener("DOMContentLoaded", () => {
function _removeClasses(elem, elemClass) {
    if (elem) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove(elemClass);
        }
    }
}
const htmlBody =document.querySelector('html');
// код определяющий на каком устройстве открыта страница
let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};


if (isMobile.any()) {
    htmlBody.classList.add('_touch');

} else {
    htmlBody.classList.add('_pc');
}


// Проверка поддержки webp
function testWebP(elem) {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    webP.onload = webP.onerror = function () {
      webP.height === 2 ? elem.classList.add('_webp') : elem.classList.add('_no-webp');
    };
  }

  testWebP(htmlBody);

  // IE
function isInternetExplorer() {
    return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
// console.log(isInternetExplorer());
if (isInternetExplorer() === false) {
    // alert('Браузер не IE');
} else {
    alert('Ваш браузер не поддерживается, страница может отображаться некорректно!');
    htmlBody.classList.add('_ie');
}
// lock body
const documentBody = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
let timeout = 10;


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('._body-wrapper').offsetWidth + 'px';
  
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    documentBody.style.paddingRight = lockPaddingValue;
    documentBody.classList.add('_lock');
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  
  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      documentBody.style.paddingRight = '0px';
      documentBody.classList.remove('_lock');
    }, 0);
  
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
// nclude('./_spoller.js')
// задать хедер(по дефолту везде .header)
const headerElement = '.header';


actionBurgerMenu();
// onMenuLinkClick(headerElement);
// hideHeader(headerElement, 300);

/*-------------------------- */
function actionBurgerMenu(iconBurger = '.icon-menu', bodyMenu = '.header__bottom') {
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);
    if (iconMenu && menuBody) {
        iconMenu.addEventListener("click", function (e) {
            if (iconMenu.classList.contains('_active')) {
                iconMenu.classList.remove("_active");
                menuBody.classList.remove("_active");
                iconMenu.ariaExpanded="false";
                bodyUnLock();
            } else {
                iconMenu.classList.add("_active");
                menuBody.classList.add("_active");
                iconMenu.ariaExpanded="true";
                bodyLock();
            }
        });
    }
}


/*-------------------------- */
function onMenuLinkClick(headerElement = '.header', links = 'a[data-goto]', iconBurger = '.icon-menu', bodyMenu = '.menu__body') {
    const menuLinks = document.querySelectorAll(links);
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);

    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", function (e) {
                const menuLink = e.target;
                if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                    const gotoBlock = document.querySelector(menuLink.dataset.goto);

                    // если шапка фиксированная
                    /* 
                    console.log(document.querySelector(headerElement).offsetHeight);
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(headerElement).offsetHeight;*/

                    // если шапка не фиксированная
                    /**/
                    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                    if (iconMenu.classList.contains('_active')) {
                        bodyUnLock();
                        iconMenu.classList.remove('_active');
                        menuBody.classList.remove('_active');
                    }

                    if (document.querySelectorAll('._hover')) {
                        _removeClasses(document.querySelectorAll('._hover'), "_hover");
                    }

                    window.scrollTo({
                        top: gotoBlockValue,
                        behavior: "smooth"
                    });
                    e.preventDefault();
                }
            });
        });
    }
}

/*-------------------------- */
function hideHeader(headerElement = '.header', topOfset = 200) {
    let lastScroll = 0;
    const header = document.querySelector(headerElement);
    const defaultOfset = topOfset;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('_hide');

    if (header) {
        window.addEventListener('scroll', () => {
            if (scrollPosition() > lastScroll && !containHide()) {
                //scroll down с нуля
                header.classList.add('_vis');
            }
            if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOfset) {
                //scroll down после определенной позиции
                header.classList.add('_hide');
            }
            if (scrollPosition() < lastScroll && containHide()) {
                //scroll up
                header.classList.remove('_hide');
            }
            if (scrollPosition() == 0) {
                header.classList.remove('_vis');
            }
            lastScroll = scrollPosition();
        });
    }
}

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
// nclude('./_filter&tabs.js')
// nclude('./_popup.js')
function initMap() {
    let position = {lat: 40.74275840992788, lng: -73.92612712900741};

    let opt = {
      center: position,
      zoom: 15,
    };

    let info = new google.maps.InfoWindow({
      content: "45-35 39th St"
    });
    
    let map = new google.maps.Map(document.getElementById("map"),opt);

    let marker = new google.maps.Marker({
      map: map,
      position: position,
      title: "45-35 39th St",
    });


    // добавление описания для маркера при клике на него
    marker.addListener('click',function(){
      info.open(map, marker);
    });

  }

  initMap();
// nclude('./_form.js')
  //  --------------------------------
  document.addEventListener('click', documentActions);

  // делегирование события клик
  function documentActions(e) {
    const targetElement = e.target;

    //обработка клика на стрелку меню
    if (targetElement.classList.contains('menu__arrow')) {
      targetElement.closest('.menu__item').classList.toggle('_hover');
    }

    if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
      _removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");

    }





    // можно добавлять события клика
  }


});