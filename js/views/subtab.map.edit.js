
wxApp = wxApp || {};

(function($){
    wxApp.MapSubTabEditView = wxApp.WordpressAddPageSubTabEditView.extend({
        // subTabEditTplSelector: '#map-subtab-edit-template',
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
			wxApp.WordpressAddPageSubTabEditView.prototype.render.apply( this );

			$('section.editor').show();
			$('section.coupon').hide();
			$('section.mapper').show();

			var center      = new google.maps.LatLng(0.0, 0.0),
			    options     = {
					zoom: 16,
					center: center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				},
		        map         = new google.maps.Map( this.$("#map")[0], options ),
		        startMarker = new google.maps.Marker({
					position: center, 
					map: map, 
					title:"Post Location"
				});

		    this.map    = map;
			this.marker = startMarker;

			// We have to add this .2 second delay in because otherwise the 
			// the map does not realise that a resize has occurred.
			setTimeout( function() {
				google.maps.event.trigger( map, 'resize' );
				map.setCenter( center );
			}, 200);
        },

        setModelFromView: function(model) {
            
        	var title       = this.$('#wx-title-value').val(),
        	    content     = nicEditors.findEditor( this.editorId ).nicInstances[0].getContent(),
        	    data        = {
                    content_type: 'map',
                    geolat      : this.$("#geolocation-latitude").val(),
	                geolon      : this.$("#geolocation-longitude").val(),
        	    },
        	    url         = this.createPage( title, content, data );
        	
        	url = url.replace( /index\.php.+$/, 'index.php?feed=r3s&category_name=map' );

        	// TODO - Set some of these in the defaults.
        	model.set('title', 'Map');
        	model.set('content', 'htmlMap');
        	model.set('published', 1);
        	model.set('parent_id', null);
        	model.set('tabLayout',  'list');
            model.setConfig('name', title);
            model.setConfig('type', 'channel');
            model.setConfig('url',  url);

	        return model;

        },

        loadGeolocation: function() {

        	if ( $('#geolocation-address').val() != '' ) {
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
        }
    });
})(jQuery);