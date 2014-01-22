/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */
( function( dv, util, Time ) {
	'use strict';

	var PARENT = dv.tests.DataValueTest;

	/**
	 * Constructor for creating a test object for the time DataValue.
	 *
	 * @constructor
	 * @extends dv.tests.DataValueTest
	 * @since 0.1
	 */
	dv.tests.TimeValueTest = util.inherit( PARENT, {

		/**
		 * @see dv.tests.DataValueTest.getConstructor
		 */
		getConstructor: function() {
			return dv.TimeValue;
		},

		/**
		 * @see dv.tests.DataValueTest.getConstructorArguments
		 */
		getConstructorArguments: function() {
			return [
				[ new Time( 'April 1, 1942' ) ],
				[ new Time( '123456 BC' ) ],
				[ new Time( '-42' ) ]
			];
		}

	} );

	var test = new dv.tests.TimeValueTest();

	test.runTests( 'dataValues.TimeValue' );

}( dataValues, util, time.Time ) );
