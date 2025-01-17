var _animateScroll = false;

function scrollToEndBak() {
    var scrollTo = _animateScroll ? beginningOfCurrentTurnScrollPosition - 50 - $("#gamePanelSpacer").height() : $(document).height();
    var currentScrollTop = Math.max($("body").scrollTop(), $("html").scrollTop());
    if (scrollTo > currentScrollTop) {
        var maxScrollTop = $(document).height() - $(window).height();
        if (scrollTo > maxScrollTop) scrollTo = maxScrollTop;
        var distance = scrollTo - currentScrollTop;
        var duration =  distance / 0.4;
        // Added by The Pixie on behalf of alexandretorres
        if (duration>2000) duration=2000;
        $("body,html").stop().animate({ scrollTop: scrollTo }, duration, "easeInOutCubic");
    }
    $("#txtCommand").focus();
    // Added by The Pixie; this is a fall back, as the above seems not to work on some browsers
    // In fact it may be the all the rest of this can deleted
    $('html,body').animate({ scrollTop: document.body.scrollHeight }, 'fast');
};

var scrollToEnd = function() {
    var scrollTo = _animateScroll ? beginningOfCurrentTurnScrollPosition - 50 - $("#gamePanelSpacer").height() : $(document).height();
    var currentScrollTop = Math.max($("body").scrollTop(), $("html").scrollTop());
    if (scrollTo > currentScrollTop) {
        var maxScrollTop = $(document).height() - $(window).height();
        if (scrollTo > maxScrollTop) scrollTo = maxScrollTop;
        var distance = scrollTo - currentScrollTop;
        var duration = _animateScroll ? distance / 0.4 : 1;
        /* Added by The Pixie on behalf of alexandretorres*/
        if (duration>2000) duration=2000;
        $("body,html").stop().animate({ scrollTop: scrollTo }, duration, "easeInOutCubic");
    }
   $("#txtCommand").focus();
};

function setCommandBarStyle(style) {
  /* DO NOTHING */
}
