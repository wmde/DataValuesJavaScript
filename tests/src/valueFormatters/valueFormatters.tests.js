/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( vf, util, $, QUnit ) {
	'use strict';

	vf.tests = {};

	/**
	 * Base constructor for ValueFormatter object tests
	 *
	 * @constructor
	 * @abstract
	 * @since 0.1
	 */
	vf.tests.ValueFormatterTest = function() {};
	vf.tests.ValueFormatterTest.prototype = {

		/**
		 * Data provider that provides valid format arguments.
		 * @since 0.1
		 *
		 * @return {*[]}
		 */
		getFormatArguments: util.abstractMember,

		/**
		 * Returns the ValueFormatter constructor to be tested.
		 * @since 0.1
		 *
		 * @return {Function}
		 */
		getConstructor: util.abstractMember,

		/**
		 * Returns the ValueFormatter instance to be tested.
		 * @since 0.1
		 *
		 * @param {*[]} constructorArguments
		 * @return {valueFormatters.ValueFormatter}
		 */
		getInstance: function( constructorArguments ) {
			constructorArguments = constructorArguments || this.getDefaultConstructorArgs();

			var self = this;

			var ValueFormatterConstructor = function( constructorArguments ) {
					self.getConstructor().apply( this, constructorArguments );
				};

			ValueFormatterConstructor.prototype = this.getConstructor().prototype;
			return new ValueFormatterConstructor( constructorArguments );
		},

		getDefaultConstructorArgs: function() {
			return [];
		},

		/**
		 * Runs the tests.
		 * @since 0.1
		 *
		 * @param {string} moduleName
		 */
		runTests: function( moduleName ) {
			QUnit.module( moduleName );

			var self = this;

			$.each( this, function( property, value ) {
				if( property.substring( 0, 4 ) === 'test' && typeof self[property] === 'function' ) {
					QUnit.test(
						property,
						function( assert ) {
							self[property]( assert );
						}
					);
				}
			} );
		},

		/**
		 * Tests the format method.
		 * @since 0.1
		 *
		 * @param {QUnit.assert} assert
		 */
		testFormat: function( assert ) {
			var formatArguments = this.getFormatArguments(),
				formatter = this.getInstance();

			$.each( formatArguments, function( i, args ) {
				var formatInput = args[0],
					expected = args[1],
					expectedValue = expected,
					expectedDataValue,
					inputDetailMsg = typeof formatInput === 'string'
						? 'for input "' + formatInput + '" '
						: '',
					done = assert.async();

				if( Array.isArray( expected ) ) {
					expectedValue = expected[0];
					expectedDataValue = expected[1];
				} else {
					expectedDataValue = formatInput;
				}

				formatter.format( formatInput )
				.done( function( formattedValue, dataValue ) {
					assert.ok( true, 'Formatting succeeded.' );

					if( formattedValue === null ) {
						assert.strictEqual(
							formattedValue,
							null,
							'Formatting result is null.'
						);
					} else {
						assert.strictEqual(
							typeof formattedValue,
							'string',
							'Formatting result is a string: ' + formattedValue
						);
					}

					assert.ok(
						expectedValue === formattedValue,
						'Formatting result ' + inputDetailMsg + 'matches the expected result.'
					);

					assert.ok(
						dataValue === expectedDataValue || dataValue.equals( expectedDataValue ),
						'Returned DataValue ' + inputDetailMsg + 'is equal to the expected '
							+ 'DataValue.'
					);
				} )
				.fail( function( errorMessage ) {
					assert.ok(
						false,
						'Formatting ' + inputDetailMsg + 'failed: ' + errorMessage
					);
				} )
				.always( done );
			} );
		}

	};

}( valueFormatters, util, jQuery, QUnit ) );
