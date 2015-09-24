export class Primitive {
	constructor(type, value) {
		this.token = 'PRIMITIVE';
		this.type = type;
		this.value = value;
	}

	toString() {
		return this.value;
	}
}

export class If {
	constructor(condition, block, elseBlk) {
		this.token = 'IF_STMT';
		this.condition = condition;
		this.block = block;
		this.elseBlk = elseBlk;
	}

	toString() {
		let ret = '';

		ret += 'if (' + this.condition + ') {\n';
		ret += this.block.toString();
		ret += '}\n';

		return ret;
	}
}

export class Type {
	constructor(value) {
		this.token = 'TYPE';
		this.value = value;
	}

	toString() {
		return this.value.toString();
	}
}

export class List {
	constructor(types) {
		this.token = 'LIST';
		this.types = types;
	}

	toString() {
		return '[' + this.types.join(', ') + ']';
	}
}
