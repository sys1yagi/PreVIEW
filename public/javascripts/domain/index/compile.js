/**
 * コンパイルしてプレビューに反映する人
 */
'use strict';
define(
    [
        'components/flight/lib/component'
    ],
    function (component) {
        return component(Compile);
        function Compile() {
            var self = this;
            this.defaultAttrs({
                "source": "",
                "destination": ""
            });
            this.compile = function () {
                var source = $(this.attr.source).val();
                var preview = $(this.attr.destination);

                $.ajax({
                    type:"post",
                    url:'compile',
                    data:{
                        "source":source
                    },
                    success:function(data){
                        preview.html(data);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }

            this.after("initialize", function () {
                this.on(document, "source_code_compile", function(){
                    this.compile();
                });
                this.compile();
            });
        }
    }
);