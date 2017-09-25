<?php
/**
 * Plugin Name: Pressbooks.org Tweaks
 * Description: Customizations for Pressbooks.org.
 * Version: 1.0.0
 * Author: Pressbooks (Book Oven Inc.)
 * Author URI: https://pressbooks.org
 * License: MIT License
 */

if (function_exists('\Sober\Intervention\intervention')) {
    intervention('remove-dashboard-items', 'news', 'all');
    intervention('remove-emoji');
    intervention('remove-help-tabs');
}
