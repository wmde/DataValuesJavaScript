/**
 * @license GPL-2.0+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
define( [
	'valueParsers/valueParsers',
	'dataValues/dataValues',
	'util/util.inherit',
	'parsers/NullParser',
	'tests/src/valueParsers/valueParsers.tests',
	'values/UnknownValue'
], function( vp, dv, util ) {
	'use strict';

	var PARENT = vp.tests.ValueParserTest,
		constructor = function() {
		};

	/**
	 * Constructor for creating a test object holding tests for the NullParser.
	 *
	 * @constructor
	 * @extends dv.tests.ValueParserTest
	 * @since 0.1
	 */
	vp.tests.NullParserTest = util.inherit( PARENT, constructor, {

		/**
		 * @inheritdoc
		 */
		getConstructor: function() {
			return vp.NullParser;
		},

		/**
		 * @inheritdoc
		 */
		getParseArguments: function() {
			var date = new Date(),
				list = [ true, false, null ],
				dataValue = new dv.UnknownValue( 'foo' );

			return [
				[ dataValue, dataValue ],
				[ null, null ],
				[ '42', new dv.UnknownValue( '42' ) ],
				[ -4.2, new dv.UnknownValue( -4.2 ) ],
				[ date, new dv.UnknownValue( date ) ],
				[ list, new dv.UnknownValue( list ) ]
			];
		}

	} );

	var test = new vp.tests.NullParserTest();

	test.runTests( 'valueParsers.NullParser' );

} );
