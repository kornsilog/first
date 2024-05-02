$(document).ready(function() {
  function typeWriter(element, text, callback) {
    var characters = text.split('');
    var i = 0;
    var originalText = element.text(); 
    var interval = setInterval(function() {
      if (i < characters.length) {
        element.text(originalText + characters.slice(0, i + 1).join('')); 
        i++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, 160); 
  }

  function startTypewriter(element, text, callback) {
    element.empty(); 
    typeWriter(element, text, callback);
  }


  $('.typewriter').css('opacity', '0').animate({'opacity': '1'}, 400);
  

  setTimeout(function() {
    startTypewriter($('.typewriter'), "HAPPY ANNIVERSARY LANGGA!", function() {
      $('.small-text').removeClass('hidden'); 
      startTypewriter($('.small-text'), "DAYS WE HAVE BEEN TOGETHER", function() {
        function updateTimer() {
          const currentTime = new Date().getTime();
          const startTime = new Date("2023-05-05T00:00:00").getTime();

          const elapsedTime = currentTime - startTime;
          const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

          const timerString = `${days} days: ${hours} hours: ${minutes} minutes: ${seconds} seconds`;

          $('.timer').text(timerString);
        }

        $('.timer').removeClass('hidden');
        updateTimer(); 
        setInterval(updateTimer, 1000); 
      });
    });
  }, 1000);
});
