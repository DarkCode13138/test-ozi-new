/**
 * This code creates a mobile menu.
 * Each function has its own responsibilities.
 *  */
document.addEventListener('DOMContentLoaded', function() {

  const burggerBtn = document.getElementById('burgger-btn');
  let menuWrap = document.querySelector('.m-navbar__elements');
  let menuElementNav = document.querySelector('.m-navbar__menu-wrap');

  burggerBtn.addEventListener('click', toggleSVGBurger);

  /**
   * toggleSVGBurger function works with svg image and recalculates menu size.
   */
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

      let btnActive = document.querySelector('.active') || '';
      let SubActive = document.querySelector('.active-sub') || '';

      if(btnActive){
        btnActive.classList.remove('active');
        if(SubActive){
          SubActive.classList.remove('active-sub');
        }
      }

    } else {
      menuWrap.style.maxHeight = menuHeight + "px";
    }
  }

  let width = document.documentElement.clientWidth;

  if (width <= 991) {
    activateMenuAccordion();
  }

  /**
   * activateMenuAccordion function is divided into three main functions menuToggler,subMenuToggler,clearHeight.
   * */

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
            /**
             *  scrollToBlock function will scroll the screen to the clicked block.
             * */
              function scrollToBlock(x) {
                item.scrollIntoView({behavior: "smooth"});
              }

            })
          }
          if (Parent){
            menuToggler(Parent, subMenu);
          } else {
            subMenuToggler(SubParenst, this);
          }

          for (let k = 0; notTarget.length > k; k++){
            if(notTarget[k] !== Parent){
              clearHeight(notTarget[k], this, subMenuItem);
            }

          }
        })
      });
  /**
   * clearHeight clears the size of our menu and restores it to its original state
   * */
      function clearHeight(value, _this, subMenuItem) {

        if(!_this.classList.contains('sub-btn')){
          value.classList.remove('active');
          value.nextElementSibling.style.maxHeight = '0px';
        } else {
          _this.classList.remove('active');
        }
      }

      /**
       * menuToggler works with the first menu level.
       * */
      function menuToggler(value, x, _this) {
        let sub = value.nextElementSibling;
        let menuHeight = menuElementNav.clientHeight;

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
      /**
       * subMenuToggler works with the second menu level.
       * */
      function subMenuToggler(value, _this){
        let menuHeight = menuElementNav.clientHeight ;
        let GlobalParent = _this.closest('.m-navbar__submenu-wrap');
        let resize = GlobalParent.querySelector('ul').clientHeight;
        let allSubBtn = document.getElementsByClassName('sub-btn');

        _this.classList.toggle('active-sub');

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


});
