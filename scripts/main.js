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
    var currentSideTab = "nothing";
    var menuOpen = false;
    
    $(".side-menu div").click(function (e) {
        if (menuOpen == false) {
            $("#offside-wrapper").addClass("expanded");
            $(".view-id-exercise_view").addClass(e.currentTarget.className);
            menuOpen = true;
            currentSideTab = e.currentTarget.className;
        }
        else if (menuOpen == true) {
            if (currentSideTab == e.currentTarget.className) {
                $("#offside-wrapper").removeClass("expanded");
                setTimeout(resetSideMenu, 500);
                menuOpen = false;
            }
            else if (currentSideTab != e.currentTarget.className) {
                resetSideMenu();
                $(".view-id-exercise_view").addClass(e.currentTarget.className);
                currentSideTab = e.currentTarget.className;
            };
        };
    });
    
    function resetSideMenu() { 
        $(".view-id-exercise_view").removeClass("take-notes question-submit table-of-contents");
    }
    
    $('#chapter-back span').click(function (e) {
        console.log("Clicked backward");
        $(".pager-previous a")[0].click();
    });
    $('#chapter-forward span').click(function (e) {
        console.log("Clicked forward");
        $(".pager-next a")[0].click();
    });

    //Progress bar logic
    var currentPage = $('.pager-current').index();
    var str = $('.pager-current').text();
    var array = str.split(' ');
    var firstA = array.shift();
    var lastA = array.pop();
    firstA = parseInt(firstA);
    lastA = parseInt(lastA);

    //Get page number
    var href = $(location).attr('href');
    var pageNum = href.split("?page=")[1].split("/")[0];

    var progressBar = $('.progress-bar');
    progressBar.attr('style', "width: 0%");
    var percentage = ((firstA / lastA) * 100);
    progressBar.css('width', percentage + '%');

    if (currentPage === firstA) {
        $('#chapter-back').addClass('hide-pagination');
    }
    else if (currentPage === (lastA - 1)) {
        $('#chapter-forward').addClass('hide-pagination');
    }
    else {
        $('#chapter-back').removeClass('hide-pagination');
    }


    $('#search-block-form').hide();
    $('#edit-submit').click(function (e) {
        // e.preventDefault();
    });
    $('.search_icon').click(function () {
        $('#search-block-form').toggle(400);
    }); //search icon onclick
    $('#user-login-form').hide();
    $('.account_icon').click(function () {
        $('#user-login-form').toggle(400);
    });
    $('.hamburger_menu').click(function () {
        $('#offside-navigation-wrapper').toggleClass('expanded');
        $('.page-wrapper').toggleClass('body-menu-open');
    });




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
