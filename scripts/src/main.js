
jQuery(document).ready(function ($) {
  
  //wraps each code tag to preformat contents
$('code').each(function(){$(this).wrap('<pre></pre>');});

$('.other-content > .field-items > .field-item')
.each(function(){
  console.log('this is a field item', $(this));
})
.contents()
  .filter(function() {
    // console.log('hello',this.nodeType);
    return this.nodeType === 3;
  })
    .wrap( "<p></p>" )
    .end();
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
    default:console.error('switch malfunctioned in caretnav');

  }

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
        $('.chapter-navigation #chapter-back').hide();
    }

    if (!forward.length) {
        $('.chapter-navigation #chapter-forward').hide();
    }

    $('#chapter-back span').click(function (e) {

        caretNav('back');
    });
    $('#chapter-forward span').click(function (e) {
        caretNav('next');
    });


    $('#search-block-form').hide();
    $('.edit').hide();
    $('.delete').hide();

    // prevents search and account dropdowns from stacking
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
    //opens and closes hamburger menu
    $('.hamburger_menu').click(function () {
        $('#offside-navigation-wrapper').toggleClass('expanded');
        $('#site').toggleClass('body-menu-open');
    });


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

    //Adding btn class to enrollment link
    $('.flag-lab-enrollment').addClass('btn btn-primary');

    //PLEASE KEEP still working on this for advanced mode
    // Add class to all images in labs and then show or hide based on button click
    // $('.steps-wrapper img').addClass('imgSwitch');
    // function showImage(){
    //     $('#imgSwitch').show();
    // }
    // function hideImage(){
    //     $('#imgSwitch').hide();
    // }
    // $('#target').click(function(){
    //     $('#imgSwitch').hide();
    // });

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
