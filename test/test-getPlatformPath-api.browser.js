/* global expect,fs, IS_WINDOWS */

describe(`test getTauriPlatformPath api`, function () {
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
            expect(err.message).to.eql('Invalid Phoenix FS path for windows: ' + invalidPath);
            expect(err.code).to.eql(fs.ERR_CODES.EINVAL);
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

describe(`test getTauriVirtualPath api`, function () {
    it(`should fs exist in browser`, function () {
        expect(fs).to.exist;
    });

    function expectThrowError(virtualPath, errorMessage, expectedErrCode) {
        let ex;
        try{
            fs.getTauriVirtualPath(virtualPath);
        } catch (e) {
            ex=e;
        }
        expect(ex.message).to.eql(errorMessage);
        expect(ex.code).to.eql(expectedErrCode || fs.ERR_CODES.EINVAL);
    }

    if(IS_WINDOWS){
        it(`should getTauriVirtualPath throw in windows if path doesnt start with drive letter`, function () {
            expectThrowError("/a/linux/path", "Invalid Windows path format: /a/linux/path");
            expectThrowError("a/linux/path", "Invalid Windows path format: a/linux/path");
            expectThrowError("a:linux/path", "Invalid Windows path format: a:linux/path");
            expectThrowError("ab:/linux/path", "Invalid Windows path format: ab:/linux/path");
            expectThrowError("a", "Invalid Windows path format: a");
        });

        it(`should getTauriVirtualPath return correct path in windows`, function () {
            expect(fs.getTauriVirtualPath("a:\\")).to.eql("/tauri/a/");
            expect(fs.getTauriVirtualPath("b:\\test win\\d")).to.eql("/tauri/b/test win/d");
            expect(fs.getTauriVirtualPath("b:\\test win\\d.txt")).to.eql("/tauri/b/test win/d.txt");

            expect(fs.getTauriVirtualPath("a:/")).to.eql("/tauri/a/");
            expect(fs.getTauriVirtualPath("b:/test win/d")).to.eql("/tauri/b/test win/d");
            expect(fs.getTauriVirtualPath("b:/test win/d.txt")).to.eql("/tauri/b/test win/d.txt");
        });
    } else {
        it(`should getTauriVirtualPath throw in linux if path doesnt start with a /`, function () {
            expectThrowError("hehe/no/", "Invalid Unix path format: hehe/no/");
        });

        it(`should getTauriVirtualPath return correct path in linux`, function () {
            expect(fs.getTauriVirtualPath("/")).to.eql("/tauri/");
            expect(fs.getTauriVirtualPath("/x")).to.eql("/tauri/x");
            expect(fs.getTauriVirtualPath("/x/b/")).to.eql("/tauri/x/b/");
            expect(fs.getTauriVirtualPath("/x/b/a.txt")).to.eql("/tauri/x/b/a.txt");
        });
    }
});

if(window.__TAURI__){
    describe(`test _get_windows_drives api`, function () {
        function isLetter(str) {
            return !!(str.length === 1 && str.match(/[a-z]/i));
        }
        if(IS_WINDOWS){
            it(`windows: should _get_windows_drives return all windows drives`, async function () {
                let drives = await window.__TAURI__.invoke('_get_windows_drives');
                expect(drives.length > 1).to.be.true;
                for(let drive of drives){
                    expect(isLetter(drive)).to.be.true;
                }
            });
        } else {
            it(`should _get_windows_drives return null in other platforms`, async function () {
                let drives = await window.__TAURI__.invoke('_get_windows_drives');
                expect(drives).to.be.null;
            });
        }
    });
}
