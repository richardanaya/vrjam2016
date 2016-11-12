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

function updateVotes(votes){
  document.body.querySelector("#turtle .votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
  document.body.querySelector("#tiger .votes").setAttribute('scale', {x: 1, y: votes.tiger/10, z: 1});
  document.body.querySelector("#rabbit .votes").setAttribute('scale', {x: 1, y: votes.rabbit/10, z: 1});
}
updateVotes(voting.getVotes())
voting.onVotesUpdate(updateVotes);
