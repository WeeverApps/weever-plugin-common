/**
 * Form Builder
 *
 * @todo Parse/Assemble IDs including getting Title
 */

jQuery(document).ready(function($) {
	var form = [],
		options = $('#wx-form-builder-options'),
		previewPane = $('#wx-form-builder-preview'),
		rowClass = 'wx-form-builder-row',
		nonce = $("input#nonce").val();

	$('#add-form-builder.wx-add-source-icon').off('click');
	$('#add-form-builder').on('click', function() {
		var item = $(this);
		$('#wx-form-builder-dialog').dialog({
			modal: 		true,
			resizable: 	false,
			width: 		'auto',
			height: 	'auto',
			title:		'Add New Form',
			show:		'fade',
			hide:		'drop',
			buttons: 	{
				'Finish': function() {
					var form = getFormJSON();
					saveForm(form);
                },
				'Cancel': function() {
					$(this).dialog('destroy');
				}
			},
			beforeClose: function(event, ui) {
				//removeTinyMCE();
			},
			open: function(e, ui) {
			},
			close: function() {
				//removeTinyMCE();
				$(this).dialog('destroy');
			}
		});
	});

	var getFormJSON = function() {
		// Wrap in <form></form> with appropriate attributes
		return JSON.stringify({ form: previewPane.html() });
	};

	var saveForm = function(form) {
		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: {
				action: 'ajaxSaveNewTab',
				config: form,
				content: 'form',
				nonce: nonce
			},
			success: function(msg){
				jQuery('#wx-modal-loading-text').html(msg);
				jQuery('#wx-modal-secondary-text').html(WPText.WEEVER_JS_APP_UPDATED);
				document.location.href = WPText.WEEVER_JS_ADMIN_LIST_URL;
				document.location.reload(true);
			},
			error: function(v,msg){
				jQuery('#wx-modal-loading-text').html(msg);
				jQuery('#wx-modal-secondary-text').html('');
				jQuery('#wx-modal-error-text').html(WPText.WEEVER_JS_SERVER_ERROR);
			}
		});
	};

	var addRow = function() {
		var row = $('<div class="' + rowClass + '"></div>').appendTo(previewPane);
		return row;
	};

	var addTextField = function() {
		var row = addRow();
		row.append('<label class="wx-form-builder-edit-label">Label</label>');
		row.append('<input type="text" />');
		var fieldset = {
			label: 'Label',
			input: 'text'
		};
		form.push(fieldset);
		console.log(form);
		console.log(this);
	};

	var editLabel = function(e) {
		e.preventDefault();
		// replace label with text input
		// clicking off will save changes
		var row = $(this).parents('.' + rowClass),
			label = this;
			tempInput = $('<input type="text" value="' + $(label).text() + '" />').prependTo(row).select();
		$(label).hide();
		tempInput.on('blur', function() {
			$(label).text($(this).val()).show();
			$(this).remove();
		});

	};

	// Bind click to dynamically created elements
	previewPane.on('click', '.wx-form-builder-edit-label', editLabel);

	$('#wx-form-builder-add-text-field').on('click', addTextField);
});
