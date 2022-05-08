#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{
    api::process::{Command, CommandEvent},
    Manager,
};


fn main() {
  tauri::Builder::default()
    .setup(|app| {
        // spawn node binary
        let (mut rx, mut _child) = Command::new_sidecar("node")
            .expect("Failed to setup `node` sidecar")
            .spawn()
            .expect("Failed to spawn packaged node");

        tauri::async_runtime::spawn(async move {
            // read events such as stdout
            while let Some(event) = rx.recv().await {
                if let CommandEvent::Stdout(line) = event.clone() {
                    println!("[bree-stdout] {:?}", line);
                }

                if let CommandEvent::Stderr(error) = event.clone() {
                    println!("[bree-stderr] {:?}", error);
                }

                if let CommandEvent::Terminated(_payload) = event.clone() {
                    println!("[bree-exit] terminated");
                }
            }
        });

        // listen for bree events
        let _id = app.listen_global("bree://worker-created", |event| {
            println!("got bree://worker-created with payload {:?}", event.payload());
        });

        let _log_id = app.listen_global("bree://closing", |_event| {
            println!("bree is closing");
        });

        Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
