document.addEventListener('DOMContentLoaded', function () {
   const langBtn = document.querySelector('.content__lang-btn');
   const enBlocks = document.querySelector('.content__block-col--en');
   const ruBlocks = document.querySelector('.content__block-col--ru');
   const burger = document.querySelector('#burger');
   const headerMenu = document.querySelector('#header-menu');
   const headerLogo = document.querySelector('#header-logo');

   if(langBtn) {
       langBtn.addEventListener('click', function () {

           const lang = this.dataset.lang;
           const textBtn = this.querySelector('.content__lang-text');
           const iconBtn = this.querySelector('.content__lang-icon');

           if(lang === 'ru') {
               textBtn.innerHTML = 'in English';
               iconBtn.innerHTML = '<use xlink:href="#icon-en"></use>';
               this.dataset.lang = 'en';
               enBlocks.classList.add('hidden');
               enBlocks.classList.remove('show');
               ruBlocks.classList.add('show');

           } else if (lang === 'en') {
               textBtn.innerHTML = 'на русском';
               iconBtn.innerHTML = '<use xlink:href="#icon-ru"></use>';
               this.dataset.lang = 'ru';
               enBlocks.classList.add('show');
               ruBlocks.classList.add('hidden');
               ruBlocks.classList.remove('show');
           }
       });
   }

    burger.addEventListener('click', function () {

        if(this.classList.contains('active')) {
            this.classList.remove('active');
            headerMenu.classList.remove('active');
            headerLogo.classList.remove('active');
        } else {
            this.classList.add('active');
            headerMenu.classList.add('active');
            headerLogo.classList.add('active');
        }
    });
});