'use strict';
define(
    [
        "javascripts/domain/index/compile",
        "javascripts/domain/index/source_code_observer",
    ],
    function(compile, observer){
        function initialize(){
            compile.attachTo("#preview", {"source":"#source_code", "destination":"#preview"});
            observer.attachTo("#source_code", {});
        }
        return initialize;
    }
);