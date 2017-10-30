<?php

/**
 * TODO: Remove temporary workaround to start soberwp/controller
 *
 * @see https://github.com/soberwp/controller/issues/48
 */
add_action('init', 'Sober\Controller\loader');
add_action('init', 'Sober\Controller\debugger');
