/**
 * Created by conor.budge on 2/15/2017.
 */
jQuery(document).ready(function ($) {
// var $currentPage = $('.pager-current').index();
// var str = $('.pager-current').text();
// var array = str.split(' ');
// var firstA = array.shift();
// var lastA = array.pop();
// firstA = parseInt(firstA);
// lastA = parseInt(lastA);
// console.log("Current page: " + $currentPage);
var $numCompleted = parseInt($('.num-completed-chapters').text());
var $totalChapter = parseInt($('.total-chapters').text());

    if ($('.pager-current').length > 0) {
        progressBar();
    }

function progressBar() {
    var progressBar = $('.progress-bar');
    progressBar.attr('style', "width: 0%");
    console.log("First Value: " + $numCompleted + " Last Value: " + $totalChapter);
    var percentage = (($numCompleted / $totalChapter) * 100);
    console.log("Progress total " + percentage);
    progressBar.css('width', percentage + '%');
}

    // if ($currentPage === 1) {
    //     $('#chapter-back').addClass('hide-pagination');
    // }
    // else if ($currentPage === 11) {
    //     $('#chapter-forward').addClass('hide-pagination');
    // }
    // else {
    //     $('#chapter-back').removeClass('hide-pagination');
    // }

});