document.querySelectorAll("button").forEach(function(button){
    button.onclick = function(){
        alert("You selected: " + this.innerHTML);
    };
});
