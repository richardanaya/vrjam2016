(function() {

  var animals = [
    {
      'name': 'bear',
      'facts': [
        "I'm like\n\nsuper big",
        "Bears are\n\nstrong!"
      ]
    },
    {
      'name': 'dog',
      'facts': [
        "Meow?\n ",
        "Man's best\n\nfriend!",
        "Woof\n "
      ]
    },
    {
      'name': 'turtle',
      'facts': [
        "Turtle\n\n power!"
      ]
    }
  ];

  var animalIndex = 0;
  var factsIndex = {
    'bear': 0,
    'dog': 0,
    'turtle': 0
  };

  function initChatter() {
    setInterval(function() {
      // alternate through animals
      var animal = animals[++animalIndex % animals.length];
      // alternate through individual animal facts
      var animalFact = animal.facts[++factsIndex[animal.name] % animal.facts.length];

      updateTextBubble(animal, animalFact);

      // reset counters
      if (animalIndex === animals.length) animalIndex = 0;
      if (factsIndex[animal.name] === animal.facts.length) factsIndex[animal.name] = 0;
    }, 3500);
  }

  function updateTextBubble(animal, animalFact) {

    $('.info-container .text-bubble').remove();

    $('<a-entity>')
      .attr({
        "class": "text-bubble",
        "material": "color: #429ef4;",
        "obj-model": "obj: #chat-obj",
      	"scale": "1 1 .2",
      	"position": "0.1 2.7 0.65"
      })
      .appendTo('#' + animal.name + ' .info-container');

      $('<a-entity>')
        .attr({
          "bmfont-text": "text:" + animalFact + "; fnt:testFont.fnt; fntImage:testFont.png; align:center;",
        	"scale": ".8 .8 .8",
      	  "position": "-2.2 -0.5 -0.54"
        })
        .appendTo('#' + animal.name + ' .info-container .text-bubble');
  }

  window.candidates = {
    initChatter: initChatter
  };
})();
