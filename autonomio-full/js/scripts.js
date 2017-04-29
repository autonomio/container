/* ------------------------------------------------
---------------------------------------------------

    Zenith's Main JavaScript Document
    Version: 1.0
    Created By: Amazyne Themes

---------------------------------------------------
--------------------------------------------------- */


/* ------------------------------------------------

    Navigation

--------------------------------------------------- */


/* ------------------------------------------------
    Responsive Scripts for Navigation
--------------------------------------------------- */


function navResponsive() {
    
    if (screenWidth > 991) {
        
        $(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "");
        $(".main-nav .navbar-nav.nav-search > .dropdown > a").attr("data-toggle", "dropdown");
        $('.main-nav .navbar-nav > .dropdown').removeClass('open');
        $('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
        $('.main-nav .navbar-nav > li').find(':focus').blur();
        if ( $('.main-nav .navbar-collapse').hasClass('in') ) {
            $('.main-nav .navbar-collapse').removeClass('in');
        }
        if($('.navbar-toggle').hasClass('active')){
            $('.navbar-toggle').removeClass('active');
        }
        
    }
    else if  (screenWidth <= 991)  {
        
        $(".main-nav .navbar-nav > .dropdown > a").attr("data-toggle", "dropdown");
        $('.main-nav .nav > li .dropdown-menu').removeAttr('style');
        $('.main-nav .nav > li > .dropdown-menu').removeAttr('style');
        
    }
}


/* ------------------------------------------------
    Navigation's Click, Hover and Keyup Events
--------------------------------------------------- */


function navEvents() {
    
    /*---- Dropdown Menu Events ----*/
    
    $('.main-nav .navbar-nav > .dropdown > .dropdown-menu').click(function(event) {
        if(screenWidth <= 991) {
            event.stopPropagation();
        }
    });

    $( ".main-nav .navbar-nav>.dropdown>.dropdown-menu>.dropdown-submenu" ).click(function(event) {
        if(screenWidth < 991) {
            $this = $(this);
            $this.siblings(".dropdown-submenu").removeClass("open").end(); 
            $this.parents(".dropdown-submenu").addClass('open');
            $this.toggleClass('open');
            event.stopPropagation();
        }
    });

    $('.main-nav .navbar-nav > .dropdown > a').click(function(event) {
        $('.main-nav .navbar-nav .dropdown-submenu').removeClass('open');
    });	

    $('.navbar-toggle').click(function(event){
        $(this).toggleClass('active')
    })

    $('.main-nav .nav > li .dropdown-submenu > a').click(function(event) {
        if(screenWidth > 991) {
            event.stopPropagation();
        }
    });
	
	if (screenWidth < 991) {
		
		$('.header-side').removeClass('in');
		$('.side-header').removeClass('active');
	
	}
    
    $('.main-nav .nav > li').hover(function() {
        var dropdownList = $(this).find("> .dropdown-menu");

        if (screenWidth > 991) {
            
            /*---- Dropdown Animation on Hover ----*/
    
            dropdownList.addClass('animated fadeIn');        
            window.setTimeout( function(){
                dropdownList.removeClass('animated fadeIn');
            }, 500);        

            /*---- Positioning Dropdown Menu ----*/
            
            if(!dropdownList.hasClass('megamenu')){
                var childDropdownList = $(this).find(".dropdown-submenu .dropdown-menu"),
                dropdownOffset = $(this).offset(),
                offsetLeft = dropdownOffset.left,
                dropdownWidth = dropdownList.width(),
                childWidth = childDropdownList.width(),
                docWidth = $(window).width(),
                aWidth = $(this).children("a").outerWidth(),
                shiftWidth = Math.abs(dropdownWidth - aWidth),
                childShiftWidth = dropdownWidth + childWidth - 1,
                isDropdownVisible = (offsetLeft + dropdownWidth <= docWidth),
                isChildDropdownVisible = (offsetLeft + dropdownWidth + childWidth <= docWidth);
                if (!isDropdownVisible) {
                    dropdownList.css('margin-left','-'+shiftWidth+'px')
                    childDropdownList.css('margin-left','-'+childShiftWidth+'px')
                } else if (!isChildDropdownVisible) {
                    childDropdownList.css('margin-left','-'+childShiftWidth+'px')
                }
                else {
                    dropdownList.removeAttr('style')
                    childDropdownList.removeAttr('style')
                }
            }
            
            /*---- Positioning Mega Menu ----*/
            
            else if(dropdownList.hasClass('megamenu')){
                var dropdownOffset = $(this).offset(),
                linkWidth = $(this).width(),
                dropdownListOffset = dropdownList.offset(),
                offsetLeft = dropdownOffset.left,
                dropdownListoffsetLeft = dropdownListOffset.left,
                dropdownWidth = dropdownList.width(),
                docWidth = $(window).width(),
                shiftOffset = (($('.navigation').hasClass('transparent')) ? 30 : 30),
                positionedValue = Math.abs(offsetLeft),
                shiftWidth = Math.abs(positionedValue + dropdownWidth + shiftOffset),
                isDropdownVisible = (shiftWidth <= docWidth);
                if (!isDropdownVisible) {
                    calculateOffset = docWidth - dropdownWidth - shiftOffset;
                    dropdownList.css('left',+calculateOffset+'px');
                }
                else {
                    dropdownList.css('left',+positionedValue+'px');
                }
            }
        }
    });
	
    /*---- Full-screen Menu Events ----*/
            
    $('.full-screen-menu-trigger').click(function(event) {
        event.preventDefault();
        $('.full-screen-header').fadeToggle();
        $(this).toggleClass('active');
        $('html, body').toggleClass('full-screen-header-active');
    });

    /*---- Side Menu Events ----*/
            
    $('.side-menu-trigger').click(function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('body').toggleClass('in');
        $('.side-header').toggleClass('active');
		if(!$('.chart-container').hasClass('admin-chart-js')){
			setTimeout(function(){$('.chart-container').trigger('resize');},300);
		}
    });
	
	$('.navbar-icons .navbar-left li a').click(function(){
		if (screenWidth < 991 && $(this).parents('li').hasClass('dropdown')) {
			var dropdownList = $(this).parents('li.dropdown').find("> .dropdown-menu");
			var dropdownOffset = dropdownList.offset().left,
				dropdownOffset = Math.abs(dropdownOffset),
				linkWidth = dropdownList.width(),
				docWidth = $(window).width();
				
			setTimeout(function(){
				dropdownOffset = dropdownList.offset().left;
				if((dropdownOffset+linkWidth)>docWidth){
					var calc = docWidth-dropdownOffset-linkWidth-30;
					dropdownList.css('margin-left',calc+'px')
				}
			},1);
		}	
		else {
			return;
		}
	});

	$('.side-header-close').click(function(event){
        event.preventDefault();
        if ($('.side-header').hasClass('active')) {
            $('.side-menu-trigger').removeClass('active');
            $('.side-header').removeClass('active');
            $('body').removeClass('in');
        }
    });
	

    /*---- Sub-menu Events ----*/
            
    $( ".menu-dropdown-link" ).click(function(event) {
		if(!$(this).hasClass('inner') && !$(this).hasClass('third')){
			
			$(this)
				.parent(".with-dropdown")
				.siblings(".with-dropdown")
				.children(".menu-dropdown.collapse")
				.removeClass("in")
				.end(); 
			$(this).parents(".with-dropdown").children(".menu-dropdown.collapse").toggleClass('in');
			//$( this ).parents(".with-dropdown").find(".menu-dropdown.collapse").toggleClass('in');
			  event.stopPropagation();
				$(".with-dropdown-2").find("> .menu-dropdown.collapse").removeClass('in')
		}
		else if ($(this).hasClass('inner')){
			
			$(this)
				.parent(".with-dropdown-2")
				.siblings(".with-dropdown-2")
				.children(".menu-dropdown.collapse")
				.removeClass("in")
				.end(); 
			$( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").toggleClass('in');
			$(".with-dropdown-3").find("> .menu-dropdown.collapse").removeClass('in')
			event.stopPropagation();
			
		}
		else if ($(this).hasClass('third')){
			$(this)
				.parent(".with-dropdown-3")
				.siblings(".with-dropdown-3")
				.children(".menu-dropdown.collapse")
				.removeClass("in")
				.end(); 
			$( this ).parents(".with-dropdown-3").children(".menu-dropdown.collapse").toggleClass('in');
			event.stopPropagation();
		}
    });
	
    $('li.with-dropdown a.menu-dropdown-link').click(function () {
		if(!$(this).hasClass('inner') && !$(this).hasClass('third')){
			var dh = $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").outerHeight();
			if(!$(this).hasClass('active-dropdown')) {
				$( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").css('height',dh+'px');
			}
			else {
				$( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").attr('style','').removeClass('in');
			}
			$('.active-dropdown').not($(this)).removeClass('active-dropdown');
			$(this).children(".with-dropdown-2,.with-dropdown-3").find(" > .menu-dropdown-link").addClass('active-dropdown');
			$(this).toggleClass('active-dropdown');
		}
		else if ($(this).hasClass('inner')){
			var dh = $( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").outerHeight();
			var sh = $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").outerHeight();
			var th = dh + sh;
			var mh = sh - dh;
			if(!$(this).hasClass('active-dropdown')) {
				$( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").css('height',dh+'px');
				$( this ).parents(".with-dropdown").find(" > .menu-dropdown.collapse").css('height',th+'px');
			}
			else {
				$( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").attr('style','');
				$( this ).parents(".with-dropdown").find(" > .menu-dropdown.collapse").css('height',mh+'px');
			}
			$('.active-dropdown').not($(this)).removeClass('active-dropdown');
			$(this).parents(".with-dropdown").find(" > .menu-dropdown-link").addClass('active-dropdown');
			$(this).children(".with-dropdown-3").find(" > .menu-dropdown-link").addClass('active-dropdown');
			$(this).toggleClass('active-dropdown');
		}
		else if ($(this).hasClass('third')){
			var ah = $( this ).parents(".with-dropdown-3").children(".menu-dropdown.collapse").outerHeight();
			var dh = $( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").outerHeight();
			var sh = $( this ).parents(".with-dropdown").children(".menu-dropdown.collapse").outerHeight();
			var th = ah + dh;
			var yh = ah + dh + sh;
			var mh = dh - ah;
			var nh = sh - dh - ah;
			if(!$(this).hasClass('active-dropdown')) {
				$( this ).parents(".with-dropdown-3").children(".menu-dropdown.collapse").css('height',ah+'px');
				$( this ).parents(".with-dropdown-2").children(".menu-dropdown.collapse").css('height',th+'px');
				$( this ).parents(".with-dropdown").find(" > .menu-dropdown.collapse").css('height',yh+'px');
			}
			else {
				$( this ).parents(".with-dropdown-3").children(".menu-dropdown.collapse").attr('style','');
				$( this ).parents(".with-dropdown-2").find(" > .menu-dropdown.collapse").css('height',mh+'px');
				$( this ).parents(".with-dropdown").find(" > .menu-dropdown.collapse").css('height',nh+'px');
			}
			$('.active-dropdown').not($(this)).removeClass('active-dropdown');
			$(this).parents(".with-dropdown,.with-dropdown-2").find(" > .menu-dropdown-link").addClass('active-dropdown');
			$(this).toggleClass('active-dropdown');
		}
    });

    /*---- Search Box Events ----*/
            
    $('.search-box-trigger').click(function(event) {
        if($(window).width() < 992) {
            if($('.navbar-collapse').hasClass('in')){
                $('.navbar-collapse').removeClass('in');
            }
        }
        event.preventDefault();
        $('.full-screen-search').fadeToggle();
        $(this).toggleClass('active');
    });

    $(".search-field").keyup(function (e) {
        if (e.keyCode == 13) {
            $('#searchForm').submit();
        }
    });
	
}


if(document.getElementsByClassName('corner-navigation') || document.getElementsByClassName('.padded-fixed-footer')){
    window.addEventListener('scroll', function(e){
        if ($(window).scrollTop() > 50){
            $('.corner-navigation, .padded-fixed-footer').addClass('fill-in');
        }
        else{
            $('.corner-navigation, .padded-fixed-footer').removeClass('fill-in');
        }
    });
}


/* ------------------------------------------------
    Sticky Navigation
--------------------------------------------------- */


/*---- Sticky Nav's Global Variables ----*/

var headerHeight = 0,
    headerVisiblePos = 0,
	headerFixedPos = 0,
	isHeaderFixed = false,
	isHeaderVisible = false;


/* ------------------------------------------------
    One Page Navigation
--------------------------------------------------- */


function navOnePage() {
    if( $('body').hasClass('one-page')){	
        var offset = 0,
			delay =0;
        var $sections = $('.one-page-section');
        if($('.main-nav').hasClass('sticky')){
            offset = 60;
        }
		if($('body').find('.owl-carousel.one-page-section')){
            delay = 800;
        }
		else {
			delay = 100;
		}
		window.setTimeout(function() {
			sectionOffset();
		}, delay);
		function sectionOffset(){
            var currentScroll = $(this).scrollTop() + offset;
            var $currentSection;
            $sections.each(function(){
                var divPosition = $(this).offset().top;
                var divHeight = $(this).outerHeight();
                var total = divPosition + divHeight;
                if($(window).scrollTop() + screenHeight >= $(document).height() - offset) {
                    $currentSection = $sections.last();
                }
                else if( divPosition - 1 < currentScroll ){
                    $currentSection = $(this);
                }
            });
            var id = $currentSection.attr('id');
            $('.main-nav .nav > li').removeClass('active');
            $("[href=#"+id+"]").parent('li').addClass('active');
        }
		var timer;  
        $(window).scroll(function(){
            if(timer){
                sectionOffset();
            }
            else {
                timer = window.setTimeout(function() {
                    sectionOffset();
                }, 100);
            }
        });
        var scrollActive = '';
        $('.main-nav .nav li a[href*=#]:not([href=#])').click(function() {
            if(scrollActive == true) {
                event.preventDefault();	
            }
            else {
                var offset = 59;
                scrollActive = true;
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - offset
                        }, 1000, "easeInQuart" , function() {
                            scrollActive = false;
                        });
                        return false;
                    }
                }
            }
        });
    }
}

/* ------------------------------------------------

    Centred Modal Box

--------------------------------------------------- */


function centerModal() {
    if ($(window).height() >= 320){
        adjustModal();
    }
}
function adjustModal(){
    $('.modal').each(function(){
        if($(this).hasClass('in') == false){
            $(this).show();
        };
        var contentHeight = $(window).height() - 60;
        var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
        var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;
        $(this).find('.modal-content').css({
            'max-height': function () {
                return contentHeight;
            }
        });
        $(this).find('.modal-body').css({
            'max-height': function () {
                return (contentHeight - (headerHeight + footerHeight));
            }
        });
        $(this).find('.modal-dialog').addClass('modal-dialog-center').css({
            'margin-top': function () {
                return -($(this).outerHeight() / 2);
            },
            'margin-left': function () {
                return -($(this).outerWidth() / 2);
            }
        });
        if($(this).hasClass('in') == false){
            $(this).hide();
        };
    });
};

/* ------------------------------------------------

    To-Do List

--------------------------------------------------- */

// add items
$('#add-todo').click(function(){
  var lastSibling = $('#todo-list > .todo-wrap:last-of-type > input').attr('id');
  var newId = Number(lastSibling) + 1;
      
  $(this).before('<span class="editing todo-wrap"><input type="checkbox" id="'+newId+'"/><label for="'+newId+'" class="todo"><i class="icon_check"></i><input type="text" class="input-todo" id="input-todo'+newId+'"/></label></div>');
  $('#input-todo'+newId+'').parent().parent().animate({
    height:"36px"
  },200)
  $('#input-todo'+newId+'').focus();
  
	$('#input-todo'+newId+'').enterKey(function(){
    $(this).trigger('enterEvent');
  })
  
  $('#input-todo'+newId+'').on('blur enterEvent',function(){
    var todoTitle = $('#input-todo'+newId+'').val();
    var todoTitleLength = todoTitle.length;
    if (todoTitleLength > 0) {
      $(this).before(todoTitle);
      $(this).parent().parent().removeClass('editing');
      $(this).parent().after('<span class="delete-item" title="remove"><i class="icon_close"></i></span>');
      $(this).remove();
      $('.delete-item').click(function(){
        var parentItem = $(this).parent();
        parentItem.animate({
          left:"-30%",
          height:0,
          opacity:0
        },200);
        setTimeout(function(){ $(parentItem).remove(); }, 1000);
      });
    }
    else {
      $('.editing').animate({
        height:'0px'
      },200);
      setTimeout(function(){
        $('.editing').remove()
      },400)
    }
  })

});

// remove items 

$('.delete-item').click(function(){
  var parentItem = $(this).parent();
  parentItem.animate({
    left:"-30%",
    height:0,
    opacity:0
  },200);
  setTimeout(function(){ $(parentItem).remove(); }, 1000);
});

// Enter Key detect

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}


/* ------------------------------------------------

    Vertically Centred Elements

--------------------------------------------------- */


function verticallyCentered(){
    if(document.getElementsByClassName("vertical-centred-element")){
        $('.vertical-centred-element').each(function(){
            var $this = $(this),
                height = 0,
                width = 0,
                margin = 0;
            if($this.hasClass('flipped-vertical')){
                width = $this.outerWidth();
                margin = width/2;
                $this.css('margin-top',margin+'px');
            }
        });
    }
}

/* ------------------------------------------------

    Slim Scroll

--------------------------------------------------- */

function slimscroll () {
	var screenHeight = $(window).height();
	var chatTopFriends = 345;
	var chatTopSettings = 300;
	var chatTopMessages = 220;
	var scrollHeightFriends = screenHeight - chatTopFriends;
	var scrollHeightSettings = screenHeight - chatTopSettings;
	var scrollHeightMessages = screenHeight - chatTopMessages;
	var scrollHeightDropdown = 275;
	$('.slim-scroll-content-friends').height(scrollHeightFriends);
	$('.slim-scroll-content-settings').height(scrollHeightSettings);
	$('.slim-scroll-content-messages').height(scrollHeightMessages);
	$('.slim-scroll-dropdown-content').height(scrollHeightDropdown);
	$(function(){
		$('.slim-scroll-div').slimscroll({
			height: 'auto'
		})
    });
}


/* ------------------------------------------------
    Chat/Settings Slide
--------------------------------------------------- */


$(function(){
    $('.chat-trigger').click(function(event) {
		event.preventDefault();
		$('.chat-slide').toggleClass('active');
	});
	$(document).mouseup(function (e) {
		var container = $(".main-nav, .chat-slide");
		if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& $('.chat-slide').hasClass('active')) {
			$('.chat-slide').removeClass('active');
		}
	});
	$('.message-trigger').click(function(event) {
		event.preventDefault();
		$('.message-pane').toggleClass('active');
		$('.list-pane').toggleClass('inactive');
	});
});


/* ------------------------------------------------

    Theme Background Section

--------------------------------------------------- */


function themeImageSection () {
    var fullScreenImage = document.getElementsByClassName("theme-background-section");
    if(document.getElementsByClassName("theme-background-section")){
        var windowH = window.innerHeight;
        $('.theme-background-section').each(function(){ 
            $selection =  $(this);
            if($selection.hasClass('custom-height')) {
                var customHeight = $selection.attr('data-custom-height');
                if (typeof customHeight !== typeof undefined && customHeight !== false && customHeight !== '') {
                    var decCustomHeight = customHeight/100;
                    windowH = windowH * decCustomHeight;
                }
            }
            else if($selection.hasClass('half-screen')){
                windowH = windowH/2;
            }
            else if($selection.hasClass('half-screen-width')){
                windowW = screenWidth/2;
                $selection.css('width', windowW + 'px');
            }
            else {
                var offsetContainer = $selection.attr('data-offset-container');
                if (typeof offsetContainer !== typeof undefined && offsetContainer !== false && offsetContainer !== '' && screenWidth > 767) {
                    var containerArray = offsetContainer.split(",");
                    var i, offsetHeight = 0, currentContainer;
                    for (i = 0; i < containerArray.length; i++) { 
                        currentContainer = String(containerArray[i]);
                        offsetHeight += $(currentContainer).outerHeight();
                    }
                    windowH = windowH - offsetHeight;
                }
            }
            if($selection.find('.content-container').outerHeight() > windowH) {
                $selection.css('height', 'auto');
                $selection.find('.fade-scroll').removeClass('fade-scroll');
            }
            else {
                $selection.css('height', windowH + 'px');
            }
            if($selection.closest(".owl-carousel").length ) {
                window.setTimeout(function(){
                    if($selection.find('.content-container').outerHeight() > windowH) {
                        $('.theme-background-section').css('height', 'auto');
                        $('.theme-background-section').find('.fade-scroll').removeClass('fade-scroll').addClass('no-fade-scroll');
                    }
                    else {
                        $('.theme-background-section').css('height', windowH + 'px');
                        $('.theme-background-section').find('.no-fade-scroll').removeClass('no-fade-scroll').addClass('fade-scroll');
                    }
                },300);
            }
            $(window).scroll(function(){
                $(".fade-scroll").css("opacity", 1 - $(window).scrollTop() / (windowH/2));
            });
        });
    }
}


/* ------------------------------------------------

    Initializing Plugins & Elements

--------------------------------------------------- */


/* ------------------------------------------------
    Init Owl Carousel
--------------------------------------------------- */


function owlC() {
    var carousel = $(".owl-carousel");
    carousel.owlCarousel({
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
    });		
}


/* ------------------------------------------------
    Init Counters
--------------------------------------------------- */


function counters() {
    $('.counter').counterUp({
        delay: 10,
        time: 2333
    });	
}


/* ------------------------------------------------
    Init Nivo Lightbox
--------------------------------------------------- */


function nivoLightbox() {
    $('a').nivoLightbox();
}


/* ------------------------------------------------
    Init Wow
--------------------------------------------------- */


function wowInit() {
    var wow = new WOW({
        //disabled for mobile
        mobile: false
    });
    wow.init();
}


/* ------------------------------------------------
    Init Bootstrap Carousel
--------------------------------------------------- */


$('.carousel').carousel({
    interval: false
});


/* ------------------------------------------------
    Init Progress Bars
--------------------------------------------------- */


function progressBarsOnView() {
    $('div.progress-bar').waypoint(function(){
        $(this).css('width', $(this).attr('aria-valuenow')+'%');
    }, {
        offset: '100%'
    });	
}

/* ------------------------------------------------
    Check All
--------------------------------------------------- */

$('input#check-all').click(function(){
	$('.theme-checkbox input').prop('checked',this.checked)
})


/* ------------------------------------------------
    Init Tooltips
--------------------------------------------------- */


function tooltip() {
    $(".tip-top").tooltip({
        placement : 'top',
        container : 'body'
    });
    $(".tip-right").tooltip({
        placement : 'right',
        container : 'body'
    });
    $(".tip-bottom").tooltip({
        placement : 'bottom',
        container : 'body'
    });
    $(".tip-left").tooltip({
        placement : 'left',
        container : 'body'
    });	
}


/* ------------------------------------------------
    # Links
--------------------------------------------------- */


$('a').click(function(e) {
    var link = $(this).attr('href');
    if(link == '#'){
        e.preventDefault();
    }
});


/* ------------------------------------------------
    Jump Links
--------------------------------------------------- */


$('a[href*=#]:not([href=#]).jump').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var jumpOffset = 0;
        if($(this).attr('data-jump-offset')){
            jumpOffset = $(this).attr('data-jump-offset');
        }
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - jumpOffset
            }, 1000, "easeInQuart");
            return false;
        }
    }
});



