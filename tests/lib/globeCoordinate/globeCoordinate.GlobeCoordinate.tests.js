/**
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 * @author Thiemo Mättig
 */
( function( globeCoordinate, $, QUnit ) {
	'use strict';

	QUnit.module( 'globeCoordinate.GlobeCoordinate.js' );

	QUnit.test( 'Basic checks', function( assert ) {
		assert.expect( 9 );
		var c;

		assert.throws(
			function() { c = new globeCoordinate.GlobeCoordinate( '' ); },
			'Trying to instantiate with an empty value throws an error.'
		);

		assert.throws(
			function() { c = new globeCoordinate.GlobeCoordinate( 'some string' ); },
			'Trying to instantiate with an invalid value (some string) throws an error.'
		);

		assert.throws(
			function() { c = new globeCoordinate.GlobeCoordinate( '190° 30" 1.123\'' ); },
			'Trying to instantiate with an invalid value (190° 30" 1.123\') throws an error.'
		);

		assert.throws(
			function() { c = new globeCoordinate.GlobeCoordinate( { latitude: 20 } ); },
			'Trying to instantiate with an invalid value ({ latitude: 20 }) throws an error.'
		);

		c = new globeCoordinate.GlobeCoordinate( { latitude: 1.5, longitude: 1.5, precision: 0.1 } );

		// Since most methods are just plain getters, just doing plain verification:

		assert.equal(
			c.getLatitude(),
			1.5,
			'Verified getLatitude()'
		);

		assert.equal(
			c.getLongitude(),
			1.5,
			'Verified getLongitude()'
		);

		assert.equal(
			c.getPrecision(),
			0.1,
			'Verified getPrecision()'
		);

		assert.equal(
			c.getGlobe(),
			'http://www.wikidata.org/entity/Q2',
			'Verified getGlobe()'
		);

		assert.deepEqual(
			c.getDecimal(),
			{ latitude: 1.5, longitude: 1.5, precision: 0.1 },
			'Verified getDecimal()'
		);
	} );

	QUnit.test( 'Precision defaults to null', function( assert ) {
		assert.expect( 3 );
		var c = new globeCoordinate.GlobeCoordinate( { latitude: 0, longitude: 0 } );

		assert.ok(
			c.getPrecision() === null,
			'Verified getPrecision()'
		);

		assert.deepEqual(
			c.getDecimal(),
			{ latitude: 0, longitude: 0, precision: null },
			'Verified getDecimal()'
		);

		assert.ok(
			c.equals( c ),
			'Validated equality'
		);
	} );

	QUnit.test( 'Costum globe', function( assert ) {
		assert.expect( 2 );
		var c = new globeCoordinate.GlobeCoordinate( {
			latitude: 20,
			longitude: 25.5,
			globe: 'http://www.wikidata.org/entity/Q313'
		} );

		assert.equal(
			c.getGlobe(),
			'http://www.wikidata.org/entity/Q313',
			'Verified getGlobe()'
		);

		assert.ok(
			typeof c.getDecimal().globe === 'undefined',
			'Verified getDecimal()'
		);
	} );

	QUnit.test( 'Strict (in)equality', function( assert ) {
		assert.expect( 169 );
		var gcDefs = [
				{ latitude: 0, longitude: 0, precision: 1 },
				{ latitude: -3, longitude: 2, precision: 1 },
				{ latitude: 1.1, longitude: 2, precision: 0.1 },
				{ latitude: 11.92, longitude: 255.92, precision: 0.1 },
				{ latitude: 90, longitude: 30.1, precision: 0.01 },
				{ latitude: 0.1, longitude: 0.0075, precision: 1 / 3600 },
				{ latitude: -0.1, longitude: 0, precision: 1 / 60 },
				{ latitude: 1.00028, longitude: 0, precision: 1 / 3600 },
				{ latitude: 1.0005, longitude: 0, precision: 1 / 36000 },
				{ latitude: 89.9, longitude: -0.00031, precision: 1 / 3600000 },
				{ latitude: 5, longitude: -0.00292, precision: 1 / 36000 },
				{ latitude: 5, longitude: 2, precision: 1, globe: 'http://www.wikidata.org/entity/Q2' },
				{ latitude: 5, longitude: 2, precision: 1, globe: 'http://www.wikidata.org/entity/Q313' }
			],
			c1, c2;

		$.each( gcDefs, function( i1, gcDef1 ) {
			c1 = new globeCoordinate.GlobeCoordinate( gcDef1 );

			$.each( gcDefs, function( i2, gcDef2 ) {
				c2 = new globeCoordinate.GlobeCoordinate( gcDef2 );

				if( gcDef1.latitude === gcDef2.latitude
					&& gcDef1.longitude === gcDef2.longitude
					&& gcDef1.precision === gcDef2.precision
					&& ( gcDef1.globe || 'http://www.wikidata.org/entity/Q2' ) ===
						( gcDef2.globe || 'http://www.wikidata.org/entity/Q2' )
				) {
					assert.ok(
						c1.equals( c2 ),
						'Validated equality for data set #' + i1 + '.'
					);
				} else {
					assert.ok(
						!c1.equals( c2 ),
						'Validated inequality of data set #' + i1 + ' to #' + i2 + '.'
					);
				}
			} );
		} );

	} );

	QUnit.test( 'Loose equality', function( assert ) {
		assert.expect( 7 );
		var gcDefs = [
				{ latitude: 0, longitude: 0, precision: 1 },
				{ latitude: 0.01, longitude: 0, precision: 1 },
				{ latitude: 0.1, longitude: 0, precision: 1 },
				{ latitude: 0, longitude: 0.01, precision: 1 },
				{ latitude: 0, longitude: 0.1, precision: 1 },
				{ latitude: 0, longitude: 0, precision: 1.000000001 },
				{ latitude: 0, longitude: 0, precision: 1.00000001 }
			],
			c1 = new globeCoordinate.GlobeCoordinate( gcDefs[0] );

		$.each( gcDefs, function( i2, gcDef2 ) {
			var c2 = new globeCoordinate.GlobeCoordinate( gcDef2 );
			assert.ok(
				c1.equals( c2 ),
				'Validated equality of data set #0 to #' + i2 + '.'
			);
		} );

	} );

	QUnit.test( 'Loose inequality', function( assert ) {
		assert.expect( 4 );
		var c1 = new globeCoordinate.GlobeCoordinate(
				{ latitude: 0, longitude: 0, precision: 1 / 3600 }
			),
			gcDefs = [
				{ latitude: 0.0002, longitude: 0, precision: 1 / 3600 },
				{ latitude: 0, longitude: 0.0002, precision: 1 / 3600 },
				{ latitude: 0, longitude: 0, precision: 1 / 3600 + 0.0000001 },
				{ latitude: 0, longitude: 0, precision: 1 / 3600 - 0.0000001 }
			];

		$.each( gcDefs, function( i2, gcDef2 ) {
			var c2 = new globeCoordinate.GlobeCoordinate( gcDef2 );
			assert.ok(
				!c1.equals( c2 ),
				'Validated inequality to data set #' + i2 + '.'
			);
		} );

	} );

}( globeCoordinate, jQuery, QUnit ) );
