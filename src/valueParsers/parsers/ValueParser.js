( function( vp, $, util ) {
	'use strict';

/**
 * Base constructor for objects representing a value parser.
 * @class valueParsers.ValueParser
 * @abstract
 * @since 0.1
 * @license GPL-2.0+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 *
 * @constructor
 *
 * @param {Object} options
 */
var SELF = vp.ValueParser = function VpValueParser( options ) {
	this._options = $.extend( {}, options || {} );
};

/**
 * @class valueParsers.ValueParser
 */
$.extend( SELF.prototype, {
	/**
	 * Parser options.
	 * @property {Object}
	 * @private
	 */
	_options: {},

	/**
	 * Returns the parser's options as set in the constructor.
	 *
	 * @return {Object}
	 */
	getOptions: function() {
		return $.extend( {}, this._options );
	},

	/**
	 * Parses a value. Will return a jQuery.Promise which will be resolved if the parsing is
	 * successful or rejected if it fails. There can be various reasons for the parsing to fail,
	 * e.g. the parser is using the API and the API can't be reached. In case of success, the
	 * callbacks will get a dataValues.DataValue object. In case of failure, the callback's
	 * parameter will be an error object of some sort (not implemented yet!).
	 * @abstract
	 *
	 * @param {*} rawValue
	 * @return {Object} jQuery.Promise
	 * @return {Function} return.done
	 * @return {dataValues.DataValue|null} return.done.dataValue Parsed DataValue object or "null"
	 *         if empty.
	 * @return {Function} return.fail
	 * @return {string} return.fail.message HTML error message.
	 */
	parse: util.abstractMember
	// TODO: Specify Error object for parser failure. Consider different error scenarios e.g.
	//       API can not be reached or real parsing issues.
	// TODO: Think about introducing parser warnings or a status object in done() callbacks.

} );

}( valueParsers, jQuery, util ) );
