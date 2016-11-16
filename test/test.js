var versions = require('../');
var pkgVersions = require('npm-package-versions');
var semver = require('semver');
var assert = require('assert');

describe('versions', function () {
    it('should be an array', function () {
        assert.ok(Array.isArray(versions));
    });

    it('each should be a valid version', function () {
        versions.forEach(function (ver) {
            assert.ok(semver.valid(ver));
        });
    });

    it('never values are duplicated', function () {
        var map = {};
        versions.forEach(function (ver) {
            assert.ok(!(ver in map));
            map[ver] = 1;
        });
    });

    it('each should be a legal npm version', function (done) {
        this.timeout(5e3);

        pkgVersions('react-native', function (err, vers) {
            if (err) {
                return done(err);
            }
            versions.forEach(function (version) {
                assert.ok(semver.gte(version, '0.35.0'), version + ' >= 0.35.0 ');
                assert.ok(vers.some(function (ver) {
                    return ver === version;
                }), version + ' should be on npm');
            });
            done();
        });
    });
});