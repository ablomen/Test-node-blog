var sqlite	=	require("sqlite3").verbose(),
    db		=	new sqlite.Database("./posts.db");

exports.db	=	db;
