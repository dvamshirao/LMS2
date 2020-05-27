import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from './login.service';
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private router:Router,private ls:LoginService){}

  ngOnInit() {
    (function($) {
      "use strict"; // Start of use strict
    
      // Smooth scrolling using jQuery easing
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 72)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });
    
      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
      });
    
      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
        target: '#mainNav',
        offset: 75
      });
    
      // Collapse Navbar
     var navbarCollapse = function() {
       if ($("#mainNav").offset() != undefined){
     if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }}
    };
    // Collapse now if page is not at top
      // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
    navbarCollapse();
    
      // Magnific popup calls
      $('#portfolio').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1]
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
      });
    
    })(jQuery); // End of use strict
 
    setTimeout(()=>{
      this.ls.userLoginStatus=false;
      this.ls.adminLoginStatus=false;
      this.ls.doLogout();
    },0);
  }
  submitForm(dataObj)
  {
    
    this.ls.doLoginuser(dataObj).subscribe((result)=>{
     if(result["message"]=="invalid username")
     {
       alert("invalid username");
     }
     else if(result["message"]=="invalid password")
     {
       alert("invalid password");
     }
     else
     { 
       if(result["check"]=="admin")
       {
        alert("admin login success");
        console.log(result["message"]);
        //save token in local storage of browser
        localStorage.setItem("token",result["message"]);
 
        this.ls.adminLoginStatus=true;
        this.ls.adminid=result['adminid'];
        this.ls.username=result['username'];
        //redirect to userdashboard 
        this.router.navigate(['/admindashboard']);

       }
       else{

       
        alert("login success");
        //save token in local storage of browser
        localStorage.setItem("token",result["message"]);

        this.ls.userLoginStatus=true;
        this.ls.userid=result['userid'];
        this.ls.username=result['username'];
        //redirect to userdashboard 
        this.router.navigate(['../userdashboard',result["username"]]);
       }
     }
    })
  
} 
}
