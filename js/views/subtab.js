
wxApp = wxApp || {};

// TODO - Move this (for both WP and Weever Server).
wx.quizApiUrl = 'http://weeverdev.com:8081/api/v1/';

(function($){
    wxApp.SubTabView = wxApp.TabView.extend({
        tagName: 'li',
        className: 'wx-ui-row',

        attributes: function() {
            return {
                id: this.model.get('id') + 'SubtabID'
            }
        },

        initialize: function() {
            this.subTabTpl = _.template( $('#subtab-template').html() );
            var me = this;
            this.model.on('save', function() { me.render() });
            this.model.on('destroy', function() {
                me.remove();
            });
            this.model.on('tab:move', function() {
                me.remove();
            });
        },

        events: {
            'click .wx-edit-link'         : 'editSubTab',
            'click .wx-subtab-delete'     : 'confirmDeleteSubTab',
            'click .wx-subtab-copy'       : 'confirmCopySubTab',
            'click .wx-subtab-start-quiz' : 'confirmStartQuiz'
        },

        render: function() {
            var me = this;

            me.$el.html( me.subTabTpl( me.model.toJSON() ) );
            // Add a reference to the view, not seeing another way to grab it from within the drop event.
            // Doing _.bind( this.onDrop, this ) would give access to the view it was dropped on, but not the element
            // that was dropped.
            me.$el.data( 'backbone-view', me );

            if ( me.model.get('content') === 'quiz' ) {
                if ( !!window.EventSource ) {
                    me.$('.wx-quiz-info').html('&mdash; Loading event info.')

                    var quizId = me.model.getConfig().quiz_id,
                        url    = wx.quizApiUrl + 'status?id=' + quizId,
                        source = new EventSource( url );
                    source.addEventListener('message', function(e) {
                        console.log( e.data );
                        var data = JSON.parse( e.data );
                        if ( data.clients == 1 ) {
                            me.$('.wx-quiz-info').html('&mdash; One client connected.')
                        } else {
                            me.$('.wx-quiz-info').html('&mdash; ' + data.clients + ' clients connected.')
                        }
                    }, false);
                }
                else {
                    console.log('TODO - Take it back to the oldschool.');
                }
            }

            return me;
        },

        editSubTab: function(event) {
            event.preventDefault();

			console.log( 'editSubTab' );
            var editViewName = this.model.getModelName() + 'EditView';
            if ( 'SubTabEditView' != editViewName && undefined !== wxApp[editViewName] )
                var view = new wxApp[editViewName]( { model: this.model, el: '#wx-edit-area-' + this.model.get('id') } );
            else
                throw new Error( 'Invalid edit type ' + this.model.get('content') + '--' + editViewName );
        },

	    confirmCopySubTab: function( event ) {
		    event.preventDefault();
		    if ( confirm('Are you sure you want to copy this item?') ) {
			    this.copySubTab();
		    }
	    },

	    copySubTab: function() {
            var me   = this,
		        copy = this.model.toJSON();

		    if ( typeof copy.id != 'undefined' ) {
			    delete copy.id;
		    }

		    var modelName = this.model.collection.getModelNameByTabData( copy ),
		        newCopy   = new wxApp[ modelName ]( copy );

            var onOrderUpdate = function onOrderUpdate() {
                wx.rebuildApp();
                // Select the parent tab.
                $('#' + me.model.get('parent_id') + 'TabID').click();
            };

            var onSetParentId = function onSetParentId() {
                me.model.addSubTab( newCopy );
                // TODO - Ordering.
                var order = String( $('#listItemsSortable' + me.model.get('parent_id')).sortable('toArray').map( function(element) {
                    return element.replace('SubtabID', '');
                }) );
                wx.makeApiCall( 'tabs/sort_tabs', { order: order }, onOrderUpdate );
            };

            var onSaveCallback = function onSaveCallback() {
                me.model.collection.add( newCopy );
                wx.makeApiCall( 'tabs/set_parent_id', 
                    { tab_id: newCopy.get('id'), parent_id: me.model.get('parent_id') }, 
                    onSetParentId);
            };

            newCopy.save( onSaveCallback );
	    },

        confirmStartQuiz: function( ev ) {
            event.preventDefault();
            if ( confirm('Are you sure you want to start this quiz?') ) {
                this.startQuiz();
            }
        },

        startQuiz: function() {
            var me   = this,
                quiz = me.model.get('quiz'),
                url  = wx.quizApiUrl + 'start?id=' + quiz.get('_id') + '&app_key=' + wx.siteKey + '&passphrase=' + quiz.get('settings').passphrase;

            $.ajax({
                url    : url,
                type   : 'GET',
                success: function(v) {
                    console.log(v);
                    alert( v.message );
                },
                error  : function(v, message) {
                    console.log(v);
                    alert( 'An error occurred while starting this quiz: ' + message );
                }
            })
        },

        confirmDeleteSubTab: function(event) {
            event.preventDefault();
            if ( confirm('Are you sure you want to delete this item?') )
                this.deleteSubTab();
        },

        deleteSubTab: function() {
            this.model.destroy();
            wx.rebuildApp();
        }
    });
})(jQuery);