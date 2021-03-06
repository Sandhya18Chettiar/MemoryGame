$(document).ready(function() {
         
    var cards = ['piggy-bank', 'shoe', 'plane', 'suitcase', 'robot', 'ring', 'palm-tree', 'mp3'];
    var pairs = cards.concat(cards);//create pairs of cards
    var chosenCards = [];
    var cardsToFlip = [];
    
    var gameStarted = false;
    var beforeStart = false;
    var outOfTime = false;
    var countdownStarted = false;
    var win = false;
    var pairCount = 0;
    var time = 30;
    
    shuffleArray(pairs);
    
    $('.back').each(function(i, element) {
        $(this).attr('id', pairs[i]);//sets id in DOM for cards, access styles via css
    });
    
    $('.flip-container').click(function(){
        
        if (!outOfTime) {
        
            if (!gameStarted && !beforeStart){//before the game starts, show all cards to the user and flip back
                
                beforeStart = true;
                
                $('.flip-container').each(function() {
                    $(this).toggleClass('flip');
                });
                
                setTimeout(function() {
                    
                    $('.flip-container').each(function() {
                        $(this).toggleClass('flip');
                    });
                    
                    gameStarted = true;
                    beforeStart = false;
                    
                }, 2000);
            }
    
            else if ($(this).find('.back').attr('id') == chosenCards[0] && chosenCards[1] == null && $(this).hasClass('flip') && !beforeStart) {
                
                chosenCards[0] = null;//if one card has been chosen and then clicked again, flip back over
                $(this).toggleClass('flip');
          
            }
        
            else if (chosenCards[0] == null && chosenCards[1] == null && !$(this).hasClass('flip') && !beforeStart) {
                
                if (!countdownStarted) {
                    countdown();
                }
                
                chosenCards[0] = $(this).find('.back').attr('id');
                $(this).toggleClass('flip');
            }
        
            
            else if (chosenCards[0] != null && chosenCards[1] == null && !$(this).hasClass('flip') && !beforeStart) {
                
                chosenCards[1] = $(this).find('.back').attr('id');
                $(this).toggleClass('flip');
        
                if (chosenCards[0] == chosenCards[1]) { //if Cards match
                    
                    chosenCards[0] = null; 
                    chosenCards[1] = null;
                    
                    pairCount++;
                    $('.score').text(pairCount);
                    
                    
                    if (pairCount == cards.length) {
                        win = true;
                        alert("you win :D");
                    }   
                }
        
                else {//if the Cards did not match - empty the chosenCards & flip the cards back over 
                    
                    cardsToFlip[0] = chosenCards[0];
                    cardsToFlip[1] = chosenCards[1];
                    
                    chosenCards[0] = null;
                    chosenCards[1] = null;
                    
                    setTimeout(function(){//flip back the chosen cards that did not match
        
                        $('*[id*=' + cardsToFlip[0] + ']').each(function() {
                            $(this).closest('.flip').toggleClass('flip');
                        });
                        $('*[id*=' + cardsToFlip[1] + ']').each(function() {
                            $(this).closest('.flip').toggleClass('flip');
                        });
                        
                        beforeStart = false;
                        
                    }, 800);
                }
                
            }
                
        } else {
            alert("you have run out of time :(");
        }; 
    });
    
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function countdown () {
        
        countdownStarted = true;
    
        var timeStart = +new Date;
        var timer = setInterval( function() {
            
            var timeNow = +new Date;
            var difference = ( timeNow - timeStart ) / 1000; //calculates time difference if game isn't in focus
            
            if (time > 0 && !win) {// if there is still time left and game isn't won, deduct time
                
                time = 30;
                time = Math.floor( time - difference );
                $('.timer').text( time );
                
            } else if (win) {//stop timer when game is won
                
                clearInterval(timer);
                
            } else {//stop timer when time is run out
                
                outOfTime = true;
                alert("you have run out of time :(");
                
                clearInterval(timer);
            } 
            
        }, 250 );
        
    };

});
   
       
        
   