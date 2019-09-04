$(document).ready(function () {
    // global variables
    var correctTotal = 0;
    var wrongTotal = 0
    var unansweredTotal = 0;
    var correctAnswer;
    var timeRemaining = 15;
    var intervalID;
    var answered = false; //variable to stop the timer if user has clicked an answer
    var indexQs = 0;


    $("#start").on("click", function () {
        $(this).remove();
        $("#redo-block").hide();
        correct = 0;
        wrong = 0
        unanswered = 0;
        loadQuestions();
    });

    var gameObj = [
        {
            question: "Which quarterback has the most career passing yards?",
            options: ["Peyton Manning", "Tom Brady", "Drew Brees", "Brett Favre"],
            answer: "2",
            image: "assets/images/drew-brees.gif"
        },
        {
            question: "Which running back has the most career rushing yards?",
            options: ["Adrian Peterson", "Walter Payton", "Emmitt Smith", "Barry Sanders"],
            answer: "2",
            image: "assets/images/emmitt-smith.gif"
        },
        {
            question: "Which player has the most career receiving yards?",
            options: ["Jerry Rice", "Larry Fitzgerald", "Randy Moss", "Terrell Owens"],
            answer: "0",
            image: "assets/images/jerry-rice.gif"
        },
        {
            question: "Which player has won the most Super Bowl MVPs?",
            options: ["Joe Montana", "Tom Brady", "Eli Manning", "John Elway"],
            answer: "1",
            image: "assets/images/tom-brady.gif"
        },
        {
            question: "Which player was the MVP of the 2018 season?",
            options: ["Drew Brees", "Tom Brady", "Patrick Mahomes II", "Aaron Rodgers"],
            answer: "2",
            image: "assets/images/patrick-mahomes.gif"
        },
        {
            question: "Which team did OJ Simpson play for the majority of his career?",
            options: ["San Francisco 49ers", "New York Jets", "New England Patriots", "Buffalo Bills"],
            answer: "3",
            image: "assets/images/buffalo.gif"
        },
        {
            question: "Which team's fans are known as the 12th man",
            options: ["Tennesse Titans", "Seattle Seahawks", "Dallas Cowboys", "Oakland Raiders"],
            answer: "1",
            image: "assets/images/seahawks.gif"
        },
        {
            question: "Which team had the best defense in 2018?",
            options: ["Minnesota Vikings", "Pittsburgh Steelers", "Philadelphia Eagles", "Baltimore Ravens"],
            answer: "0",
            image: "assets/images/vikings.gif"
        },
        {
            question: "Which team lost the most games in 2018?",
            options: ["Oakland Raiders", "New York Jets", "San Franciso 49ers", "Arizona Cardinals"],
            answer: "3",
            image: "assets/images/cardinals.gif"
        },
        {
            question: "Who is the greatest linebacker of all time?",
            options: ["Dick Butkus", "Bobby Boucher", "Brian Urlacher", "Lawrence Taylor"],
            answer: "3",
            image: "assets/images/taylor.gif"
        }
    ];


    function loadQuestions() {
        answered = false; 
        timeRemaining = 15;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correctAnswer = gameObj[indexQs].answer;
        var question = gameObj[indexQs].question;
        $(".question").html(question); //present trivia question
        for (var i = 0; i < 4; i++) { //present answer options for question
            var option = gameObj[indexQs].options[i];
            $("#options").append("<h4 class=optionsAll id=" + i + ">" + option + "</h4>");
        }

        $("h4").click(function () {
            var id = $(this).attr("id");
            if (id === correctAnswer) {
                answered = true; // stops the timer
                $(".question").text("TOUCHDOWN!! You are correct: " + gameObj[indexQs].options[id]);
                correctTotal++;
                reset();
            } else {
                answered = true; //stops timer
                $(".question").text("SACKED!! You Are Wrong - The Answer is: " + gameObj[indexQs].options[correctAnswer]);
                wrongTotal++;
                reset();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $(".time-left").text("Time Remaining: " + timeRemaining);
        }
    }


    function unAnswered() {
        unansweredTotal++;
        $(".question").text("Delay of Game Penalty! The answer is: " + gameObj[indexQs].options[correctAnswer]);
        reset();
    }

    function reset() {
        $('.optionsAll').remove();
        //console.log("Image to be loaded: " + gameObj[indexQs].image);
        $("#image").append('<img class=footballImage src="' + gameObj[indexQs].image + '">');
        indexQs++; // increments index which will load next question when loadQandA() is called again
        if (indexQs < gameObj.length) {
            setTimeout(function () {
                loadQuestions();
                $("#image").empty();
            }, 3000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $(".question").empty();
                $("#options").empty();
                $(".time-left").empty();
                $("#image").empty();
                $("#status").append("<h5>All Done! Here are your results:</h5>");
                $("#status").append('<h5>Correct Answers: ' + correctTotal + '</h5>');
                $("#status").append('<h5>Incorrect Answers: ' + wrongTotal + '</h5>');
                $("#status").append('<h5>Unanswered: ' + unansweredTotal + '</h5>');
                if (correctTotal === 10) {
                    $("#status").append("<h3>You are a Superbowl MVP!</h3>");
                } else if (correctTotal === 9) {
                    $("#status").append("<h3>You are a Pro Bowler!</h3>");
                } else if (correctTotal === 8) {
                    $("#status").append("<h3>You are a First Stringer!</h3>");
                } else if (correctTotal === 7) {
                    $("#status").append("<h3>You are a Second Stringer<!/h3>");
                } else if (correctTotal === 6) {
                    $("#status").append("<h3>You have been put on the practice squad!</h3>");
                } else {
                    $("#status").append("<h3>Not good enough. You have been cut from the team!</h3>");
                }
                setTimeout(function () {
                    $(".done").text("Start Over?")
                    $(".done").click(function () {
                        $("#status").empty();
                        correctTotal = 0;
                        wrongTotal = 0
                        unansweredTotal = 0;
                        correctAnswer = "";
                        answered = false;
                        indexQs = 0;
                        $(".done").empty();
                        loadQuestions();
                    });
                }, 2000);
            }, 5000);
        }
    };


});

// The app works for two games and then everything goes haywire.  It seems that 
// the Start Over button is not going away when clicked.  Therefore it works for 
// the 2nd game but not the third. During the third game set it looks like 2 versions
// of the game are running at the same time.  I tried finding a way to rectify this
// problem but ran out of time. I tried the remove and empty methods but neither worked.