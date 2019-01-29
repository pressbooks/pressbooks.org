<?php

namespace SweetRelease;

class Plugin {
	/**
	 * The name of the transient where we store release asset URLs.
	 */
	const TRANSIENT = 'sweet_release_assets';

	/**
	 * The name of the query endpoint for downloading a release asset.
	 */
	const ENDPOINT = 'download';


	/**
	 * @var Plugin
	 */
	private static $instance = null;

	/**
	 * @var array
	 */
	private $projects = [];

	/**
	 * Initialize plugin class.
	 *
	 * @see http://kizu514.com/blog/namespaces-and-objects/
	 *
	 * @return Plugin
	 */
	static public function init() {
		if ( is_null( self::$instance ) ) {
			$projects = apply_filters( 'sweet_release_projects', [] );
			self::$instance = new self( $projects );
			self::hooks( self::$instance );
		}
		return self::$instance;
	}

	/**
	 * Add WP action and filter hooks.
	 *
	 * @param Plugin $obj
	 */
	static public function hooks( Plugin $obj ) {
		add_rewrite_endpoint( self::ENDPOINT, EP_ROOT );
		add_filter( 'query_vars', [ $obj, 'addQueryVars' ], 1 );
		add_action( 'template_redirect', [ $obj, 'handleDownload' ], 0 );
	}

	/**
	 * Constructor.
	 *
	 * @param array $projects
	 */
	public function __construct( $projects ) {
		$this->projects = $projects;
	}

	/**
	 * Retrieve the asset URL for a repo.
	 *
	 * @param string $user
	 * @param string $repo
	 *
	 * @return string | bool
	 */
	public function fetchAssetUrl( $repo ) {
		$response = wp_remote_get( "https://api.github.com/repos/{$repo}/releases/latest" );
		$latest = json_decode( $response['body'] );
		if ( $latest->assets[0]->browser_download_url ) {
			return $latest->assets[0]->browser_download_url;
		}
		return false;
	}

	/**
	 * Add a query var for downloads.
	 *
	 * @param array
	 *
	 * @return array
	 */
	public function addQueryVars( $vars ) {
		$vars[] = self::ENDPOINT;
		return $vars;
	}

	/**
	 * Get saved asset URL from transients, fetching if needed.
	 *
	 * @param string $project
	 *
	 * @return string | bool
	 */
	public function getAssetUrl( $project ) {
		if ( isset( $this->projects[ $project ] ) ) {
			$repo = $this->projects[ $project ];
			$releases = get_transient( self::TRANSIENT );
			if ( $releases ) {
				if ( isset( $releases[ $project ] ) ) {
					$asset_url = $releases[ $project ];
				} else {
					$asset_url = self::fetchAssetUrl( $repo );
					if ( $asset_url ) {
						$releases[ $project ] = $asset_url;
						set_transient( self::TRANSIENT, $releases, 6 * HOUR_IN_SECONDS );
					}
				}
			} else {
				$asset_url = self::fetchAssetUrl( $repo );
				if ( $asset_url ) {
					set_transient(
						'sweet_release_assets',
						[
							$project => $latest->assets[0]->browser_download_url,
						],
						6 * HOUR_IN_SECONDS
					);
				}
			}
		} else {
			return false;
		}

		return $asset_url;
	}

	/**
	 * Handle the download operation for a project.
	 *
	 * @return null
	 */
	public function handleDownload() {
		global $wp_query;

		if ( ! isset( $wp_query->query[ self::ENDPOINT ] ) ) {
			return;
		}

		$project = $wp_query->query[ self::ENDPOINT ];

		$url = self::getAssetUrl( $project );

		if ( $url !== false ) {
			wp_redirect( $url );
			exit;
		} else {
			if ( isset( $this->projects[ $project ] ) ) {
				$repo = $this->projects[ $project ];
				wp_redirect( "https://github.com/$repo/releases/latest/" );
			}
		}
	}
}
