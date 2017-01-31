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
    //function to clone the exercise title - related function below.
    $(function () {
        var clonedHeaderRow;
        $("#block-views-chapter-view-v2-block .view-content").each(function () {
            //clonedHeaderRow = $(".exercise-name", this);
            clonedHeaderRow = $(".chapter-block", this);
            clonedHeaderRow.before(clonedHeaderRow.clone()).addClass("floatingHeader");
        });
        $(window).scroll(UpdateTableHeaders).trigger("scroll");
    });

    var currentSideTab = "nothing";
    var menuOpen = false;
    $(".side-menu div").click(function (e) {
        if (menuOpen == false) {
            $("#offside").addClass("expanded");
            $(".view-id-exercise_view").addClass(e.currentTarget.className);
            menuOpen = true;
            currentSideTab = e.currentTarget.className;
        }
        else if (menuOpen == true) {
            if (currentSideTab == e.currentTarget.className) {
                $("#offside").removeClass("expanded");
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


    $('#chapter-back span').click(function (e) {
        console.log("Clicked backward");
        $(".pager-previous a")[0].click();
    });
    $('#chapter-forward span').click(function (e) {
        console.log("Clicked forward");
        $(".pager-next a")[0].click();
    });

    $('#search-block-form').hide();
    $('.edit').hide();
    $('.delete').hide();

    $('#edit-submit').click(function (e) {
        // e.preventDefault();
    });
    $('.search_icon').click(function () {
        $('#search-block-form').toggle();
    }); //search icon onclick
    $('#user-login-form').hide();
    $('.account_icon').click(function () {
        $('#user-login-form').toggle();
    });
    $('.hamburger_menu').click(function () {
        $('#offside-navigation-wrapper').toggleClass('expanded');
        $('#site').toggleClass('body-menu-open');
    });
    //Progress bar logic
    if ($('.pager-current').length > 0) {
        progressBar();
    };

    function progressBar() {
        var currentPage = $('.pager-current').index();
        var str = $('.pager-current').text();
        var array = str.split(' ');
        var firstA = array.shift();
        var lastA = array.pop();
        firstA = parseInt(firstA);
        lastA = parseInt(lastA);
        //Get page number
        //var href = $(location).attr('href');
        //var pageNum = href.split("?page=")[1].split("/")[0];
        var progressBar = $('.progress-bar');
        progressBar.attr('style', "width: 0%");
        console.log("First: " + firstA + "Last: " + lastA);
        var percentage = ((firstA / lastA) * 100);
        console.log("Progress total" + percentage);

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
    }

    //Placeholders for username and password
    function addPlaceholders() {
        $('#edit-name').attr('placeholder', 'Username');
        $('#edit-pass').attr('placeholder', 'Password');
    }

    addPlaceholders();

    function UpdateTableHeaders() {
        $("#block-views-chapter-view-v2-block .view-content").each(function () {
            var el = $(this)
                , offset = el.offset()
                , scrollTop = $(window).scrollTop()
                , floatingHeader = $(".floatingHeader", this)
            if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
                // $("#offside-wrapper").removeClass("no-display");
                floatingHeader.css({
                    "visibility": "visible"
                });
            }
            else {
                // $("#offside-wrapper").addClass("no-display");
                floatingHeader.css({
                    "visibility": "hidden"
                });
            };
        });
    }

     function resetSideMenu() {
        $(".view-id-exercise_view").removeClass("take-notes question-submit table-of-contents");
    }



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

