
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
});