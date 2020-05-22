'use strict';

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // TODO 8: Load and listens for new messages.
    var query = firebase.firestore()
                    .collection('notifications')
                    .orderBy('timestamp', 'desc');
    
    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
          displayMessage(change.doc.id, message.timestamp, message.name, message.user_id,
                         message.text, message.profilePicUrl, message.imageUrl);
        }
      });
    });
}

// Delete a Message from the UI.
function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
}

var MESSAGE_TEMPLATE = 
        '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">' +
            '<div class="d-flex w-100 justify-content-between">' +
                '<div class="media w-100 mb-3">' +
                    '<div class="media-body">' +
                        '<div class="notification-username mb-2 px-3 py-2">' +
                            '<p class="text-small mb-0 text-white chat-username"></p>' + // Added class chat-username to show notification sender
                        '</div>' +
                        '<div class="bg-white rounded py-2 px-3 mb-2">' +
                            '<p class="text-small mb-0 text-muted text-message"></p>' + // Added class text-message to show message content
                        '</div>' +
                        '<p class="small text-muted time"></p>' + // Added class time to display timestamp
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' ;

function createAndInsertMessage(id, timestamp) {
    const container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    const div = container.firstChild;
    div.setAttribute('id', id);
  
    // If timestamp is null, assume we've gotten a brand new message.
    // https://stackoverflow.com/a/47781432/4816918
    timestamp = timestamp ? timestamp.toMillis() : Date.now();
    div.setAttribute('timestamp', timestamp);
  
    // figure out where to insert new message
    const existingMessages = messageListElement.children;
    if (existingMessages.length === 0) {
      messageListElement.appendChild(div);
    } else {
      let messageListNode = existingMessages[0];
  
      while (messageListNode) {
        const messageListNodeTime = messageListNode.getAttribute('timestamp');
  
        if (!messageListNodeTime) {
          throw new Error(
            `Child ${messageListNode.id} has no 'timestamp' attribute`
          );
        }
  
        if (messageListNodeTime > timestamp) {
          break;
        }
  
        messageListNode = messageListNode.nextSibling;
      }
  
      messageListElement.insertBefore(div, messageListNode);
    }
  
    return div;
}

function monthInWords(month){
    if(month == 1)
      return "Jan";
    if(month == 2)
      return "Feb";
    if(month == 3)
      return "Mar";
    if(month == 4)
      return "Apr";
    if(month == 5)
      return "May";
    if(month == 6)
      return "Jun";
    if(month == 7)
      return "Jul";
    if(month == 8)
      return "Aug";
    if(month == 9)
      return "Sep";
    if(month == 10)
      return "Oct";
    if(month == 11)
      return "Nov";
    if(month == 12)
      return "Dec";
}
  
function generate(timestamp, name, text, div){
  // div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.text-message');
    var timeElement = div.querySelector('.time');
    var usernameElement = div.querySelector('.chat-username');
  
    if (text) { // If the message is text.
      usernameElement.textContent = name;
      messageElement.innerHTML = text;
      // Replace all line breaks by <br>.
      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
      console.log("Timestamp Value: ",timestamp);
      var date = new Date(timestamp.seconds*1000);
      var hours = date.getHours();
      if(date.getMinutes() < 9)
        var minutes = "0" + date.getMinutes().toString();
      else 
        var minutes = date.getMinutes();
      // date.getMonth()
      timeElement.innerHTML = date.getDate() + " " + monthInWords(date.getMonth()) + " " + date.getFullYear() + " | " + hours + " : " + minutes;
    } else if (imageUrl) { // If the message is an image.
      var image = document.createElement('img');
      image.addEventListener('load', function() {
        messageListElement.scrollTop = messageListElement.scrollHeight;
      });
      image.src = imageUrl + '&' + new Date().getTime();
      messageElement.innerHTML = '';
      messageElement.appendChild(image);
    }
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function() {div.classList.add('visible')}, 1);
    messageListElement.scrollTop = messageListElement.scrollHeight;
}

// Displays a Message in the UI.
function displayMessage(id, timestamp, name, user_id, text, picUrl, imageUrl) {
    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
    console.log("Timestamp Display ",timestamp);
    generate(timestamp, name, text, div);
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
var messageListElement = document.getElementById('list-messages');

// Checks that Firebase has been imported.
checkSetup();

// We load currently existing chat messages and listen to new ones.
loadMessages();