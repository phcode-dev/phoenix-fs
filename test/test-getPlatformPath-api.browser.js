/* global expect,fs */

describe(`test getPlatformPath api`, function () {
    const IS_WINDOWS = navigator.userAgent.includes('Windows');
    it(`should fs exist in browser`, function () {
        expect(fs).to.exist;
    });
    it(`should getPlatformPath return null for non tauri paths`, function () {
        expect(fs.getPlatformPath(fs.MOUNT_POINT_ROOT)).to.be.null;
        expect(fs.getPlatformPath(fs.MOUNT_POINT_ROOT+"/rr")).to.be.null;
        expect(fs.getPlatformPath("/fs/rr")).to.be.null;
    });
    if(IS_WINDOWS){
        it(`windows: should getPlatformPath return correct platform for tauri base paths`, function () {
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x")).to.eql("x:\\");
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x/y")).to.eql("x:\\y");
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x/y/d.txt")).to.eql("x:\\y\\d.txt");
        });
        it(`windows: should getPlatformPath throw invalid path for windows if drive cannot be resolved`, function () {
            const invalidPath = fs.TAURI_ROOT + "/";
            let err;
            try{
                fs.getPlatformPath(invalidPath);
            } catch (e) {
                err = e;
            }
            expect(err).to.eql(new Error('Invalid Phoenix FS path for windows: ' + invalidPath));
        });
    } else {
        it(`should getPlatformPath return correct platform for tauri base paths`, function () {
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/")).to.eql("/");
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x")).to.eql("/x");
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x/y")).to.eql("/x/y");
            expect(fs.getPlatformPath(fs.TAURI_ROOT + "/x/y/d.txt")).to.eql("/x/y/d.txt");
        });
    }
});
