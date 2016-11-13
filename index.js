var musicSound = new Howl({
  src: ['music.mp3']
});
musicSound.play()

var voteSound = new Howl({
  src: ['vote.mp3']
});

var btns = document.querySelectorAll('.vote-button');
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(e){
  	document.body.querySelector("#star-explosion").setAttribute("particle-system","texture: cloud.png; opacity: 1; color: #D20000; maxParticleCount: 2800");
    if(!voting.didVote()){
      voteSound.play();
      voting.vote(e.target.parentNode.id);
    }
  })
}

//Candidate Facts
	var counter = document.querySelector("#turtle-facts-text");
	var chatCounter = document.querySelector("#chat-box");
	var myIndex = 1;
	var turtleFacts = ["Bears are\n\nstrong!", "Man's best\n\nfriend!", "Turtle\n\n power!"];
	var chatBoxPosition = ["-8.7 4 -1", "-2.2 1 -1", "-1 0.4 -1"];
	var chatTextPosition = ["-9.8 3.2 0", "-4.6 .7 0", "-3.7 0.3 0"];

var i = 0;

function candidateChatter () {
	setTimeout(function () {
	var fact = turtleFacts[i];
		var position = chatTextPosition[i];
		var bubblePosition = chatBoxPosition[i];
		counter.removeAttribute("bmfont-text", "text:");
		counter.setAttribute("bmfont-text", "text:" + fact + "; fnt:testFont.fnt; fntImage:testFont.png; align:center;");
		counter.setAttribute("scale", ".8 .8 .8")
		counter.setAttribute("position", position);
		chatCounter.setAttribute("material", "color: #429ef4;");
		chatCounter.setAttribute("obj-model", "obj: #chat-obj;");
		chatCounter.setAttribute("scale", "1 1 .9");
		chatCounter.setAttribute("position", bubblePosition);
		i++;
		if (i < 3) {
			candidateChatter();
		} else {
			clearChatter();
		}
	}, 3500)
}

function clearChatter() {
	setTimeout(function () {
		var elemChat = document.getElementById("chat-box");
 		elemChat.parentElement.removeChild(elemChat);
		var elemText = document.getElementById("turtle-facts-text");
 		elemText.parentElement.removeChild(elemText);			 			
	}, 3500);
}

candidateChatter();


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

document.getElementById("enter-button").addEventListener('click', function() {
  window.userActive = true;
  // remove the overlay div
  document.getElementById("overlay").remove();
  // change camera position and remove animations
  document.getElementById("camera").setAttribute('position', '0 -.65 .7');
  document.getElementById("camera").setAttribute('rotation', '0 0 0');
  document.getElementById("camera-animation-1").remove();
  document.getElementById("camera-animation-2").remove();
  // add the cardboard icon
  document.getElementById("scene").removeAttribute("vr-mode-ui");
});
