define(['jquery', "jade", "keyview", "user", "settingsview", "collaborators"],
       function($, jade, KeyView, User, SettingsView, Collaborators){
    //Jquery Initialisation stuff goes here.
    var Radish = (function(){
        function Radish(){
            this.data = null;
            this.chunkedNS = null;
            this.user = new User();

            var _self = this;
            $.ajax({
                type: 'GET',
                url: '/get/all',
                dataType: "json",
                success: function(result){
                    _self.data = result;
                },
                complete: function(){
                    _self.getNameSpaces();
                    _self.bindActions();
                }
            });
        };

        Radish.prototype = {

            getNameSpaces: function(){
                var uniqNS = this.getUniqNamespaces();
                this.chunkedNS = this.makeNSChunks(uniqNS);
                this.render();
            },

            getUniqNamespaces: function(){
                var keys = Object.keys(this.data);

                //Fetch Namespace from keys
                var nsChunks = keys.map(function(key){
                    //return key.match(/[a-zA-Z0-9]+/)[0];
                    return key.match(/[^\:|^\.]+/)[0];
                });

                //Remove Duplicate namespace. Unique method comes from
                // Monkey patched Array in utility.js
                return nsChunks.unique();
            },

            makeNSChunks: function(uniqNS){
                var chunk, loopCount = 0 , keyCount = uniqNS.length;

                if(keyCount > 0 ) chunk = parseInt(keyCount / 4);

                if(chunk*4 == keyCount){
                    loopCount = chunk;
                }else{
                    loopCount = chunk++;
                };

                var namespaces = [];
                for(i=0; i <= loopCount; i++){
                    var index = i*4;
                    var upto = (i*4)+4;
                    namespaces.push( uniqNS.slice(index, upto) );
                };
                return namespaces;
            },

            render: function(){
                $('.row .badge-group-list').empty();
                $('.page-header').html("Namespaces");
                $('.panel-heading #panel-header').html("List of namespaces");
                $('.addkey-right').show();
                $('.row .badge-group-list').append(
                    JST['assets/templates/namespace-list'](
                        {namespaces: this.chunkedNS}
                    )
                );
                this.bindNS();
            },

            bindNS: function(){
                var _self = this;
                $('.list-group-item.list-group').each(function(index,elem){
                    $(elem).on('click', function(){
                        var showview = new KeyView(_self, $(this));
                    });
                });
            },

            bindActions: function(){
                var _self = this;
                //Namespace Sidebar
                $('#namespaces').on('click', function(ev){
                    ev.preventDefault();
                    _self.getNameSpaces();
                    _self.makeLabelActive(this);
                });

                //Upload sidebar
                $('#upload').on('click', function(ev){
                    ev.preventDefault();
                    _self.showUploadForm();
                    _self.makeLabelActive(this);
                    _self.bindUploadKeys();
                });

                // Setup SettingsView
                var settingsview = new SettingsView(this.user);

                //Setup Collaborators View
                var collaborators = new Collaborators();

                _self.initModalEvents();
            },

            showUploadForm: function(){
                $('.row .badge-group-list').empty();
                $('.page-header').html("Upload JSON");
                $('.panel-heading #panel-header').html("Upload a json file.");
                $('.addkey-right').hide();
                $('.row .badge-group-list').append(
                    JST['assets/templates/upload']()
                );
            },

        //Makes the clicked label active in sidebar.
            makeLabelActive: function(elem){
                var parent = $(elem).attr('id');

                //First makes all sidebar elements inactive.
                $('.nav.nav-sidebar li').each(function(index, elem){
                    $(elem).attr('class','');
                });

                //Makes the clicked elements list active.
                $('.nav.nav-sidebar li #'+parent).parent().attr('class','active');
            },

            initModalEvents: function(){
                $('.newkey-modal').on('show.bs.modal', function(e){
                    var savebutton = $(this).find('.btn');

                    savebutton.on('click', function(){
                        var key = $(this).parents().find('#redis-key').val();
                        var value = $(this).parents().find('#redis-value').val();
                        var url = "/set/" + key + "/" + value;

                        $.ajax({
                            type: 'GET',
                            url: url,
                            dataType: "json",
                            beforeSend: function(){
                                waitingDialog.show('Saving', {
                                    dialogSize: 'sm', progressType: 'danger'
                                });
                            },
                            success: function(result){
                                _self._contxt.data = result;
                            },
                            complete: function(){
                                waitingDialog.hide();
                            }
                        });
                    });
                });
            },

            bindUploadKeys: function(){
                var _self = this;

                $('#input-file').on('change', (_self.prepareUpload).bind(_self));
                _self.bindRemoveUploadButton();
            },


            prepareUpload: function(event){
                var _self = this;
                var file = event.target.files;
                $('.fileinput-remove-button').removeClass('hide');
                $('.fileinput-upload-button').removeClass('hide');
                $('.file-caption-ellipsis').html(file[0].name);

                $('.fileinput-upload-button').on('click', function(ev){
                    var formData = new FormData();

                    //Append file object in data.
                    formData.append('form',file[0], file[0].name);

                    $.ajax({
                        url: "/upload",
                        type: "POST",
                        data: formData,
                        cache: false,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        beforeSend: function(){
                            waitingDialog.show('Saving', {
                                dialogSize: 'sm', progressType: 'danger'
                            });
                        },
                        success: function(data, textStatus, jqXHR){
                            if (typeof data.error === 'undefined'){
                                _self.data = data;
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('ERRORS:' + errorThrown);
                        },
                        complete: function(){
                            waitingDialog.hide();
                            _self.getNameSpaces();
                        }
                    });
                });
            },

            bindRemoveUploadButton: function(){
                $('.fileinput-remove-button').on('click', function(){
                    $(this).addClass('hide');
                    $('.fileinput-upload-button').addClass('hide');
                    $('.file-caption-ellipsis').html('…');
                });
            }
        };
        return Radish;
    }).call(this);

    return Radish;
});
