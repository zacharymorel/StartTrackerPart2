const selectActivity  = (e) => {
    // grab the ID from the HTML
    let activityId = e.dataset.id;
    // populate the hidden
    let list = document.querySelectorAll(".activityId")
    console.log(list)
    list.forEach(element  => {
        element.setAttribute("value", activityId);
    });
    
    document.querySelectorAll("p.selectedActivityName").forEach(element => {
        element.textContent = e.dataset.name;
    })

}