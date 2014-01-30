/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < danweetz@web.de >
 */
( function( define ) {
'use strict';

var DEPS = [
	'valueParsers',
	'dataValues',
	'util.inherit',
	'valueParsers.FloatParser',
	'valueParsers.tests',
	'dataValues.NumberValue'
];

define( DEPS, function( vp, dv, util ) {

	var PARENT = vp.tests.ValueParserTest;

	/**
	 * Constructor for creating a test object holding tests for the FloatParser.
	 *
	 * @constructor
	 * @extends dv.tests.ValueParserTest
	 * @since 0.1
	 */
	vp.tests.FloatParserTest = util.inherit( PARENT, {

		/**
		 * @see vp.tests.ValueParserTest.getConstructor
		 */
		getConstructor: function() {
			return vp.FloatParser;
		},

		/**
		 * @see vp.tests.ValueParserTest.getParseArguments
		 */
		getParseArguments: function() {
			return [
				[ '0', new dv.NumberValue( 0 ) ],
				[ '-0', new dv.NumberValue( 0 ) ],
				[ '42', new dv.NumberValue( 42 ) ],
				[ '4.2', new dv.NumberValue( 4.2 ) ],
				[ '-42', new dv.NumberValue( -42 ) ],
				[ '-4.2', new dv.NumberValue( -4.2 ) ],
				[ '-9000.2', new dv.NumberValue( -9000.2 ) ]
			];
		}

	} );

	var test = new vp.tests.FloatParserTest();

	test.runTests( 'valueParsers.FloatParser' );

} );

}( define ) );