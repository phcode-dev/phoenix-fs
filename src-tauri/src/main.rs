#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use tauri::GlobalWindowEvent;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn console_log(_handle: tauri::AppHandle, message: &str) {
    println!("{}", message);
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
        .invoke_handler(tauri::generate_handler![console_log])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
