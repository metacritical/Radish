(function(){
    window.JST = {};
    require.config({
        baseUrl: 'assets',
        paths: {
            "jquery"         : "libs/jquery-2.1.3.min",
            "bootstrap"      : "libs/bootstrap/js/bootstrap.min",
            "utility"        : "libs/utility",
            "editable"       : "libs/mindmup-editabletable",
            "jade"           : "libs/runtime",
            "waitingfor"     : "libs/bootstrap-waitingfor",
            "namespace-list" : "templates/namespace-list",
            "listview"       : "templates/listview",
            "settings"       : "templates/settings",
            "upload"         : "templates/upload",
            "radish"         : "js/radish",
            "keyview"        : "js/keyview",
            "user"           : "js/user",
            "settingsview"   : "js/settingsview",
            "collaborators"  : "js/collaborators",
            "spinner"        : "libs/spin.min",
            "collabview"     : "templates/collabview"
        },
        shim : {
            "bootstrap" : { "deps" :['jquery'] },
            "editable"  : "libs/mindmup-editabletable"
        }
    });

    require(
        [
            "jquery", "bootstrap", "utility", "editable", "jade",
            "namespace-list", "listview", "settings", "upload",
            "radish","keyview", "waitingfor", "user" , "spinner",
            "collabview"
        ],

        function($, _, _,  _, jade, _, _, _, _, Radish,
                 KeyView, _, User, Spinner, Collaborators){
                //Attach Jade first for templating
                window.jade = jade;
                //Create Radish Instance
                window.Radish = new Radish();
            });
}).call(this);
