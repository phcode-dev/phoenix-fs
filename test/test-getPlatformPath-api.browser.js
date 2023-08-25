/* global expect,fs */

describe(`test getTauriPlatformPath api`, function () {
    const IS_WINDOWS = navigator.userAgent.includes('Windows');
    it(`should fs exist in browser`, function () {
        expect(fs).to.exist;
    });
    it(`should getTauriPlatformPath return null for non tauri paths`, function () {
        expect(fs.getTauriPlatformPath(fs.MOUNT_POINT_ROOT)).to.be.null;
        expect(fs.getTauriPlatformPath(fs.MOUNT_POINT_ROOT+"/rr")).to.be.null;
        expect(fs.getTauriPlatformPath("/fs/rr")).to.be.null;
    });
    if(IS_WINDOWS){
        it(`windows: should getTauriPlatformPath return correct platform for tauri base paths`, function () {
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x")).to.eql("x:\\");
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x/y")).to.eql("x:\\y");
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x/y/d.txt")).to.eql("x:\\y\\d.txt");
        });
        it(`windows: should getTauriPlatformPath throw invalid path for windows if drive cannot be resolved`, function () {
            const invalidPath = fs.TAURI_ROOT + "/";
            let err;
            try{
                fs.getTauriPlatformPath(invalidPath);
            } catch (e) {
                err = e;
            }
            expect(err).to.eql(new Error('Invalid Phoenix FS path for windows: ' + invalidPath));
        });
    } else {
        it(`should getTauriPlatformPath return correct platform for tauri base paths`, function () {
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/")).to.eql("/");
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x")).to.eql("/x");
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x/y")).to.eql("/x/y");
            expect(fs.getTauriPlatformPath(fs.TAURI_ROOT + "/x/y/d.txt")).to.eql("/x/y/d.txt");
        });
    }
});
