/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
( function( dv, util ) {
'use strict';

var PARENT = dv.DataValue,
	constructor = function( value ) {
		if( typeof value !== 'boolean' ) {
			throw new Error( 'A boolean value has to be given' );
		}
		this._value = value;
	};

/**
 * Constructor for creating a data value representing a boolean.
 *
 * @constructor
 * @extends dv.DataValue
 * @since 0.1
 *
 * @param {boolean} value
 */
dv.BoolValue = util.inherit( 'DvBoolValue', PARENT, constructor, {

	/**
	 * @see dv.DataValue.getSortKey
	 *
	 * @since 0.1
	 *
	 * @return number
	 */
	getSortKey: function() {
		return this._value ? 1 : 0;
	},

	/**
	 * @see dv.DataValue.getValue
	 *
	 * @since 0.1
	 *
	 * @return boolean
	 */
	getValue: function() {
		return this._value;
	},

	/**
	 * @see dv.DataValue.equals
	 *
	 * @since 0.1
	 */
	equals: function( value ) {
		if ( !( value instanceof dv.BoolValue ) ) {
			return false;
		}

		return this.getValue() === value.getValue();
	},

	/**
	 * @see dv.DataValue.toJSON
	 *
	 * @since 0.1
	 *
	 * @return boolean
	 */
	toJSON: function() {
		return this._value;
	}

} );

dv.BoolValue.newFromJSON = function( json ) {
	return new dv.BoolValue( json );
};

dv.BoolValue.TYPE = 'boolean';

dv.registerDataValue( dv.BoolValue );

}( dataValues, util ) );
