(function(){
  var votes = {
    bear: 3,
    dog: 6,
    turtle: 5
  };

  var listener = null;

  function vote(animal){
    votes[animal]++
    listener(votes);
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
    onVotesUpdate:onVotesUpdate
  }
})();
