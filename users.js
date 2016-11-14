(function(){
  var usersRef;
  var userslistener = null;
  var users = 0;

  if (window.firebase) {
    usersRef = firebase.database().ref('users');

    // add listener to Firebase users update
    usersRef.once('value', function(snapshot) {
      var c = snapshot.val();
      users = c;
      usersRef.set(c+1);
    });
    usersRef.on('value', function(snapshot) {
      var c = snapshot.val();
      if(userslistener){
        onUserJoined(c);
      }
    });
  }

  users.onUsers(onUserJoined);

  window.users = {
    onUsers: onUsers
  }
})();
