/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER*/

function _setupTests(testType) {
    let testPath;
    async function _clean() {
        console.log(`cleaning: `, testPath);
        let cleanSuccess = false;
        fs.unlink(testPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    before(async function () {
        switch (testType) {
        case TEST_TYPE_FS_ACCESS: testPath = window.mountTestPath;break;
        case TEST_TYPE_FILER: testPath = window.virtualTestPath;break;
        default: throw new Error("unknown file system impl");
        }
    });

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log(`mkdir: `, testPath);
        let cleanSuccess = false;
        fs.mkdirs(testPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    });

    afterEach(async function () {
        await _clean();
    });

    it(`Should load Filer in browser`, function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
        expect(Filer.fs.name).to.equal(`local`);
    });

    it(`Should load clean Phoenix fs in browser`,async function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal(`phoenixFS`);
        expect(fs.MOUNT_POINT_ROOT).to.equal(`/mnt`);
        expect(fs.TAURI_ROOT).to.equal(`/tauri`);
    }, 10000);

    async function _writeTestFile() {
        let writeSuccess = false;
        fs.writeFile(`${testPath}/browserWrite.txt`, `hello World`, `utf8`, (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        await waitForTrue(()=>{return writeSuccess;},10000);
        expect(writeSuccess).to.be.true;
    }

    it(`Should phoenix ${testType} write in browser`, async function () {
        await _writeTestFile();
    });

    it(`Should phoenix ${testType} read in browser`, async function () {
        await _writeTestFile();
        let readSuccess = false;
        fs.readFile(`${testPath}/browserWrite.txt`, `utf8`, (err)=>{
            if(!err){
                readSuccess = true;
            }
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
    });


    it(`Should phoenix ${testType} delete file in browser`, async function () {
        await _writeTestFile();
        let delSuccess = false;
        fs.unlink(`${testPath}/browserWrite.txt`, (err)=>{
            if(!err){
                delSuccess = true;
            }
        });
        await waitForTrue(()=>{return delSuccess;},1000);
        expect(delSuccess).to.be.true;
    });

    it(`Should phoenix ${testType} read dir`, async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${testPath}`, (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead.length).to.equal(1);
    });

    it(`Should phoenix ${testType} read dir with withFileTypes`, async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${testPath}`, {withFileTypes: true} , (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead[0].type).to.exist;
    });
    // todo: file stat integration tests
    // todo: unlink file integration tests
    // todo rename file tests
}

describe(`File: Browser virtual fs tests: filer paths`, function () {
    _setupTests(TEST_TYPE_FILER);
});

if(window.supportsFsAccessAPIs){
    describe(`File: Browser virtual fs tests: fs access mount point paths`, function () {
        if(window.__TAURI__){
            it('fs access tests are disabled in tauri', function () {});
            return;
        }
        _setupTests(TEST_TYPE_FS_ACCESS);
    });
}

describe(`File: Misc tests`, function () {
    it(`Should fs.BYTE_ARRAY_ENCODING constant`, async function () {
        expect(fs.BYTE_ARRAY_ENCODING).to.equal('byte_array');
    });

    it(`Should fs.isEncodingSupported work`, async function () {
        expect(fs.isEncodingSupported('utf8')).to.be.true;
        expect(fs.isEncodingSupported('utf32')).to.be.true;
        expect(fs.isEncodingSupported('utf16be')).to.be.true;
        // case insensitive
        expect(fs.isEncodingSupported('UTF16BE')).to.be.true;
        expect(fs.isEncodingSupported('LATIN1')).to.be.true;
        // not supported
        expect(fs.isEncodingSupported('oopshehe')).to.be.false;
    });

    const supportedEncodings = [
        "437","737","775","808","850","852","855","856","857","858","860","861","862","863","864","865","866","869",
        "874","922","932","936","949","950","1046","1124","1125","1129","1133","1161","1162","1163","1250","1251","1252",
        "1253","1254","1255","1256","1257","1258","10000","10006","10007","10029","10079","10081","20866","21866",
        "28591","28592","28593","28594","28595","28596","28597","28598","28599","28600","28601","28603","28604","28605",
        "28606","utf8","cesu8","unicode11utf8","ucs2","utf16le","binary","base64","hex","_utf32","utf32le","utf32be",
        "ucs4le","ucs4be","utf32","ucs4","utf16be","utf16","utf7","unicode11utf7","utf7imap","maccenteuro","ibm808",
        "cp808","mik","cp720","ascii8bit","usascii","ansix34","ansix341968","ansix341986","csascii","cp367","ibm367",
        "isoir6","iso646us","iso646irv","us","latin1","latin2","latin3","latin4","latin5","latin6","latin7","latin8",
        "latin9","latin10","csisolatin1","csisolatin2","csisolatin3","csisolatin4","csisolatincyrillic","csisolatinarabic",
        "csisolatingreek","csisolatinhebrew","csisolatin5","csisolatin6","l1","l2","l3","l4","l5","l6","l7","l8","l9",
        "l10","isoir14","isoir57","isoir100","isoir101","isoir109","isoir110","isoir144","isoir127","isoir126","isoir138",
        "isoir148","isoir157","isoir166","isoir179","isoir199","isoir203","isoir226","cp819","ibm819","cyrillic","arabic",
        "arabic8","ecma114","asmo708","greek","greek8","ecma118","elot928","hebrew","hebrew8","turkish","turkish8","thai",
        "thai8","celtic","celtic8","isoceltic","tis6200","tis62025291","tis62025330","cspc8codepage437","cspc775baltic",
        "cspc850multilingual","cspcp852","cspc862latinhebrew","cpgr","msee","mscyrl","msansi","msgreek","msturk","mshebr",
        "msarab","winbaltrim","cp20866","ibm878","cskoi8r","cp21866","ibm1168","strk10482002","tcvn5712","tcvn57121",
        "gb198880","cn","csiso14jisc6220ro","jisc62201969ro","jp","cshproman8","r8","roman8","xroman8","ibm1051","mac",
        "csmacintosh","windows874","win874","cp874","windows1250","win1250","cp1250","windows1251","win1251","cp1251",
        "windows1252","win1252","cp1252","windows1253","win1253","cp1253","windows1254","win1254","cp1254","windows1255",
        "win1255","cp1255","windows1256","win1256","cp1256","windows1257","win1257","cp1257","windows1258","win1258",
        "cp1258","iso88591","cp28591","iso88592","cp28592","iso88593","cp28593","iso88594","cp28594","iso88595","cp28595",
        "iso88596","cp28596","iso88597","cp28597","iso88598","cp28598","iso88599","cp28599","iso885910","cp28600",
        "iso885911","cp28601","iso885913","cp28603","iso885914","cp28604","iso885915","cp28605","iso885916","cp28606",
        "cp437","ibm437","csibm437","cp737","ibm737","csibm737","cp775","ibm775","csibm775","cp850","ibm850","csibm850",
        "cp852","ibm852","csibm852","cp855","ibm855","csibm855","cp856","ibm856","csibm856","cp857","ibm857","csibm857",
        "cp858","ibm858","csibm858","cp860","ibm860","csibm860","cp861","ibm861","csibm861","cp862","ibm862","csibm862",
        "cp863","ibm863","csibm863","cp864","ibm864","csibm864","cp865","ibm865","csibm865","cp866","ibm866","csibm866",
        "cp869","ibm869","csibm869","cp922","ibm922","csibm922","cp1046","ibm1046","csibm1046","cp1124","ibm1124",
        "csibm1124","cp1125","ibm1125","csibm1125","cp1129","ibm1129","csibm1129","cp1133","ibm1133","csibm1133",
        "cp1161","ibm1161","csibm1161","cp1162","ibm1162","csibm1162","cp1163","ibm1163","csibm1163","maccroatian",
        "maccyrillic","macgreek","maciceland","macroman","macromania","macthai","macturkish","macukraine","koi8r",
        "koi8u","koi8ru","koi8t","armscii8","rk1048","tcvn","georgianacademy","georgianps","pt154","viscii","iso646cn",
        "iso646jp","hproman8","macintosh","ascii","tis620","shiftjis","csshiftjis","mskanji","sjis","windows31j","ms31j",
        "xsjis","windows932","ms932","cp932","eucjp","gb2312","gb231280","gb23121980","csgb2312","csiso58gb231280",
        "euccn","windows936","ms936","cp936","gbk","xgbk","isoir58","gb18030","chinese","windows949","ms949","cp949",
        "cseuckr","csksc56011987","euckr","isoir149","korean","ksc56011987","ksc56011989","ksc5601","windows950",
        "ms950","cp950","big5","big5hkscs","cnbig5","csbig5","xxbig5","byte_array"];

    it(`Should fs.isEncodingSupported support some expected encodings`, async function () {
        const encodings = [
            "byte_array", "binary", "ascii", "utf-8", "utf-16",
            "utf-16le", "ucs-2", "windows-1252", "Latin1", "CP1252", "ISO-8859-1", "GB2312",
            "Big5", "Shift-JIS", "EUC-JP", "KOI8-R", "EUC-KR", "Windows-874", "MacRoman"
        ];
        for(let encoding of encodings){
            if(!fs.isEncodingSupported(encoding)){
                expect(encoding + " supported").to.be.true;
            }
        }

        for(let encoding of supportedEncodings){
            if(!fs.isEncodingSupported(encoding)){
                expect(encoding + " supported").to.be.true;
            }
        }
    });

    it(`Should have fs.SUPPORTED_ENCODINGS constant`, async function () {
        // the last we checked there were 414 encodings supported
        expect(fs.SUPPORTED_ENCODINGS.length).to.be.above(400);

        for(let encoding of supportedEncodings){
            if(!fs.SUPPORTED_ENCODINGS.includes(encoding)){
                expect(encoding + " not included in fs.SUPPORTED_ENCODINGS").to.be.true;
            }
        }
    });
});
