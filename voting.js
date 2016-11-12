(function(){
  var votes = {
    bear: 0,
    dog: 0,
    turtle: 0
  };

if(this.firebase){
  var votesRef = firebase.database().ref('votes');
  votesRef.on('value', function(snapshot) {
    votes = snapshot.val();
    listener(votes);
  });
}

  var voted = false;

  var listener = null;

  function vote(animal){
    if(voted){return;}
    votes[animal]++
    listener(votes);
    voted = true;
    if(this.firebase){
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

  window.voting = {
    vote:vote,
    getVotes:getVotes,
    onVotesUpdate:onVotesUpdate,
    didVote:didVote
  }
})();
