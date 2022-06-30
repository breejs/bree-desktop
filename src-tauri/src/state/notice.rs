use tauri::Window;

#[derive(Debug, Default, Clone)]
pub struct Notice {
  win: Option<Window>,
}

impl Notice {
  pub fn from(win: Option<Window>) -> Notice {
    Notice { win }
  }
}
