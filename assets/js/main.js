//model display depending on screen orientation
function alertUser() {
    // function to handle events from listner

    if (window.matchMedia("(orientation: portrait)").matches) {
        // currently in portrait, changing to landscape
        $("#portrait-modal").modal('hide')
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        // currently in landscape, changing to portrait
        $("#portrait-modal").modal('show')
    }
}

// works only on orientation change
window.onorientationchange = function () {
    alertUser() // calls the function on change | remember `on` and `after` are different
};

// works only on page load/init
if (window.matchMedia("(orientation: portrait)").matches) {
    // currently in portrait
    $("#portrait-modal").modal('show')
}

// minimize modal
$("#minimize-btn").click(function () {
    if ($('.notification-modal-class').hasClass('d-none')) {
        $(".notification-modal-class").removeClass('d-none');
        $(".notification-modal-class").addClass('d-block');
    } else {
        $('.notification-modal-class').removeClass('d-block');
        $(".notification-modal-class").addClass('d-none');
    }
});

//on load minimize notification modal
$("#minimize-btn").click()

// close modal notification
function CloseAnnouncementsModal() {
    document.getElementById('notification-modal-dialog').style.display = 'none'
}

function openAnnouncementsModal() {
    document.getElementById('notification-modal-dialog').style.display = 'block'
}

//image resizer 
setInterval(function () {
    $('map').imageMapResize();
}, 1000);

// modal display:none onload
// $(document).ready(function () {
//     document.getElementById("eventmodal").style.display = 'none';
// });
//close even modal
function eventmodal() {
    $("#eventmodal").toggleClass('d-none')

}
//btn click
$("#events-modal-btn").click(function () {
    eventmodal()
});