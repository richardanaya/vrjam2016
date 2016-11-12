function updateVotes(votes){
  debugger;
  document.body.querySelector("#turtle-votes").setAttribute('scale', {x: 1, y: votes.turtle/10, z: 1});
  document.body.querySelector("#tiger-votes").setAttribute('scale', {x: 1, y: votes.tiger/10, z: 1});
  document.body.querySelector("#rabbit-votes").setAttribute('scale', {x: 1, y: votes.rabbit/10, z: 1});
}
updateVotes(voting.getVotes())
voting.onVotesUpdate(updateVotes);
