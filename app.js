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
  // This is th efunction to add image into each grid blocks genertaed

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
        $('#'+$num1).val('notclicked');
        console.log($('#'+$num1).val());
        console.log($('#'+$num1).children().val());
        $('#'+$num1).children().css('visibility', 'hidden');
        arrGrid.splice($index1,1);

        //adding same image to two block
        let $num2 = arrGrid[Math.floor(Math.random()*arrGrid.length)];
        let $index2 = arrGrid.indexOf($num2);
        $('#'+$num2).append('<img src="images/grid'+k+'">');
        $('#'+$num2).children().val(k);
        $('#'+$num2).val('notclicked');
        console.log($('#'+$num2).val());
        console.log($('#'+$num2).children().val());
        $('#'+$num2).children().css('visibility', 'hidden');
        arrGrid.splice($index2,1);
        k=k+1;
      }
};
  /*******************************************************************/
  //function to create the grids
  const generateSquares = (count) => {

    let k = 0;
    let gridClickCount = 0;
    let $grid1;
    let $grid2;
    let $checkArr =[];

    const checkWin = ()=>{
      let $gridVal1 = $checkArr[0].children().eq(0).val();
      let $gridVal2 = $checkArr[1].children().eq(0).val();

      if($gridVal1 == $gridVal2)
      {
          console.log('Matched');
          $checkArr[0].children().remove('slow');
          $checkArr[1].children().remove('slow');
          $checkArr[0].css('background', 'none');
          $checkArr[1].css('background', 'none');
          $checkArr.splice(1,1);
          $checkArr.splice(0,1);

      }
      else {
        $checkArr[0].children().eq(0).hide('slow');
        $checkArr[1].children().eq(0).hide('slow');
        $checkArr[0].val('notclicked');
        $checkArr[1].val('notclicked');
        $checkArr.splice(1,1);
        $checkArr.splice(0,1);
      }
    }

    for(let i = 0; i < count; i++)
    {
      const $square = $('<div>').addClass('squares').attr('id',k).appendTo('container');
      k= k+1;
    }
    addColor(count); // adding images to blocks

    $('.squares').on('click', (event) =>{
      gridClickCount+=1;
      $(event.currentTarget).children().eq(0).css('visibility', 'visible');
        console.log($(event.currentTarget).val());
      if(gridClickCount == 1 && $(event.currentTarget).val() == 'notclicked')
      {
        $grid1 = $(event.currentTarget);
        $checkArr.push($grid1);
        $(event.currentTarget).val('clicked');
        console.log($(event.currentTarget).val());
      }
      else if(gridClickCount == 2 && $(event.currentTarget).val() == 'notclicked')
      {
        $grid2=$(event.currentTarget);
        $checkArr.push($grid2);
        $(event.currentTarget).val('clicked');
        console.log($(event.currentTarget).val());
        checkWin();
        gridClickCount = 0;
      }
    })

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
