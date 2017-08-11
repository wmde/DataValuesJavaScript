( function( dv, util, GlobeCoordinate ) {
	'use strict';

var PARENT = dv.DataValue;

/**
 * Constructor for creating a data value representing a globe coordinate.
 * @class dataValues.GlobeCoordinateValue
 * @extends dataValues.DataValue
 * @since 0.1
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {globeCoordinate.GlobeCoordinate} value
 *
 * @throws {Error} if value is not a globeCoordinate.GlobeCoordinate instance.
 */
var SELF
	= dv.GlobeCoordinateValue
	= util.inherit( 'DvGlobeCoordinateValue', PARENT, function( value ) {
		if( !( value instanceof GlobeCoordinate ) ) {
			throw new Error( 'The given value has to be a globeCoordinate.GlobeCoordinate '
			+ 'object' );
		}

		this._value = value;
	},
{
	/**
	 * @property {globeCoordinate.GlobeCoordinate}
	 * @private
	 */
	_value: null,

	/**
	 * @inheritdoc
	 *
	 * @return {globeCoordinate.GlobeCoordinate}
	 */
	getValue: function() {
		return this._value;
	},

	/**
	 * @inheritdoc
	 */
	equals: function( value ) {
		if ( !( value instanceof SELF ) ) {
			return false;
		}
		return this.getValue().equals( value.getValue() );
	},

	/**
	 * @inheritdoc
	 *
	 * @return {Object}
	 */
	toJSON: function() {
		var globeCoordinate = this.getValue();

		return {
			latitude: globeCoordinate.getLatitude(),
			longitude: globeCoordinate.getLongitude(),
			globe: globeCoordinate.getGlobe(),
			precision: globeCoordinate.getPrecision()
		};
	}
} );

/**
 * @inheritdoc
 *
 * @return {dataValues.GlobeCoordinateValue}
 */
SELF.newFromJSON = function( json ) {
	var gc = new GlobeCoordinate( {
		latitude: json.latitude,
		longitude: json.longitude,
		globe: json.globe,
		precision: json.precision
	} );

	return new SELF( gc );
};

/**
 * @inheritdoc
 * @property {string} [TYPE='globecoordinate']
 * @static
 */
SELF.TYPE = 'globecoordinate';

dv.registerDataValue( SELF );

}( dataValues, util, globeCoordinate.GlobeCoordinate ) );
