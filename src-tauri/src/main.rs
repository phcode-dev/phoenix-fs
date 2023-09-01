#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

// IMPORTANT!!!: Editing this file is a Major version change

mod platform;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn console_log(_handle: tauri::AppHandle, message: &str) {
    println!("{}", message);
}

#[tauri::command]
fn _get_windows_drives() -> Option<Vec<char>> {
    platform::get_windows_drives()
}

#[tauri::command]
fn _rename_path(old_path: &str, new_path: &str) -> Result<(), String> {
    platform::rename_path(old_path, new_path)
}

// IMPORTANT!!!: Editing this file is a Major version change
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs_extra::init())
        .invoke_handler(tauri::generate_handler![console_log, _get_windows_drives, _rename_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
