
function activateScene() {
  window.voting.initVoting();
  window.candidates.initChatter();
}

document.getElementById("enter-button").addEventListener('click', function() {
  activateScene();
  // remove the overlay div
  document.getElementById("overlay").remove();
  // change camera position and remove animations
  document.getElementById("camera").setAttribute('position', '0 -0.65 1.2');
  document.getElementById("camera").setAttribute('rotation', '0 0 0');
  document.getElementById("camera-animation-1").remove();
  document.getElementById("camera-animation-2").remove();
  // add the cardboard icon
  document.getElementById("scene").removeAttribute("vr-mode-ui");
});

var musicSound = new Howl({
  src: ['assets/music.mp3']
});
musicSound.play()

var voteSound = new Howl({
  src: ['assets/vote.mp3']
});

var btns = document.querySelectorAll('.vote-button');
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(e){
  	document.body.querySelector("#star-explosion").setAttribute("particle-system","texture: cloud.png; opacity: 1; color: #8c0707; maxParticleCount: 2800");
    if(!voting.didVote()){
      voteSound.play();
      voting.vote(e.target.parentNode.id);
    }
  })
}

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
