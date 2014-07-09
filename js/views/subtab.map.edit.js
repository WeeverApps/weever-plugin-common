
wxApp = wxApp || {};

(function($){
    wxApp.MapSubTabEditView = wxApp.WordpressAddPageSubTabEditView.extend({
        // subTabEditTplSelector: '#map-subtab-edit-template',
        hasLocation: false,
        marker: null,
        map: null,
        postsCache: null,
        events : {
			'click .geolocationadd'  : 'loadGeolocation',
			'click .wx-edit-post'    : 'editPost',
			'click .wx-delete-post'  : 'deletePost',
			'click .wx-back-to-list' : 'backToList'
		},

		initializeEvents: function() {
			this.events = _.extend({}, this.genericEvents, this.events);
		},

		editPost: function( ev ) {
			ev.preventDefault();
			var postId = $( ev.currentTarget ).attr('rel'),
			    post = this.getPost( postId );

			this.showEditor( post.ID, post.post_title, post.post_content, post.lat, post.lng );
			this.$('.wx-back-to-list').show();
		},

		deletePost: function( ev ) {
			ev.preventDefault();
			var me = this,
				$a = $( ev.currentTarget ),
			    postId = $a.attr('rel');

			$a.text( 'Deleting...' );

			jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            data: {
	                action: 'ajaxDeletePost',
	                id: postId,
	                nonce: $('input#nonce').val()
	            },
	            success: function( response ){
	     			if ( response == '1' ) {
	     				// success!
	     				me.$('a[rel="' + postId + '"]').parent().slideUp();
	     			}
	            },
	            error: function(v,msg){
	                alert('error');
	                $a.html( '&times;' );
	            }
	        });
		},

		getPost: function( postId ) {
			var posts = null;
			if ( this.postsCache ) {
				posts = this.postsCache;
			}
			else {
				// TODO - get posts again.
			}

			var post = null;
			for (var i = 0; i < posts.length; i++) {
				if ( posts[i].ID == postId ) {
					post = posts[i];
				}
			};

			return post;
		},

		backToList: function( ev ) {
			ev.preventDefault();
			this.showListOfPosts();
		},

        render: function() {
			wxApp.WordpressAddPageSubTabEditView.prototype.render.apply( this );

			var config = this.model.get('config');
			if ( typeof config === 'string' )
				config = JSON.parse( config );

			if ( config.items ) {

				// We're editing; load the list of existing posts.
				this.showListOfPosts();
			}
			else {
				
				// New map; let's show the editor.
				this.showEditor();
			}
        },

        setModelFromView: function(model) {
            
        	var title       = this.$('.wx-edit-input').val(),
        	    content     = nicEditors.findEditor( this.editorId ).nicInstances[0].getContent(),
        	    data        = {
                    content_type: 'map',
                    geolat      : this.$("#geolocation-latitude").val(),
	                geolon      : this.$("#geolocation-longitude").val(),
        	    },
        	    post_id     = this.$('.wx-post-id').val(),
        	    url         = '';

        	if ( post_id )
        		data.post_id = post_id;
        	
        	url = this.createPage( title, content, data );
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

        	if ( this.$('.geolocation-address').val() != '' ) {
        		var currentAddress = this.$('.geolocation-address').val();
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
        	console.log('PLACING MARKER:', location);
        	console.log('PLACING MARKER:', location.lat());
        	console.log('PLACING MARKER:', location.lng());
			this.marker.setPosition( location );
			this.map.setCenter( location );
			if((location.lat() != '') && (location.lng() != '')) {
				this.$("#geolocation-latitude").val(  location.lat() );
				this.$("#geolocation-longitude").val( location.lng() );
			}
        },

        showListOfPosts: function() {
        	var me = this;

    		$('section.post-list').show();
			$('section.editor').hide();
			$('section.coupon').hide();
			$('section.mapper').hide();

			jQuery.ajax({
	            type: "POST",
	            url: ajaxurl,
	            data: {
	                action: 'ajaxGetMapPosts',
	            },
	            success: function( posts ){
	            	if ( typeof posts === 'string' )
	            		posts = JSON.parse( posts );
	            	me.postsCache = posts;

	            	$('section.post-list').html('<ul></ul>')
	                for (var i = 0; i < posts.length; i++) {
	                	var post = posts[i],
						    tpl = _.template( $( '#wordpressaddpage-map-post' ).html() ),
						    $li = tpl( post );
						$('section.post-list ul').append( $li );
	                };
	            },
	            error: function(v,msg){
	                alert('error')
	            }
	        });
        },

        showEditor: function( id, title, content, lat, lng ) {
        	
        	if ( !title )   title = '';
        	if ( !content ) content = '';
        	if ( !lat )     lat = 0.0;
        	if ( !lng )     lat = 0.0;

        	// Set up google maps vars.
			var center      = new google.maps.LatLng( lat, lng ),
			    options     = {
					zoom:      16,
					center:    center,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				},
		        map         = new google.maps.Map( this.$("#map")[0], options ),
		        startMarker = new google.maps.Marker({
					position: center, 
					map:      map, 
					title:    "Post Location"
				});

        	$('section.post-list').hide();
			$('section.editor').show();
			$('section.coupon').hide();
			$('section.mapper').show();

		    this.map    = map;
			this.marker = startMarker;

			// We have to add this .2 second delay in because otherwise the 
			// the map does not realise that a resize has occurred.
			setTimeout( function() {
				google.maps.event.trigger( map, 'resize' );
				map.setCenter( center );
			}, 200);

			this.$('.wx-post-id').val( id );
			this.$('.wx-edit-input').val( title );
			this.$('div.nicEdit-main').html( content );

			this.$('.nicEdit-panelContain').parent().width('509px');
			this.$('.nicEdit-panelContain').parent().next().width('509px');
			this.$('.nicEdit-main').width('501px');

			// If we're editing, show the 'Back' link.
			if ( id ) {
				this.$('.wx-back-to-list').show();
			}
			else {
				this.$('.wx-back-to-list').hide();
			}
        }
    });
})(jQuery);