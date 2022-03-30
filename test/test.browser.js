/* global expect , Filer*/

describe('Browser main tests', function () {
    it('Should load Filer in browser', function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
    });
});
