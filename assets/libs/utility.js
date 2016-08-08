//Monkey patched array to get unique and contains methods.
Array.prototype.contains = function(elem){
    for(var i = 0; i < this.length; i++) {
        if(this[i] === elem) return true;
    }
    return false;
};

Array.prototype.compact = function(){
    var compacted = [];
    for(var i = 0; i < this.length ; i++){
        if(this[i]){
            compacted.push(this[i]);
        }
    };
    return compacted;
};

Array.prototype.unique = function(){
    var array = [];
    for(var i = 0; i < this.length; i++) {
        if(!array.contains(this[i])) {
            array.push(this[i]);
        }
    }
    return array.compact();
};
