/**
 * textareaの監視を行いコンパイルを行う
 */
'use strict';
define(
    [
        'components/flight/lib/component'
    ],
    function (component) {
        return component(SourceCodeObserver);
        function SourceCodeObserver() {
            this.after("initialize", function () {
                var self = this;
                var timer = null;
                var prev = null;
                this.on("keyup", function (e) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        if (prev !== self.$node.val()) {
                            console.log("changed");
                            prev = self.$node.val();
                            self.trigger(document, "source_code_compile");
                        }
                        else {
                            console.log("not changed");
                        }
                    }, 500);
                });
            });
        }
    }
);