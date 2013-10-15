
wxApp = wxApp || {};

(function($){

	var escapeJSON = function( key, val ) {
		if ( typeof val !== 'string' ) {
            return val;
        }

		var replaced = encodeURIComponent( val );
		return replaced;
	};

	var toJSONrecursive = function() {
		return JSON.parse(JSON.stringify(this.attributes, escapeJSON));
	}

	var collectionToJSONrecursive = function() {
		var coll = [];
		this.models.forEach( function( model ) {
			coll.push( model.toJSONrecursive() );
		} );
		return JSON.parse(JSON.stringify(coll));
	}

//	Backbone.Model.prototype.toJSON = toJSONrecursive;
//	Backbone.Collection.prototype.toJSON = collectionToJSONrecursive;

	Backbone.Model.prototype.toJSONrecursive = toJSONrecursive;
	Backbone.Collection.prototype.toJSONrecursive = collectionToJSONrecursive;

    wxApp.App = Backbone.View.extend({
        el: '#toptabs',

        initialize: function() {
            this.allowAddContentButtonsToBeDragged();
            this.allowDroppingOnAddArea();
            Backbone.Events.on( 'api:success', this.highlightAppPreviewRefresh, this );
            Backbone.Events.on( 'subtab:dragstart', this.showDropTab, this );
            Backbone.Events.on( 'subtab:dragstop', this.hideDropTab, this );
            Backbone.Events.on( 'tab:dropped', this.clearBodyStyles, this );
            Backbone.Events.on( 'tab:dropped', this.hideDropTab, this );
        },

        events: {
            'click .wx-add-source-icon': 'addFeature',
            'click #preview-refresh': 'refreshAppPreview'
        },

        allowAddContentButtonsToBeDragged: function() {
            if ( undefined != this.$('list-add-content-items li').draggable ) {
                this.$('.list-add-content-items li').draggable({
                    cursor: "move",
                    cursorAt: { top: 10, left: 10 },
                    helper: function( event ) {
                        return $( "<div class='ui-widget-draggable'>" + $(event.delegateTarget).find('span')[0].innerHTML + "</div>" );
                    },
                    revert: true
                });
            }
        },

        allowDroppingOnAddArea: function() {
            if ( undefined !== this.$('#addFeatureID').droppable ) {
                this.$('#addFeatureID').droppable( {
                    accept: ".list-add-content-items li",
                    hoverClass: "ui-state-hover",
                    drop: this.onDropOnAddArea
                } );
            }
        },

        onDropOnAddArea: function(event, ui) {
            // Using global wxApp.appView since this is the dropped on li
            wxApp.appView.createFeatureView($(ui.draggable).attr('id').replace('add-', ''));
        },

        addFeature: function(ev) {
            this.createFeatureView(ev.currentTarget.id.replace('add-', ''));
        },

        createFeatureView: function(id, parentId) {
            if ( undefined !== wxApp[id + 'SubTab'] && undefined !== wxApp[id + 'SubTabEditView'] ) {
                var tab = new wxApp[id + 'SubTab']();
                if ( undefined != parentId && parentId )
                    tab.set( 'parent_id', parseInt( parentId ) );
                
                //tab.set( 'feature_name', id );
                var view = new wxApp[id + 'SubTabEditView']({ model: tab, el: '#wx-edit-area-' + id });
            } else {
                throw new Error('Invalid type ' + id);
            }
        },

        highlightAppPreviewRefresh: function() {
            $('#preview-refresh').effect('pulsate', { times: 5 }, 6000);
        },

        refreshAppPreview: function() {
            wx.refreshAppPreview();
        },

        showDropTab: function() {
            $('#dropTab').show();
            $('.wx-layout-tablist .wx-tab').addClass('dragging');
        },

        hideDropTab: function() {
            $('#dropTab').hide();
            $('.wx-layout-tablist .wx-tab.dragging').removeClass('dragging');
        },

        clearBodyStyles: function() {
            $('body').attr('style', '');
        }
    });

    wxApp.appView = new wxApp.App();
})(jQuery);