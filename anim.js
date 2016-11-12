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

	document.body.querySelector("#turtle-facts-text").addEventListener("click", function(){
		var fact = turtleFacts[myIndex++%turtleFacts.length];
		counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png");
	})

function updateVotes(votes){
  document.body.querySelector("#bear .votes").setAttribute('scale', {x: 1, y: votes.bear/10, z: 1});
  document.body.querySelector("#dog .votes").setAttribute('scale', {x: 1, y: votes.dog/10, z: 1});
  document.body.querySelector("#turtle .votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
}
updateVotes(voting.getVotes());
voting.onVotesUpdate(updateVotes);
