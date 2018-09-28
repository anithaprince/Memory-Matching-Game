$(() =>{

/************************Scroll Functionality****************************/
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

    $('#animatedElement').click(function() {
      $(this).addClass("slideUp");
    });
/**********************************************************************/

$(window).scroll(function() {
		$('#sliderImg').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+400) {
				$(this).addClass("bounce");
			}
		});
});

  /*******************************************************************/

  //Initializing Global Variables
  let score = 0;
  let isChallenge = false;

  // This is the function to add image into each grid blocks generated

  const addColor = (count) =>{
    //Initializing Variables
    let arrGrid = [];
    let count1 = 0;
    let k=0;
    for(let i = 0; i < count; i++)
    {
      arrGrid.push(i); // adding all generated  grids id to an array
    }
      //loop to add images to each block
      while(arrGrid.length>0)
      {
        //adding same image to two block
        let $num1 = arrGrid[Math.floor(Math.random()*arrGrid.length)];
        let $index1 = arrGrid.indexOf($num1);
        $('#'+$num1).append('<img src="images/grid'+k+'">');
        $('#'+$num1).children().val(k);
        $('#'+$num1).val('not clicked');
        $('#'+$num1).children().css('visibility', 'hidden');
        $('#'+$num1).children().hide();
        arrGrid.splice($index1,1);

        //adding same image to two block
        let $num2 = arrGrid[Math.floor(Math.random()*arrGrid.length)];
        let $index2 = arrGrid.indexOf($num2);
        $('#'+$num2).append('<img src="images/grid'+k+'">');
        $('#'+$num2).children().val(k);
        $('#'+$num2).val('not clicked');
        $('#'+$num2).children().css('visibility', 'hidden');
        $('#'+$num2).children().hide();
        arrGrid.splice($index2,1);
        k=k+1;
      }
  };

  /*******************************************************************/
  //function to create the grids
  const generateSquares = (count,isChallenge) => {
    $("#scoreVal").text('0'); //setting score to 0

    //Initializing Variables
    let k = 0;
    let gridClickCount = 1;
    let score = 0;
    let $grid1;
    let $grid2;
    let $checkArr =[];
    let matched=0;
    //----------function to check if crad matched and all tiles are clear-----------//
    const checkWin = (count)=>{
      let $gridVal1 = $checkArr[0].children().eq(0).val();
      let $gridVal2 = $checkArr[1].children().eq(0).val();
      if($gridVal1 == $gridVal2)
      {
          console.log('Matched');
          matched +=1;
          score = score + 10;
          $("#scoreVal").text(score);
          $checkArr[0].children().hide('swing');
          $checkArr[1].children().hide('swing');
          $checkArr[0].css('background', 'none');
          $checkArr[1].css('background', 'none');
          $checkArr.splice(1,1);
          $checkArr.splice(0,1);
          if(matched == (count/2))
          {
            console.log('Game Over');
            $('#win').css('display','block');
            $('#game').css('display','none');
            $('#win').children().eq(0).text("Congratulation! You won");
            var timerText = document.getElementById("#clock").innerHTML;
            let scoreString = 'Score: '+score+"  ,   "+'Time: '+timerText;
            $('#win').children().eq(1).text(scoreString);
            timerStop();
          }
          var audio1 = $("#mysoundclip1")[0];
          audio1.play();
      }
      else {
        $checkArr[0].children().fadeOut("slow");
        $checkArr[0].children().eq(0).css('visibility','visible');
        $checkArr[1].children().fadeOut("slow");
        $checkArr[1].children().eq(0).css('visibility','visible');
        $checkArr[0].val('');
        $checkArr[0].val('not clicked');
        $checkArr[1].val('');
        $checkArr[1].val('not clicked');
        $checkArr.splice(1,1);
        $checkArr.splice(0,1);
      }
    }
    //-------------- Generating Grids---------------------//
    $('<h1>').text('Play Game').appendTo('container');
    for(let i = 0; i < count; i++)
    {
      const $square = $('<div>').addClass('squares').attr('id',k).appendTo('container');
      k= k+1;
    }
    //-------------- Adding Images---------------------//
    addColor(count); // adding images to blocks
    timerStart(); //starting timer from 0

    //-------------- Define what to do on clicking images-----------------//
    $('.squares').on('click', (event) =>{
      var audio = $("#mysoundclip")[0];
      audio.play();
      if(isChallenge==true) // code to check if its challenge mode
      {
        let currentTime = document.getElementById("#clock").innerHTML;
        if(currentTime >= 60){
          console.log('failed');
          $('#win').children().eq(0).text("You lost! Better Luck next time");
          $('#win').css('display','block');
          $('#game').css('display','none');
          var timerText = document.getElementById("#clock").innerHTML;
          let scoreString = 'Score: '+score+"  ,   "+'Time: '+timerText;
          $('#win').children().eq(1).text(scoreString);
          timerStop();
        }
        else {
          if(gridClickCount == 1 && $(event.currentTarget).val() === 'not clicked')
          {
            $(event.currentTarget).children().eq(0).css('visibility','visible');
            $(event.currentTarget).children().eq(0).show();
            $(event.currentTarget).val('');
            $(event.currentTarget).val('clicked');
            $grid1 = $(event.currentTarget);
            $checkArr.push($grid1);
            gridClickCount = 2;
          }
          else if(gridClickCount == 2 && $(event.currentTarget).val() === 'not clicked')
          {
            $(event.currentTarget).children().eq(0).css('visibility','visible');
            $(event.currentTarget).children().eq(0).show();
            $(event.currentTarget).val('');
            $(event.currentTarget).val('clicked');
            $grid2=$(event.currentTarget);
            $checkArr.push($grid2);
            checkWin(count);
            gridClickCount = 1;
          }
        }
      }
      else { // code of other mode game
        if(gridClickCount == 1 && $(event.currentTarget).val() === 'not clicked')
        {
          $(event.currentTarget).children().eq(0).css('visibility','visible');
          $(event.currentTarget).children().eq(0).show();
          $(event.currentTarget).val('');
          $(event.currentTarget).val('clicked');
          $grid1 = $(event.currentTarget);
          $checkArr.push($grid1);
          gridClickCount = 2;
        }
        else if(gridClickCount == 2 && $(event.currentTarget).val() === 'not clicked')
        {
          $(event.currentTarget).children().eq(0).css('visibility','visible');
          $(event.currentTarget).children().eq(0).show();
          $(event.currentTarget).val('');
          $(event.currentTarget).val('clicked');
          $grid2=$(event.currentTarget);
          $checkArr.push($grid2);
          checkWin(count);
          gridClickCount = 1;
        }
      }

    })

}

  /*******************************************************************/
  // call to action for all buttons on the page
  $('#easy').on('click', (event)=>{
    isChallenge = false;
    generateSquares(12,isChallenge);
    $('#level').css('display','none');
    $('#game').css('display','block');
    $('container').css('width','33%');
    $('#leftside').css('margin-left','15%');
    $('#leftside').css('display','block');
  });

  $('#medium').on('click', (event)=>{
    isChallenge = false;
    generateSquares(16,isChallenge);
    $('#level').css('display','none');
    $('#game').css('display','block');
    $('container').css('width','45%');
    $('#leftside').css('margin-left','10%');
    $('#leftside').css('display','block');
  });

  $('#hard').on('click', (event)=>{
    isChallenge = false;
    generateSquares(20,isChallenge);
    $('#level').css('display','none');
    $('#game').css('display','block');
    $('container').css('width','46%');
    $('#leftside').css('margin-left','5%');
    $('#leftside').css('display','block');
  });

  $('#challenge').on('click', (event)=>{
    isChallenge = true;
    generateSquares(20,isChallenge);
    $('#level').css('display','none');
    $('#game').css('display','block');
    $('container').css('width','46%');
    $('#leftside').css('margin-left','5%');
    $('#leftside').css('display','block');
    $('#challengeInstruction').css('display','block');
  });

  $('#playAgain').on('click', (event)=>{
    $('container').empty();
    timerStop();
    $('#level').css('display','block');
    $('#win').css('display','none');
    $('#leftside').css('display','none');
    $('#challengeInstruction').css('display','none');
  });

  $('#playAgain1').on('click', (event)=>{
    $('container').empty();
    timerStop();
    $('#level').css('display','block');
    $('#win').css('display','none');
    $('#leftside').css('display','none');
    $('#challengeInstruction').css('display','none');
    timerStart();
  });
  $('.button').on('click',() =>{
    var audio2 = $("#mysoundclip2")[0];
    audio2.play();
  })
  $('#button').on('click',() =>{
    var audio2 = $("#mysoundclip2")[0];
    audio2.play();
  })


/*********************function for timer*******************************/

  function changeValue() {
    document.getElementById("#clock").innerHTML = ++value;
  //  console.log(value);
  }

  var timerInterval = null;
  var value = 0;
  function timerStart() {
    clearInterval(timerInterval);
    document.getElementById("#clock").innerHTML='0';
    value = 0;
    timerInterval = setInterval(changeValue, 1000);
  }

  var timerStop = function() {
    document.getElementById("#clock").innerHTML='0';
    value = 0;
  }

});
