
module.exports = bindVirtual;

function bindVirtual(Model) {
	Model.virtual = virtual;
	Model._virtuals = {};
	var original = Model.prototype.toJSON;
	// Monkey patch toJSON
	Model.prototype.toJSON = function () {
		var json = original.call(this);
		var virtuals = this._model._virtuals;
		var keys = Object.keys(virtuals);
		for (var i = 0; i < keys.length; i++) {
			var name = keys[i];
			var virtual = virtuals[name];
			json[name] = virtual.getter.call(this);
		}
		return json;
	};
}

function virtual(name, getter, dependencies) {
	var self = this;
	dependencies = dependencies || [];
	this._virtuals[name] = {getter: getter, dependencies: dependencies};
	Object.defineProperty(this.prototype, name, {
		enumerable: true,
		get: getter,
		set: function () {} // noop, just so we don’t throw on set
		// TODO: support real setters later?
	});
	for (var i = 0; i < dependencies.length; i++) {
		var dep = dependencies[i];
		this.on('change ' + dep, function (instance) {
			var val = prev = undefined;
			// TODO: support val and prev
			// but maybe its a bit heavy on perf?
			// somehow avoiding this redundancy would be good
			self.emit('change', instance, name, val, prev);
			self.emit('change ' + name, instance, val, prev);
			instance.emit('change', name, val, prev);
			instance.emit('change ' + name, val, prev);
		});
	}
	return this;
}

