Ajouter un nouveau bundle
    -> /app -> config -> bundles.js
    -> /src -> new bundle

Exemple of tagging:
    $ git tag 0.2.1
    $ git tag
    $ git push origin 0.2.1
    
Npm publish
    $ npm publish

Socket.IO File Upload:
    https://www.npmjs.org/package/socketio-file-upload

Files with express:
    req.files
    fs.readFile(req.files.displayImage.path, function (err, data) {
        var newPath = __dirname + "/uploads/uploadedFileName";
        fs.writeFile(newPath, data, function (err) {
            res.redirect("back");
        });
    });