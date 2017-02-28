jQuery(document).ready(function ($) {

function caretNav(arg){
  // console.log('caretNav still works');
  switch (arg) {
    case 'next':
    //make sure action link exists
    if($('.flag-action').is(':visible')){
      //simulates click on flag wrapper
    $('.flag-wrapper>.flag-action').click();
      //listens for flag ajax call to complete
      $(document).ajaxComplete(function(event,request, settings){
      //makes sure it's flag url
      if(settings.url.search("/flag/")!==-1){
        //checks if the pager exists
        if($('.pager-next a')){
            $(".pager-next a")[0].click();
          }//if pager-next
      }//if setting-url
    });//ajaxComplete
  }else {
  $(".pager-next a")[0].click();
}//else
      break;
      case 'back':
          //checks if the pager exists
          if($('.pager-previous a')){
              $(".pager-previous a")[0].click();
            }//if
        break;
    default:console.log('switch malfunctioned in caretnav');

  }
  // console.log("caretnav click",arg);

  // $(document).ajaxComplete(function(event,request, settings){
  //   console.log('clickFlag\n\n',settings.url.search('/flag/'));
  //   if(settings.url.search("/flag/")!==-1){
  //     $(".pager-next a")[0].click();
  //   }
//     if(settings.url !=='/js/time_spent/ajax/26/KcXftISdFugDrw827FD-wqYHbRrm-E9O6EUSdRgEPZk?js=1' ){
  //   console.log('ajaxComplete function\n\n\n event:\n '+JSON.stringify(event)+
  //   '\n\n\nrequest\n'+JSON.stringify(request)+
  // '\n\n\nsettings\n'+JSON.stringify(settings));
// }
  // console.log('window',window.location);
  // console.log('time spent ajax called');
// });//ajaxComplete
}

if($('#edit-submit').val() == "Log in"){
    $('#edit-actions').append(
      '<a id = "signup-link" href = "/user/register">sign up</a>'
    );
}else{
  $('#user-login-form').hide();
}

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
        if (menuOpen === false) {
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
            }
        }
    });

    /**
     * IF on last chapter, hide the 'back'/'forward' chevron buttons.
     */
    var back = $(".chapter-pager .pager-previous a"),
        forward = $(".chapter-pager .pager-next a");
    if (!back.length) {
        console.log('hide the back button');
        $('.chapter-navigation #chapter-back').hide();
    }

    if (!forward.length) {
        console.log('hide the forward button');
        $('.chapter-navigation #chapter-forward').hide();
    } 
    
    $('#chapter-back span').click(function (e) {
        console.log("Clicked backward");
        caretNav('back');
        // $(".pager-previous a")[0].click();
    });
    $('#chapter-forward span').click(function (e) {
        console.log("Clicked forward");
        caretNav('next');
    // $(".pager-next a")[0].click();
    });


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
    //Progress bar logic
    // if ($('.pager-current').length > 0) {
    //     progressBar();
    // };

    // var currentPage = $('.pager-current').index();
    var str = $('.chapter-pager > .chapter-title').text();
    var array = str.split(' ');
    var firstA = array.shift();
    var lastA = array.pop();
    firstA = parseInt(firstA);
    lastA = parseInt(lastA);


    //Scroll to anchor
    var pageNum;
    if (firstA > 1) {
        var href = $(location).attr('href');
        pageNum = href.split("?page=")[1].split("/")[0];
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
