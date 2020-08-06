document.addEventListener('DOMContentLoaded', function() {

const burggerBtn = document.getElementById('burgger-btn');
let menuWrap = document.querySelector('.m-navbar__elements');
let menuElementNav = document.querySelector('.m-navbar__menu-wrap');



burggerBtn.addEventListener('click', toggleSVGBurger);

function toggleSVGBurger(e) {
  let subMenu = document.getElementsByClassName('m-navbar__submenu-wrap');



  const {
    target, currentTarget,
    currentTarget: { parentNode }
  } = e;
  const svgEls = document.querySelectorAll(".svgEl");

  svgEls.forEach(el => {
    el.classList.toggle("line");
    el.classList.toggle("transitionDelay");
  });

  parentNode.classList.toggle("toggleMenuList");
  menuWrap.classList.toggle('toggle-menu');
  let menuHeight = menuElementNav.clientHeight ;
  if (menuWrap.clientHeight !== 0) {

    menuWrap.style.maxHeight = "0px";
    for(let k = 0; subMenu.length > k; k++){
      if(subMenu[k].clientHeight > 0){

        subMenu[k].style.maxHeight = "0px";
      }


    }

    let btnActive = document.querySelector('.active');
    let SubActive = document.querySelector('.active-sub');
    btnActive.classList.remove('active');
    SubActive.classList.remove('active-sub');


  } else {
    menuWrap.style.maxHeight = menuHeight + "px";

  }
}

let width = document.documentElement.clientWidth;

if (width <= 991) {
  activateMenuAccordion();
}


function activateMenuAccordion() {

  let menuWrap = document.querySelector('.m-navbar__elements');
  let menuElementNav = document.querySelector('.m-navbar__menu-wrap');
  let btn = document.getElementsByClassName('menu_btn');

    [].forEach.call(btn, function (item, i) {
      item.addEventListener('click', function () {
        let Parent = this.closest('.lvl-one');
        let subMenu = '.m-navbar__submenu';
        let SubParenst = this.closest('.m-navbar__submenu-item')
        let notTarget = document.getElementsByClassName('active');
        let subMenuItem = '.m-navbar__drop-menu';
        let transitionEvent = document.getElementsByClassName("m-navbar__submenu-wrap");
        for (let k = 0; transitionEvent.length > k; k++){
          transitionEvent[k].addEventListener('transitionend', function () {
            scrollToBlock(item);
            // console.log(item);
            function scrollToBlock(x) {
              item.scrollIntoView({behavior: "smooth"});
            }
          })
        }

        if (Parent){
          MenuToggler(Parent, subMenu);
        } else {
          SubMenuToggler(SubParenst, this);
        }
        for (let k = 0; notTarget.length > k; k++){
          if(notTarget[k] !== Parent){
            ClearHeight(notTarget[k], this, subMenuItem);
          }
        }
      })
    });

    // accordion();
    function ClearHeight(value, _this, subMenuItem) {
      if(!_this.classList.contains('sub-btn')){
        value.classList.remove('active');
        value.nextElementSibling.style.maxHeight = '0px';
      } else {
        _this.classList.remove('active');
      }
    }
    function MenuToggler(value, x, _this) {
      let sub = value.nextElementSibling;
      let menuHeight = menuElementNav.clientHeight ;
      if (x == '.m-navbar__submenu'){
        let heightElem = sub.querySelector(x).clientHeight;
        let subHeight = sub.clientHeight;
        value.classList.toggle('active');
        if(subHeight == 0){
          sub.style.maxHeight = heightElem;
          menuWrap.style.maxHeight = menuHeight +  heightElem + "px";

        }else {
          sub.style.maxHeight = '0px';
        }
      }
    }
    function SubMenuToggler(value, _this){
      let menuHeight = menuElementNav.clientHeight ;
      let GlobalParent = _this.closest('.m-navbar__submenu-wrap');
      let resize = GlobalParent.querySelector('ul').clientHeight;
      _this.classList.toggle('active-sub');
      let allSubBtn = document.getElementsByClassName('sub-btn');
      for (let k = 0; allSubBtn.length > k; k++){
        if(allSubBtn[k].classList.contains("active-sub") && allSubBtn[k] !== _this){
          allSubBtn[k].classList.remove('active-sub');
        }
      }
      let Sublist  = value.nextElementSibling;
      let subListHeight  = Sublist.querySelector('ul').clientHeight;
      let allSubList = document.getElementsByClassName('sub--menu');
      for(let k = 0; allSubList.length > k; k++){
        if (allSubList[k].clientHeight == 0 && allSubList[k] === Sublist){
          allSubList[k].style.maxHeight = subListHeight;
          GlobalParent.style.maxHeight = resize + subListHeight;
          menuWrap.style.maxHeight = menuHeight + subListHeight + "px";
        } else if(allSubList[k].clientHeight > 0 && allSubList[k] === Sublist){
          allSubList[k].style.maxHeight = '0px';
        } else if(allSubList[k].clientHeight > 0 && allSubList[k] !== Sublist) {
          allSubList[k].style.maxHeight = '0px';
        }
      }
    }
  }




// function accordion(itm) {
//   let acc = document.getElementsByClassName(itm);
//   console.log(acc)
//   let clickMenuButtons = document.getElementsByClassName('menu_btn');
//   console.log(clickMenuButtons)
//   for (let k = 0; k < clickMenuButtons.length; k++) {
//
//     clickMenuButtons[k].addEventListener('click', function () {
//       console.log(this);
//       let buttonParentContainer = this.closest('.' + itm);
//       // let buttonParentContainer = this.parentElement;
//       console.log(buttonParentContainer)
//       // if (itm == 'm-navbar__menu-el'){
//       //   console.log('m-navbar__menu-el');
//       //   // this.addEventListener('transitionend', function () {
//       //     // let event = $(buttonParentContainer).siblings();
//       //
//       //     // let event = buttonParentContainer.querySelector('.m-navbar__submenu-wrap');
//       //     let event = buttonParentContainer.nextElementSibling;
//       //     console.log(event);
//       //     // scrollToBlock(this);
//       //
//       //     function scrollToBlock(x) {
//       //       console.log('true');
//       //       // $('html, body').animate({
//       //       //   scrollTop: $(x).offset().top
//       //       // }, 300);
//       //
//       //     }
//       //   // })
//       // }
//
//       if (buttonParentContainer) {
//         console.log('buttinParent');
//         for (let i = 0; i < acc.length; i++) {
//           // let panels = acc[i].nextElementSibling;
//           console.log(acc[i]);
//           let panels = acc[i].nextElementSibling;
//
//           // let panelsChild = panels.querySelector('.m-navbar__submenu');
//           console.log(panels);
//
//           acc[i].classList.remove("active");
//           if (panels) {
//             let panelsChild = panels.querySelector('.m-navbar__submenu');
//             console.log(panelsChild)
//             let innerElem = document.querySelectorAll('.m-navbar__submenu-wrap');
//             // let panelHeight = panels.clientHeight;
//             let panelHeight = panels.clientHeight;
//
//             // let heightTogler = panelsChild.clientHeight;
//
//             // let panelHeight = panelsChild.clientHeight;
//             console.log()
//             console.log(panelHeight);
//             console.log(panels);
//             if (panelHeight >= 0) {
//               panels.style.maxHeight = '0px';
//               console.log('=> 0 ');
//               // innerElem.forEach(function (item) {
//               console.log(innerElem);
//               [].forEach.call(innerElem, function (item) {
//                 console.log('style => 0 ');
//                 item.style.maxHeight = "0px";
//                 item.previousElementSibling.classList.remove("active");
//               });
//
//             }
//           }
//         }
//         //переключаем высоту
//         let panel = buttonParentContainer.nextElementSibling;
//         if (panel) {
//           console.log(panel);
//           // let panelHeight = panel.clientHeight;
//           // let panelHeight = panel.clientHeight;
//           let panelHeight = panel.clientHeight;
//           let panelHeightChild = panel.querySelector('.m-navbar__submenu').clientHeight;
//           console.log(panelHeightChild)
//           let currentMaxHeight = 0;
//
//           let innerElem = document.querySelectorAll('.m-navbar__submenu-wrap');
//
//
//           console.log(innerElem);
//
//           console.log(panelHeight);
//           // if (panelHeight !== 0) {
//           debugger;
//           if (panelHeight !== 0) {
//
//             panel.style.maxHeight = "0px";
//             console.log(panel)
//
//             buttonParentContainer.classList.remove("active");
//
//             console.log(panelHeight);
//           } else {
//             console.log('else');
//             [].forEach.call(innerElem, function (itm) {
//               // innerElem.forEach(function (itm) {
//
//               console.log('больше ')
//               currentMaxHeight += itm.scrollHeight;
//               // currentMaxHeight += itm.scrollHeight;
//             });
//             buttonParentContainer.classList.add("active");
//             panel.style.maxHeight = panel.scrollHeight + currentMaxHeight + "px";
//
//           }
//         }
//
//       }
//
//     })
//   }
//
// }


});
