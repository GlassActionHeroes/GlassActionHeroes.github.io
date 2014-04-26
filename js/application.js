// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager, ClientInputManager );
});


    // var imageList = [
    //     "../image/212/11.gif",
    //     "../image/212/10.gif",
    //     "../image/212/9.gif",
    //     "../image/212/8.gif",
    //     "../image/212/7.gif",
    //     "../image/212/6.gif",
    //     "../image/212/5.gif",
    //     "../image/212/4.gif",
    //     "../image/212/3.gif",
    //     "../image/212/2.gif",
    //     "../image/212/1.gif",
    //     "../image/114/11.gif",
    //     "../image/114/10.gif",
    //     "../image/114/9.gif",
    //     "../image/114/8.gif",
    //     "../image/114/7.gif",
    //     "../image/114/6.gif",
    //     "../image/114/5.gif",
    //     "../image/114/4.gif",
    //     "../image/114/3.gif",
    //     "../image/114/2.gif",
    //     "../image/114/1.gif",
    // ];
    // for(var i = 0; i < imageList.length; i++ )
    // {
    //     var imageObject = new Image();
    //     imageObject.src = imageList[i];
    // }
