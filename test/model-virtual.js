
var Model = require('model');
var Virtual = require('../');
var should = require('should');

describe('Virtual', function () {
	it('should create a new static `virtual`', function () {
		var SomeModel = new Model(['prop'])
			.use(Virtual);
		SomeModel.virtual.should.be.type('function');
	});
	it('should allow creating a new virtual', function () {
		var SomeModel = new Model(['prop'])
			.use(Virtual)
			.virtual('virt', function () { return this.prop; });
		var obj = new SomeModel();
		obj.prop = 1;
		obj.virt.should.eql(1);
	});
	it('should emit change events depending on dependencies', function (done) {
		var SomeModel = new Model(['prop1', 'prop2'])
			.use(Virtual)
			.virtual('virt',
				function () { return this.prop1 + this.prop2; },
				['prop1', 'prop2']);
		var obj = new SomeModel();
		obj.prop1 = 1;
		obj.once('change virt', function () {
			obj.virt.should.eql(2);
			obj.once('change virt', function () {
				obj.virt.should.eql(3);
				done();
			});
			obj.prop1 = 2;
		});
		obj.prop2 = 1;
	});
	it('should include virtuals in the JSON version', function () {
		var SomeModel = new Model(['prop1', 'prop2'])
			.use(Virtual)
			.virtual('virt',
				function () { return this.prop1 + this.prop2; },
				['prop1', 'prop2']);
		var obj = new SomeModel({prop1: 1, prop2: 2});
		JSON.parse(JSON.stringify(obj)).should.eql({prop1: 1, prop2: 2, virt: 3});
	});
	it.skip('should support virtual setters', function () {
		
	});
	it.skip('should avoid JSON inclusion if specified', function () {
		
	});
	it.skip('should support current and previous value if specified', function () {
		
	});
});

