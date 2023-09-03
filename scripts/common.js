document.addEventListener('DOMContentLoaded', (event) => {
  const headerHeight = document.querySelector('.header').offsetHeight;
  var viewportWidth = $(window).width();

  const getElement = (context, selector) => {
    if (!context && !selector) {
      return null;
    }

    return context.querySelector(selector);
  };

  SmoothScroll({
    animationTime: 800,
    stepSize: 75,
    accelerationDelta: 30,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 50,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    touchpadSupport: true,
  })

  $(window).on('scroll', function () {
    if($(window).scrollTop() > headerHeight ){
      document.querySelector('.header').classList.add('scroll')

      // setTimeout(() => {
      //   document.querySelector('.header').classList.add('show')
      // }, 500)
    } else if($(window).scrollTop() > headerHeight || $(window).scrollTop() === 0){
      document.querySelector('.header').classList.remove('scroll')
      // setTimeout(() => {
      //   document.querySelector('.header').classList.remove('show')
      // }, 500)
    }
  })

  setTimeout(() => {
    $('body').addClass('show')
  }, 200)

  setTimeout(() => {
    $('body').addClass('hide-after')
  }, 300)

  $('.js-filter-button').on('click', () => {
    $('body').addClass('filter-mob-open')
  })

  $('.filter-sidebar__close').each((i, el) => {
    $(el).on('click', () => {
      $('body').removeClass('filter-mob-open')
    })
  })

  $('.burger').on('click', () => {
    $('body').addClass('mob-menu-open')
  })

  $('.mobile-menu__close').on('click', () => {
    $('body').removeClass('mob-menu-open')
  })

  // remove-fav
  $('body').on('click', '.js-remove-like', (ev) => {
    const id = $(ev.currentTarget).data('id');
    const url = $(ev.currentTarget).data('url');

    $.ajax({
      type: "POST",
      url: url,
      data: {
        remove: id,
      },
      dataType: 'json',
      async:false,
      success: function(data) {
        $(ev.currentTarget).closest('.cart-item').slideUp();

        setTimeout(() => {
          $(ev.currentTarget).closest('.cart-item').remove()
        }, 500)
      },
      complete: function (data) {
        $(ev.currentTarget).closest('.cart-item').slideUp();

        setTimeout(() => {
          $(ev.currentTarget).closest('.cart-item').remove()
        }, 500)
      }
    });
  })

  // favorites
  $('body').on('click', '.js-like-button', (ev) => {
    const id = $(ev.currentTarget).data('id');
    const url = $(ev.currentTarget).data('url');

    if($(ev.currentTarget).hasClass('active')) {
      $.ajax({
        type: "POST",
        url: url,
        data: {
          remove: id,
        },
        dataType: 'json',
        async:false,
        success: function(data) {
          $(ev.currentTarget).removeClass('active')
        },
        complete: function (data) {
          $(ev.currentTarget).removeClass('active')
        }
      });
    } else {
      $.ajax({
        type: "POST",
        url: url,
        data: {
          add: id,
        },
        dataType: 'json',
        async:false,
        success: function(data)
        {
          $(ev.currentTarget).addClass('active')
        },
        complete: function (data) {
          $(ev.currentTarget).addClass('active')
        }
      });
    }
  })

  $.typeahead({
    input: '.js-search-typeahead',
    minLength: 1,
    order: "desc",
    emptyTemplate: 'אין תוצאה עבור "{{query}}"',
    // source: {
    //   car: {
    //     data: ["My first added brand", "M1 added brand at start"],
    //     ajax: {
    //       type: "POST",
    //       url: "/search_main.php",
    //       data: {
    //         myKey: "myValue"
    //       }
    //     }
    //   }
    // },
    source: {
      data: [
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים",
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים",
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים"
      ]
    },
    callback: {
      onInit: function (node) {
        console.log('Typeahead Initiated on ' + node.selector);
      },

    }
  });


  $.typeahead({
    input: '.js-search-typeahead-mob',
    minLength: 1,
    order: "desc",
    emptyTemplate: 'אין תוצאה עבור "{{query}}"',
    // source: {
    //   car: {
    //     data: ["My first added brand", "M1 added brand at start"],
    //     ajax: {
    //       type: "POST",
    //       url: "/search_main.php",
    //       data: {
    //         myKey: "myValue"
    //       }
    //     }
    //   }
    // },
    source: {
      data: [
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים",
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים",
        "הנדסת חשמל",
        "הנדסת חשמל ומחשבים"
      ]
    },
    callback: {
      onInit: function (node) {
        console.log('Typeahead Initiated on ' + node.selector);
      },

    }
  });

  // $.fn.datepicker.dates['he'] = {
  //   days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  //   daysShort:['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
  //   daysMin:  ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
  //   months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  //   monthsShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
  //   today: "היום",
  //   clear: "ברור",
  //   format: "mm/dd/yyyy",
  //   titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
  //   weekStart: 0
  // };

  $('input[name="dates"]').daterangepicker({
    opens: 'left',
    "locale": {
      "format": "MM/DD/YYYY",
      "separator": " - ",
      "applyLabel": "להגיש מועמדות",
      "cancelLabel": "לְבַטֵל",
      "fromLabel": "מ",
      "toLabel": "ל",
      "customRangeLabel": "Custom",
      "weekLabel": "W",
      "daysOfWeek": ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
      "monthNames": ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      "firstDay": 1
    },
    "startDate": "05/19/2023",
    "endDate": "05/25/2023"
  });

  $('.js-select').each((i, el) => {
    $(el).select2({
      allowClear: true,
      placeholder: $(this).data('placeholder'),
      minimumResultsForSearch: $(el).data('search-min-length') === undefined ? '10' : $(el).data('search-min-length'),
      dropdownPosition: 'below',
      dropdownParent: $(el).parent(),
      maximumSelectionLength: $(el).data('max-length'),
      language: {
        noResults: () => {
          return 'noResults';
        },
        maximumSelected: () => {
          return + $(el).data('max-length') + ' ' +
            'maximumSelected 5 ';
        },
        searching: function (params) {
          query = params;
          return 'Searching…';
        }
      },
      templateResult: function (item) {
        if (item.loading) {
          return item.text;
        }
        var term = query.term || '';
        var $result = markMatch(item.text, term);
        return $result;
      },
      // ajax: {
      //   url: '/select2.json',
      //   dataType: 'json'
      // }
    });

    function markMatch(text, term) {
      var match = text.toUpperCase().indexOf(term.toUpperCase());
      var $result = $('<span></span>');
      if (match < 0) {
        return $result.text(text);
      }
      $result.text(text.substring(0, match));
      var $match = $('<span class="select2-rendered__match"></span>');
      $match.text(text.substring(match, match + term.length));
      $result.append($match);
      $result.append(text.substring(match + term.length));
      return $result;
    }

    // clone and append choises

    $(el).on('select2:select', function (e) {

    })

    $(el).on('select2:unselect', function (e) {

    })

    $(el).on('select2:open', function (e) {

    })

    $(el).on('select2:closing', function () {

    })
  })

  // lazy-load
  const el = document.querySelectorAll('.lazy');
  window.observer = lozad(el);
  window.observer.observe();

  $('.js-send-form').each(function () {
    $(this).submit(function(e) {
      e.preventDefault();
      let formBlock = $(this).serialize();
      let form = $(this).serialize();

      let validate = true
      let validateField = this.querySelectorAll(".form-required")
      if(validateField){
        validateField.forEach(field=>{
          let fieldParent = field.closest(".form-item-valid")
          // empty fields
          if(field.value == ""){
            validate = false
            fieldParent.classList.add("error")
          }else{
            fieldParent.classList.remove("error")
          }
          // empty fields

          // checkbox
          if(field.classList.contains("stepper-checkbox")){
            if(!field.checked){
              validate = false
              fieldParent.classList.add("error")
            }else{
              fieldParent.classList.remove("error")
            }
          }

          // radios
          // checkbox end

          // email
          // email
          if(field.classList.contains('mail-field')){
            let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            let value = field.value;
            if (value.match(pattern)) {
              fieldParent.classList.remove("error-mail")
            } else {
              fieldParent.classList.add("error-mail")
              validate = false
            }
            if (value.length < 1) {
              fieldParent.classList.remove("error-mail")
            }
          }
          // email end

          // phone field
          if(field.classList.contains("phone-field")){
            if(field.value.length < 16){
              fieldParent.classList.add("error__number")
              validate = false
            }else{
              fieldParent.classList.remove("error__number")
            }
          }
          // phone field end

          return validate
        })
      }

      if(validate) {
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(this).serialize()
        }).done(function() {
          $('.js-send-form').closest('.popup').addClass('sended')
          $('.js-send-form').closest('form').addClass('sended')
          setTimeout(function() {
            $.magnificPopup.close()
            $('.js-send-form').closest('.popup').removeClass('sended')
            $('.js-send-form').closest('form').removeClass('sended')
          }, 5000);
        });
      }
    });
  })

  $('.ac-trigger').each(function () {
    let $this = $(this);
    let $parent = $this.closest('.ac');
    let $parentWrap = $parent.closest('.js-accordion');
    let $block = $parent.find('.ac-panel');
    let mitiple = $parentWrap.data('multiple');

    if ($parent.hasClass('is-active')) {
      $parent.removeClass('is-active');
      $block.slideUp(400);
    } else {
      if (!mitiple) {
        $parentWrap.find('.ac-panel').slideUp(400);
        $parentWrap.find('.ac').removeClass('is-active');
      }
      $parent.addClass('is-active');
      $block.slideDown(400)
      if (viewportWidth < 481 && $parent.hasClass('about-accordion')) {
        $parent.removeClass('is-active');
        $block.slideUp(400);
      }
    }
  })

  $('body').on('click', '.ac-trigger', (event) => {
    let $this = $(event.currentTarget);
    let $parent = $this.closest('.ac');
    let $parentWrap = $parent.closest('.js-accordion');
    let $block = $parent.find('.ac-panel');
    let mitiple = $parentWrap.data('multiple');

    if ($parent.hasClass('is-active')) {
      $parent.removeClass('is-active');
      $block.slideUp(400);
    } else {
      if (!mitiple) {
        $parentWrap.find('.ac-panel').slideUp(400);
        $parentWrap.find('.ac').removeClass('is-active');
      }
      $parent.addClass('is-active');
      $block.slideDown(400)
    }
  })

  // let selector = document.querySelectorAll(".js-input-mask");
  // let im = new Inputmask("+7(999)999-99-99",{
  //   showMaskOnHover: true,
  //   placeholder: '',
  //   clearMaskOnLostFocus: true,
  //   oncomplete: function () {
  //     this.classList.add('mask-done')
  //   }
  // });
  // selector.forEach((el) => {
  //   im.mask(el);
  // })f

  $('.js-sliders-slick').slick({
    // dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 2,
    rtl: true,
    prevArrow: $('.sliders-block').find('.js-slick-prev'),
    nextArrow: $('.sliders-block').find('.js-slick-next'),
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  }).on('setPosition', (e, slick) => {
    slick.resize()
  });


  $('.js-carts-slick').slick({
    // dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.carts-list').find('.js-slick-prev'),
    nextArrow: $('.carts-list').find('.js-slick-next'),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  }).on('setPosition', (e, slick) => {
    slick.resize()
  });


  if (viewportWidth > 960) {
    $('.js-carts-slick').slick('unslick');
  }

  $('.js-reviews-slick').slick({
    // dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    prevArrow: $('.reviews-block').find('.js-slick-prev'),
    nextArrow: $('.reviews-block').find('.js-slick-next'),
  }).on('setPosition', (e, slick) => {
    slick.resize()
  });

  if (viewportWidth > 480) {
    $('.js-reviews-slick').slick('unslick');
  }


  $('.js-trigger-map').on('click', (ev) => {
    $(ev.currentTarget).toggleClass('active')
    $('.js-cart-map').toggleClass('active')
    const href = $(ev.currentTarget).data('id')

    if($(ev.currentTarget).hasClass('active')) {
      if (viewportWidth < 1024) {
        $('html, body').animate({
          scrollTop: $(href).offset().top - 100
        }, 500);
      } else {
        // Do some thing
      }
    }


  })

  const cartSlider = document.querySelectorAll('[data-slider="cart-slider"]');

  if(cartSlider !== null) {
    cartSlider.forEach((el) => {
      const current = el.querySelector('.js-swiper-current');
      const total = el.querySelector('.js-swiper-total');
      let cartSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: false,
        slidesPerView: 5,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 20,
        on: {
          afterInit: (event) => {
            if(total !== null) {
              const totalSlides = el.querySelectorAll('.swiper-slide').length;
              total.innerText = Number(totalSlides);
            }

          },
          slideChangeTransitionEnd: (event) => {
            if(current !== null) {
              current.innerText = Number(cartSwiper.activeIndex + 1);
            }
          }
        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="cart-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="cart-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        // pagination: {
        //   el: el.querySelector('.swiper-pagination'),
        //   clickable: true,
        //   type: 'progressbar'
        // }
      });

      $(".js-cart-tab").on("click", function(){
        var filter = $(this).data('filter');
        $(".js-cart-tab").removeClass("active");
        $(this).addClass("active");
        $(this).closest('.cart-item').find(".cart-item__slider .swiper-slide").not("[data-filter='"+filter+"']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
        $(this).closest('.cart-item').find(".cart-item__slider [data-filter='"+filter+"']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();
        cartSwiper.destroy();
        setTimeout(() => {
          cartSwiper = new Swiper(el.querySelector('.swiper-container'),{
            freeMode: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            simulateTouch: true,
            lazy: {
              loadOnTransitionStart: true,
              loadPrevNextAmount: 2,
              loadPrevNext: true
            },
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            loop: false,
            slidesPerView: 5,
            slidesPerGroup: 1,
            followFinger: true,
            spaceBetween: 20,
            on: {
              afterInit: (event) => {
                if(total !== null) {
                  const totalSlides = el.querySelectorAll('.swiper-slide').length;
                  total.innerText = Number(totalSlides);
                }

              },
              slideChangeTransitionEnd: (event) => {
                if(current !== null) {
                  current.innerText = Number(cartSwiper.activeIndex + 1);
                }
              }
            },
            navigation: {
              nextEl: getElement(el.closest('[data-slider="cart-slider"]'), '.js-next-swiper'),
              prevEl: getElement(el.closest('[data-slider="cart-slider"]'), '.js-prev-swiper'),
              disabledClass: 'swiper-lock'
            },
          });
        }, 100)
      })
    })
  }


  const innerSlider = document.querySelectorAll('[data-slider="inner-slider"]');

  if(innerSlider !== null) {
    innerSlider.forEach((el) => {
      const current = el.querySelector('.js-swiper-current');
      const total = el.querySelector('.js-swiper-total');
      var innerSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 20,
        on: {
          afterInit: (event) => {

          },
          slideChangeTransitionEnd: (event) => {

          }
        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        // pagination: {
        //   el: el.querySelector('.swiper-pagination'),
        //   clickable: true,
        //   type: 'progressbar'
        // }
      });


      if(window.innerWidth < 561) {
        innerSwiper.destroy();
        innerSwiper = new Swiper(el.querySelector('.swiper-container'),{
          freeMode: false,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          simulateTouch: true,
          lazy: {
            loadOnTransitionStart: true,
            loadPrevNextAmount: 2,
            loadPrevNext: true
          },
          loop: false,
          slidesPerView: 1,
          slidesPerGroup: 1,
          followFinger: true,
          spaceBetween: 20,
          navigation: {
            nextEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-next-swiper'),
            prevEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-prev-swiper'),
            disabledClass: 'swiper-lock'
          },
        });
      }


      let myTimeout;

      $('body').on('click', '.nav-pics__more', (ev) => {
        if($(ev.currentTarget).hasClass('less')) {
          $(ev.currentTarget).removeClass('less')
          $(ev.currentTarget).closest('.nav-pics').removeClass('show')
        } else {
          $(ev.currentTarget).addClass('less')
          $(ev.currentTarget).closest('.nav-pics').addClass('show')
        }
      })

      $('.nav-pics').each((i, elem) => {
          if($(elem).hasClass('active')) {
            const countText = $(elem).find('.js-count-pic span')

            $(elem).find('.nav-pics__img').each((i, el) => {
              const id = $(el).parent().data('filter')
              const index = i;
              const length = $(elem).find('.nav-pics__img').length;

              if(length > 13) {
                $(el).parent().addClass('more');
                countText.text(length - 13)
              }

              $(el).on('mouseenter', (ev) => {
                myTimeout = setTimeout(function () {
                  $(".inner-slider .swiper-slide[data-filter='"+id+"']").each((i, el) => {
                    if(index === i) {
                      innerSwiper.slideTo(i, 900, false);
                    }
                  })
                }, 350);
              })

              $(el).on('mouseleave', () => {
                clearTimeout(myTimeout);
              })
            })
          }
      })

      $(".js-tab-button").on("click", function(){
        var filter = $(this).data('filter');
        $(".js-tab-button").removeClass("active");
        $('.nav-pics').removeClass("active");
        $(".nav-pics[data-filter='"+filter+"']").addClass('active')
        $(this).addClass("active");
        $(".inner-slider .swiper-slide").not("[data-filter='"+filter+"']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
        $(".inner-slider [data-filter='"+filter+"']").removeClass("non-swiper-slide").addClass("swiper-slide").attr("style", null).show();
        innerSwiper.destroy();
        if(window.innerWidth < 561) {
          innerSwiper.destroy();
          innerSwiper = new Swiper(el.querySelector('.swiper-container'),{
            freeMode: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            simulateTouch: true,
            lazy: {
              loadOnTransitionStart: true,
              loadPrevNextAmount: 2,
              loadPrevNext: true
            },
            loop: false,
            slidesPerView: 1,
            slidesPerGroup: 1,
            followFinger: true,
            spaceBetween: 20,
            navigation: {
              nextEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-next-swiper'),
              prevEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-prev-swiper'),
              disabledClass: 'swiper-lock'
            },
          });
        } else {
          innerSwiper = new Swiper(el.querySelector('.swiper-container'),{
            freeMode: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            simulateTouch: true,
            lazy: {
              loadOnTransitionStart: true,
              loadPrevNextAmount: 2,
              loadPrevNext: true
            },
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            loop: false,
            slidesPerView: 1,
            slidesPerGroup: 1,
            followFinger: true,
            spaceBetween: 20,
            navigation: {
              nextEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-next-swiper'),
              prevEl: getElement(el.closest('[data-slider="inner-slider"]'), '.js-prev-swiper'),
              disabledClass: 'swiper-lock'
            },
          });
        }

        $('.nav-pics').each((i, elem) => {
          if($(elem).hasClass('active')) {
            const countText = $(elem).find('.js-count-pic span')

            $(elem).find('.nav-pics__img').each((i, el) => {
              const id = $(el).parent().data('filter')
              const index = i;
              const length = $(elem).find('.nav-pics__img').length;

              if(length > 13) {
                $(el).parent().addClass('more');
                countText.text(length - 13)
              }

              $(el).on('mouseenter', (ev) => {
                myTimeout = setTimeout(function () {
                  $(".inner-slider .swiper-slide[data-filter='"+id+"']").each((i, el) => {
                    if(index === i) {
                      innerSwiper.slideTo(i, 900, false);
                    }
                  })
                }, 350);
              })

              $(el).on('mouseleave', () => {
                clearTimeout(myTimeout);
              })
            })
          }
        })
      })
    })
  }


  const tabSlider = document.querySelectorAll('[data-slider="tab-slider"]');

  if(tabSlider !== null) {
    tabSlider.forEach((el) => {
      const tabSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        followFinger: true,
        spaceBetween: 7,
        on: {
          afterInit: (event) => {

          },

        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="tab-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="tab-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        // pagination: {
        //   el: el.querySelector('.swiper-pagination'),
        //   clickable: true,
        // },
        breakpoints: {
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 7,
          },
          560: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            spaceBetween: 7,
          }
        },
      });
    })
  }

  const cartsSlider = document.querySelectorAll('[data-slider="carts-slider"]');

  if(cartsSlider !== null) {
    cartsSlider.forEach((el) => {
      const cartsSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 45,
        on: {
          afterInit: (event) => {

          },

        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="carts-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="carts-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
          type: 'progressbar'
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          }
        },
      });


      if(window.innerWidth > 640) {
        cartsSwiper.disable();
      }

      window.addEventListener('resize', function () {
        if(window.innerWidth > 640) {
          cartsSwiper.disable();
        } else {
          cartsSwiper.enable();
        }
      });
    })
  }

  $('body').on('click', '.js-close-magnific', () => {
    $.magnificPopup.close()
  })
  $('body').on('click', '.js-open-modal', (event) => {
    let $this = event.currentTarget;
    let $modalId = $($this).data('modal');

    $.magnificPopup.open({
      mainClass: 'mfp-with-zoom',
      items: {
        src: $modalId, // can be a HTML string, jQuery object, or CSS selector
        type: 'inline'
      },
      callbacks: {
        open() {
          $('body').addClass('popup-open')
        } ,
        close() {
          $('body').removeClass('popup-open')
        }
      }
    });
  })

  $('.burger').on('click', () => {
    $('.mob-menu').addClass('open')
  })

  $('.js-close-menu').on('click', () => {
    $('.mob-menu').removeClass('open')
  })

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,

      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    },
  });

  const blockInView = document.querySelectorAll('.js-inview');
  blockInView.forEach((el, i) => {
    $(el).bind('inview', function (event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        setTimeout(() => {

        }, 500)
      }
    });
  });

  $('.js-tabs-wrap').each((i, wrap) => {
      const buttons = $(wrap).find('.js-tab-button');
      const blocks = $(wrap).find('.js-tab-block');

      buttons.each((i, button) => {
        const id = $(button).data('id');
        $(button).on('click', () => {
          buttons.removeClass('is-active')
          $(button).addClass('is-active')
          blocks.hide()
          $(wrap).find('.js-tab-block[data-id="'+ id+'"]').fadeIn()
        })
      })
  })

  $('.js-toggle-parent').on('click', (ev) => {
    $(ev.currentTarget).parent().toggleClass('open')
  })

  let num;
  $('.js-count-prod').each((i, el) => {
    const plus = $(el).find('.js-count-plus');
    const minus = $(el).find('.js-count-minus');
    const input = $(el).find('input');

    if(parseInt(input.val()) === 0) {
      minus.addClass('disable')
    }

    minus.on('click', () => {
      num = parseInt(input.val());
      if (num > 0) {
        input.val(num - 1);
      }
      if(input.hasClass('js-adult-input')) {
        input.closest('.uniq-input').find('.js-adult-count').text(num - 1)
        if(num - 1 < 1) {
          minus.addClass('disable')
          input.closest('.uniq-input').find('.js-adult').hide();
        } else {
          minus.removeClass('disable')
          input.closest('.uniq-input').find('.js-adult').show();
        }
      }
      if(input.hasClass('js-kid-input')) {
        input.closest('.uniq-input').find('.js-kid-count').text(num - 1)
        if(num - 1 < 1) {
          minus.addClass('disable')
          input.closest('.uniq-input').find('.js-kid').hide();
        } else {
          minus.removeClass('disable')
          input.closest('.uniq-input').find('.js-kid').show();
        }
      }

    })

    plus.on('click', () => {
      num = parseInt(input.val());
      input.val(num + 1);
      if(input.hasClass('js-adult-input')) {
        input.closest('.uniq-input').find('.js-adult-count').text(num + 1)
        if(num + 1 < 1) {
          minus.addClass('disable')
          input.closest('.uniq-input').find('.js-adult').hide();
        } else {
          minus.removeClass('disable')
          input.closest('.uniq-input').find('.js-adult').show();
        }
      }
      if(input.hasClass('js-kid-input')) {
        input.closest('.uniq-input').find('.js-kid-count').text(num + 1)
        if(num + 1 < 1) {
          minus.addClass('disable')
          input.closest('.uniq-input').find('.js-kid').hide();
        } else {
          minus.removeClass('disable')
          input.closest('.uniq-input').find('.js-kid').show();
        }
      }

    })
  })

  $('.js-open-counter').each((i ,el) => {
    $(el).on('click', () => {
      $(el).next('.js-count-dropdown').toggleClass('open')
    })
  })

  $(document).mouseup(function(e)
  {
    var container = $(".uniq-input");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.find('.js-count-dropdown').removeClass('open')
    }
  });

  document.querySelectorAll('.checkbox-item').forEach((label) => {

    label.addEventListener('keyup', (event) => {
      var code = event.keyCode || event.which;

      if(code === 13) {
        label.querySelector('input').click()

        if(label.querySelector('input').checked) {
          label.setAttribute('aria-checked', 'true');
        } else {
          label.setAttribute('aria-checked', 'false');
        }
      }
    })

    label.addEventListener('click', (event) => {
      if(label.querySelector('input').checked) {
        label.setAttribute('aria-checked', 'true');
      } else {
        label.setAttribute('aria-checked', 'false');
      }
    })
  })


  $('.js-show-password').each((i, el) => {
     $(el).on('click', () => {
        if( $(el).hasClass('show')) {
           $(el).removeClass('show')
           $(el).next('input').attr('type', 'password').prop('type', 'password')
        } else {
           $(el).addClass('show')
           $(el).next('input').attr('type', 'text').prop('type', 'text')
        }
      })
  })

  const imgInp = document.querySelector('.js-avatar-input')
  const imgAva = document.querySelector('.js-upload-image')
  const removeAva = document.querySelector('.js-remove-ava')

  if(imgInp !== null) {
    imgInp.onchange = evt => {
      const [file] = imgInp.files
      if (file) {
        imgAva.src = URL.createObjectURL(file)
      }
    }

    removeAva.addEventListener('click', () => {
      imgInp.value = ''
      imgAva.src = ''
    })
  }

  $('.js-dropzone-trigger').on('click', () => {
    $('.dropzone').trigger('click')
  })

  $('.js-open-prc').each((i, el) => {
    const id = $(el).data('id')
    const block =  $(el).closest('.cart-item').find('.drop-cart[data-id="'+ id +'"]')
    $(el).on('click', () => {

      setTimeout(() => {
        if(block.hasClass('open')) {
          $(el).removeClass('open')
          block.removeClass('open')
          block.slideUp()
        } else {
          $('.js-open-prc').removeClass('open')
          $(el).closest('.cart-item').find('.drop-cart').slideUp()
          $(el).closest('.cart-item').find('.drop-cart').removeClass('open')
          $(el).addClass('open')
          block.addClass('open')
          block.slideDown()
        }
      }, 100)
    })
  })


  if(document.body.querySelector('.dropzone-block') !== null) {
    Dropzone.autoDiscover = false;

    function setup(id) {
      let options = {
        thumbnailHeight: 210,
        thumbnailWidth: 140,
        maxFilesize: 5000,
        maxFiles: 20,
        dictResponseError: "Server not Configured",
        dictFileTooBig: "File too big ({{filesize}}MB). Must be less than {{maxFilesize}}MB.",
        dictCancelUpload: "",
        acceptedFiles: ".png,.jpg,.jpeg",
        init: function() {
          var self = this;
          //New file added
          self.on("addedfile", function(file) {
            console.log("new file added ", file);
            $('.dz-progress').hide();
          });
          // Send file starts
          self.on("sending", function(file) {
            console.log("upload started", file);
          });

          self.on("complete", function(file, response) {
            if (file.name !== "442343.jpg") {
              //this.removeFile(file);
            }
          });

          self.on("maxfilesreached", function(file, response) {
            //alert("too big");
          });

          self.on("maxfilesexceeded", function(file, response) {
            this.removeFile(file);
          });

          self.on("addedfile", function(file) {
            const pattern = /\d{6}(\.)(jpg|jpeg|png)/;

            if (!pattern.test(file.name)) {
              //   this.removeFile(file);
            }
          });
        },
        accept: function(file, done) {
          // const pattern = /\d{6}(\.)/;

          // if (pattern.test(file.name)) {
          //   done();
          // } else {
          //   done("File name not a valid admission number");
          //   return false;
          // }
        },


        previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-error-message"><i class="fa fa-warning">&nbsp;</i><span data-dz-errormessage></span></div>
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
            <div class="dz-remove">
              <a href="javascript:undefined;" data-dz-remove="">
              <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.7276 0.46967C8.02049 0.762563 8.02049 1.23744 7.7276 1.53033L1.7276 7.53033C1.4347 7.82322 0.959829 7.82322 0.666936 7.53033C0.374042 7.23744 0.374042 6.76256 0.666936 6.46967L6.66694 0.46967C6.95983 0.176777 7.4347 0.176777 7.7276 0.46967Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.666935 0.46967C0.374043 0.762563 0.374043 1.23744 0.666935 1.53033L6.66694 7.53033C6.95983 7.82322 7.4347 7.82322 7.7276 7.53033C8.02049 7.23744 8.02049 6.76256 7.7276 6.46967L1.7276 0.46967C1.4347 0.176777 0.959829 0.176777 0.666935 0.46967Z"/>
              </svg>

              </a>
              </div>
          </div>
          `
      };

      var myDropzone = new Dropzone(`#${id}`, options);
    }

    setup("my-awesome-dropzone");
  }




})
