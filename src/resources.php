<?php
/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 * @author H. Snater < mediawiki@snater.com >
 *
 * @codeCoverageIgnoreStart
 */
return call_user_func( function() {
	preg_match( '+' . preg_quote( DIRECTORY_SEPARATOR ) . '(?:vendor|extensions)'
		. preg_quote( DIRECTORY_SEPARATOR ) . '.*+', __DIR__, $remoteExtPath );

	$moduleTemplate = array(
		'localBasePath' => __DIR__,
		'remoteExtPath' => '..' . $remoteExtPath[0],
	);

	$modules = array(

		'dataValues' => $moduleTemplate + array(
			'scripts' => array(
				'dataValues.js',
			),
		),

		'dataValues.DataValue' => $moduleTemplate + array(
			'scripts' => array(
				'DataValue.js',
			),
			'dependencies' => array(
				'dataValues',
				'util.inherit',
			),
		),

		'dataValues.values' => $moduleTemplate + array(
			'scripts' => array(
				// Note: The order here is relevant, scripts should be places after the ones they
				//  depend on.
				'values/BoolValue.js',
				'values/DecimalValue.js',
				'values/GlobeCoordinateValue.js',
				'values/MonolingualTextValue.js',
				'values/MultilingualTextValue.js',
				'values/StringValue.js',
				'values/NumberValue.js',
				'values/TimeValue.js',
				'values/QuantityValue.js',
				'values/UnknownValue.js',
				'values/UnDeserializableValue.js',
			),
			'dependencies' => array(
				'dataValues.DataValue',
				'dataValues.TimeValue',
				'globeCoordinate.js', // required by GlobeCoordinateValue
				'util.inherit',
			),
		),

		'dataValues.TimeValue' => $moduleTemplate + array(
			'scripts' => array(
				'values/TimeValue.js',
			),
			'dependencies' => array(
				'dataValues.DataValue',
				'util.inherit',
			),
		),

	);

	$modules = array_merge(
		$modules,
		include __DIR__ . '/valueFormatters/resources.php',
		include __DIR__ . '/valueParsers/resources.php'
	);

	return $modules;

} );
