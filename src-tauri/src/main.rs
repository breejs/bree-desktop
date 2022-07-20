#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

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
      _ => {}
    })
    .run(context)
    .expect("error while running tauri application");
}
