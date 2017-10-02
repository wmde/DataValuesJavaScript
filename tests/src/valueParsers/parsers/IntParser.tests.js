/**
 * @license GPL-2.0+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
( function( vp, dv, util ) {
	'use strict';

	var PARENT = vp.tests.ValueParserTest;

	/**
	 * Constructor for creating a test object holding tests for the IntParser.
	 *
	 * @constructor
	 * @extends dv.tests.ValueParserTest
	 * @since 0.1
	 */
	vp.tests.IntParserTest = util.inherit( PARENT, {

		/**
		 * @inheritdoc
		 */
		getConstructor: function() {
			return vp.IntParser;
		},

		/**
		 * @inheritdoc
		 */
		getParseArguments: function() {
			return [
				// TODO: replace test stub
				[ '4', new dv.NumberValue( 4 ) ],
				[ '42', new dv.NumberValue( 42 ) ],
				[ '0', new dv.NumberValue( 0 ) ],
				[ '9001', new dv.NumberValue( 9001 ) ]
			];
		}

	} );

	var test = new vp.tests.IntParserTest();

	test.runTests( 'valueParsers.IntParser' );

}( valueParsers, dataValues, util ) );
