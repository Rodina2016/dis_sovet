document.addEventListener('DOMContentLoaded', function () {
   const langBtn = document.querySelector('.content__lang-btn'),
         enBlocks = document.querySelector('.content__block-col--en'),
         ruBlocks = document.querySelector('.content__block-col--ru'),
         burger = document.querySelector('#burger'),
         headerMenu = document.querySelector('#header-menu'),
         headerLogo = document.querySelector('#header-logo'),
         $textRu = $('#text-ru').text(),
         $textEn = $('#text-en').text(),
         $speackersCarousel = $('.speakers-carousel'),
         $eventsCarousel = $('#events-carousel');

   if(langBtn) {
       langBtn.addEventListener('click', function () {

           const lang = this.dataset.lang;
           const textBtn = this.querySelector('.content__lang-text');
           const iconBtn = this.querySelector('.content__lang-icon');

           if(lang === 'ru') {
               textBtn.innerHTML = $textEn;
               iconBtn.innerHTML = '<use xlink:href="#icon-en"></use>';
               this.dataset.lang = 'en';
               enBlocks.classList.add('hidden');
               enBlocks.classList.remove('show');
               ruBlocks.classList.add('show');

           } else if (lang === 'en') {
               textBtn.innerHTML = $textRu;
               iconBtn.innerHTML = '<use xlink:href="#icon-ru"></use>';
               this.dataset.lang = 'ru';
               enBlocks.classList.add('show');
               ruBlocks.classList.add('hidden');
               ruBlocks.classList.remove('show');
           }
       });
   }

   if(burger) {
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
   }

    if(window.innerWidth < 991) {
        $speackersCarousel.owlCarousel({
            responsive: {
                768: {
                    items: 2,
                },
                0: {
                    items: 1
                }
            },
        });
    }

    if(window.innerWidth < 1280) {
        $eventsCarousel.owlCarousel({
            responsive: {
                1280: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                0: {
                    items: 1
                }
            },
        });
    }
    const listTargetSelect = $.makeArray($('#select_spec').find('option'));

    $('#select_dis').change(function () {
        const attr = $('#select_dis :selected').attr('data-id-sovet');

        listTargetSelect.forEach(function (el, ind) {
           const currentAttr = $(el).attr('data-id-spec');
            $(el).prop("disabled", false);
           if(currentAttr != attr) {
               $(el).prop("disabled", true);
           }
        });

        setTimeout(function () {
            $('select').select2('destroy').select2({
                minimumResultsForSearch: -1
            });
        })


    });

    $('select').select2({
        minimumResultsForSearch: -1
    });

    $('.filters__wrap').addClass('hidden-md');

    $('.filters__close').click(function () {
        $(this).next('.filters__wrap').slideToggle();
    });

    /*tabs*/

    $('.tabs__item-link').click(function(e) {
        e.preventDefault();
        var tab = $(this).closest('.tabs__item');
        var tabTarget = $(tab).attr('data-tab');
        if (!tab.hasClass('active')) {
            $(tab)
                .siblings('.tabs__item.active')
                .removeClass('active');
            $(tab).addClass('active');
            $('#' + tabTarget)
                .siblings('.tab-content')
                .hide();
            $('#' + tabTarget).fadeIn();
        }
    });
    $('.tabs').each(function(i, item) {
        $(item)
            .find('.tabs__item')
            .first()
            .addClass('active');
        $(item)
            .next()
            .addClass('active');
    });

    /*steps*/

    let Steps = {
        item: '.steps__item',
        head: $('.steps__item-head'),
        body: '.steps__item-body',
        btn: $('.steps__button')
    };

    let toggleButtonText = function(button) {
        let newTextContent = button.attr('data-text');
        button.attr('data-text', button.text());
        button.text(newTextContent);

        button.toggleClass('is-show');
    };

    let onStepsHeadClick = function() {
        let $this = $(this);
        let stepsBtn = $this.closest('.steps').find(Steps.btn);
        let stepsItem = $this.parent(Steps.item);

        if (stepsItem.hasClass('is-active')) {
            stepsItem.removeClass('is-active');
            $this.siblings(Steps.body).slideUp();
            if ($(stepsBtn).hasClass('is-show')) {
                toggleButtonText(stepsBtn);
            }
        } else {
            let activeSteps = stepsItem.siblings('.is-active').length;
            let steps = stepsItem.siblings(stepsItem).length;
            stepsItem.addClass('is-active');
            $this.siblings(Steps.body).slideDown();
            if (activeSteps === steps) {
                toggleButtonText(stepsBtn);
            }
        }
    };
    Steps.head.on('click', onStepsHeadClick);

    let onStepsBtnClick = function() {
        let $this = $(this);
        let closestStepsItem = $this.closest('.steps').find(Steps.item);

        if ($this.hasClass('is-show')) {
            closestStepsItem.removeClass('is-active');
            closestStepsItem
                .children(Steps.body)
                .stop()
                .slideUp();
        } else {
            closestStepsItem.addClass('is-active');
            closestStepsItem
                .children(Steps.body)
                .stop()
                .slideDown();
        }

        toggleButtonText($this);

        $this.blur();
    };
    Steps.btn.on('click', onStepsBtnClick);

    /*click button show more*/

    const infoCardItem = $('.info-card__item');
    const arrayItems = $.makeArray(infoCardItem);
    const elemShow = 10;

    if(arrayItems.length > elemShow ) {
        $('.info-card__btn').addClass('show');
    }

    $(document).on('click', '.info-card__btn', function () {
        const lastShowItem = $('.info-card__item.show');
        const indLastShowItem = lastShowItem.length - 1;

        arrayItems.forEach(function (el, ind) {
           if(ind > indLastShowItem && ind <= indLastShowItem + elemShow) {
               $(el).addClass('show');
           }
        });

        if($('.info-card__item.show').length === arrayItems.length) {
            $(this).removeClass('show');
        }
    });

    /*kebab menu*/

    $(document).on('click', '#kebab', function () {
        $(this).next('.header-panel__lang').toggleClass('active');
    });
});