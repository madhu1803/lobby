// Saves a new message on the Firebase DB.
function saveMessage(notificationMessage, companyName, url='') {
    // Push a new message to Firebase.
    if(url == '')
      return firebase.firestore().collection('notifications').add({
        user_id : "12345",
        name: companyName,
        text: notificationMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(function(error) {
        console.error('Error writing new message to database', error);
      });
    else
    return firebase.firestore().collection('notifications').add({
      user_id : "12345",
      name: companyName,
      text: notificationMessage + '<br>' + '<a href="' + url + '">' + url + '</a>' ,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
      
}

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (messageInputElement.value && companyNameElement) {
      if(url.value == '')
        saveMessage(messageInputElement.value, companyNameElement.value).then(function() {
          // Clear message text field and re-enable the SEND button.
          messageInputElement.value = "";
          companyNameElement.value = "";
          toggleButton();
        });
      else
        saveMessage(messageInputElement.value, companyNameElement.value, url.value).then(function(){
          // Clear message text field and re-enable the SEND button.
          messageInputElement.value = "";
          companyNameElement.value = "";
          url.value = "";
          toggleButton();
        });
    }
}

// Enables or disables the submit button depending on the values of the input fields
function toggleButton() {
    if (messageInputElement.value && companyNameElement.value) {
      submitButtonElement.removeAttribute('disabled');
    } else {
      submitButtonElement.setAttribute('disabled', 'true');
    }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
}

// Shortcuts to DOM Elements.
var messageFormElement = document.getElementById('notification-send-box');
var companyNameElement = document.getElementById('company-name')
var messageInputElement = document.getElementById('notification-message');
var submitButtonElement = document.getElementById('submit');
var url = document.getElementById('notification-url');

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// Toggle for the button.
companyNameElement.addEventListener('keyup', toggleButton);
companyNameElement.addEventListener('change', toggleButton);

// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);

// Checks that Firebase has been imported.
checkSetup();