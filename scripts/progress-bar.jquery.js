/**
 * Created by conor.budge on 2/15/2017.
 */
jQuery(document).ready(function ($) {
    var $dataComplete = $('.progress-bar').data('percent-complete');

    if ($('.pager-current').length > 0) {
        progressBar();
    }

function progressBar() {
    var progressBar = $('.progress-bar');
    progressBar.css('width', $dataComplete + "%");
}
});