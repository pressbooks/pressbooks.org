<?php /*
Plugin Name: Latest Release
Plugin URI: https://github.com/pressbooks/latest-release/
Description: Adds a rewrite endpoint to download your latest GitHub Release.
Version: 1.0.0
Author: Pressbooks
Author URI: https://pressbooks.org
Text Domain: latest-release
 */

function latest_release_fetch( $repo ) {
  if ( false === ( $asset_url = get_transient( 'latest_release_asset' ) ) ) {
    $ch = curl_init();
    curl_setopt( $ch, CURLOPT_URL, "https://api.github.com/repos/pressbooks/pressbooks/releases/latest" );
    curl_setopt( $ch, CURLOPT_USERAGENT, 'pressbooks/latest-release' );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, 1 );
    $json = curl_exec( $ch );
    curl_close( $ch );
    $latest = json_decode( $json );
    if ( $latest->assets[0]->browser_download_url ) {
      $asset_url = $latest->assets[0]->browser_download_url;
      set_transient( 'latest_release_asset', $asset_url );
    } else {
      $asset_url = false;
    }
  }
  return $asset_url;
}

function latest_release_handle_download() {
  if ( ! array_key_exists( 'latest', $GLOBALS['wp_query']->query_vars ) ) {
    return;
  }

  $repo = 'pressbooks/pressbooks';

  if ( false != ( $url = latest_release_fetch( $repo ) ) ) {
    wp_redirect( $url );
    exit;
  } else {
    wp_redirect( "https://github.com/$repo/releases/latest/" );
  }
}

function latest_release_rewrite() {
  add_rewrite_endpoint( 'latest', EP_ROOT );
  add_action( 'template_redirect', 'latest_release_handle_download', 0 );
}

add_filter( 'init', 'latest_release_rewrite', 1 );
