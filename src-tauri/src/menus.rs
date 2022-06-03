use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuItem, Submenu};

#[cfg(target_os = "macos")]
pub fn create_menu() -> Menu {
  Menu::new()
    .add_submenu(Submenu::new(
      "Bree",
      Menu::new()
        .add_native_item(MenuItem::About(
          "Bree".to_string(),
          AboutMetadata::default(),
        ))
        .add_native_item(MenuItem::Separator)
        .add_item(
          CustomMenuItem::new("preferences".to_string(), "Preferences...")
            .accelerator("CmdOrControl+,"),
        )
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::HideOthers)
        .add_native_item(MenuItem::ShowAll)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit),
    ))
    //
    // File submenu
    //
    .add_submenu(Submenu::new(
      "File",
      Menu::new().add_native_item(MenuItem::CloseWindow),
    ))
    //
    // View submenu
    //
    .add_submenu(Submenu::new("View", Menu::new()))
    //
    // Window submenu
    //
    .add_submenu(Submenu::new(
      "Window",
      Menu::new()
        .add_native_item(MenuItem::Minimize)
        .add_native_item(MenuItem::Zoom)
        .add_native_item(MenuItem::Separator)
        .add_item(CustomMenuItem::new(
          "bring_all_to_front".to_string(),
          "Bring All to Front",
        )),
    ))
}

#[cfg(not(target_os = "macos"))]
pub fn create_menu() -> Menu {
  Menu::new()
}
