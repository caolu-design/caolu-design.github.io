
function gotoTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

var headerId = $(".sticky-header");

$(window).on('scroll', function () {
    // console.log($(this).scrollTop());
    if ($(this).scrollTop() > 1) {
        $(".scrollToTop").show();
    } else {
        $(".scrollToTop").hide();
    }
});

$(document).ready(function () {
    // 首頁橫幅輪播
    var swiper = new Swiper('.swiper-container', {
        loop: true/*,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }*/,
    });

    // 載入案例資料
    $.getJSON('Data/Cases.json', function(data) {
        var casesContainer = $('#cases-container');
        
        // 產生案例縮圖
        $.each(data, function(index, caseItem) {
            if (caseItem.Photos && caseItem.Photos.length > 0) {
                var firstPhoto = caseItem.Photos[0];
                var caseHtml = '<div class="col-lg-3 col-md-4 col-sm-6 mb-4 animate__animated animate__fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">' +
                    '<div class="case-item" data-case-id="' + caseItem.id + '">' +
                    '<div class="case-img-wrapper">' +
                    '<img src="' + firstPhoto.path + '" alt="' + caseItem.name + '" class="case-img">' +
                    '<div class="case-overlay">' +
                    '<div class="case-overlay-content">' +
                    '<h5>' + caseItem.name + '</h5>' +
                    '<p>點擊查看更多</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<h6 class="case-name">' + caseItem.name + '</h6>' +
                    '</div>' +
                    '</div>';
                casesContainer.append(caseHtml);
            }
        });

        // 點擊案例開啟燈箱
        $('.case-item').on('click', function() {
            var caseId = $(this).data('case-id');
            var selectedCase = data.find(function(item) {
                return item.id === caseId;
            });
            
            if (selectedCase) {
                openLightbox(selectedCase);
            }
        });
    });

    // 燈箱變數
    var lightboxSwiper = null;
    var lightboxThumbsSwiper = null;

    // 開啟燈箱函式
    function openLightbox(caseData) {
        $('#lightbox-title').text(caseData.name);
        
        // 清空並產生主圖輪播
        var swiperWrapper = $('#lightbox-swiper-wrapper');
        swiperWrapper.empty();
        $.each(caseData.Photos, function(index, photo) {
            var slideHtml = '<div class="swiper-slide">' +
                '<img src="' + photo.path + '" alt="' + photo.description + '">' +
                '</div>';
            swiperWrapper.append(slideHtml);
        });

        // 清空並產生縮圖
        var thumbsWrapper = $('#lightbox-thumbs-wrapper');
        thumbsWrapper.empty();
        $.each(caseData.Photos, function(index, photo) {
            var thumbHtml = '<div class="swiper-slide">' +
                '<img src="' + photo.path + '" alt="' + photo.description + '">' +
                '</div>';
            thumbsWrapper.append(thumbHtml);
        });

        // 顯示燈箱
        $('#caseLightbox').fadeIn(300);
        $('body').css('overflow', 'hidden');

        // 初始化縮圖輪播
        lightboxThumbsSwiper = new Swiper('.swiper-container-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                320: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                }
            }
        });

        // 初始化主圖輪播
        lightboxSwiper = new Swiper('.swiper-container-lightbox', {
            loop: true,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: lightboxThumbsSwiper,
            }
        });
    }

    // 關閉燈箱函式
    function closeLightbox() {
        $('#caseLightbox').fadeOut(300);
        $('body').css('overflow', 'auto');
        
        // 銷毀 Swiper 實例
        if (lightboxSwiper) {
            lightboxSwiper.destroy(true, true);
            lightboxSwiper = null;
        }
        if (lightboxThumbsSwiper) {
            lightboxThumbsSwiper.destroy(true, true);
            lightboxThumbsSwiper = null;
        }
    }

    // 點擊關閉按鈕
    $('.lightbox-close').on('click', function() {
        closeLightbox();
    });

    // 點擊背景關閉
    $('#caseLightbox').on('click', function(e) {
        if (e.target.id === 'caseLightbox') {
            closeLightbox();
        }
    });

    // ESC 鍵關閉
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#caseLightbox').is(':visible')) {
            closeLightbox();
        }
    });
});