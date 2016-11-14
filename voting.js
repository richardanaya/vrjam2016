(function(){
  var votesRef;
  var usersRef;
  var voted = false;
  var userslistener = null;

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

  var users = 0;

  if(window.firebase){
    votesRef = firebase.database().ref('votes');
    usersRef = firebase.database().ref('users');

    // add listener to Firebase votes update
    votesRef.on('value', function(snapshot) {
      votes = snapshot.val();
      onVotesUpdate(votes);
    });

    // add listener to Firebase users update
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

  function vote(animal){
    if(voted){return;}

    voted = true;
    document.body.querySelector("#ivoted-obj").setAttribute("visible",true)
    if(window.firebase){
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
    var votes = voteCounts;
    var MAX_HEIGHT = 3;
    var totalVotes = votes.bear + votes.dog + votes.turtle;

    var bearHeight = votes.bear / totalVotes * MAX_HEIGHT;
    var dogHeight = votes.dog / totalVotes * MAX_HEIGHT;
    var turtleHeight = votes.turtle / totalVotes * MAX_HEIGHT;

    document.body.querySelector("#bear .vote-graph").setAttribute('scale', {x: 1, y: bearHeight, z: 0});
    document.body.querySelector("#dog .vote-graph").setAttribute('scale', {x: 1, y: dogHeight, z: 0});
    document.body.querySelector("#turtle .vote-graph").setAttribute('scale', {x: 1, y: turtleHeight, z: 0});

    document.body.querySelector("#bear .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.bear + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #4d4f51;");
    document.body.querySelector("#dog .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.dog + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #4d4f51;");
    document.body.querySelector("#turtle .vote-percent").setAttribute('bmfont-text', "text:" + voteTotals.percent.turtle + "%; fnt:testFont.fnt; fntImage:testFont.png; color: #4d4f51;");
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
