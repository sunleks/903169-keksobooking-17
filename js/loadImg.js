'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMG_WIDTH = 70;
  var IMG_HEIGHT = 70;

  var fileChooserField = document.querySelector('.ad-form__field input[type=file]');
  var previewField = document.querySelector('.ad-form-header__preview img');

  var fileChooserUpload = document.querySelector('.ad-form__upload input[type=file]');
  var img = document.createElement('img');
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;
  var previewFieldUpload = document.querySelector('.ad-form__photo').appendChild(img);

  var loadImg = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  loadImg(fileChooserField, previewField);
  loadImg(fileChooserUpload, previewFieldUpload);
})();
