use super::notice::Notice;
use anyhow::{bail, Result};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::api::process::{Command, CommandChild, CommandEvent};

#[derive(Serialize, Deserialize)]
pub struct Message {
  pub event: String,
  pub data: Value,
}

fn handle_bree_stdout_events(line: String) {
  // log::info!("[bree]: {}", line);
  // parse json line
  let v: Message = serde_json::from_str(&line).expect(
    format!(
      "Messages must be in JSON format. This is what was received: '{}'.",
      line
    )
    .as_str(),
  );

  if v.event.eq("log") {
    log::info!("[bree]: {}", v.data);
  } else {
  }
}

#[derive(Debug)]
pub struct Node {
  sidecar: Option<CommandChild>,
}

impl Node {
  pub fn new() -> Node {
    Node { sidecar: None }
  }

  pub fn start(&mut self, notice: Notice) -> Result<()> {
    if self.sidecar.is_some() {
      bail!("Sidecar already running");
    }

    // get command
    let cmd = Command::new_sidecar("node")?;
    // spawn
    let (mut rx, child) = cmd.spawn()?;

    self.sidecar = Some(child);

    // setup event handlers
    tauri::async_runtime::spawn(async move {
      while let Some(event) = rx.recv().await {
        match event {
          CommandEvent::Stdout(line) => {
            let v: Message = serde_json::from_str(&line).expect(
              format!(
                "Messages must be in JSON format. This is what was received: '{}'.",
                line
              )
              .as_str(),
            );

            if v.event.eq("log") {
              log::info!("[bree]: {}", v.data);
            } else {
              notice.send_bree_event(v);
            }
          }
          CommandEvent::Stderr(err) => log::error!("[bree]: {}", err),
          CommandEvent::Terminated(_) => log::warn!("[bree] terminated"),
          _ => {}
        }
      }
    });

    Ok(())
  }

  pub fn stop(&mut self) -> Result<()> {
    if let Some(sidecar) = self.sidecar.take() {
      sidecar.kill()?;
    }

    Ok(())
  }
}
