// @flow

function foo(x: ?number): string {
	if (x) {
		return JSON.stringify(x);
	}
	return 'default string';
}

foo(55);
