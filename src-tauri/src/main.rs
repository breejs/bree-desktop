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

  tauri::Builder::default()
    .manage(state::State::new())
    .setup(|app| {
      let state = app.state::<state::State>();
      state.set_win(app.get_window("main"));
      state.start_bree()?;

      Ok(())
    })
    .menu(menus::create_menu())
    .on_menu_event(|event| match event.menu_item_id() {
      "preferences" => {
        // show preferences window
        let window = event.window();
        let state = window.state::<state::State>();
        state.open_preferences_window();
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
