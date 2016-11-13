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
	var turtleFacts = ["Hard shells\n\nare STRONG!", "Turtle\n\nPower!", "Green is\n\ngreat!"];

	document.body.querySelector("#chat-box").addEventListener("click", function(){
		var fact = turtleFacts[myIndex++%turtleFacts.length];
		counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png;");
	})

function updateVotes(votes){
  document.body.querySelector("#bear .votes").setAttribute('scale', {x: 1, y: votes.bear/10, z: 1});
  document.body.querySelector("#dog .votes").setAttribute('scale', {x: 1, y: votes.dog/10, z: 1});
  document.body.querySelector("#turtle .votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
}
updateVotes(voting.getVotes());
voting.onVotesUpdate(updateVotes);

function onUserJoined(ct){
  console.log(ct);
}
voting.onUsers(onUserJoined);
