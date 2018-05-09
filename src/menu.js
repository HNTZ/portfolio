let menu = function() {
    let burger = document.querySelector(".burger");
    let menuItems = document.querySelectorAll(".menu-item");

    burger.addEventListener("click", function(){
        this.classList.toggle("close");
        menuItems.forEach(function(item){
            item.classList.toggle('open');
        })
    });
}

export default menu;