const selectActivity  = (e) => {
    // grab the ID from the HTML
    let activityId = e.dataset.id;
    console.log(activityId);
    // populate the hidden
    document.querySelector("#activityId").setAttribute("value", activityId);
    document.querySelector("#selectedActivityName").textContent = e.dataset.name;

}