( function( dv, util ) {
	'use strict';

var PARENT = dv.DataValue;

/**
 * Constructor for creating a data value representing a number.
 * @class dataValues.NumberValue
 * @extends dataValues.DataValue
 * @since 0.1
 * @license GPL-2.0+
 * @author Daniel Werner < daniel.a.r.werner@gmail.com >
 *
 * @constructor
 *
 * @param {number} value
 */
var SELF = dv.NumberValue = util.inherit( 'DvNumberValue', PARENT, function( value ) {
	// TODO: validate
	this._value = value;
}, {
	/**
	 * @property {number}
	 * @private
	 */
	_value: null,

	/**
	 * @inheritdoc
	 *
	 * @return {number}
	 */
	getValue: function() {
		return this._value;
	},

	/**
	 * @inheritdoc
	 */
	equals: function( value ) {
		if ( !( value instanceof dv.NumberValue ) ) {
			return false;
		}

		return this.getValue() === value.getValue();
	},

	/**
	 * @inheritdoc
	 *
	 * @return {number}
	 */
	toJSON: function() {
		return this._value;
	}
} );

/**
 * @inheritdoc
 *
 * @return {dataValues.NumberValue}
 */
SELF.newFromJSON = function( json ) {
	return new SELF( json );
};

/**
 * @inheritdoc
 * @property {string} [TYPE='number']
 * @static
 */
SELF.TYPE = 'number';

// make this data value available in the store:
dv.registerDataValue( SELF );

}( dataValues, util ) );
