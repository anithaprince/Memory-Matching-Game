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

  /*******************************************************************/

  const addColor = (count) =>{

  for(let j = 0; j < count; j++)
  {
    if($('#'+j).val()==0)
    {
      for(let i = 0; i < count; i++)
      {
        const red =  Math.floor(Math.random() *  255);
        const green =  Math.floor(Math.random() *  255);
        const blue =  Math.floor(Math.random() *  255);
        const randHex = 'rgb('+red+','+green+','+blue+')';
        let endNum = count-1;
        let $num1 = Math.floor(Math.random() * endNum) + 1;
        let $num2 = Math.floor(Math.random() * endNum) + 1;
        let $value1 = $('#'+$num1).val();
        let $value2 = $('#'+$num2).val();

        if($value1 == 0 && $value2 == 0)
        {
          $('#'+$num1).css('background-image', 'none');
          $('#'+$num2).css('background-color', randHex);
          $('#'+$num1).css('background-color', randHex);
          $('#'+$num2).css('background-color', randHex);
          $('#'+$num1).val("1");
          $('#'+$num2).val("1");
        }
      }
    }
  }
};

  /*******************************************************************/
  //function to create the grids
  const generateSquares = (count) => {
  let k = 0;
  for(let i = 0; i < count; i++)
  {
    const $square = $('<div>').addClass('squares').val("0").attr('id',k).appendTo('container');
    k= k+1;
  //  $square.css('scale', '1:1')
  }
  addColor(count);

  }
  /*******************************************************************/
  $('#easy').on('click', (event)=>{
    generateSquares(12);
    $('#level').css('display','none');
    $('#game').css('visibility','visible');
    $('container').css('width','30%');

  });


  $('#medium').on('click', (event)=>{
    generateSquares(18);
    $('#level').css('display','none');
    $('#game').css('visibility','visible');
    $('container').css('width','40%');

  });

  $('#hard').on('click', (event)=>{
    generateSquares(20);
    $('#level').css('display','none');
    $('#game').css('visibility','visible');
    $('container').css('width','50%');
  });



});
