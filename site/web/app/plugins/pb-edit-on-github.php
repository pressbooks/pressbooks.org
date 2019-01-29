<?php
/**
 * Plugin Name: Edit on GitHub
 * Version: 1.0
 */

add_filter( 'the_content', function( $content ) {
  if( is_page() || is_single() ) {
    $content .= '<p>' . get_the_github_edit_link() . '</p>';
  }
  return $content;
}, 1000 );
