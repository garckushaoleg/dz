class Anchor {
    constructor() {

    }

    goSmoothly() {
        $(document).ready(function () {
            $("a").on("click", function (e) {
                var anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top
                }, 500);
                e.preventDefault();
                return false;
            });
        });
    }
}

const anchor = new Anchor();
anchor.goSmoothly();