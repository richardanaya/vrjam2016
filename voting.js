(function(){
  var votes = {
    bear: 3,
    dog: 6,
    turtle: 5
  };

  var voted = false;

  var listener = null;

  function vote(animal){
    if(voted){return;}
    votes[animal]++
    listener(votes);
    voted = true;
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
