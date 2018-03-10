//$(document).on('deviceready', function(){
$(document).on('ready', function(){

    
    var settings_ = {
        sound_on_: (localStorage.getItem("sound_on_") === null || localStorage.getItem("sound_on_") === 'true') ? true : false,
        vibro_on_: (localStorage.getItem("vibro_on_") === null || localStorage.getItem("vibro_on_") === 'true') ? true : false,
        opponents_: (localStorage.getItem("opponents_") === null) ? 1 : localStorage.getItem("opponents_"),
        cards_in_deck_: (localStorage.getItem("cards_in_deck_") === null) ? 36 : localStorage.getItem("cards_in_deck_"),
        user_:{
            name: "You",
            user: true,
            ava: 'images/avatars/marsian.png'
        }
    };
    
    
    
   


    function go_to_menu (){
        $('.game').hide().empty().attr('class', 'game');
        $('.starter-menu').show();
        setTimeout(function(){
            $('.main-menu').addClass('appear');
        },50);
        
       $('.settings-menu').removeClass('visible');
    }

    $('.btn-settings').on('click', function(){
        show_settings_menu_('settings');
    });

    $('.btn-play').on('click', function(){
        //hide menu
        start_new_game();
    });

    function start_new_game(){
        $('.main-menu').removeClass('appear');
        addLoadingScreen();
        $('.menu').hide();
        $('.game').empty().show();
        $('.game').append('<span class="menu-btn"></span>');
        $('.menu-btn').on('click', function(){
            show_settings_menu_ ();
        });
        setTimeout(function(){
             removeLoadingScreen();
        },1000);
        


        start_game(settings_);
    }
    

    $('.home').on('click', function(){
        $('.main-menu').removeClass('appear');
        if ($('.game').is(':visible')){
            confirm_exit ();
        }
        else {
            go_to_menu(); 
        }
        
    });
    $('.close').on('click', function(){
        $('.settings-menu').removeClass('visible');
        setTimeout(function(){
            $('.main-menu').addClass('appear');
        },50)
    });

    $('.restart').on('click', function(){
        confirm_restart ();
        
    });

    

    function confirm_restart () {
        $('.info .holder').attr('class', 'holder').addClass('info-confirm').append($('<div class="buttons"><span class="btn-yes">Yes</span><span class="btn-no">No</span></div>')).fadeIn();
        $('.info').fadeIn();
        $('.btn-yes').click(function(){
            $('.settings-menu').removeClass('visible');
            reset_info ();
            start_new_game(settings_)
        });
        $('.btn-no').click(function(){
            reset_info ();
        })
    }
   

    function show_settings_menu_ (){

        if ($('.game').is(':visible')){
             $('.settings-menu .restart, .settings-menu .home').show();
            $('.opponents-row, .cards-in-deck-row').hide();
        }
        else {
            $('.settings-menu .restart, .settings-menu .home').hide();
            $('.opponents-row, .cards-in-deck-row').show();
        }

        $('.main-menu').removeClass('appear');            
        $('.settings-menu').addClass('visible');
    }

    function confirm_exit () {
        $('.info .holder').attr('class', 'holder').addClass('info-confirm').append($('<div class="buttons"><span class="btn-yes">Yes</span><span class="btn-no">No</span></div>')).fadeIn();
        $('.info').fadeIn();
        $('.btn-yes').click(function(){
            reset_info ();
            go_to_menu ();
        });
        $('.btn-no').click(function(){
            reset_info ();
        })
    }

    function reset_info (){
        $('.info .holder').attr('class', 'holder').empty();
        $('.info').hide();
        $('.info').find('.alien').remove();
    }


    /*if( window.plugins && window.plugins.NativeAudio ) {
        window.plugins.NativeAudio.preloadComplex( 'audio_bg_', 'sounds/main_theme.mp3',1,1,0.3, function(){
            initGame();
        });
        window.plugins.NativeAudio.preloadSimple( 'shield_sound_', 'sounds/shield.mp3');
    }*/
    initGame();



    function initGame(){
        go_to_menu();
        setTimeout(function(){
             removeLoadingScreen();
        },500);
        settings_.sound_on_ ? turn_sound_on_() : turn_sound_off_();
        settings_.vibro_on_ ? turn_vibro_on_() : turn_vibro_off_();
        console.log(settings_.cards_in_deck_)
        $('.opponents-row span.choice').eq(settings_.opponents_-1).addClass('active').siblings('.choice').removeClass('active');
        $('.cards-in-deck-row span.choice').eq((settings_.cards_in_deck_==36 ? 0 : 1)).addClass('active').siblings('.choice').removeClass('active')
    }

    
    
    
    
    //SOUND
    function turn_sound_on_ (){
        settings_.sound_on_ = true;
        localStorage.setItem('sound_on_', true);
        //window.plugins.NativeAudio.loop('audio_bg_');
        $('.switch-sound').removeClass('off');
        
    }
    function turn_sound_off_ (){
        settings_.sound_on_ = false;
        localStorage.setItem('sound_on_', false);
        //window.plugins.NativeAudio.stop('audio_bg_');
        $('.switch-sound').addClass('off');
        
    }
    $('.switch-sound').on('click', function(){
        settings_.sound_on_ ? turn_sound_off_() : turn_sound_on_();
    });
    
    //VIBRO
    function turn_vibro_on_ (){
        settings_.vibro_on_ = true;
        localStorage.setItem('vibro_on_', true);
        $('.switch-vibro').removeClass('off');
        
    }
    function turn_vibro_off_ (){
        settings_.vibro_on_ = false;
        localStorage.setItem('vibro_on_', false);
        $('.switch-vibro').addClass('off');
        
    }
    $('.switch-vibro').on('click', function(){
        if (!settings_.vibro_on_) {
            turn_vibro_on_();
            navigator.vibrate(300);  
        }
        else {turn_vibro_off_();}
    });
    
    $('.opponents-row span.choice').on('click', function(){
       $(this).addClass('active').siblings('.choice').removeClass('active');
        localStorage.setItem('opponents_', $('.opponents-row span.choice.active').attr('data-opponents'));
        settings_.opponents_ = $('.opponents-row span.choice.active').attr('data-opponents');
    });
    $('.cards-in-deck-row span.choice').on('click', function(){
       $(this).addClass('active').siblings('.choice').removeClass('active');
        localStorage.setItem('cards_in_deck_', $('.cards-in-deck-row span.choice.active').attr('data-cards-in-deck'));
        settings_.cards_in_deck_ = $('.cards-in-deck-row span.choice.active').attr('data-cards-in-deck');
    })
    
});

// helpers
function removeLoadingScreen(){$('.loading').fadeOut(300);}
function addLoadingScreen(){$('.loading').css('opacity', 1).show();}

function fisherYates(array) {
    var rnd, temp;

    for (var i = array.length - 1; i; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }

    return array;
  }