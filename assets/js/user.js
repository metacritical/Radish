define(['jquery', "waitingfor"], function($,_){
    var User = (function(){
        function User() {
            var _self = this;
        };

        User.prototype = {
            fetch: function(callback){
                var _self = this;
                //fetch data from current properties or from server.
                $.ajax({
                    type: 'GET',
                    url: '/get/userdata',
                    dataType: "json",

                    beforeSend: function(){
                        waitingDialog.show('Loading...', {
                            dialogSize: 'sm', progressType: 'primary'
                        });
                    },

                    success: function(result){
                        _self.setProp(result);
                    },

                    complete: function(){
                        waitingDialog.hide();
                        callback(_self);
                    }
                });
            },

            sync: function(form){
                var username = form.find('#userName');
                var email = form.find('#userEmail');
                var pass = form.find('#userPass');
                var confirm = form.find('#confirmPass');
                var alert = form.find('.alert');

                //Sync Back Data.
                $.ajax({
                    type: 'POST',
                    url: '/update/user',
                    dataType: "json",
                    data: {
                        username: username.val(), email: email.val(),
                        pass: confirm.val()
                    },

                    beforeSend: function(xhr, opts){
                        if(pass.val() == confirm.val()){
                            waitingDialog.show('Loading...', {
                                dialogSize: 'sm', progressType: 'primary'
                            });
                        }else{
                            xhr.abort();
                            alert.removeClass('hide');
                            setTimeout(function(){
                                alert.animate({
                                    opacity: 0.0
                                }, 500, function(){
                                    alert.addClass('hide');
                                    alert.css('opacity', 1.0);
                                    });
                            }, 1000);
                        }
                    },

                    success: function(result){
                        console.log(result);
                    },

                    complete: function(){
                        waitingDialog.hide();
                    }
                });

            },

            setProp: function(data){
                this.username = data.username || null;
                this.role = data.role || null;
                this.email = data.email || null;
                this.img = data.img || null;
                this.name = data.name || null;
            },

            toJSON: function(){
                return({
                    username: this.username,
                    role: this.role,
                    email: this.email,
                    img: this.img,
                    name: this.name
                });
            }
        };

        return User;

    }).call(this);

    return User;
});
