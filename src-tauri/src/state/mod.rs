use self::notice::Notice;
use anyhow::Result;
use parking_lot::Mutex;
use std::sync::Arc;
use tauri::Window;

mod node;
mod notice;

pub use self::node::*;

#[derive(Clone)]
pub struct State {
  pub node: Arc<Mutex<Node>>,

  pub window: Arc<Mutex<Option<Window>>>,
}

impl State {
  pub fn new() -> State {
    let node = Node::new();

    State {
      node: Arc::new(Mutex::new(node)),
      window: Arc::new(Mutex::new(None)),
    }
  }

  // start bree sidecar
  pub fn start_bree(&self) -> Result<()> {
    let mut node = self.node.lock();

    let notice = {
      let window = self.window.lock();
      log::info!("window: {:#?}", window.clone());
      Notice::from(window.clone())
    };

    node.start(notice)
  }

  // set window
  pub fn set_win(&self, win: Option<Window>) {
    let mut window = self.window.lock();
    *window = win;
  }
}
