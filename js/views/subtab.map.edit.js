
wxApp = wxApp || {};

(function($){
    wxApp.MapSubTabEditView = wxApp.SubTabEditView.extend({
        subTabEditTplSelector: '#map-subtab-edit-template',
        customAddress: false,
        hasLocation: false,
        marker: null,
        map: null,
        events : {
			'click #geolocation-load' : 'loadGeolocation'
		},

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

        render: function() {
			wxApp.SubTabEditView.prototype.render.apply( this );

			var center      = new google.maps.LatLng(0.0, 0.0),
			    options     = {
					zoom: 16,
					center: center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				},
		        map         = new google.maps.Map( document.getElementById("map"), options),
		        startMarker = new google.maps.Marker({
					position: center, 
					map: map, 
					title:"Post Location"
				});

		    this.map    = map;
			this.marker = startMarker;
        },

        setModelFromView: function(model) {
            
        	var title       = this.$('#wx-title-value').val(),
        	    content     = this.$('#wx-content-value').val();

        	// content = '<div class="item-page">' + content + '</div>';

            model.setConfig('name',       title);
            model.setConfig('type',       'htmlContent');
            // model.setConfig('config', {start: {zoom_enabled: true}});
            // model.setConfig('geo', false);
            
        	jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            async: false,
	            data: {
	                action: 'ajaxAddNewContent',
	                content: content, 
	                name: title,
	                content_type: 'map',
	                geolat: this.$("#geolocation-latitude").val(),
	                geolon: this.$("#geolocation-longitude").val(),
	                nonce: jQuery('input#nonce').val()
	            },
	            success: function(url){
	                // url = encodeURIComponent(url)
	                // I'm not sure where that 0 is coming from, but it shouldn't be there.
	                url = url.replace('weever_cartographer0', 'weever_cartographer');

		            model.setConfig('url', url);
	            },
	            error: function(v,msg){
	                console.log(v);
	                console.log(msg);
	            }
	        });

			
	        return model;

        },

        loadGeolocation: function() {

        	if ( $('#geolocation-address').val() != '' ) {
        		this.customAddress = true;
        		var currentAddress = $('#geolocation-address').val();
        		this.geocode( currentAddress );
        	}
        },

        geocode: function( address ) {
        	var me = this,
        	    geocoder = new google.maps.Geocoder();
		    
		    if (geocoder) {
		    	geocoder.geocode({"address": address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						me.placeMarker( results[0].geometry.location );
						if(!me.hasLocation) {
					    	me.map.setZoom(16);
					    	me.hasLocation = true;
						}
					}
				});
		    }
        },

        placeMarker: function( location ) {
			this.marker.setPosition( location );
			this.map.setCenter( location );
			if((location.lat() != '') && (location.lng() != '')) {
				$("#geolocation-latitude").val(  location.lat() );
				$("#geolocation-longitude").val( location.lng() );
			}
			
			// if(!customAddress)
			// 	reverseGeocode(location);
        }
    });
})(jQuery);