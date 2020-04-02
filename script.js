// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){

	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $(cards) //$.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.binding();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="img/rlbs.jpg"\
				alt="Feuerwehr Rheinbach" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "aed",
			img: "img/01AED.png",
			id: 1,
		},
		{
			name: "rucksack",
			img: "img/01Rettungsrucksack.png",
			id: 1
		},
		{
			name: "brohr",
			img: "img/02BRohr.png",
			id: 2
		},
		{
			name: "kruemer",
			img: "img/02Stuetzkruemmer.png",
			id: 2
		},
		{
			name: "cschlauch",
			img: "img/03CSchlauch.png",
			id: 3
		},
		{
			name: "korb",
			img: "img/03Schlauchtragekorb.png",
			id: 3
		},
		{
			name: "drahtseil",
			img: "img/04Drahtseil.png",
			id: 4
		},
		{
			name: "greifzug",
			img: "img/04Greifzug.png",
			id: 4
		},
		{
			name: "kissen",
			img: "img/05Hebekissen.png",
			id: 5
		},
		{
			name: "luft",
			img: "img/05Luft.png",
			id: 5
		},
		{
			name: "psa",
			img: "img/06Klamotten.png",
			id: 6
		},
		{
			name: "mensch",
			img: "img/06Mensch.png",
			id: 6
		},
		{
			name: "hydrantschluessel",
			img: "img/07Hydrantenschluessel.png",
			id: 7
		},
		{
			name: "standrohr",
			img: "img/07Standrohr.png",
			id: 7
		},
		{
			name: "trommel",
			img: "img/08Kabeltrommel.png",
			id: 8
		},
		{
			name: "srom",
			img: "img/08Stromerzeuger.png",
			id: 8
		},
		{
			name: "maske",
			img: "img/09Maske.png",
			id: 9
		},
		{
			name: "pa",
			img: "img/09PA.png",
			id: 9
		},
		{
			name: "kombi",
			img: "img/10Kombischaumrohr.png",
			id: 10
		},
		{
			name: "zumischer",
			img: "img/10Zumischer.png",
			id: 10
		},
		{
			name: "scheinwerfer",
			img: "img/11SCheinwerfer.png",
			id: 11
		},
		{
			name: "stativ",
			img: "img/11Stativ.png",
			id: 11
		},

	];

	Memory.init(cards);


})();
