jQuery(document).ready(function ($) {
    var floatingHeader = $("#block-views-chapter-view-v2-block .view-header"),
        adminMenu = $('body.admin-menu');
    if(floatingHeader.length == 0){ 
        /**
         * If the fixed header can't be found, immediately 
         * return and do nothing.
         */
        return;
    }

    var elStart = floatingHeader.offset().top,
        elEnd = (elStart + floatingHeader.height());
    
//    if (adminMenu.length > 0) {
//        /**
//         * If an administrator is logged in, the admin menu will force
//         * the fixed header to begin ~30px further down.
//         */
//        elStart += 30;    
//    }

    console.log(JSON.stringify({
        elStart: elStart,
        elEnd: elEnd,
    }));
    //function to clone the chapter title area - related function below.
    $(function () {
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
            //update the height when scrolling above the elements
            //this should be optimized once admin menus and collapse/expand logic is solidified 
            elStart = floatingHeader.offset().top;
            $(".sticky-next-wrapper").css({
                "padding-top": "0px"
            });
            floatingHeader.removeClass("floated-header");
        }
    }
});