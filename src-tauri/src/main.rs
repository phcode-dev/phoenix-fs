#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri::api::process::Command;
use tauri::GlobalWindowEvent;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(handle: tauri::AppHandle, name: &str) -> String {
    let resource_path = handle.path_resolver()
        .resolve_resource("app/hello.js")
        .expect("failed to resolve resource");
    Command::new_sidecar("phnode")
        .expect("failed to create `my-sidecar` binary command")
        .args(resource_path.as_path().to_str())
        .spawn()
        .expect("Failed to spawn sidecar");
    println!("hello");
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn process_window_event(event: &GlobalWindowEvent) {
    if let tauri::WindowEvent::CloseRequested { .. } = event.event() {
        let size = event.window().outer_size().unwrap();
        println!("Window closing size {}, {}", size.width, size.height);
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs_extra::init())
        .on_window_event(|event| process_window_event(&event))
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
