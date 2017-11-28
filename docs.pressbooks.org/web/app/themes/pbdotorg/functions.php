<?php

use function \Sober\Intervention\intervention;

add_action('after_setup_theme', function () {
    remove_theme_support('post-formats');
}, 11);

add_action('wp_enqueue_scripts', function () {
    $parent_style = 'twentyfifteen-style';
    wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        [$parent_style],
        wp_get_theme()->get('Version')
    );
});

add_filter('parsedownparty_autoenable', '__return_true');

if (function_exists('\Sober\Intervention\intervention')) {
    intervention('remove-dashboard-items', 'news', 'all');
    intervention('remove-emoji');
    intervention('remove-help-tabs');
}
