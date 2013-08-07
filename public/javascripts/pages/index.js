'use strict';
define(
    [
        "javascripts/domain/index/compile",
        "javascripts/domain/index/source_code_observer",
    ],
    function(compile, observer){
        function initialize(){
            var source= $("#source_code");
            var preview= $("#preview");
            function fitHeight(){
                source.height($(window).height()-source.offset().top-50);
                preview.height($(window).height()-preview.offset().top-50);
            }
            $(window).on("resize", fitHeight);
            fitHeight();

            compile.attachTo("#preview", {"source":"#source_code", "destination":"#preview"});
            observer.attachTo("#source_code", {});
        }
        return initialize;
    }
);