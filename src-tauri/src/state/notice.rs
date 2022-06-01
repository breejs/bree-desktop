use super::node::Message;
use tauri::Window;

#[derive(Debug, Default, Clone)]
pub struct Notice {
  win: Option<Window>,
}

impl Notice {
  pub fn from(win: Option<Window>) -> Notice {
    Notice { win }
  }

  pub fn send_bree_event(&self, msg: Message) {
    if let Some(window) = self.win.as_ref() {
      // log::debug!("[bree]: {:#?}", serde_json::to_string(&msg));

      window
        .emit(format!("bree://{}", msg.event).as_str(), msg.data)
        .expect("failed to emit event");
    }
  }
}
