$(document).ready(function() {
  $('#tweet-text').on('keyup', function(e) {
   
    const currCharCount = $(this).val().length;
  
    const counterElem = $(this).parent().children('.under-tweet-input').children('.counter');
    const remainingChars = 140 - currCharCount;
    
    counterElem.text(remainingChars);
    if (remainingChars < 0) {
      counterElem.css('color', '#ff0000');
    } else {
      counterElem.css('color', '#545149');
    }
  });
});
