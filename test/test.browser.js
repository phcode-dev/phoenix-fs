/* global expect , Filer, fs*/

describe('Browser main tests', function () {
    it('Should load Filer in browser', function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
        expect(Filer.fs.name).to.equal('local');
    });

    it('Should load Phoenix fs in browser', function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal('phoenixFS');
    });
});
