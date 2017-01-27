/**
 * Created by conor.budge on 1/25/2017.
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */
jQuery(document).ready(function ($) {
    //Function for smooth scroll to anchor on page
    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

     $('#chapter-back span').click(function(e) {
        console.log("Clicked backward");
        $(".pager-previous a")[0].click();
    });
    
    $('#chapter-forward span').click(function(e) {
        console.log("Clicked forward");
        $(".pager-next a")[0].click();
    });

    var currentPage = $('.pager-current').index();
    var str = $('.pager-current').text();

    var array = str.split(' ');
    var firstA = array.shift();
    var lastA = array.pop();

    console.log(firstA + lastA);

    var percentage = ((firstA/lastA) * 100);
    $('.progress-bar').css('width', percentage + '%');

    if( currentPage === 0) {
        $('#chapter-back').addClass('hide-pagination');
    } else if (currentPage === 12) {
        $('#chapter-back').addClass('hide-pagination');
    } else {
        $('#chapter-back').removeClass('hide-pagination');
    }

    console.log($('.pager-current').text());

    console.log("Current page is: " + currentPage);

    $('#search-block-form').hide();
    $('#edit-submit').click(function(e){
      e.preventDefault();
    });

    $('.search_icon').click(function(){
      $('#search-block-form').toggle(400);
    });//search icon onclick


//       $('#block-views-chapter-view-v2-block').on('click', '#chapter-back span', function(e) {
//         console.log("Clicked back");
//        $(".pager-previous a").click();
//        //e.preventDefault();
//    });

//    $('#block-views-chapter-view-v2-block').on('click', '#chapter-forward span', function(e) {
//        console.log("Clicked forward");
//        $(".pager-next a").click();
//        //e.preventDefault();
//    });

});

