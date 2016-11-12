(function(){

  // Get current list of users from Firebase
  var userList = [
    {
      "id": "user-1111"
    },
    {
      "id": "user-2222"
    }
  ];

  // Generate a new user on the client with a randomly generated ID
  var currentUser = {
    "id": "user-" + (Math.floor(Math.random() * 10))
  };

  // Push new user up to Firebase
  userList.push(currentUser);


  window.onunload = function() {
    // On page unload upload Firebase to remove current user
  };

})();
