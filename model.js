var _		=	require("underscore"),
    db		=	require("./db.js").db;

_.extend(exports, {
	"get":		function (attr) {
		return this.attributes[attr];
	},
	"set":		function ( ) {
		if (_.isObject(arguments[0])) {
			_.extend(this.attributes, arguments[0]);
		} else if (_.isString(arguments[0])) {
			this.attributes[arguments[0]]	=	arguments[1];
		}
		
		this.hasChanged	=	true;
		
		return this;
	},
	"save":		function (success, error) {
		if (this.isNew()) {
			this.create(success, error);
		} else {
			this.update(success, error);
		}
		
		return this;
	},
	"create":	function (success, error) {
		var self	=	this,
		    keys	=	[],
		    values	=	[];
		_.each(this.attributes, function (value, key) {
			if (key !== "id") {
				keys.push(key);
				values.push(value);
			}
		});
		
		db.run(
			"INSERT INTO " + this.table + " (" + keys.join(", ") + ') VALUES ("' + values.join('", "') + '")',
			function (errors) {
				if (errors) {
					if (_.isFunction(error)) {
						error.apply(self, [errors]);
					} else {
						throw errors;
					}
				}
				
				console.log("a", this);
				
				self.set({"id": this.lastID});
				
				self.hasChanged	=	false;
				
				if (_.isFunction(success)) {
					success.apply(self);
				}
			}
		);
	},
	"update":	function (success, error) {
		if (_.isFunction(success)) {
			success.apply(this);
		}
	},
	"fetch":	function (success, error) {
		this.read(this.id, success, error);
		
		return this;
	},
	"read":		function (id, success, error) {
		var self	=	this;
		db.get(
			"SELECT * FROM " + this.table + " WHERE id = ?",
			id,
			function (errors, data) {
				if (errors) {
					if (_.isFunction(error)) {
						error.apply(self, [errors]);
					} else {
						throw errors;
					}
				}
				self.parse(data);
				self.hasChanged	=	false;
				
				if (_.isFunction(success)) {
					success.apply(self);
				}
			}
		);
		return this;
	},
	"delete":	function (success, error) {
		if (_.isFunction(success)) {
			success.apply(this);
		}
		
		return this;
	},
	"parse":	function (data) {
		_.extend(this.attributes, data)
		
		return this;
	},
	"isNew":	function ( ) {
		return this.get("id") > 0 ? false : true;
	}
});
