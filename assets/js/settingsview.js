define(['jquery',"jade", "user"], function($, jade, User){
    var SettingsView = (function(){
        function SettingsView(user){
            var _self = this;
            this.bindActions(user);
        };

        SettingsView.prototype = {
            render: function(data){
                //render settings view
                $('.row .badge-group-list').append(
                    JST['assets/templates/settings'](data)
                );
            },

            bindActions: function(user){
                var _self = this;
                //Settings Topnavbar
                $('#settings').on('click', function(ev){
                    ev.preventDefault();
                    $('.row .badge-group-list').empty();
                    $('.page-header').html("Settings");
                    $('.addkey-right').hide();
                    $('.panel-heading #panel-header').html("User Settings");

                    //Fetch User and populate the form.
                    user.fetch(function(user){
                        _self.render(user.toJSON());
                        _self.bindSettingsForm(user);
                    });

                });

            },

            bindSettingsForm: function(user){
                //Bind UserSettings form action.
                $('#update-user-settings').on('click', function(ev){
                    ev.preventDefault();
                    var form = $(this).parents('form');

                    //Sync data to User Model.
                    user.sync(form);


                });
            }
        };

        return SettingsView;
    }).call(this);

    return SettingsView;
});
