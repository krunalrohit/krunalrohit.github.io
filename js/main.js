var handleHomeContentHeight = function () {
    $("#home").height($(window).height() - 70);
},
    handleHeaderNavigationState = function () {
        $(window).on("scroll load", function () {
            var e = $(window).scrollTop(),
                t = $(window).height() - 100//$(".navbar").height();
            e >= t ? $(".navbar").addClass("navbar-small") : $(".navbar").removeClass("navbar-small");
            e >= t ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show");
        })
    },
    handleAddCommasToNumber = function (e) {
        return e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    },
    handlePageContainerShow = function () {
        $("#page-container").addClass("in")
    },
    handlePageScrollContentAnimation = function () {
        $('[data-scrollview="true"]').each(function () {
            var e = $(this), t = scrollMonitor.create(e, 100);
            t.enterViewport(function () {
                $(e).find("[data-animation=true]").each(function () {
                    var e = $(this).attr("data-animation-type"),
                        t = $(this);
                    if (!$(t).hasClass("animated"))
                        if ("number" == e) {
                            var a = parseInt($(t).attr("data-final-number"));
                            $({
                                animateNumber: 0
                            }).animate({
                                animateNumber: a
                            }, {
                                    duration: 1e3,
                                    easing: "swing",
                                    step: function () {
                                        var e = handleAddCommasToNumber(Math.ceil(this.animateNumber));
                                        $(t).text(e).addClass("animated")
                                    }
                                });
                        } else {
                            $(this).addClass(e + " animated"), setTimeout(function () { $(t).addClass("finishAnimated"); }, 1500);
                        }
                });
            });
        });
    },
    handleHeaderScrollToAction = function () {
        $("[data-click=scroll-to-target]").on("click", function (e) {
            e.preventDefault(), e.stopPropagation();
            var t = $(this).attr("href"),
                a = 50;
            if ($("html, body").animate({
                scrollTop: $(t).offset().top - a
            }, 1000, "easeInOutExpo"), "dropdown" == $(this).attr("data-toggle")) {
                var n = $(this).closest("li.dropdown");
                $(n).hasClass("open") ? $(n).removeClass("open") : $(n).addClass("open")
            }
        }), $(document).click(function (e) {
            e.isPropagationStopped() || $(".dropdown.open").removeClass("open")
        })
    },
    handleTooltipActivation = function () {
        0 !== $("[data-toggle=tooltip]").length && $("[data-toggle=tooltip]").tooltip()
    },
    handleThemePanelExpand = function () {
        $('[data-click="theme-panel-expand"]').on("click", function () {
            var e = ".theme-panel",
                t = "active";
            $(e).hasClass(t) ? $(e).removeClass(t) : $(e).addClass(t)
        })
    },
    handleThemePageControl = function () {
        if ($.cookie && $.cookie("theme")) {
            0 !== $(".theme-list").length && ($(".theme-list [data-theme]").closest("li").removeClass("active"), $('.theme-list [data-theme="' + $.cookie("theme") + '"]').closest("li").addClass("active"));
            var e = "css/skins/main-" + $.cookie("theme") + ".css";
            $("#theme").attr("href", e)
        }
        $(".theme-list [data-theme]").on("click", function () {
            var e = "css/skins/main-" + $(this).attr("data-theme") + ".css";
            $("#theme").attr("href", e), $(".theme-list [data-theme]").not(this).closest("li").removeClass("active"), $(this).closest("li").addClass("active"), $.cookie("theme", $(this).attr("data-theme"))
        })
    },
    handleTyping = function () {
        new Typed('.element', {
            strings: [
                'A passionate <span class="text-theme">software engineer</span>',
                'A Microsoft certified <span class="text-theme">developer &amp; administrator</span>',
                //'An aspring <span class="text-theme">designer</span>',
                //'A <span class="text-theme">developer</span> with passion of <span class="text-theme">creativity</span>',					
                'A fingestyle <span class="text-theme">guitarist</span>'],
            typeSpeed: 80,
            loop: true,
            startDelay: 1000,
        });
    },
    App = function () {
        "use strict";
        return {
            init: function () {
                handleHomeContentHeight(), handleHeaderNavigationState(), handlePageContainerShow(), handlePageScrollContentAnimation(), handleHeaderScrollToAction(), handleTooltipActivation(), handleThemePanelExpand(), handleThemePageControl(), handleTyping()
            }
        }
    }();

$(document).ready(function () {
    App.init();
});	