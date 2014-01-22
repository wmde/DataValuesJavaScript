/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 */
( function( dv, util, $ ) {
	'use strict';

	var PARENT = dv.tests.DataValueTest;

	/**
	 * Constructor for creating a test object for the ununserializable DataValue.
	 *
	 * @constructor
	 * @extends dv.tests.DataValueTest
	 * @since 0.1
	 */
	dv.tests.UnUnserializableValueTest = util.inherit( PARENT, {

		/**
		 * @see dv.tests.DataValueTest.getConstructor
		 */
		getConstructor: function() {
			return dv.UnUnserializableValue;
		},

		/**
		 * @see dv.tests.DataValueTest.getConstructorArguments
		 */
		getConstructorArguments: function() {
			return [
				[ {}, 'sometype', new Error( 'some error' ) ],
				[ { foo: 'bar' }, 'another-type', new Error( 'another error' ) ]
			];
		},

		/**
		 * Tests the getStructure method.
		 *
		 * @since 0.1
		 *
		 * @param {Function} assert
		 */
		testGetStructure: function( assert ) {
			var instances = this.getInstances(),
				i,
				structure;

			for ( i in instances ) {
				structure = instances[i].getStructure();

				assert.ok(
					$.isPlainObject( structure ),
					'return value is plain object'
				);

				assert.ok(
					structure !== instances[i].getStructure(),
					'return value not returned by reference'
				);
			}
		},

		/**
		 * @see dv.tests.DataValueTest.testNewFromJSON
		 *
		 * skip
		 */
		testNewFromJSON: null,

		/**
		 * @see dv.tests.DataValueTest.testToJSON
		 *
		 * skip
		 */
		testToJSON: null,

		/**
		 * @see dv.tests.DataValueTest.testJsonRoundtripping
		 *
		 * skip
		 */
		testJsonRoundtripping: null,

		/**
		 * @see dv.tests.DataValueTest.testJsonRoundtripping
		 *
		 * skip
		 * TODO: activate after equals is implemented according to TODO in the data value's file
		 */
		testEquals: null
	} );

	var test = new dv.tests.UnUnserializableValueTest();

	test.runTests( 'dataValues.UnUnserializableValue' );

}( dataValues, util, jQuery ) );
