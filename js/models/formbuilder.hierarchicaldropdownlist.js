
wxApp = wxApp || {};

(function($) {

    wxApp.FormBuilderHierarchicalDropDownListOption = Backbone.Model.extend({
        defaults: function() {
            return {
                text    : '',
                value   : '',
                children: new wxApp.FormBuilderHierarchicalDropDownListOptions()
            }
        },

        initialize: function( properties ) {

            properties = properties || {};

            // The 'children' property just gets set to a basic array, rather than a Backbone.Array. Let's fix that.
            var children = properties.children;
            delete properties.children;

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );

            this.set( 'children', new wxApp.FormBuilderHierarchicalDropDownListOptions() );
            if ( children && children.length ) {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    this.get('children').add( new wxApp.FormBuilderHierarchicalDropDownListOption( child ) );
                };
            }

            this.get( 'children' ).bind('change', this.onChildChange, this);
            return this;
        },

        onChildChange: function() {
            this.trigger('change');
        }
    });

    wxApp.FormBuilderHierarchicalDropDownListOptions = Backbone.Collection.extend({
        model:  wxApp.FormBuilderHierarchicalDropDownListOption
    });

    wxApp.FormBuilderHierarchicalDropDownList = Backbone.Model.extend({
        defaults: function() {
            return {
                control: 'hierarchical-drop-down',
                levels:  2,
                titles:  ['', ''],
                ordinal: 0,
                options: new wxApp.FormBuilderHierarchicalDropDownListOptions(),
                label: ''
            };
        },

        initialize: function( properties ) {

            // The 'options' property just gets set to a basic array, rather than a Backbone.Array. Let's fix that.
            var options = properties.options;
            delete properties.options;

            // Call parent's initialize() function
            Backbone.Model.prototype.initialize.apply( this, arguments );

            var optionsArray = new wxApp.FormBuilderHierarchicalDropDownListOptions();
            if ( options && options.length ) {

                // Add the properties from the DB.
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    optionsArray.add( new wxApp.FormBuilderHierarchicalDropDownListOption( option ) );
                };
            }

            this.set( 'options', optionsArray );
            this.get( 'options' ).bind('change', this.onChildChange, this);

            return this;
        },

        onChildChange: function() {
            this.trigger('change');
        }
    });

})(jQuery);
