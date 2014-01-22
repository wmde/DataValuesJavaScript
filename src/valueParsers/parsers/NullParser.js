/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
( function( mw, vp, dv, $, util ) {
	'use strict';

	var PARENT = vp.ValueParser,
		constructor = function() {};

	/**
	 * Constructor for null parsers. Null parser will take any value for parsing. The parsed value
	 * will be an UnknownValue data value except if null got passed in or a DataValue got passed in.
	 * In those cases, the value given to the parse function will be the parse result.
	 *
	 * @constructor
	 * @extends vp.ValueParser
	 * @since 0.1
	 */
	vp.NullParser = util.inherit( PARENT, constructor, {

		/**
		 * @see vp.ValueParser.parse
		 *
		 * @since 0.1
		 *
		 * @param {String} rawValue
		 *
		 * @return $.Promise
		 */
		parse: function( rawValue ) {
			var deferred = $.Deferred(),
				value = rawValue;

			if( value !== null && !( value instanceof dv.DataValue ) ) {
				value = new dv.UnknownValue( value );
			}

			return deferred.resolve( value ).promise();
		}

	} );

}( mediaWiki, valueParsers, dataValues, jQuery, util ) );
