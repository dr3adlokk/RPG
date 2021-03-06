$(document).ready(function(){
    var theme = new Audio("assets/sounds/theme.mp3");
    theme.volume = 0.2; 
    var character;
    var characterChosen;
    var enemyChosen = false;
    var opponent;
    var defeated = false; 
    var backgrounds = ["assets/images/tatooine.jpg", "assets/images/endorbg.jpg", "assets/images/hothbg.jpg"];
    theme.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    theme.play(); 
    
    //Object declarations for characters.
    var characters = [
        bastila = {
            name: "bastila",
            image: "<img src = 'assets/images/luke.jpg' id = 'bastila'>",
            defendImage: "<img src = 'assets/images/bastila2.jpg'>",
            baseAttack: 5,
            attack: 5,
            health: 50,
            
        },
    
        boba = {
            name: "Boba Fet",
            image: "<img src = 'assets/images/vader.jpg' id = 'boba'>",
            defendImage: "<img src = 'assets/images/boba.jpg'>",
            baseAttack: 6,
            attack: 6,
            health: 80,
           
        },
    
        maul = {
            name: "Darth Maul",
            image: "<img src = 'assets/images/maul.jpeg' id = 'maul'>",
            defendImage: "<img src = 'assets/images/maul.jpeg'>",
            baseAttack: 8,
            attack: 8,
            health: 60,
           
        },
    
        exar = {
            name: "Exar Kun",
            image: "<img src = 'assets/images/exar kun.jpg' id = 'exar'>",
            defendImage: "<img src = 'assets/images/exar kun.jpg'>",
            baseAttack: 10, 
            attack: 10,
            health: 40,

        }
    ];
    
    var enemyCount = (characters.length - 1); 
    console.log(enemyCount);
    
    //Title Screen Animations
        $('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
        $('#middle').append("<h1>Episode 1: Battle of the Jedi</h1>"); 
        $('#bottom').append("<button type='button' class='btn btn-outline-warning' id='start'>Start Game</button>");
        fadeAllIn();
        console.log(character);
    //Start Game on clicking the #start button.
        $('#start').on("click", function(){
            $(document.body).css('background-image', 'url(assets/images/endorbg.jpg)')
                playGame();
                var saber = new Audio("assets/sounds/saber.mp3");
                saber.play();
            
        });	
    
    //Function declarations---------------------------------------------------------------
        
    //Function to fade out all elements
        function fadeAllOut(){
            //$('#top').fadeOut("slow");
            $('#top').empty();
            //$('#middle').fadeOut("slow");
            $('#middle').empty();
            //$('#bottom').fadeOut("slow");
            $('#bottom').empty();
            $('#attackerZone').empty();
            //$('#attackerZone').fadeOut("slow");
            $('#attackButton').empty();
            //$('#attackButton').fadeOut("slow");
            $('#defenderZone').empty();
            //$('#defenderZone').fadeOut("slow");
        };
    
    //Functino to fade in all elements
        function fadeAllIn(){
            $('#top').fadeIn("slow");
            $('#middle').fadeIn("slow");
            $('#bottom').fadeIn("slow");
            $('#attackerZone').fadeIn("slow");
            $('#attackButton').fadeIn("slow");
            $('#defenderZone').fadeIn("slow");
        };
    //Play Game Function
        function playGame(){
            fadeAllOut();
            $('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
            $('#middle').append("<h1>Choose your character</h1>");
            $('#bottom').append(bastila.image, boba.image, maul.image, exar.image);
            fadeAllIn();
                $('#bottom').on("click", "img[id = bastila]", function(){
                    chooseChar(bastila);
                });
                $('#top').on("click", "img[id = bastila]", function(){
                    if(enemyChosen == false){
                        chooseOpponent(bastila);
                        $('img[id=bastila]').fadeTo("slow", 0.0);
                    }
    
                });
                $('#bottom').on("click", "img[id = boba]", function(){
                    chooseChar(boba);
                });
                $('#top').on("click", "img[id = boba]", function(){
                    if(enemyChosen == false){
                        chooseOpponent(boba);
                        $('img[id=boba]').fadeTo("slow", 0.0);
                    }
                })
                $('#bottom').on("click", "img[id = maul]", function(){
                    chooseChar(maul);
                });
                $('#top').on("click", "img[id = maul]", function(){
                    if(enemyChosen == false){
                        chooseOpponent(maul);
                        $('img[id=maul]').fadeTo("slow", 0.0);
                    }
                })
                $('#bottom').on("click", "img[id = exar]", function(){
                    chooseChar(exar);
                });
                $('#top').on("click", "img[id = exar]", function(){
                    if(enemyChosen == false){
                            chooseOpponent(exar);
                            $('img[id=exar]').fadeTo("slow", 0.0);
                    }
                
                })
                $('#attackButton').on("click", function(){
                    if(enemyChosen == true){
                        attack(character, opponent)
                    }
                    else if (enemyCount == 0){
                        winner(character);
                    }
                });	
            }
    //Choose character function
        function chooseChar(char){
            characterChosen = true; 
            var sound = char.choseSound;
            character = char;
            console.log(character);
            sound.play();
            fadeAllOut();
            battle(char);
    
        }
    //Chooses your opponent for the roung
        function chooseOpponent(char){
            char.choseSound.play();
            if(enemyChosen == false){
                opponent = char; 
                enemyChosen = true; 
                $('#defenderZone').empty(); 
                $('#attackButton').empty();
                $('#defenderZone').append("<div id = 'opponent'>"+char.defendImage+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
                $('#defenderZone').fadeTo("slow", 1.0);
                $('#attackButton').append("<button class = 'btn btn-danger attackButton'>Attack!</button>");
    
            }
        }
    //Function to set up the battleground. This should onlny be called once to set up the playing field. After a player chooses their character. 
        function battle(char){
            $('#top').append("<div id = 'enemies'></div>");
            $('#middle').append("<div class = 'feedcontainer'><div id = 'feed'><p>Welcome to the battle, Jedi. Choose an enemy above to begin attacking. May for the force be with you, always.</p></div></div>");
            $("#attackerZone").append("<div id = 'player'>"+char.image+"<br><h4>"+char.name+"<br>Attack Power: "+char.attack+"<br>Health: "+char.health+"</h4></div>");
            //for loop that goes through the enemies and makes sure thta each is added. 
            for(var i = 0; i < characters.length; i++){
                var enemy = "enemy"+i;  
                if(characters[i].name != char.name){
                    $('#enemies').append("<div id ="+enemy+">"+characters[i].image+"</div>");
                }
            }
        fadeAllIn();
        }
    
    //Takes the character that was clicked and attacks it. 
        function attack(attacker, defender){
            var saberSounds = ["assets/sounds/saber2.mp3", "assets/sounds/saber3.mp3", "assets/sounds/saber4.mp3"]
            var sound = new Audio (saberSounds[Math.floor(Math.random()*saberSounds.length)]);
            if(defender.health > 0 && attacker.health > 0){
                sound.play(); 
            //Changes the objects values and updates the DOM to show the player. 
                $('#feed').prepend("<p id = 'attacker'>"+attacker.name+" attacks "+defender.name+" for "+attacker.attack+" damage!</p>");
                    defender.health = defender.health - attacker.attack; 
                $('#feed').prepend("<p id = 'counter'>"+defender.name+" counters "+attacker.name+" for "+defender.attack+" damage!</p>");
                    attacker.health = attacker.health - defender.attack; 
                    attacker.attack = attacker.attack + attacker.baseAttack;
                $('#feed').prepend("<p id = 'attackGain'>"+attacker.name+" feels the power!! He gains "+attacker.baseAttack+" attack power, bringing him up to "+attacker.attack+" damage!</p>");
                $('#attackerZone').animate({left: "+=100px"});
                $('#defenderZone').animate({left: "-=100px"});
                $('#attackerZone').animate({left: "-=100px"});
                $('#defenderZone').animate({left: "+=100px"});
            //Updates the DOM to show the values of the players health, attack power etc. 
                $("#attackerZone").html("<div id = 'player'>"+attacker.image+"<br><h4>"+attacker.name+"<br>Attack Power: "+attacker.attack+"<br>Health: "+attacker.health+"</h4></div>");
                $('#defenderZone').html("<div id = 'opponent'>"+defender.image+"<br><h4>"+defender.name+"<br>Attack Power: "+defender.attack+"<br>Health: "+defender.health+"</h4></div>");
                if(defender.health <= 0){
                    attack(attacker, defender);
                }
            }
            else if (defender.health <= 0 && attacker.health > 0){
                var dead = new Audio("assets/sounds/scream.mp3");
                dead.play();
                var done = new Audio("assets/sounds/done.mp3");
                done.play();
                $('#attackButton').empty();
                $('#defenderZone').fadeTo('slow', 0.0);
                $('#attackButton').append("<button class = 'btn btn-danger dummyButton'>Attack!</button>");
                $('#feed').prepend("<p id = 'defenderDead'>"+attacker.name+" has defeated "+defender.name+"! Please choose a new opponent, "+attacker.name+".");
                enemyChosen = false; 
                defender.image = defender.deadImage;
                enemyCount--; 
                if(enemyCount == 0){
                    winner(attacker);
                }
            }
            
            else if (attacker.health <= 0){
                var dead = new Audio("assets/sounds/scream.mp3");
                dead.play();
                $('#attackButton').html("<button class = 'btn btn-danger' id = 'reset'>Start a New Game</button>");
                $('#feed').prepend("<p id = 'attackerDead'>"+defender.name+" has defeated "+attacker.name+"! Please click the button to start a new game.");
                loser(attacker);
            }
        }
    //Win Code
        function winner(char){
            fadeAllOut();
            $('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
            $('#middle').append("<h1>Congratulations, "+char.name+" you have won the battle!</h1>");
            $('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>Play Again?</button>");
            fadeAllIn();
            $('#reset').on("click", function(){
                    playAgain();
                });
        }
    //Loser Code
        function loser(char){
            fadeAllOut();
            $('#top').append("<img src = 'assets/images/starwars.png' class = 'img-responsive'>");
            $('#middle').append("<h1>"+char.name+", the force was not with you. Train harder young Padawan!</h1>");
            $('#bottom').append("<button class = 'btn btn-warning' id = 'reset'>Play Again?</button>");
            fadeAllIn();
            $('#reset').on("click", function(){
                    playAgain();
                });
        }
    //Play again 
        function playAgain(){
            console.log("Play again is being pushed.");
    
            character = "";
            characterChosen = "";
            enemyChosen = false;
            opponent = "";
            defeated = false; 
            enemyCount = (characters.length - 1); 
        characters = [
        bastila = {
            name: "bastila",
            image: "<img src = 'assets/images/bastila.jpg' id = 'bastila'>",
            defendImage: "<img src = 'assets/images/luke.jpg'>",
            baseAttack: 5,
            attack: 5,
            health: 50,
            choseSound: new Audio('assets/sounds/luke.mp3')
        },
    
        boba = {
            name: "boba",
            image: "<img src = 'assets/images/boba.jpg' id = 'boba'>",
            defendImage: "<img src = 'assets/images/vader.jpg'>",
            baseAttack: 6,
            attack: 6,
            health: 80,
            
        },
    
        maul = {
            name: "Darth Maul",
            image: "<img src = 'assets/images/maul.jpeg' id = 'maul'>",
            defendImage: "<img src = 'assets/images/maul.jpeg'>",
            baseAttack: 8,
            attack: 8,
            health: 60,
           
        },
    
        exar = {
            name: "Exar Kun",
            image: "<img src = 'assets/images/exar kun.jpg' id = 'exar'>",
            defendImage: "<img src = 'assets/images/exar kun.jpg'>",
            baseAttack: 10, 
            attack: 10,
            health: 40,
            
        }
    ];
            fadeAllOut();
            playGame();
        }
    });