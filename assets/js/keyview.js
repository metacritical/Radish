define(['jquery',"jade"], function($,jade){
    var KeyView = (function(){
        function KeyView(_contxt, elem){
            this._contxt = _contxt;
            this.namespace = elem.attr("id");

            this.render();
            this.bindKeys();
        };

        KeyView.prototype = {
            render: function(){
                $('.row .badge-group-list').empty();
                $('.page-header').html(this.namespace);
                $('.panel-heading #panel-header').html(
                    this.namespace + " Namespace"
                );
                $('.row .badge-group-list').append(
                    JST['assets/templates/listview'](
                        {keyvals: this.getKeyValue()}
                    )
                );

                //Make Table Editable
                $('#mainTable').editableTableWidget({editor: $('<textarea>')});
            },

            getKeyValue: function(){
                var namespace = this.namespace;
                var data = this._contxt.data;
                var keys = Object.keys(data);

                var pairs = keys.map(function(key){
                    if(namespace === key.match(/[^\:|^\.]+/)[0]){
                        var object = {};
                        object[key] = data[key];

                        return object;
                    }
                });
                return pairs.unique();
            },

            bindKeys: function(){
                var _self = this;

                $('#mainTable td[data-key]').on('change', function(evt, value){
                    _self.setKey(this, value);
                });

                $('#mainTable td[data-val]').on('change', function(evt, value){
                    _self.setValue(this, value);
                });
            },

            setKey: function(elem, val){
                var _self = this;
                var original = $(elem).data('key');
                var modified = val;
                var url = "/rename/" + original + "/" + modified;

                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: "json",
                    beforeSend: function(){
                        waitingDialog.show('Saving', {
                            dialogSize: 'sm', progressType: 'danger'
                        });
                    },
                    success: function(result){
                        _self._contxt.data = result;

                        //Modify self data-key to reflect changed value
                        $(elem).attr('data-key', modified);

                        //modify the consecutive value when key is modified.
                        $("[id='"+original+"']").attr('id', modified);
                    },
                    complete: function(){
                        waitingDialog.hide();
                    }
                });
            },

            setValue: function(elem, val){
                var _self = this;
                var key = $(elem).attr('id').toString();
                var modified = val.toString();
                var url = "/set/" + key + "/" + modified;
                $.ajax({
                    type: 'POST',
                    url: url,
                    dataType: "json",
                    data: JSON.stringify( {setvalue: {key: modified}} ),
                    beforeSend: function(){
                        waitingDialog.show('Saving', {
                            dialogSize: 'sm', progressType: 'primary'
                        });
                    },
                    success: function(result){
                        _self._contxt.data = result;
                    },
                    complete: function(){
                        waitingDialog.hide();
                    }
                });
            }

        };


        return KeyView;
    }).call(this);

    return KeyView;
});
