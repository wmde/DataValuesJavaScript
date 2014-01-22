/**
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 */
( function( vp, dv, util, $ ) {
	'use strict';

	var PARENT = vp.ValueParser;

	/**
	 * Constructor for string-to-BoolValue parsers.
	 *
	 * @constructor
	 * @extends valueParsers.ValueParser
	 * @since 0.1
	 */
	vp.BoolParser = util.inherit( PARENT, {
		/**
		 * @see valueParsers.ValueParser.parse
		 * @since 0.1
		 *
		 * @param {string} rawValue
		 * @return jQuery.Promise
		 */
		parse: function( rawValue ) {
			var deferred = $.Deferred(),
				lowerCaseRawValue = rawValue.toLowerCase();

			for( var value in this.constructor.values ) {
				if( value === lowerCaseRawValue ) {
					deferred.resolve( new dv.BoolValue( this.constructor.values[value] ) );
					break;
				}
			}

			if( deferred.state() === 'pending' ) {
				// TODO: Clearly define reject() behaviour / parameters returned by reject()
				deferred.reject( 'BoolParser: Unable to parse "' + rawValue + '"' );
			}

			return deferred.promise();
		}
	} );

	vp.BoolParser.values = {
		'yes': true,
		'on': true,
		'1': true,
		'true': true,
		'no': false,
		'off': false,
		'0': false,
		'false': false
	};

}( valueParsers, dataValues, util, jQuery ) );
