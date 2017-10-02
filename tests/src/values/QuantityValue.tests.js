/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( dv, util ) {
	'use strict';

	var PARENT = dv.tests.DataValueTest;

	/**
	 * Constructor for creating a test object for the QuantityValue DataValue.
	 *
	 * @constructor
	 * @extends dv.tests.DataValueTest
	 * @since 0.1
	 */
	dv.tests.QuantityValueTest = util.inherit( PARENT, {

		/**
		 * @inheritdoc
		 */
		getConstructor: function() {
			return dv.QuantityValue;
		},

		/**
		 * @inheritdoc
		 */
		getConstructorArguments: function() {
			return [
				[ new dv.DecimalValue( 0 ), 'some unit', new dv.DecimalValue( 0 ), new dv.DecimalValue( 0 ) ],
				[ new dv.DecimalValue( 0 ), 'some unit', new dv.DecimalValue( -1 ), new dv.DecimalValue( 1 ) ],
				[ new dv.DecimalValue( 5 ), 'some unit', new dv.DecimalValue( 4 ), new dv.DecimalValue( 6 ) ],
				[ new dv.DecimalValue( 6 ), 'some unit', null, null ],
				[ new dv.DecimalValue( 7 ), 'some unit' ]
			];
		}

	} );

	var test = new dv.tests.QuantityValueTest();

	test.runTests( 'dataValues.QuantityValueTest' );
}( dataValues, util ) );
