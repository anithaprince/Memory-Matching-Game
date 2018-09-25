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


  let $count = 'X';

  /*******************************************************************/
  //function to play game
  const playGame = (event) =>{
    const $currentVal =$(event.target).text();
    if($currentVal == " " && $count == 'X')
    {
        $(event.target).text($count).css('color','orange');
        $count = 'O';
    }
    else if ($currentVal == " " && $count == 'O')
    {
      $(event.target).text($count).css('color','#7AF724');
      $count = 'X';
    }
    //function to check if game won
    const checkWin =() =>
    {
      const $id = $(event.target).attr('id');
      const $id_before =$id-1;
      const $idbefore_before = $id_before-1;
      // const $after =$id+1;
      // const $after_after = $after+1;
      console.log($id + $id_before + $idbefore_before);

      let $valCurrent = $('.squares').eq($id).text();
      const $val1 =$('.squares').eq($id_before).text();
      const $val2 =$('.squares').eq($idbefore_before).text();
      // const $val3 =$('.squares').eq($after).text();
      // const $val4 =$('.squares').eq($after).text();

      //console.log($valCurrent,$val1,$val2);

      if ($id == '2' || $id == '5' || $id == '8')
      {
        if ($valCurrent == $val1 && $val1 == $val2 ){
          console.log($valCurrent + ' Won the Game');
        }
      }
    }

    checkWin();
  }
  /*******************************************************************/
  //function to create the tic tac board
  const generateSquares = () => {
  for(let i = 0; i < 9; i++)
  {
    const $square = $('<div>').addClass('squares').text(" ").attr('id',i).appendTo('container');
    const $squareValue = $square.text();
    $square.on('click', playGame);
  }

  }
  /*******************************************************************/
  generateSquares();


});
