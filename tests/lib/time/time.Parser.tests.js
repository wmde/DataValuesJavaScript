/**
 * @since 0.1
 * @file
 * @ingroup Time.js
 *
 * @licence GNU GPL v2+
 * @author Daniel Werner
 */
( function( QUnit, $, time, validTimeDefinitions ) {
	'use strict';

	QUnit.module( 'time.js: time.Parser' );

	var times = $.extend( {}, validTimeDefinitions, {
		'foo': null, // TODO: in error case, the parser should throw an error, not just return null!
		'42 abc': null
	} );

	QUnit.test( 'random parsing', function( assert ) {
		// TODO: injecdt this setting into test parser instance rather than changing global settings
		var dbmStateBefore = time.settings.daybeforemonth = true,
			parser = new time.Parser();

		$.each( times, function( timeInput, expectedTimeDefinition ) {
			var parsedTime,
				timeObject;

			parsedTime = parser.parse( timeInput );
			assert.deepEqual(
				parsedTime,
				expectedTimeDefinition,
				'"' + timeInput + '" has been parsed successfully'
			);

			// test integration with time.Time:
			if( parsedTime !== null ) {
				timeObject = new time.Time( parsedTime );

				assert.ok( timeObject instanceof time.Time, '"' + timeInput + '" parser result '
					+ 'can be used to create new time.Time instance' );
			}
		} );

		time.settings.daybeforemonth = dbmStateBefore; // reset state of evil global setting
	} );

}( QUnit, jQuery, time, time.validTimeDefinitions ) );
