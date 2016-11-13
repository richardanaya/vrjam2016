var voteSound = new Howl({
  src: ['vote.mp3']
});

var btns =document.querySelectorAll('.vote-button');
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(e){
    if(!voting.didVote()){
      voteSound.play();
      voting.vote(e.target.parentNode.id);
    }
  })
}

//Turtle Facts Counter
	var counter = document.querySelector("#turtle-facts-text");
	var myIndex = 1;
	var turtleFacts = ["I have a hard shell.\nHard shells\nare STRONG!", "I'm slow to act.\nI don't jump\nthe gun on\nbig decisions!", "Green is a\npower color."];

	document.body.querySelector("#chat").addEventListener("click", function(){
		var fact = turtleFacts[myIndex++%turtleFacts.length];
		counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png;");
	})

function updateVotes(votes){
  var MAX_HEIGHT = 3;
  var totalVotes = votes.bear + votes.dog + votes.turtle;

  var bearHeight = votes.bear / totalVotes * MAX_HEIGHT;
  var dogHeight = votes.dog / totalVotes * MAX_HEIGHT;
  var turtleHeight = votes.turtle / totalVotes * MAX_HEIGHT;

  console.log("totalVotes", totalVotes);
  console.log("bear percentage", Math.floor(votes.bear / totalVotes * 100));
  console.log("dog percentage", Math.floor(votes.dog / totalVotes * 100));
  console.log("turtle percentage", Math.floor(votes.turtle / totalVotes * 100));

  document.body.querySelector("#bear .vote-graph").setAttribute('scale', {x: 1, y: bearHeight, z: 0});
  document.body.querySelector("#dog .vote-graph").setAttribute('scale', {x: 1, y: dogHeight, z: 0});
  document.body.querySelector("#turtle .vote-graph").setAttribute('scale', {x: 1, y: turtleHeight, z: 0});
}
updateVotes(voting.getVotes());
voting.onVotesUpdate(updateVotes);


function updateVoteGraph(){
  var votes = {
    bear: 5,
    dog: 5,
    turtle: 6
  };

}
updateVoteGraph();


function onUserJoined(ct){
  console.log(ct);
}
voting.onUsers(onUserJoined);
