// platform.rs
// IMPORTANT!!!: Editing this file is a Major version change

#[cfg(target_os = "windows")]
extern crate winapi;

#[cfg(target_os = "windows")]
use winapi::um::fileapi::GetLogicalDriveStringsW;

pub fn get_windows_drives() -> Option<Vec<char>> {
    #[cfg(target_os = "windows")] {
        let mut buffer: [u16; 255] = [0; 255];

        unsafe {
            let res = GetLogicalDriveStringsW(255, buffer.as_mut_ptr());
            if res == 0 {
                return None;
            }

            let drives: Vec<char> = buffer.iter().filter_map(|&u| {
                if u != 0 {
                    Some(u as u8 as char)
                } else {
                    None
                }
            }).collect();

            Some(drives)
        }
    }

    #[cfg(not(target_os = "windows"))] {
        None
    }
}
