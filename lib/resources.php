<?php
/**
 * @licence GNU GPL v2+
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 * @author H. Snater < mediawiki@snater.com >
 *
 * @codeCoverageIgnoreStart
 */
return call_user_func( function() {

	$moduleTemplate = array(
		'localBasePath' => __DIR__,
		'remoteExtPath' => '..' . substr( __DIR__, strlen( $GLOBALS['IP'] ) ),
	);

	return array(

		'globeCoordinate.js' => $moduleTemplate + array(
			'scripts' => array(
				'globeCoordinate/globeCoordinate.js',
				'globeCoordinate/globeCoordinate.Formatter.js',
				'globeCoordinate/globeCoordinate.GlobeCoordinate.js',
			),
		),

		'qunit.parameterize' => $moduleTemplate + array(
			'scripts' => array(
				'qunit.parameterize/qunit.parameterize.js',
			),
			'dependencies' => array(
				'jquery.qunit',
			),
		),

		'time.js' => $moduleTemplate + array(
			'scripts' => array(
				'time/time.js',
				'time/time.Time.js',
				'time/time.Time.validate.js',
				'time/time.Parser.js',
			),
			'dependencies' => array(
				'jquery',
			),
		),

		'time.js.validTimeDefinitions' => $moduleTemplate + array(
			'scripts' => array(
				'../tests/lib/time/time.validTimeDefinitions.js',
			),
			'dependencies' => array(
				'time.js',
			),
		),

		'util.inherit' => $moduleTemplate + array(
			'scripts' => array(
				'util/util.inherit.js',
			),
		),

	);

} );
