(function(){
  var votesRef;
  var voted = false;

  var voteCounts = {
    bear: 0,
    dog: 0,
    turtle: 0
  };

  var voteTotals = {
    totalVotes: 0,
    percent: {
      bear: 0,
      dog: 0,
      turtle: 0
    }
  };

  function initVoting() {
    if (window.firebase) {
      votesRef = firebase.database().ref('votes');

      // add listener to Firebase votes update
      votesRef.on('value', function(snapshot) {
        votes = snapshot.val();
        onVotesUpdate(votes);
      });
    }
  }

  function vote(animal){
    if(voted){return;}

    voted = true;

    document.body.querySelector("#ivoted-obj").setAttribute("visible",true)

    if (window.firebase) {
      var localVotes = getVotes();
      localVotes[animal]++;
      votesRef.set(localVotes);
    }
  }

  function didVote(){
    return voted;
  }

  function getVotes(){
    return voteCounts;
  }

  function resetVotes(){
    if (window.firebase){
      votesRef.set({
        bear: 0,
        dog: 0,
        turtle: 0
      });
    }
  }

  function onVotesUpdate(votes){
    updateVotes(votes);
    updateVotesUI();
  }

  function updateVotes(votes){
    // vote count
    voteCounts = votes;

    // vote totals
    voteTotals.totalVotes = votes.bear + votes.dog + votes.turtle;
    voteTotals.percent.bear = Math.floor(votes.bear / voteTotals.totalVotes * 100);
    voteTotals.percent.dog = Math.floor(votes.dog / voteTotals.totalVotes * 100);
    voteTotals.percent.turtle = Math.floor(votes.turtle / voteTotals.totalVotes * 100);
  }

  function updateVotesUI(){
    updateGraph('bear');
    updateGraph('dog');
    updateGraph('turtle');

    if (voteTotals.totalVotes) {
      document.body.querySelector("#bear .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.bear + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #fff;");
      document.body.querySelector("#dog .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.dog + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #fff;");
      document.body.querySelector("#turtle .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.turtle + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #fff;");
    }
  }

  function updateGraph(animal){
    var MAX_HEIGHT = 3;
    var graphHeight = voteCounts[animal] / voteTotals.totalVotes * MAX_HEIGHT;

    $('#' + animal + ' .vote-graph a-animation').remove();
    $('<a-animation>')
      .attr({
        "attribute": "scale",
        "dur": "2000",
        "fill": "forwards",
        "to": "1 " + graphHeight + " 0"
      })
      .appendTo('#' + animal + ' .vote-graph');
  }

  window.voting = {
    initVoting: initVoting,
    vote: vote,
    getVotes: getVotes,
    onVotesUpdate: onVotesUpdate,
    didVote: didVote,
    resetVotes: resetVotes
  }
})();
