var voteSound = new Howl({
  src: ['vote.mp3']
});



document.body.querySelector(".vote-button")

function updateVotes(votes){
  document.body.querySelector("#bear .votes").setAttribute('scale', {x: 1, y: votes.bear/10, z: 1});
  document.body.querySelector("#dog .votes").setAttribute('scale', {x: 1, y: votes.dog/10, z: 1});
  document.body.querySelector("#turtle .votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
}
updateVotes(voting.getVotes())
voting.onVotesUpdate(updateVotes);
