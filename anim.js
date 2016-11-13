var voteSound = new Howl({
  src: ['vote.mp3']
});

var btns =document.querySelectorAll('.vote-button');
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(e){
  	document.body.querySelector("#star-explosion").setAttribute("particle-system","texture: cloud.png; opacity: 1; color: #D20000; maxParticleCount: 2800");
    if(!voting.didVote()){
      voteSound.play();
      voting.vote(e.target.parentNode.id);
    }
  })
}

//Turtle Facts Counter
	var counter = document.querySelector("#turtle-facts-text");
	var myIndex = 1;
	var turtleFacts = ["Bears are\n\nstrong!", "Man's best\n\nfriend!", "Turtle\n\n power!"];
	// var chatBoxPosition = ["3.6 2.5 -4", "", ""];
	var chatTextPosition = ["-11 2 0", "-5 2 0", "-2 2 0"];

var i = 0;
function candidateChatter () {
	setTimeout(function () {
	var fact = turtleFacts[i];
		var position = chatTextPosition[i];
		counter.removeAttribute("bmfont-text", "text:");
		counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png; align:center;");
		counter.setAttribute("position", position);
		i++;
		if (i < 3) {
			candidateChatter();
		}
	}, 3000)
}

candidateChatter();

// position=
	// document.body.querySelector("#chat-box").addEventListener("click", function(){
	// 	var fact = turtleFacts[myIndex++%turtleFacts.length];
	// 	counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png;");
	// })

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

document.body.querySelector("#bear").addEventListener("model-loaded",function(e){
  if(e.target.id == "bear"){
    var collada = e.detail.collada;

    dae = collada.scene;
    skin = collada.skins[ 0 ];
    animation = collada.animations[0];

    dae.scale.x = dae.scale.y = dae.scale.z = 1;

    dae.traverse( function ( child ) {
      if ( child instanceof THREE.SkinnedMesh ) {
        var animation = new THREE.Animation( child, child.geometry.animation  );
        animation.play();

      }
    });
  }
})

document.body.querySelector("#dog").addEventListener("model-loaded",function(e){
  if(e.target.id == "dog"){
    var collada = e.detail.collada;

    dae = collada.scene;
    skin = collada.skins[ 0 ];
    animation = collada.animations[0];

    dae.scale.x = dae.scale.y = dae.scale.z = 1;

    dae.traverse( function ( child ) {
      if ( child instanceof THREE.SkinnedMesh ) {
        var animation = new THREE.Animation( child, child.geometry.animation  );
        animation.play();

      }
    });
  }
})

var clock = new THREE.Clock();
window.setInterval(function(){
    THREE.AnimationHandler.update( clock.getDelta()/60 );
},1000/60)