/* ------------------------------------------------
    Expandable Section
--------------------------------------------------- */


$('.expandable-section a.expansion-trigger').click(function(e){
    e.preventDefault();
    if($(this).hasClass('down')) {
        $('.section-expand').slideDown();
        $('.expandable-section a.expansion-trigger.down, .expandable-section .expansion-text.exp').hide();
        $('.expandable-section a.expansion-trigger.up, .expandable-section .expansion-text.cls').fadeIn();
    }
    else if($(this).hasClass('up')) {
        $('.section-expand').slideUp();
        $('.expandable-section a.expansion-trigger.up, .expandable-section .expansion-text.cls').hide();
        $('.expandable-section a.expansion-trigger.down, .expandable-section .expansion-text.exp').fadeIn();

    }
});

/* ------------------------------------------------
    Portlet Expansion
--------------------------------------------------- */


if($('.portlet-expand').hasClass('active')) {
	$('.portlet-expand').css('display','block');
	$('.expandable-portlet a.portlet-trigger.down').hide();
	$('.expandable-portlet a.portlet-trigger.up').fadeIn();
	$('.expandable-portlet a.portlet-trigger.up').css('display','inline-block');
}
$('.expandable-portlet a.portlet-trigger').click(function(e){
    e.preventDefault();
    if($(this).hasClass('down')) {
        $('.portlet-expand').slideDown();
        $('.expandable-portlet a.portlet-trigger.down').hide();
        $('.expandable-portlet a.portlet-trigger.up').fadeIn();
		$('.expandable-portlet a.portlet-trigger.up').css('display','inline-block');
    }
    else if($(this).hasClass('up')) {
        $('.portlet-expand').slideUp();
        $('.expandable-portlet a.portlet-trigger.up').hide();
        $('.expandable-portlet a.portlet-trigger.down').fadeIn();

    }
});

