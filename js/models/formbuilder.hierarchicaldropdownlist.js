
wxApp = wxApp || {};

(function($) {

    wxApp.FormBuilderHierarchicalDropDownListOption = Backbone.Model.extend({
        defaults: function() {
            return {
                text    : '',
                value   : '',
                children: new wxApp.FormBuilderHierarchicalDropDownListOptions()
            }
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

        // initialize: function() {
        //     this.set( 'options', new wxApp.FormBuilderHierarchicalDropDownListOptions() );
        //     return this;
        // }
    });

})(jQuery);
