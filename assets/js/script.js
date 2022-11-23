// Toggle menu
// Initiate nicescroll
// var Scrollbar = window.Scrollbar;
$(document).ready(function() {
  onResize();

  //form
  $("#formid").submit(function(e) {
    //alert("tried to submit");
    //$("#showError").click();
    e.preventDefault();
    });

    $('.form-btn').click(async function() {
      var name = $('#input-name').val();
      var email= $('#input-email').val();
      var occupation= $('#input-occupation').val();
      var message= $('#input-message').val();
      var readyToSubmit=false;
      var timeStamp=getTimeStamp();
   
      if(name.length===0 || occupation.length===0 || message.length===0){
      $("#showError").click();
      }
      else{
        readyToSubmit=true;
      }
      if(readyToSubmit){
          $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzdy3d5w4xennkCHdDr15YpoOsp9q8057t5oY895dIQ8kwnLBaYxGR-Ve0LbHpROrha/exec"+"?name="+name+"&occupation="+occupation+"&message="+message+"&email="+email+"&timeStamp="+timeStamp+"&localData=LocalData"+"&cookies=cookies"+"&profilePic=profilePic"+"&other1=other1"+"&other2=other2",
            
           // url:"https://script.google.com/macros/s/AKfycbxMIAwcgVble1fOaT5hYGJ-iDnkfPuOXfyP88GcdeLCrCEr57jyUZr3vzPT31diho3h/exec" + jQuery.param({"name":"Tushar","age":"Bhite","mobile":22,"email":"Developer"}),
            type:'post',
            user:{
              "name": name,
              "occupation": occupation,
              "message": message,
              "email": email,
              "timeStamp" : timeStamp,
              "localData" : "local data",
              "cookies" : "cookie data",
              "profilePic" : "picture",
              "other1" : "other1",
              "other2" : "other2"
          },
             success: function(result){


              var data=  '{ "name": "name","occupation": "occupation","message": "message", "email": "email","timeStamp" : "timeStamp","localStorage" : "local data","cookies" : "cookie data","profilePic" : "picture","other1" : "other1","other2" : "other2"}';
                const obj = JSON.parse(data);
                //alert("data submitted successfulle"+obj.name+"suc="+result+JSON.stringify(result));
                alert("data submitted successfully "+"Result= "+JSON.stringify(result)+result);  

              },
              error: function(result){
                alert("some error occured"+JSON.stringify(result));
              },              
         });
        }
      
      
    });

  //Toggle Chevron
  $('.about-me').click(function() {
    $('.menu-item-has-children li a').toggle('1000');
    $("i", this).toggleClass("fa-chevron-down fa-chevron-right");
  });

   //Toggle Projects Chevron
   $('.card-link').click(function() {
    //$(this).toggle('1000');
    console.log($(this).hasClass('collapsed'));
    if($(this).hasClass('collapsed'))
    $(this).find('i').attr('class','fa fa-chevron-up');
    else
    $(this).find('i').attr('class','fa fa-chevron-down');


    //$("i", this).toggleClass("fa-chevron-down fa-chevron-up");
  });



  //pre next shortcut
  $('.demo-link').click(function() {
    var destination = $(this).attr("href");
    window.open(destination); 
  });

   //Achievemnts links
   $('.boxed').click(function() {
    var destination = $(this).attr("href");
    window.open(destination); 
  });



  //scroll to top
  $(".scroll-to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
   // window.scrollTo({ top: 0, behavior: 'smooth' });

   $('.scroll-content').css('transform', "translate3d(0px, 0px, 0px)");
   $('.scrollbar-thumb').css('transform', "translate3d(0px, 0px, 0px)");

  });




   //pre next shortcut
   $('.prev-next-btns').click(function() {
    var destination = $(this).attr("dest");
    console.log(destination);
    var destSelector="."+destination;
    $(destSelector).click();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  });

  //Contact  shortcut
  $('#contacting').on('click', function() {
    $('#contact-page').click();
  });
  


  // Move to top
  $('[dd-move-to-top]').on('click', function() {
    // $('html, body').animate({
    //   // scrollTop: $(".scroll-content").offset().top
    // }, 2000);
    $('.scroll-content').css('transform', "translate3d(0px, 0px, 0px)");
    $('.scrollbar-thumb').css('transform', "translate3d(0px, 0px, 0px)");
  });
  // Toggle Menu/Nav
  $('[dd-toggle_menu]').on('click', function() {
    $(this).toggleClass('active');
    var toggle_div_id = $(this).attr('dd-toggle_menu');
    $('#'+toggle_div_id).removeClass('out');
    $('#'+toggle_div_id).toggleClass('in');
  });
  // Hide sidebar for small screen
  if( $(window).width() <= 768 ) {
    $('.sidebar-content').hide();
  }
  // Toggle sidebar content
  $('.about-me').on('click', function() {
    if( $(window).width() <= 768 ) {
      $('.sidebar-content').slideToggle();
    }
  });
  // Nav action
  $('.nav-list li a').on('click', function() {
    $('.nav-list li a').removeClass('active');
    $(this).addClass('active');
    $('[dd-toggle_menu]').trigger('click');
    $('.navbar').addClass('out');
  });
  // Redirect to other pages
  $('[dd-page]').on('click', function() {
    var main_section = $(this).attr('dd-page');
    var about_title_current = $('.about-me').attr('dd-current');
    $('.nav-list').attr('dd-active-nav', main_section);
    $('.about-me').removeClass(about_title_current).addClass(main_section);
    $('.about-me').attr('dd-current', main_section);
    if( $(window).width() <= 768 ) {
      $('.sidebar-content').hide();
    } else {
      $('.sidebar-content').show();
    }
    setTimeout(function() {
      $('#'+main_section).addClass('active');
    }, 200);
    $('.main__content').not('#'+main_section).css({'z-index': -1});
    $('#'+main_section).css({'z-index': 1});
    $('#'+main_section).removeClass('d-n');
    window.scrollTo(0, 0);
    setTimeout(function() {
      $('.main__content').not('#'+main_section).addClass('d-n').removeClass('active');
    }, 700);
  });
  // Set dynamic background
  $('[dd-background]').each(function() {
    $(this).css('background', 'url('+$(this).attr('dd-background')+')');
  });
  $('[dd-projct-list] li a').on('click', function() {
    $('[dd-projct-list] li a').not(this).removeClass('active');
    $(this).addClass('active')
  });
  // bar width(skills)
  $('[dd-skill-per]').each(function() {
    $(this).css('width', $(this).attr('dd-skill-per')+'%');
  });
  // Toggle projects
  $('[dd-toggle-project]').click(function() {
    $('[dd-project]').show();
    var project_type = $(this).attr('dd-toggle-project');
    if( project_type == '*' ) {
      $('[dd-project]').removeClass('out').addClass('in');
      $('[dd-portfolio-line]').show();
    } else {
      $('[dd-project]').hide().addClass('out').removeClass('in');
      $('[dd-portfolio-line]').hide();
      setTimeout(function() {
        $('[dd-project="'+project_type+'"]').show().addClass('in').removeClass('out');
        $('[dd-project]').not($('[dd-project="'+project_type+'"]')).hide();
      }, 1);
    }
  });
  

  $('.hamburger__menu').click();
  $('.projects').click();
 
  if( $(window).width() <= 768 ) {
    $('.about-me').click();
  }

  $('.about-me-2').on('click', function() {
    $('.about-me').click();
  });
  

});

