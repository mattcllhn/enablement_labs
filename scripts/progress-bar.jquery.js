/**
 * Created by conor.budge on 2/15/2017.
 */
jQuery(document).ready(function ($) {

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
});