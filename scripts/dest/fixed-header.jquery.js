jQuery(document).ready(function ($) {
    var floatingHeader = $(".floating-header"),
        elStart = floatingHeader.offset().top,
        elEnd = (elStart + floatingHeader.height());

    console.log(JSON.stringify({
        elStart: elStart,
        elEnd: elEnd,
    }));
    //function to clone the exercise title - related function below.
    $(function () {
        console.log("here");
        floatingHeader.next().wrap("<div class='sticky-next-wrapper'></div>");
        $(window).scroll(UpdateFixedHeaders);
    });

    function UpdateFixedHeaders() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > elStart) {
            $(".sticky-next-wrapper").css({
                "padding-top": floatingHeader.css("height")
            });
            floatingHeader.addClass("floated-header");

        } 
        if(scrollTop <= elStart) {
            $(".sticky-next-wrapper").css({
                "padding-top": "0px"
            });
            floatingHeader.removeClass("floated-header");
        }
    }
});