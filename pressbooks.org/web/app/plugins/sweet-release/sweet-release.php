<?php
/*
Plugin Name: Sweet Release
Plugin URI: https://github.com/pressbooks/sweet-release/
Description: Painlessly add rewrite endpoints for GitHub release assets.
Version: 1.0.0
Author: Pressbooks
Author URI: https://pressbooks.org
License: GPL v3.0 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.txt
Text Domain: sweet-release
*/

require_once( dirname( __FILE__ ) . '/inc/class-release.php' );

add_action( 'init', [ '\SweetRelease\Plugin', 'init' ] );
