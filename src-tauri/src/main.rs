#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

mod logger;
mod menus;
mod state;

fn main() {
  // setup logger
  logger::setup_logger().expect("Failed to setup logger");

  let context = tauri::generate_context!();

  tauri::Builder::default()
    .manage(state::State::new())
    .setup(|app| {
      let state = app.state::<state::State>();
      state.set_win(app.get_window("main"));

      Ok(())
    })
    .menu(menus::create_menu(&context.package_info().name))
    .on_menu_event(|event| match event.menu_item_id() {
      "preferences" => {
        // show preferences window
        let window = event.window();
        let state = window.state::<state::State>();
        state.open_preferences_window();
      }
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
