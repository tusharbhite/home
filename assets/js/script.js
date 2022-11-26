// Toggle menu
// Initiate nicescroll
// var Scrollbar = window.Scrollbar;

$(document).ready(function() {

  $('#ring').hide();


  $.get("https://ipinfo.io", function(response) {
   // alert(response.ip+JSON.stringify(response));
}, "json")
  onResize();
  
  //Testimonials

  var name="tush";
  var dp="assets/profile_pic/nehru.jpg";
  var desi="Engineer";
  var msg="hiiiiiiiiiiiiiiiiiiiiiii";

  const url = "https://script.google.com/macros/s/AKfycbyJ4daNIgeQfBIn75g74vqOFeuM_AG4VtKlWljX6r04zkVe2bqf9Buz52Cd0OdjWozJ/exec";  // <--- Please set the URL of Web Apps.
           
           fetch(`${url}`, {method: "GET"})
           .then(res => res.json())
           .then(e => {
             //console.log(e);
             e.reverse();
             for(let i = 0; i < e.length; i++) {
              let obj = e[i];
              //obj["Profile Pic"]
              //obj.Name
              //obj.Occupation
              //obj.Message

              $('#testimonial').append(`<div class="col-md-4">
              <div class="card">
                 <p class="p-content gray">"`+obj.Message+`"</p>
                 <div class="testimonials-footer">
                    <img src="`+obj["Profile Pic"]+`" class="profile-testimonial">
                    <div class="testimonials-user">
                       <h5 class="testimonials-user-title">`+obj.Name+`</h5>
                       <small class="testimonials-user-post">-`+obj.Occupation+`</small>
                    </div>
                 </div>
              </div>
              </div>`);


          }
             // <--- You can retrieve the returned value here. 
            })  
          
          .catch(err => {
            console.log(err);//Error response
            $('#loading').hide();
            $('#ring').hide();
            });
        

  


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



     
   
      if(name.length===0 || occupation.length===0 || message.length===0 || form.file.files.length == 0){
      $("#showError").click();
      }
      else{
        readyToSubmit=true;
      }
      if(readyToSubmit){
        //alert("Alert1");
        $('#loading').empty();
        $('#loading').append(`<h4 id="yellow-text">Sending Your Response..</h4><div class="ring"><span></span></div>`);
        $('#loading').show();
        $('#ring').show();



      //File
      const file = form.file.files[0];
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);

        fr.onload = f => {
           const url = "https://script.google.com/macros/s/AKfycbyJ4daNIgeQfBIn75g74vqOFeuM_AG4VtKlWljX6r04zkVe2bqf9Buz52Cd0OdjWozJ/exec";  // <--- Please set the URL of Web Apps.
           
           const qs = new URLSearchParams({filename: form.filename.value || file.name, mimeType: file.type, name: name, occupation: occupation, message: message, email: email,timeStamp: timeStamp});
           fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
           .then(res => res.json())
           .then(e => {
             //console.log(e);// <--- You can retrieve the returned value here. 
              $('#loading').hide();
              $('#ring').hide();
              $('#formid').hide();
              $('#form').hide();
              $("#showSuccess").click(); 
              $('.col-lg-8').find('h3').text("You have successfully submitted a Testimonial !");
              localStorage.setItem("submittedResponse", "yes");
            })  
          
          .catch(err => {
            console.log(err);//Error response
            $('#loading').hide();
            $('#ring').hide();
            $("#showServerError").click();
            });
         }

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
   $('.scroll-content').css('transform', "translate3d(0px, 0px, 0px)");
   $('.scrollbar-thumb').css('transform', "translate3d(0px, 0px, 0px)");
  });




   //pre next shortcut
   $('.prev-next-btns').click(function() {
    var destination = $(this).attr("dest");
    console.log("c "+destination);
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
      $("html, body").animate({ scrollTop: 0 }, "slow");
      $('.scroll-content').css('transform', "translate3d(0px, 0px, 0px)");
      $('.scrollbar-thumb').css('transform', "translate3d(0px, 0px, 0px)");
      
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