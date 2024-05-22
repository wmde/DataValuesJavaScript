( function( $, vp ) {
	'use strict';

/**
 * @ignore
 *
 * @param {Function} Parser
 *
 * @throws {Error} if the provided argument is not a valueParsers.ValueParser constructor.
 */
function assertIsValueParserConstructor( Parser ) {
	if( !( typeof Parser === 'function' && Parser.prototype instanceof vp.ValueParser ) ) {
		throw new Error( 'Invalid ValueParser constructor' );
	}
}

/**
 * Store managing ValueParser instances.
 * @class valueParsers.ValueParserStore
 * @since 0.1
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 *
 * @constructor
 *
 * @param {Function|null} [DefaultParser=null] Constructor of a default parser that shall be
 *        returned when no parser is registered for a specific purpose.
 */
var SELF = vp.ValueParserStore = function VpValueParserStore( DefaultParser ) {
	this._DefaultParser = DefaultParser || null;
	this._parsersForDataTypes = {};
	this._parsersForDataValueTypes = {};
};

/**
 * @class valueParsers.ValueParserStore
 */
$.extend( SELF.prototype, {
	/**
	 * Default parser constructor to be returned when no parser is registered for a specific
	 * purpose.
	 * @property {Function|null}
	 * @private
	 */
	_DefaultParser: null,

	/**
	 * @property {Object}
	 * @private
	 */
	_parsersForDataTypes: null,

	/**
	 * Registers a parser for a certain data type.
	 *
	 * @param {Function} Parser
	 * @param {string} dataTypeId
	 *
	 * @throws {Error} if no data type id is specified.
	 * @throws {Error} if a parser for the specified data type id is registered already.
	 */
	registerDataTypeParser: function( Parser, dataTypeId ) {
		assertIsValueParserConstructor( Parser );

		if( dataTypeId === undefined ) {
			throw new Error( 'No proper data type id provided to register the parser for' );
		}

		if( this._parsersForDataTypes[dataTypeId] ) {
			throw new Error( 'Parser for data type "' + dataTypeId + '" is registered '
				+ 'already' );
		}

		this._parsersForDataTypes[dataTypeId] = Parser;
	},

	/**
	 * Returns the ValueParser constructor registered for the specified purpose or the default
	 * parser if no ValueParser is registered for that purpose.
	 *
	 * @param {string} _dataValueType unused
	 * @param {string} [dataTypeId]
	 * @return {Function|null}
	 *
	 * @throws {Error} if no proper purpose is provided to retrieve a parser.
	 */
	getParser: function( _dataValueType, dataTypeId ) {
		var parser;

		if( typeof dataTypeId === 'string' ) {
			parser = this._parsersForDataTypes[dataTypeId];
		}

		if ( !parser && typeof _dataValueType !== 'string' ) {
			throw new Error( 'Parser must be selected by dataTypeId - dataValueType is deprecated' );
		}

		return parser || this._DefaultParser;
	}
} );

}( jQuery, valueParsers ) );
