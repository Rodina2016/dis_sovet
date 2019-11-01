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

    $('select').select2({
        minimumResultsForSearch: -1
    });

    $('.filters__wrap').addClass('hidden-md');

    $('.datepicker').datetimepicker({
        format: 'DD / MM / YYYY',
        minDate: '1950-01-01',
        icons: {
            date: 'icon-calendar',
            next: 'icon-arrow',
            previous: 'icon-arrow'
        },
        locale: 'ru',
        allowInputToggle: true,
        useCurrent: false,
        ignoreReadonly: true,
        debug: true // change that for dev
    });

    // disable letters input for datepicker
    var timePickerInput = $('.datepicker input');
    timePickerInput.on('keydown', function(e) {
        if (
            (e.which >= 48 && e.which <= 57) ||
            (e.which >= 96 && e.which <= 105) ||
            e.which === 8 ||
            e.which === 35 ||
            e.which === 36 ||
            e.which === 191 ||
            e.which === 32 ||
            e.which === 123 ||
            e.which === 46
        ) {
            return true;
        } else {
            return false;
        }
    });

    $('.date-range.date-start').on('dp.change', function(e) {
        var dateId = $(this).attr('data-date-id');
        $('.date-end[data-date-id="' + dateId + '"]')
            .data('DateTimePicker')
            .minDate(e.date);
    });

    $('.date-range.date-end').on('dp.change', function(e) {
        var dateId = $(this).attr('data-date-id');
        $('.date-start[data-date-id="' + dateId + '"]')
            .data('DateTimePicker')
            .maxDate(e.date);
    });

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

    var Steps = {
        item: '.steps__item',
        head: $('.steps__item-head'),
        body: '.steps__item-body',
        btn: $('.steps__button')
    };

    var toggleButtonText = function(button) {
        var newTextContent = button.attr('data-text');
        button.attr('data-text', button.text());
        button.text(newTextContent);

        button.toggleClass('is-show');
    };

    var onStepsHeadClick = function() {
        var $this = $(this);
        var stepsBtn = $this.closest('.steps').find(Steps.btn);
        var stepsItem = $this.parent(Steps.item);

        if (stepsItem.hasClass('is-active')) {
            stepsItem.removeClass('is-active');
            $this.siblings(Steps.body).slideUp();
            if ($(stepsBtn).hasClass('is-show')) {
                toggleButtonText(stepsBtn);
            }
        } else {
            var activeSteps = stepsItem.siblings('.is-active').length;
            var steps = stepsItem.siblings(stepsItem).length;
            stepsItem.addClass('is-active');
            $this.siblings(Steps.body).slideDown();
            if (activeSteps === steps) {
                toggleButtonText(stepsBtn);
            }
        }
    };
    Steps.head.on('click', onStepsHeadClick);

    var onStepsBtnClick = function() {
        var $this = $(this);
        var closestStepsItem = $this.closest('.steps').find(Steps.item);

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


});