function start_game (settings){
    
	place_players(settings.opponents_, settings.user_);

	prepare_deck(settings.cards_in_deck_);
    

    
    /*assing_trump();
    
    assign_mover();*/
    
}


function prepare_deck (x){
    
    // backend
    
    var deck = [];
    for (i=0; i<x/4; i++){
        deck.push({
            rank:i,
            suit:'spades'
        });
        deck.push({
            rank:i,
            suit:'hearts'
        });
        deck.push({
            rank:i,
            suit:'diamonds'
        });
        deck.push({
            rank:i,
            suit:'clubs'
        });
    }

    shuffle(deck);
    give_out(deck, x)
}

function give_out(d, x) {
    var koef_ = x == 36? 6 : 2;
    for (var i=0; i<6; i++){
        $('.player-bar.user .cards').append('<div class="card-holder"><div class="card back rank'+ (parseInt(d[i].rank)+koef_) + ' ' + d[i].suit + '"></div></div>');
    }
}
function place_players(x,y){
    
    // back-end
    
    var players_ = [];
    shuffle(fake_players_);
    players_.push(y);
    for (var i=0; i<x;  i++){players_.push(fake_players_[i]);}
    
    shuffle(players_);

    
    
    // front-end
    
    $('.game').append('<div class="users-wrap '+ (x==2 ? "three-players" : ( x==1 ? "two-players" : ""))+'"></div>');
    
    var starting_index_;
    
    $.each(players_, function(index, value){
        starting_index_ = value.user ? index : starting_index_;
    });
    
    
    for(var z=0;z<players_.length;++z) {
      var idx = (z+starting_index_) % players_.length;
        console.log(players_[idx].ava)
      $('.users-wrap').append('<div class="player-bar '+ (players_[idx].user ? "user": "")+'" data-real-player-index="'+idx+'"><div class="ava"><img src="'+ players_[idx].ava+'" /><span>'+ players_[idx].name+'</span></div><div class="cards"></div></div>')
    }
    
    
    
    if (x==1){
        $('.player-bar.user').addClass('bottom-player');
        $('.player-bar').eq(1).addClass('top-player');
    }
    else if (x==2){
        $('.player-bar').eq(0).addClass('bottom-player');
        $('.player-bar').eq(1).addClass('left-player');
    }
    else if (x==3){
        
    }
    
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var fake_players_ = [
    {
        name: "Yuriy Gagarin",
        ava: 'images/avatars/gagarin.jpg'
    },
    {
        name: "Marsian",
        ava: 'images/avatars/marsian.png'
    },
    {
        name: "Space Cowboy",
        ava: 'images/avatars/space-cowboy.jpg'
    },
    {
        name: "Neal Armstrong",
        ava: 'images/avatars/neil-armstrong.png'
    },
    {
        name: "freaking Alien",
        ava: 'images/avatars/freaking-alien.jpg'
    }
];