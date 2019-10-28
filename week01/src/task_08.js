function buttonClick() {
    document.getElementsByTagName('button')[0].addEventListener("click", function(){
        document.getElementsByTagName("p")[0].innerHTML = "Shutting down";
    });
}
buttonClick();