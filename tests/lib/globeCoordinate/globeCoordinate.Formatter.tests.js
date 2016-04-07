/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 */
define( [
	'globeCoordinate/globeCoordinate.GlobeCoordinate',
	'globeCoordinate/globeCoordinate.Formatter',
	'jquery',
	'qunit'
], function( GlobeCoordinate, Formatter, $, QUnit ) {
	'use strict';

	QUnit.module( 'globeCoordinate.Formatter.js' );

	QUnit.test( 'Formatting', function( assert ) {
		assert.expect( 8 );
		var decimalTexts = {
				'1, 1': new GlobeCoordinate( { latitude: 1, longitude: 1, precision: 1 } ),
				'-10, -1.5': new GlobeCoordinate( { latitude: -10, longitude: -1.5, precision: 0.1 } ),
				'20, 0': new GlobeCoordinate( { latitude: 24, longitude: -1.5, precision: 10 } ),
				'15, 20' : new GlobeCoordinate( { latitude: 15, longitude: 20 } )
			},
			degreeTexts= {
				'1°N, 1°E': new GlobeCoordinate( { latitude: 1, longitude: 1, precision: 1 } ),
				'10°0\'S, 2°30\'W': new GlobeCoordinate( { latitude: -10, longitude: -2.5, precision: 0.1 } ),
				'20°N, 0°W': new GlobeCoordinate( { latitude: 24, longitude: -1.5, precision: 10 } ),
				'1°0\'0"N, 1°0\'0"E': new GlobeCoordinate( { latitude: 1, longitude: 1 } )
			};

		var formatter = new Formatter( { format: 'decimal' } );

		// Just some output sanity checking:

		$.each( decimalTexts, function( expected, gc ) {
			assert.equal(
				formatter.format( gc ),
				expected,
				'Verified formatter\'s decimal output: ' + expected
			);
		} );

		formatter = new Formatter( { format: 'degree' } );

		$.each( degreeTexts, function( expected, gc ) {
			assert.equal(
				formatter.format( gc ),
				expected,
				'Verified formatter\'s degree output: ' + expected
			);
		} );

	} );

	QUnit.test( 'precisionText()', function( assert ) {
		assert.expect( 4 );
		var precisions = {
				1: '±1°',
				0.016666666666666666: 'to an arcminute',
				2.7777777777777776e-7: 'to 1/1000 of an arcsecond',
				10: '±10°'
			},
			formatter = new Formatter();

		$.each( precisions, function( testPrecision, expected ) {
			var precisionText = formatter.precisionText( testPrecision );

			// Look up precision text:
			assert.strictEqual(
				precisionText,
				expected,
				'Precision text for \'' + testPrecision + '\' results in text \'' + expected + '\'.'
			);
		} );

	} );

} );
