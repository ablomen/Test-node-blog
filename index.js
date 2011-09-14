#!/usr/bin/env node

var _		=	require("underscore"),
    Backbone	=	require("backbone"),
    Express	=	require("express"),
    server	=	"",
    jade	=	require("jade"),
    db		=	require("./db.js").db,
    model	=	require("./model.js"),
    Post;

_.mixin(require("underscore.string"));

var Post	=	function ( ) {
	this.attributes	=	{
		"id":			0,
		"title":		"",
		"content":		"",
		"tags":			[],
		"categories":		[],
		"date":			0
	};
	
	this.hasChanged	=	false;
	this.table	=	"posts";
	
	if (_.isObject(arguments[0])) {
		_.extend(this.attributes, arguments[0]);
	} else if (_.isNumber(arguments[0])) {
		this.read(arguments[0], arguments[1], arguments[2]);
	}
};

_.extend(Post.prototype, model, {
	"date":		function ( ) {
		return (new Date(this.get("date")));
	},
	"content":	function ( ) {
		return (jade.compile(this.get("content")))();
	}
});

db.serialize(function ( ) {
	var post	=	new Post(1, function ( ) {
		console.log(this.content());
	});
});