// On widnow resize
$(window).on('resize', function(){
  onResize();
});
function onResize() {
  if( $(window).width() >= 768 ) {
    Scrollbar.initAll();
    $('.sidebar-content').slideDown();
  } else {
    Scrollbar.destroyAll();
  }
}

function getTimeStamp(){

  var date_format = '12'; /* FORMAT CAN BE 12 hour (12) OR 24 hour (24)*/
 
 
var d       = new Date();
var hour    = d.getHours();  /* Returns the hour (from 0-23) */
var minutes     = d.getMinutes();  /* Returns the minutes (from 0-59) */
var result  = hour;
var ext     = '';
 
if(date_format == '12'){
    if(hour > 12){
        ext = 'PM';
        hour = (hour - 12);
        result = hour;

        if(hour < 10){
            result = "0" + hour;
        }else if(hour == 12){
            hour = "00";
            ext = 'AM';
        }
    }
    else if(hour < 12){
        result = ((hour < 10) ? "0" + hour : hour);
        ext = 'AM';
    }else if(hour == 12){
        ext = 'PM';
    }
}
 
if(minutes < 10){
    minutes = "0" + minutes; 
}

 
result = result + ":" + minutes + ' ' + ext; 
 
var timeInfo="Date="+d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear()+" Time="+result+" Full Time="+d.getHours()+" : "+d.getMinutes();
return timeInfo;
}