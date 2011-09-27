/*!
 * Foobar v0.1
 * by Makis Tracend (makis@makesit.es)
 *
 * Creates a sliding topbar flexible and customizable
 * 
 */

(function( $ ){

  var methods = {
     init : function( options ) {
    	
		var settings = {
		  'control' : ".control", 
		  'direction' : "vertical", 
		  'position' : "top", 
		  'width' : "100%", 
		  'height' : "100%", 
		  'speed' : 1000, 
		  'visible' : true
		};
		
		return this.each(function() {

		var $this = $(this),
			data = $this.data('foobar');
			
			// register the height of the main container before we change it
			settings.width = $this.width();
			settings.height = $this.height();
			
			// merging custom options with default settings
			if ( options ) { 
				$.extend( settings, options );
			}
			
			// save settings
			$this.data('foobar', settings);
			
			// add a common class to all foobars
			$this.addClass("foobar");
			
			// parse hash uri
			$this.foobar("create");
			
			// set initial display
			if(settings.visible){
				$this.foobar("show");
			} else {
				$this.foobar("hide");
			}
		
		});
	},
	
	create : function( ) { 
		return this.each(function(){

		var $this = $(this),
             data = $this.data('foobar');
			
			// put all contents in a container
			var content = $this.html();
			$this.empty().html('<div class="content">'+ content +'</div>');
			
			// create the control on the same level 
			$this.append('<a class="control">&#8226;</a>');
			
			$this.find(".control").toggle(
				function(){
					$this.foobar("hide");
				}, 
				function(){
					$this.foobar("show");	 
				}
			)
		});
	},
	
	show : function( ) { 
		return this.each(function(){

		var $this = $(this),
             data = $this.data('foobar');
			
			// move based on direction
			if(data.direction=="vertical"){
				$("body").animate({ "padding-top": data.height+"px"}, data.speed);
				$this.find(".control").animate({ top: -1 * data.height}, data.speed/2)
				$this.animate({ top: 0}, data.speed, "swing", function(){
						$(this).find(".control").removeClass("show").animate({ top: 0}, data.speed);
				});
			}
			
		});
	},
	
	hide : function( ) { 
		return this.each(function(){

		var $this = $(this),
             data = $this.data('foobar');
			
			// move based on direction
			if(data.direction=="vertical"){
				$("body").animate({ "padding-top": 0}, data.speed);
				$this.animate({ top: -1 * data.height}, data.speed, "swing", function(){
						$(this).find(".control").addClass("show").animate({ top: data.height}, data.speed);
				});
			}
			
		});
	},
	
	destroy : function( ) { 
		return this.each(function(){

		var $this = $(this),
             data = $this.data('foobar');
			// remove all related data
			data.foobar.remove();
         	$this.removeData('foobar');

		});
	}
	
  };

  $.fn.foobar = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.foobar' );
    }    
  
  };

})( jQuery );
