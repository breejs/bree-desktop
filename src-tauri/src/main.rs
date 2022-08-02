#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

mod logger;
mod menus;

fn main() {
  // setup logger
  logger::setup_logger().expect("Failed to setup logger");

  let context = tauri::generate_context!();

  tauri::Builder::default()
    .menu(menus::create_menu(&context.package_info().name))
    .on_menu_event(|event| match event.menu_item_id() {
      "new" => {
        // show new connection modal
        let window = event.window();
        window
          .emit("show-new-connection", {})
          .expect("Failed to emit 'show-new-connection' event");
      }
      "reload" => {
        // reload the app
        let window = event.window();
        window
          .with_webview(|webview| {
            #[cfg(target_os = "linux")]
            {
              // see https://docs.rs/webkit2gtk/latest/webkit2gtk/struct.WebView.html
              // and https://docs.rs/webkit2gtk/latest/webkit2gtk/trait.WebViewExt.html
              use webkit2gtk::traits::WebViewExt;
              use webkit2gtk::auto::web_view::WebViewExt;
              webview.inner().reload();
            }

            #[cfg(windows)]
            unsafe {
              // see https://docs.rs/webview2-com/0.17.0/webview2_com/Microsoft/Web/WebView2/Win32/struct.ICoreWebView2Controller.html
              webview.controller().CoreWebView2().unwrap().Reload().unwrap();
            }

            #[cfg(target_os = "macos")]
            unsafe {
              let () = msg_send![webview.inner(), reload];
            }
          })
          .expect("Failed to reload app");
      }
      _ => {}
    })
    .run(context)
    .expect("error while running tauri application");
}
