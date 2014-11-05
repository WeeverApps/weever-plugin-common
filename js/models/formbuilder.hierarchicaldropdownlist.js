
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

        initialize: function() {
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

        initialize: function() {
            this.set( 'options', new wxApp.FormBuilderHierarchicalDropDownListOptions() );
            this.get( 'options' ).bind('change', this.onChildChange, this);

            return this;
        },

        onChildChange: function() {
            this.trigger('change');
        }
    });

})(jQuery);
