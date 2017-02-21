/**
 * Created by conor.budge on 1/25/2017.
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */
jQuery(document).ready(function ($) {
    //Function for smooth scroll to anchor on page
    // console.log('edit actions html content', typeof($('#edit-submit').val()));
if($('#edit-submit').val() == "Log in"){
    $('#edit-actions').append(
      '<a id = "signup-link" href = "/user/register">sign up</a>'
    );
}else{
  $('#user-login-form').hide();
}
    $(function () {$
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
            $("#offside").addClass("expanded");
            $(".view-id-exercise_view").addClass(e.currentTarget.className);
            menuOpen = true;
            currentSideTab = e.currentTarget.className;
        } else if (menuOpen == true) {
            if (currentSideTab == e.currentTarget.className) {
                $("#offside").removeClass("expanded");
                setTimeout(resetSideMenu, 500);
                menuOpen = false;
            } else if (currentSideTab != e.currentTarget.className) {
                resetSideMenu();
                $(".view-id-exercise_view").addClass(e.currentTarget.className);
                currentSideTab = e.currentTarget.className;
            };
        };
    });

    var back = $(".chapter-pager .pager-previous a"),
        forward = $(".chapter-pager .pager-next a");
    if (!back.length) {
        console.log('hide the back button');
        $('.chapter-navigation #chapter-back').hide();
    }else {
        $('#chapter-back span').click(function (e) {
            console.log("Clicked backward");
            $(".pager-previous a")[0].click();
        });
    }

    if (!forward.length) {
        console.log('hide the forward button');
        $('.chapter-navigation #chapter-forward').hide();
    } else {
        $('#chapter-forward span').click(function (e) {
            console.log("Clicked forward");
            $(".pager-next a")[0].click();
        });
    }

    // $('#chapter-back span').click(function (e) {
    //     console.log("Clicked backward");
    //     $(".pager-previous a")[0].click();
    // });
    // $('#chapter-forward span').click(function (e) {
    //     console.log("Clicked forward");
    //     $(".pager-next a")[0].click();
    // });

    $('#search-block-form').hide();
    $('.edit').hide();
    $('.delete').hide();

    $('#edit-submit').click(function (e) {
        // e.preventDefault();
    });
    $('.search_icon').click(function () {
      if($('#user-login-form').is(':visible')){
        $('#user-login-form').hide();
      }
        $('#search-block-form').toggle();
    }); //search icon onclick

    $('.account_icon').click(function () {
      if($('#search-block-form').is(':visible')){
        $('#search-block-form').hide();
      }
        $('#user-login-form').toggle();
    });
    $('.hamburger_menu').click(function () {
        $('#offside-navigation-wrapper').toggleClass('expanded');
        $('#site').toggleClass('body-menu-open');
    });

    var str = $('.pager-current').text();
    var array = str.split(' ');
    var firstA = array.shift();
    var lastA = array.pop();
    firstA = parseInt(firstA);
    lastA = parseInt(lastA);

    if (firstA > 1) {
        var href = $(location).attr('href');
        var pageNum = href.split("?page=")[1].split("/")[0];
        console.log("Current page: " + pageNum);
    }

    function scrollPage(speed) {
        var speed = speed || 0;
        $('html, body').animate({
            scrollTop: $('#scroll-here').offset().top
        }, speed);
    }



    if (pageNum >= 1) {
        scrollPage();
    }

    //Placeholders for username and password
    function addPlaceholders() {
        $('#edit-name').attr('placeholder', 'Username');
        $('#edit-pass').attr('placeholder', 'Password');
    }

    addPlaceholders();
    // progressBar();


    function resetSideMenu() {
        $(".view-id-exercise_view").removeClass("take-notes question-submit table-of-contents");
    }

});
