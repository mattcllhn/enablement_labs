/**
 * Created by conor.budge on 2/15/2017.
 */
jQuery(document).ready(function ($) {
    var $dataComplete = $('.progress-bar').data('percent-complete');

    function progressBar() {
        var progressBar = $('.progress-bar');
        progressBar.css('width', $dataComplete + "%");
    }

    progressBar();
});

