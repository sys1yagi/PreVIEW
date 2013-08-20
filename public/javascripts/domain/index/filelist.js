'use strict';
define(
    [
        'components/flight/lib/component'
    ],
    function (component) {
        return component(FileList);
        function FileList() {
            this.currentFile = null;
            this.fileChange = function(selected){
                var $selected = $(selected);
                var fileName = $selected.attr("id");
                if(this.currentFile.attr("id") !== fileName){
                    this.currentFile.removeClass("active");
                    $selected.addClass("active");



                    this.currentFile = $selected;
                }
            }

            this.loadFileList = function(){
                var self = this;
                $.ajax({
                    type: "get",
                    url: 'filelist',
                    success: function (data) {
                        if(data.status === "ok"){
                            for(var i = 0; i < data.filelist.length; i++){
                                var file = data.filelist[i];
                                var element = $("<li style='cursor:pointer;' id='" + file + "'><a href='#'><i class='icon-file' />" + file + "</a></li>");
                                if(i === 0){
                                    self.currentFile = element;
                                    element.addClass("active");
                                }
                                self.$node.append(element);
                                element.on("click", function(){
                                    self.fileChange(this);
                                });
                            }
                        }
                        else{
                            //load error!
                            alert("Error: file list load error.");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
            this.after("initialize", function () {
                this.loadFileList();
            });
        }
    }
);