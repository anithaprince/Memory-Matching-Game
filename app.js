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
    let arrGrid = [];
    let count1 = 0;

      for(let i = 0; i < count; i++)
      {
        arrGrid.push(i);
      }
      console.log(arrGrid);
      let k=0;
      while(arrGrid.length>0)
      {

        // const red =  Math.floor(Math.random() *  255);
        // const green =  Math.floor(Math.random() *  255);
        // const blue =  Math.floor(Math.random() *  255);
        // const randHex = 'rgb('+red+','+green+','+blue+')';

        let $num1 = arrGrid[Math.floor(Math.random()*arrGrid.length)];
        let $index1 = arrGrid.indexOf($num1);
        //$('#'+$num1).css('background-color', randHex);
        //$('#'+$num1).css('background-color', 'transparent');
        $('#'+$num1).append('<img src="images/grid'+k+'">');
        $('#'+$num1).val(k);
        $('#'+$num1).children().css('visibility', 'hidden');
        arrGrid.splice($index1,1);

        let $num2 = arrGrid[Math.floor(Math.random()*arrGrid.length)];
        let $index2 = arrGrid.indexOf($num2);

        //$('#'+$num2).css('background-color', randHex);
        //$('#'+$num2).css('background-color', 'transparent');
        $('#'+$num2).append('<img src="images/grid'+k+'">');
        $('#'+$num2).val(k);
        $('#'+$num2).children().css('visibility', 'hidden');
        arrGrid.splice($index2,1);

        console.log($num1,$num2);
        console.log($index1,$index2);
        console.log(arrGrid);
        console.log(arrGrid.length);
        k=k+1;
      }




};

  /*******************************************************************/
  //function to create the grids
  const generateSquares = (count) => {
  let k = 0;
  for(let i = 0; i < count; i++)
  {
    const $square = $('<div>').addClass('squares').attr('id',k).appendTo('container');
    k= k+1;
  //  $square.css('scale', '1:1')
  }
  addColor(count);

  $('.squares').on('click', (event) =>{
    console.log('clicked');
    $(event.currentTarget).css('background-image', 'none');
    console.log($(event.currentTarget).children());
    $(event.currentTarget).children().eq(0).css('visibility', 'visible');
    

  });

  }
  /*******************************************************************/
  $('#easy').on('click', (event)=>{
    generateSquares(12);
    $('#level').css('display','none');
    $('#game').css('visibility','visible');
    $('container').css('width','30%');

  });


  $('#medium').on('click', (event)=>{
    generateSquares(16);
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
