jQuery(document).ready(function ($) {
    var floatingHeader = $(".floating-header"),
        adminMenu      = $('#admin-menu-wrapper');

    if(floatingHeader.length == 0){ 
        /**
         * If the fixed header can't be found, immediately 
         * return and do nothing.
         */
        return;
    }

    var elStart = floatingHeader.offset().top,
        elEnd = (elStart + floatingHeader.height());

    if(adminMenu.length){
        /**
         * If an administrator is logged in, the admin menu will force
         * the fixed header to begin ~50px further down.
         */
        elStart+=50;    
    }
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