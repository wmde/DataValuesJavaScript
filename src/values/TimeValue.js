( function( dv, util, $ ) {
	'use strict';

/**
 * @ignore
 *
 * @param {number|string} number
 * @param {number} digits
 * @return {string}
 */
function pad( number, digits ) {
	if( typeof number !== 'string' ) {
		number = String( number );
	}

	// Strip sign characters.
	number = number.replace( /^[-+]/, '' );

	if ( number.length >= digits ) {
		return number;
	}

	return new Array( digits - number.length + 1 ).join( '0' ) + number;
}

var PARENT = dv.DataValue;

/**
 * `DataValue` for time values.
 * @class dataValues.TimeValue
 * @extends dataValues.DataValue
 * @since 0.1
 * @license GPL-2.0+
 * @author H. Snater < mediawiki@snater.com >
 * @author Thiemo Mättig
 *
 * @constructor
 *
 * @param {string} timestamp
 * @param {Object} [options]
 * @param {string} [options.calendarModel=dataValues.TimeValue.CALENDARS.GREGORIAN]
 *        Wikidata URL of the calendar model.
 * @param {number} [options.precision=dataValues.TimeValue.PRECISIONS.DAY]
 * @param {number} [options.before=0]
 * @param {number} [options.after=0]
 * @param {number} [options.timezone=0]
 *
 * @throws {Error} if `timestamp` is not a valid YMD-ordered timestamp string resembling ISO 8601.
 */
var SELF = dv.TimeValue = util.inherit( 'DvTimeValue', PARENT, function( timestamp, options ) {
	try {
		var matches = /^([-+]?\d+)-(\d+)-(\d+)T(?:(\d+):(\d+)(?::(\d+))?Z?)?$/.exec( timestamp );

		// Strip additional leading zeros from the year, but keep 4 digits.
		var year = matches[1].replace( /\b0+(?=\d{4})/, '' ),
			month = parseInt( matches[2], 10 ),
			day = parseInt( matches[3], 10 ),
			hour = parseInt( matches[4] || 0, 10 ),
			minute = parseInt( matches[5] || 0, 10 ),
			second = parseInt( matches[6] || 0, 10 );

		this.timestamp = ( year.charAt( 0 ) === '-' ? '-' : '+' )
			+ pad( year, 4 ) + '-'
			+ pad( month, 2 ) + '-'
			+ pad( day, 2 ) + 'T'
			+ pad( hour, 2 ) + ':'
			+ pad( minute, 2 ) + ':'
			+ pad( second, 2 ) + 'Z';
	} catch( e ) {
		throw new Error( 'Unable to process timestamp "' + timestamp + '"' );
	}

	this._options = {
		calendarModel: SELF.CALENDARS.GREGORIAN,
		precision: SELF.getPrecisionById( 'DAY' ),
		before: 0,
		after: 0,
		timezone: 0
	};

	var self = this;

	$.each( options || {}, function( key, value ) {
		self._setOption( key, value );
	} );
}, {
	/**
	 * @property {string}
	 * @private
	 */
	timestamp: null,

	/**
	 * @property {Object}
	 * @private
	 */
	_options: null,

	/**
	 * @protected
	 *
	 * @param {string} key
	 * @param {*} value
	 *
	 * @throws {Error} if a value to set is not specified properly.
	 */
	_setOption: function( key, value ) {
		if( key === 'calendarModel' && !SELF.getCalendarModelKeyByUri( value ) ) {
			throw new Error( 'Setting ' + key + ': No valid calendar model URI provided' );
		}
		if( $.inArray( key, [ 'precision', 'before', 'after', 'timezone' ] ) !== -1
			&& typeof value !== 'number'
		) {
			throw new Error( 'Setting ' + key + ': Expected "number" type' );
		}
		if( key === 'precision' && ( value < 0 || value > SELF.PRECISIONS.length ) ) {
			throw new Error( 'Setting ' + key + ': No valid precision provided' );
		}

		this._options[key] = value;
	},

	/**
	 * @since 0.7
	 *
	 * @param {string} key
	 * @return {*}
	 */
	getOption: function( key ) {
		return this._options[key];
	},

	/**
	 * @inheritdoc
	 *
	 * @return {Object}
	 */
	getValue: function() {
		return this.toJSON();
	},

	/**
	 * @inheritdoc
	 */
	equals: function( value ) {
		if( !( value instanceof SELF ) ) {
			return false;
		}

		var valueJSON = value.toJSON(),
			match = true;

		$.each( this.toJSON(), function( key, value ) {
			if( valueJSON[key] !== value ) {
				match = false;
			}
			return match;
		} );

		return match;
	},

	/**
	 * @inheritdoc
	 *
	 * @return {Object}
	 */
	toJSON: function() {
		return {
			after: this._options.after,
			before: this._options.before,
			calendarmodel: this._options.calendarModel,
			precision: this._options.precision,
			time: this.timestamp,
			timezone: this._options.timezone
		};
	}

} );

/**
 * @inheritdoc
 *
 * @return {dataValues.TimeValue}
 */
SELF.newFromJSON = function( json ) {
	return new SELF( json.time, {
		after: json.after,
		before: json.before,
		calendarModel: json.calendarmodel,
		precision: json.precision,
		timezone: json.timezone
	} );
};

/**
 * @inheritdoc
 * @property {string} [TYPE='time']
 * @static
 */
SELF.TYPE = 'time';

// TODO: Inject configurations...
/**
 * Known calendar model URIs.
 * @property {Object}
 * @static
 * @since 0.7
 */
SELF.CALENDARS = {
	GREGORIAN: 'http://www.wikidata.org/entity/Q1985727',
	JULIAN: 'http://www.wikidata.org/entity/Q1985786'
};

/**
 * Retrieves a lower-cased calendar model key string, e.g. "gregorian", by its URI.
 * @static
 * @since 0.7
 *
 * @param {string} uri
 * @return {string|null}
 */
SELF.getCalendarModelKeyByUri = function( uri ) {
	var key = null;

	$.each( SELF.CALENDARS, function( knownKey, knownUri ) {
		if ( uri === knownUri ) {
			key = knownKey.toLowerCase();
			return false;
		}

		return true;
	} );

	return key;
};

/**
 * Precision configuration.
 * @property {Object}
 * @static
 * @since 0.8
 */
SELF.PRECISIONS = [
	{ id: 'YEAR1G', text: 'billion years' },
	{ id: 'YEAR100M', text: 'hundred million years' },
	{ id: 'YEAR10M', text: 'ten million years' },
	{ id: 'YEAR1M', text: 'million years' },
	{ id: 'YEAR100K', text: '100,000 years' },
	{ id: 'YEAR10K', text: '10,000 years' },
	{ id: 'YEAR1K', text: 'millenium' },
	{ id: 'YEAR100', text: 'century' },
	{ id: 'YEAR10', text: 'decade' },
	{ id: 'YEAR', text: 'year' },
	{ id: 'MONTH', text: 'month' },
	{ id: 'DAY', text: 'day' },
	{ id: 'HOUR', text: 'hour' },
	{ id: 'MINUTE', text: 'minute' },
	{ id: 'SECOND', text: 'second' }
];

/**
 * Retrieves a numeric precision value by its descriptive string id.
 * @static
 * @since 0.7
 *
 * @param {string} id
 * @return {number|null}
 */
SELF.getPrecisionById = function( id ) {
	for( var i = SELF.PRECISIONS.length - 1; i--; ) {
		if( SELF.PRECISIONS[i].id === id ) {
			return i;
		}
	}

	return null;
};

dv.registerDataValue( SELF );

}( dataValues, util, jQuery ) );
