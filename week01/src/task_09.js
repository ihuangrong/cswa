function formSubmitt() {
    document.getElementsByTagName('button')[0].addEventListener("click", function(){
        document.getElementsByTagName("form")[0].hidden();
    });
}
formSubmitt();