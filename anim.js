document.body.querySelector("#turtle").addEventListener("click",function(){
  alert("turtle");
})

	var counter = document.querySelector("#turtle-counter");
	var myIndex = 1;
	var turtleFacts = ["I have a hard shell.\nHard shells are STRONG!", "I'm slow to act.\nI don't jump the gun on big decisions!", "Green is a power color."];

document.body.querySelector("#turtle-counter").addEventListener("click", function(){
	var fact = turtleFacts[myIndex++%turtleFacts.length];
	counter.setAttribute("bmfont-text", "text:" + fact);
})

function updateVotes(votes){
  document.body.querySelector("#turtle-votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
  document.body.querySelector("#tiger-votes").setAttribute('scale', {x: 1, y: votes.tiger/10, z: 1});
  document.body.querySelector("#rabbit-votes").setAttribute('scale', {x: 1, y: votes.rabbit/10, z: 1});
}
updateVotes(voting.getVotes());
voting.onVotesUpdate(updateVotes);
