(function(){
  var votes = {
    bear: 0,
    dog: 0,
    turtle: 0
  };

  var users = 0;

if(window.firebase){
  var votesRef = firebase.database().ref('votes');
  var usersRef = firebase.database().ref('users');
  votesRef.on('value', function(snapshot) {
    votes = snapshot.val();
    listener(votes);
  });

  usersRef.once('value', function(snapshot) {
    var c = snapshot.val();
    users = c;
    usersRef.set(c+1);
  });
  usersRef.on('value', function(snapshot) {
    var c = snapshot.val();
    if(userslistener){
      userslistener(c);
    }
  });
}

  var voted = false;

  var listener = null;
  var userslistener = null;

  function vote(animal){
    if(voted){return;}
    voted = true;
    document.body.querySelector("#ivoted-obj").setAttribute("visible",true)
    if(window.firebase){
      votes[animal]++
      votesRef.set(votes);
    }
  }

  function didVote(){
    return voted;
  }

  function getVotes(){
    return votes;
  }

  function onVotesUpdate(cb){
    listener = cb;
  }

  function onUsers(cb){
    userslistener = cb;
  }

  window.voting = {
    vote:vote,
    getVotes:getVotes,
    onVotesUpdate:onVotesUpdate,
    didVote:didVote,
    onUsers:onUsers
  }
})();
