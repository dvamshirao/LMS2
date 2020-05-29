import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from './login.service';
declare var jQuery: any;
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import 'sweetalert2/src/sweetalert2.scss'

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
    /*
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
    */
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
  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  submitForm(dataObj)
  {
    this.ls.doLoginuser(dataObj).subscribe((result)=>{
     if(result["message"]=="invalid username")
     {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username!',
        text: 'Enter Correct Username',
      });
     }
     else if(result["message"]=="invalid password")
     {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password!',
        text: 'Enter Correct Password',
      });
     }
     else
     { 
       if(result["check"]=="admin")
       {
        
        Swal.fire({
          icon: 'success',
          title: 'Login Success!',
          text: 'Admin Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
        //save token in local storage of browser
        localStorage.setItem("token",result["message"]);
 
        this.ls.adminLoginStatus=true;
        this.ls.adminid=result['adminid'];
        this.ls.username=result['username'];
        //redirect to userdashboard 
        this.router.navigate(['/admindashboard']);

       }
       else{
        Swal.fire({
          icon: 'success',
          title: 'Login Success!',
          text: 'Welcome '+result['username'],
          showConfirmButton: false,
          timer: 1500
        });
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
