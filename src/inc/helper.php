<?php

add_action( 'admin_enqueue_scripts', 'be_backend_enqueue_script' );
function be_backend_enqueue_script() {

	wp_register_script( 'be-backend-magnific-popup', plugin_dir_url( __DIR__ ) . 'assets/lib/magnific-popup/jquery.magnific-popup.js', array( 'jquery' ), null, false );
	wp_register_script( 'be-backend-magnific-popup-min', plugin_dir_url( __DIR__ ) . 'assets/lib/magnific-popup/jquery.magnific-popup.min.js', array( 'jquery' ), null, false );
	wp_register_script( 'be-backend-main', plugin_dir_url( __DIR__ ) . 'assets/js/main-backend.js', array( 'jquery' ), null, false );

	wp_enqueue_script( 'be-backend-magnific-popup' );
	wp_enqueue_script( 'be-backend-magnific-popup-min' );
	wp_enqueue_script( 'be-backend-main' );

	wp_register_style( 'be-backend-magnific-popup', plugin_dir_url( __DIR__ ) . 'assets/lib/magnific-popup/magnific-popup.css', false, '1.0.0' );
    wp_enqueue_style( 'be-backend-magnific-popup' );

}


if ( ! function_exists( 'be_functions_scripts' ) ) {
	function be_functions_scripts() {
		wp_enqueue_script( 'beplus-magnific-popup', plugin_dir_url( __DIR__ ) . '/assets/lib/magnific-popup/jquery.magnific-popup.js',array( 'jquery' ), '1.0', true);
		wp_enqueue_script( 'beplus-magnific-popup-min', plugin_dir_url( __DIR__ ) . '/assets/lib/magnific-popup/jquery.magnific-popup.min.js',array( 'jquery' ), '1.0', true);
		wp_enqueue_script( 'beplus-block-plugin-main', plugin_dir_url( __DIR__ ) . '/assets/js/main.js',array( 'jquery' ), '1.0', true);

		 wp_enqueue_style( 'beplus-magnific-popup', plugin_dir_url( __DIR__ ) . '/assets/lib/magnific-popup/magnific-popup.css', array() );
	}
	add_action( 'wp_enqueue_scripts', 'be_functions_scripts' );
}

?>