/* ------------------------------------------------
    Horizontal Timeline
--------------------------------------------------- */

jQuery(document).ready(function($){
	var timelines = $('.horizontal-timeline'),
		eventsMinDistance = 60;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.ht-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
			$('.ht-navigation .next').click(function(){
				showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			$('.ht-navigation .prev').click(function(){
				showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});


/* ------------------------------------------------

    Footer Responsive script

--------------------------------------------------- */


function footerResponsive(screenheight) {
	
	if($('.page-content').height()<screenHeight){
		$('.footer').addClass('stick-to-bottom');
	}
	else {
		$('.footer').removeClass('stick-to-bottom');
	}
	
}


/* ------------------------------------------------

    Contact Form Validation

--------------------------------------------------- */


function formValidation() {
	
    generateCaptcha();

    
/* ------------------------------------------------
    Init Contact Form
--------------------------------------------------- */


    $('#contactForm').formValidation({
        framework: 'bootstrap',
        
        /*---- Feedback Icons ----*/
    
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        /*---- Fields to be Validated ----*/
    
        fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    }
                }
            },
            lastName: {
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    }
                }
            },
            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required'
                    },
                    regexp: {
                        message: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
                        regexp: /^[0-9\s\-()+\.]+$/
                    }
                }
            },
            company: {
                validators: {
                    stringLength: {
                        max: 50,
                        message: 'Company name must be less than 50 characters long'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            msg: {
                validators: {
                    notEmpty: {
                        message: 'The message is required'
                    },
                    stringLength: {
                        max: 700,
                        message: 'The message must be less than 700 characters long'
                    }
                }
            },
            captcha: {
                validators: {
                    callback: {
                        message: 'Wrong answer',
                        callback: function(value, validator, $field) {
                            var items = $('#captchaOperation').html().split(' '),
                            sum   = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            }
        }
    })
    .on('err.form.fv', function(e) {
        generateCaptcha();
    })
    .on('success.form.fv', function(e) {
        
        /*---- Ajax Code for Submitting Form ----*/
    
        e.preventDefault();
        var $form = $(e.target),
        id = $form.attr('id'),
        thisForm = '#'+id;
        $('.form-loader', thisForm).fadeIn();
        $.post($form.attr('action'), $form.serialize(), function(result) {}, 'json')
        .done(function() {
            $('.form-loader', thisForm).fadeOut();
            var output = document.getElementById('formResponse');
            output.innerHTML = 'Thank you for your message. We will get back to you shortly';
            $('#formResponse').addClass('alert-theme-success').fadeIn();
        })
        .fail(function() {
            $('.form-loader', thisForm).fadeOut();
            var output = document.getElementById('formResponse');
            output.innerHTML = 'We are experiencing some problems. Please try again later'
            $('#formResponse').addClass('alert-theme-danger').fadeIn();
        });
    });

    
/* ------------------------------------------------
    Init Footer Newsletter Form
--------------------------------------------------- */


    $('#footerNewsletterForm').formValidation({
        framework: 'bootstrap',
        
        /*---- Feedback Icons ----*/
    
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        /*---- Fields to be Validated ----*/
    
        fields: {
            newsletterEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
        }
    });
    
    $('#newsletterForm').formValidation({
        framework: 'bootstrap',
        icon: false,
        fields: {
            newsletterEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
        }
    });

    
/* ------------------------------------------------
    Init Payment Form
--------------------------------------------------- */

	
	$('#paymentForm').formValidation({
		
		message: 'This value is not valid',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
			cardType: {
				icon: false,
				validators: {
					notEmpty: {
						message: 'Card type is required'
					}
				}
            },
			cardHolder: {
                validators: {
                    notEmpty: {
                        message: 'Card holder\'s name is required'
                    },
                    stringCase: {
                        message: 'Card holder\'s name must contain upper case characters only',
                        case: 'upper'
                    }
                }
            },
            ccNumber: {
                validators: {
                    notEmpty: {
                        message: 'The credit card number is required'
                    },
                    creditCard: {
                        message: 'The credit card number is not valid'
                    }
                }
            },
            expMonth: {
                selector: '[data-stripe="exp-month"]',
                validators: {
                    notEmpty: {
                        message: 'The expiration month is required'
                    },
                    digits: {
                        message: 'The expiration month can contain digits only'
                    },
                    callback: {
                        message: 'Expired',
                        callback: function(value, validator) {
                            value = parseInt(value, 10);
                            var year         = validator.getFieldElements('expYear').val(),
                                currentMonth = new Date().getMonth() + 1,
                                currentYear  = new Date().getFullYear();
                            if (value < 0 || value > 12) {
                                return false;
                            }
                            if (year == '') {
                                return true;
                            }
                            year = parseInt(year, 10);
                            if (year > currentYear || (year == currentYear && value > currentMonth)) {
                                validator.updateStatus('expYear', 'VALID');
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            expYear: {
                selector: '[data-stripe="exp-year"]',
                validators: {
                    notEmpty: {
                        message: 'The expiration year is required'
                    },
                    digits: {
                        message: 'The expiration year can contain digits only'
                    },
                    callback: {
                        message: 'Expired',
                        callback: function(value, validator) {
                            value = parseInt(value, 10);
                            var month        = validator.getFieldElements('expMonth').val(),
                                currentMonth = new Date().getMonth() + 1,
                                currentYear  = new Date().getFullYear();
                            if (value < currentYear || value > currentYear + 10) {
                                return false;
                            }
                            if (month == '') {
                                return false;
                            }
                            month = parseInt(month, 10);
                            if (value > currentYear || (value == currentYear && month > currentMonth)) {
                                validator.updateStatus('expMonth', 'VALID');
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            cvvNumber: {
                selector: '.cvvNumber',
                validators: {
                    notEmpty: {
                        message: 'The CVV number is required'
                    },
                    cvv: {
                        message: 'The value is not a valid CVV',
                        creditCardField: 'ccNumber'
                    }
                }
            }
			
        }
	})
	.on('err.field.fv', function(e, data) {
		data.fv.disableSubmitButtons(false);
	})
	.on('success.field.fv', function(e, data) {
		data.fv.disableSubmitButtons(false);
	});
	
	$('input:radio[name=paymentOptions]').click(function(){
		var val = $('input:radio[name=paymentOptions]:checked').val();
		if (val == 1) {
			$("#paymentForm :input").prop("disabled", false);
			$(".btn-card-type").removeAttr("style");	
		}
		else {
			$("#paymentForm :input").not('button').prop("disabled", true);
			$(".btn-card-type").attr("style","pointer-events: none; opacity:.65");
		}
	});

}


/* ------------------------------------------------
    Generate Captcha Codes
--------------------------------------------------- */
 
 
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateCaptcha() {
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));
}

/* ------------------------------------------------

    Function Calls

--------------------------------------------------- */


var $win = $(window);


/* ------------------------------------------------
    Window Resize Events
--------------------------------------------------- */
  
  
$win.on('resize', function() {
    
    /*---- Resetting Variables ----*/
	
    isStickyElementFixed = false;
    winScrollY = 0;
    stickyElementSetPoint = 0;
    stickyElementY = 0;
    screenWidth =  window.innerWidth;
    screenHeight =  window.innerHeight;
    winScrollY = 0;
    stickyElementTop = 0;
    stickyElementDisabled = false;
    headerVisiblePos = 0;
    headerFixedPos = 0;
    isHeaderFixed = false;
    isHeaderVisible = false;
    headerHeight = 0;

    navResponsive();
	
	navOnePage();

	footerResponsive(screenHeight);
	
    setTimeout(centerModal, 800)
	
    themeImageSection();

	slimscroll();

    verticallyCentered();
	
}).resize();


/* ------------------------------------------------
    Window Load Events
--------------------------------------------------- */
  
  
$win.on('load', function() {
	
    navEvents();

    progressBarsOnView();

    owlC();

    counters();

    wowInit();

    nivoLightbox();

    tooltip();

    formValidation();
	
    /*---- Auto Modal Box ----*/

    $('.modal.auto').modal('show');

    /*---- Hide Page Loader ----*/

    $(".loader").fadeOut("slow");
	
});