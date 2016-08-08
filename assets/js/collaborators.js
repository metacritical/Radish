define(['jquery', "jade"], function($,_){
    var Collaborators = (function(){
        function Collaborators(){
            var _self = this;
            //Constructor
            $('#collaborators').on('click', function(ev){
                ev.preventDefault();
                _self.render();
                _self.getAll();
            });
        }

        Collaborators.prototype = {
            render: function(){
                //Render Collaborators View
                $('.row .badge-group-list').empty();
                $('.page-header').html("Add Collaborators");
                $('.panel-heading #panel-header').html("List of Collaborators");
                $('.addkey-right').hide();
                $('.row .badge-group-list').append(
                    JST['assets/templates/collabview']()
                );

            },

            add: function(){
                //Something

            },

            getAll: function(){
                //Get All Collaborators.
                $.ajax({
                    type: 'GET',
                    url: '/get/collaborators',
                    dataType: "json",
                    success: function(result){
                        //Do something on success.
                        console.log(result);
                    },
                    complete: function(){
                        //Do Something After completion.
                    }
                });

            }
        };

        return Collaborators;
    }).call(this);

    return Collaborators;
});
