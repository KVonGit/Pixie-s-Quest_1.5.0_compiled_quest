let pqJsVersion = "1.0.0";

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

var saveClearedText = true;
var clearedOnce = false;
function clearScreen() {
    if (!saveClearedText) {
        $("#outputData").appendTo($("body"));
        $("#divOutput").css("min-height", 0);
        $("#divOutput").html("");
        createNewDiv("left");
        beginningOfCurrentTurnScrollPosition = 0;
        setTimeout(function () {
            $("html,body").scrollTop(0);
        }, 100);
        $("#outputData").appendTo($("#divOutput"));
    } else {
        $("#divOutput").append("<hr class='clearedAbove' />");
        if (!clearedOnce) {
            addText('<style>#divOutput > .clearedScreen { display: none; }</style>');
        }
        clearedOnce = true;
        $('#divOutput').children().addClass('clearedScreen');
        $('.clearedScreen').attr('id',null);
        $('#divOutput').css('min-height', 0);
        createNewDiv('left');
        beginningOfCurrentTurnScrollPosition = 0;
        setTimeout(function () {
            $('html,body').scrollTop(0);
        }, 100);
    }
}

function showScrollback() {
    var scrollbackDivString = '<div id="scrollback-dialog" style="display:none;"><div id="scrollbackdata"></div></div>';
    addText(scrollbackDivString);
    var scrollbackDialog = $("#scrollback-dialog").dialog({
        autoOpen: false,
        width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 100,
        height: (window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight) - 100,
        title: "Scrollback",
        buttons: {
            Ok: function () {
                $(this).dialog("close");
                $(this).remove();
                $("#scrollback-dialog,#scrollbackdata").remove();
            },
            Print: function () {
                printScrollbackDiv();
            },
        },
        show: { effect: "fadeIn", duration: 500 },
        modal: true,
    });
    $('#scrollbackdata').html($('#divOutput').html());
    $("#scrollbackdata a").addClass("disabled");
    scrollbackDialog.dialog("open");
    setTimeout(function () {
        $("#scrollbackdata a").addClass("disabled");
    }, 1);
}

function printScrollbackDiv() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentWindow.document.write($("#scrollbackdata").html());
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
    $("#scrollback-dialog").dialog("close");
    $("#scrollback-dialog").remove();
}