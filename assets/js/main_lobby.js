//model display depending on screen orientation
function alertUser() {
  // function to handle events from listner

  if (window.matchMedia("(orientation: portrait)").matches) {
    // currently in portrait, changing to landscape
    $("#portrait-modal").modal("hide");
  }
  if (window.matchMedia("(orientation: landscape)").matches) {
    // currently in landscape, changing to portrait
    $("#portrait-modal").modal("show");
  }
}

// works only on orientation change
window.onorientationchange = function () {
  alertUser(); // calls the function on change | remember `on` and `after` are different
};

// works only on page load/init
if (window.matchMedia("(orientation: portrait)").matches) {
  // currently in portrait
  $("#portrait-modal").modal("show");
}

// minimize modal
$("#minimize-btn").click(function () {
  $(".notification-modal-class").toggleClass("d-none");
});

//on load minimize notification modal
$("#minimize-btn").click();

function toggleAnnouncementsModal() {
  $("#notification-modal-dialog").toggleClass("d-none");
}
//image resizer
setInterval(function () {
  $("map").imageMapResize();
}, 1000);

//close event modal
function eventmodal() {
  $("#eventmodal").toggleClass("d-none");
}
//btn click
$("#events-modal-btn").click(function () {
  eventmodal();
});

//close event room modal
function eventroommodal() {
  $("#eventroommodal").toggleClass("d-none");
}
//btn click
$("#events-room-modal-btn").click(function () {
  eventroommodal();
});

function eventroommodal() {
  $("#eventroommodal").toggleClass("d-none");
}

// connect with us modal
function toggleConnectWithUsModal() {
  $("#connect-with-us-modal-dialog").toggleClass("d-none");
}

$(".tab-item").click(function () {
  $("#connect-with-us-modal-dialog").addClass("d-none");
  $("#eventroommodal").addClass("d-none");
  $("#eventmodal").addClass("d-none");
  $("#pdf-modal-dialog").addClass("d-none");
});

// pdf modal
function togglePdfModal() {
  $("#pdf-modal-dialog").toggleClass("d-none");
}

function initPageLoad() {
  $("#pdf-modal-dialog").removeClass("d-none");
  $("#pdf-modal-dialog").addClass("d-none");
  $("#connect-with-us-modal-dialog").removeClass("d-none");
  $("#connect-with-us-modal-dialog").addClass("d-none");
}

initPageLoad();