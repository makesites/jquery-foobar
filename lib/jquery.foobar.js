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
		  'distance' : 0, 
		  'speed' : 1000, 
		  'visible' : true
		};
		
		return this.each(function() {

		var $this = $(this),
			data = $this.data('foobar');
			
			// register the height of the main container before we change it
			settings.distance = $this.height();
			
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
				$this.animate({ height: data.distance}, data.speed);
				$this.find(".content").animate({ top: 0}, data.speed);
				$this.find(".control").animate({ top: -1 *data. distance}, data.speed, "swing", function(){
						$(this).css("background", "#f00").animate({ top: 0}, data.speed);
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
				$this.animate({ height: "1px"}, data.speed);
				$this.find(".content").animate({ top: -1 *data. distance}, data.speed);
				$this.find(".control").animate({ top: -1 *data. distance}, data.speed, "swing", function(){
						$(this).css("background", "#0f0").animate({ top: 0}, data.speed);
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