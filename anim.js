var voteSound = new Howl({
  src: ['vote.mp3']
});

var btns =document.querySelectorAll('.vote-button');
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(e){
    voteSound.play();
    voting.vote(e.target.parentNode.id);
  })
}

document.body.querySelector(".vote-button")

	var counter = document.querySelector("#turtle-counter");
	var myIndex = 1;
	var turtleFacts = ["I have a hard shell.\nHard shells are STRONG!", "I'm slow to act.\nI don't jump the gun on big decisions!", "Green is a power color."];

document.body.querySelector("#turtle-counter").addEventListener("click", function(){
	var fact = turtleFacts[myIndex++%turtleFacts.length];
	counter.setAttribute("bmfont-text", "text:" + fact);
})

function updateVotes(votes){
  document.body.querySelector("#bear .votes").setAttribute('scale', {x: 1, y: votes.bear/10, z: 1});
  document.body.querySelector("#dog .votes").setAttribute('scale', {x: 1, y: votes.dog/10, z: 1});
  document.body.querySelector("#turtle .votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
}
updateVotes(voting.getVotes());
voting.onVotesUpdate(updateVotes);
