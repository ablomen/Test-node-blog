#!/usr/bin/env node

var _		=	require("underscore"),
    Backbone	=	require("backbone"),
    Express	=	require("express"),
    server	=	"",
    jade	=	require("jade"),
    db		=	require("./db.js").db,
    model	=	require("./model.js"),
    Post	=	require("./post.js").Post;

_.mixin(require("underscore.string"));

db.serialize(function ( ) {
//	var post	=	new Post(1, function ( ) {
//		console.log(this.content());
//	});

	var post	=	new Post({
		"title":		"Nog een test",
		"content":		"lalalaalalalalalalalalalalala",
		"date":			(new Date()).getTime()
	});
	
	post.save(function ( ) {
		console.log(this);
	});
});
