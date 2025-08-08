document.addEventListener("DOMContentLoaded", function(){
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            document.querySelectorAll("#group-list .group").forEach(function(group){
                group.style.display = group.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });
    }
});
