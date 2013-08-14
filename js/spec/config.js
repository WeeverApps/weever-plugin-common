
// TODO: This should be removed by loading in defaults into a regular js file (in static/js/config perhaps?)
var wx = wx || {};
var wxApp = wxApp || {};
wx.siteKey = '12325098432234';
wx.apiUrl = 'http://weeverapp.com/api/v2/';
wx.makeApiCall = function() {};
wx.log = function(message) { console.log(message) };