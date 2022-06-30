use self::notice::Notice;
use parking_lot::Mutex;
use std::path::PathBuf;
use std::sync::Arc;
use tauri::{Manager, Window, WindowBuilder, WindowUrl};

mod notice;

#[derive(Clone)]
pub struct State {
  pub window: Arc<Mutex<Option<Window>>>,
}

impl State {
  pub fn new() -> State {
    State {
      window: Arc::new(Mutex::new(None)),
    }
  }

  // set window
  pub fn set_win(&self, win: Option<Window>) {
    let mut window = self.window.lock();
    *window = win;
  }

  // create preferences window
  pub fn open_preferences_window(&self) {
    // get window
    let window = self.window.lock();

    let mut url = PathBuf::new();
    url.push("preferences");

    if let Some(window) = window.clone() {
      // create preferences window
      if let Some(preferences_window) = window.get_window("preferences") {
        preferences_window
          .set_focus()
          .expect("Failed to focus window");
      } else {
        WindowBuilder::new(&window, "preferences", WindowUrl::App(url))
          .center()
          .resizable(false)
          .always_on_top(true)
          .title("Preferences")
          .build()
          .expect("Failed to create preferences window");
      }
    }
  }
}
