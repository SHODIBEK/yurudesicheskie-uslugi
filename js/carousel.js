$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        center: false,
        items: 4,
        loop: false,
        margin: 24,
        touchDrag: true,
        autoplay: true,
        responsive: {
            1400: {
                items: 4,
            },
            1200: {
                items: 3.7,
            },
            1000: {
                items: 3.1,
            },
            800: {
                items: 2.5,
            },
            600: {
                items: 2,
                freeDrag: true
            },
            400: {
                items: 1.7,
                margin: 12,
                freeDrag: true,
                autoplayTimeout: 3000,

            },
            375: {
                items: 1.7,
                autoplay: true,
                autoplayTimeout: 3000,
            },
            320: {
                items: 1.5,
                autoplay: true,
                autoplayTimeout: 3000,
            },
            280: {
                items: 1.2,
                autoplay: true,
                autoplayTimeout: 3000,
            }
        }
    });
});