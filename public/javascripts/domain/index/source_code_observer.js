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

            var lineObjOffsetTop = 2;
            function createTextAreaWithLines(id) {
                var el = document.createElement('DIV');
                var ta = document.getElementById(id);
                ta.parentNode.insertBefore(el, ta);
                el.appendChild(ta);

                el.className = 'textAreaWithLines';
                el.style.width = (ta.offsetWidth + 30) + 'px';
                ta.style.position = 'absolute';
                ta.style.left = '30px';
                el.style.height = (ta.offsetHeight + 2) + 'px';
                el.style.overflow = 'hidden';
                el.style.position = 'relative';
                el.style.width = (ta.offsetWidth + 30) + 'px';
                var lineObj = document.createElement('DIV');
                lineObj.style.position = 'absolute';
                lineObj.style.top = lineObjOffsetTop + 'px';
                lineObj.style.left = '0px';
                lineObj.style.width = '27px';
                el.insertBefore(lineObj, ta);
                lineObj.style.textAlign = 'right';
                lineObj.className = 'lineObj';

                ta.onkeydown = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onmousedown = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onscroll = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onblur = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onfocus = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onmouseover = function () {
                    positionLineObj(lineObj, ta);
                };
                ta.onkeyup = function(){
                    updateLineCount(lineObj, id);
                }
                updateLineCount(lineObj, id);
            }
            function positionLineObj(obj, ta) {
                obj.style.top = (ta.scrollTop * -1 + lineObjOffsetTop) + 'px';
            }

            //line counts
            var lineCount = 0;
            function updateLineCount(lineObj, id){
                var ta = document.getElementById(id);
                var value = ta.value;
                var num1 = value.match(/\r\n/g); //IE
                var num2 = value.match(/\n/g);   //Chrome, Firefox
                var count = 0;
                if(num1 != null){
                    count = num1.length+1;
                }
                else if(num2 != null){
                    count = num2.length+1;
                }
                if(lineCount != count){
                    var string = '';
                    for (var no = 1; no <= count; no++) {
                        if (string.length > 0)string = string + '<br>';
                        string = string + no;
                    }
                    lineCount = count;
                    lineObj.innerHTML = string;
                }
            }

            function tabIndentEnable(id){
                var el = document.getElementById(id)
                tabIndent.render(el);
            }

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
                createTextAreaWithLines(this.node.id);
                tabIndentEnable(this.node.id);
            });
        }
    }
);