/**
 * Created by conor.budge on 1/25/2017.
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */
jQuery(document).ready(function ($) {
    //Function for smooth scroll to anchor on page
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    $('#block-views-chapter-view-v2-block').on('click', '#chapter-back span', function(e) {
        console.log("Clicked back");
        $(".pager-previous a").click();
        e.preventDefault();
    });

    $('#block-views-chapter-view-v2-block').on('click', '#chapter-forward span', function(e) {
        console.log("Clicked forward");
        $(".pager-next a").click();
        e.preventDefault();
    });

});
