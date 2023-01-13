<?php
/*
Plugin Name: Formulario de contactos de Acens
Plugin URI: https://www.suricatta.es
description: Carga del formulario de contacto de Acens
Version: 1.0.0
Author: Equipo de Suricatta
Author URI: https://www.suricatta.es
License: Todos los derechos reservados. 
*/

class Vue_Shortcode_Plugin
{
    static $instance = false;
    private $name = "vue-acens-shortcode-plugin";
    private $version = "1.0.1";
    private $shortcode = "acensform";

    private function __construct()
    {
        add_shortcode($this->shortcode, [$this, "render"]);
        add_action("wp_enqueue_scripts", [$this, "enqueue"], 10);
    }

    public static function get()
    {
        // enforce the singleton pattern
        if (!self::$instance) self::$instance = new self;
        return self::$instance;
    }

    public function enqueue()
    {
        // only continue if the post contains the shortcode
        global $post;
        if (!has_shortcode($post->post_content, $this->shortcode)) return;

        // load plugin styles and scripts
        wp_enqueue_style($this->name . '-appcss', plugin_dir_url(__FILE__) . "css/app.css", [], $this->version);
        wp_enqueue_style($this->name . '-chuckvendorscss', plugin_dir_url(__FILE__) . "css/chunk-vendors.css", [], $this->version);
        wp_enqueue_style($this->name . '-maincss', plugin_dir_url(__FILE__) . "css/main.css", [], $this->version);
        wp_enqueue_script($this->name . '-appjs', plugin_dir_url(__FILE__) . "js/app.js", [], $this->version, true);
        wp_enqueue_script($this->name . '-chuckvendorsjs', plugin_dir_url(__FILE__) . "js/chunk-vendors.js", [], $this->version, true);
        wp_enqueue_script($this->name . '-mainjs', plugin_dir_url(__FILE__) . "js/main.js", [], $this->version, true);
        wp_enqueue_script($this->name . '-webfontloaderjs', plugin_dir_url(__FILE__) . "js/webfontloader.js", [], $this->version, true);
    }

    public function render($atts)
    {
        // get the atts passed from the shortcode and escape
        $atts = esc_attr(json_encode($atts));

        // output the container and root component for vue app
        return "<div class='{$this->name}-container acensform'><div id=\"app\"></div></div>";
    }
}

/**
 * This is a global function to return this singleton class. 
 * You can use this function in your other classes or plugins 
 * to access properties and methods on this class. Example:
 * 
 * VUE_SP()->property
 */
function VUE_SP()
{
    return Vue_Shortcode_Plugin::get();
}

// start the plugin
VUE_SP();