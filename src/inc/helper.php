<?php
if ( ! function_exists( 'be_functions_scripts' ) ) {
	function be_functions_scripts() {
		wp_enqueue_script( 'beplus-block-plugin-main', plugin_dir_url( __DIR__ ) . '/assets/js/main.js',array( 'jquery' ), '1.0', true);
	}
	add_action( 'wp_enqueue_scripts', 'be_functions_scripts' );
}

?>
