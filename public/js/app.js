/* eslint-disable no-undef */
angular.module('invertedIndexApp', [])
.controller('TestController', function ($scope) {
  $scope.inverted = new InvertedIndex();
  $scope.fileContent = [];
  $scope.fileName = ['~~ Select File ~~'];
  $scope.selectedFile = '~~ Select File ~~';
  $scope.getSelectedIndex = -1;
  $scope.getSelectedIndexToSearch = -1;
  $scope.selectedFileContent = null;
  $scope.invertedIndexTable = {};
  $scope.showIndexTable = false;
  $scope.showNoResultFound = false;
  $scope.showIndexTableQueried = false;
  $scope.invertedIndexTableQueried = [];
  $scope.titlesArrayForSearch = [];
  $scope.query = '';
  $scope.selectedFileToSearch = '~~ All ~~';
  $scope.fileNameToSearch = ['~~ All ~~'];
  $scope.displayFileNames = [];
  $scope.uploadCount = '';
  $scope.currentlyIndexed = '';

  $scope.getUploadedCount = () => $scope.fileName.length;
  $scope.selectFile = () => $scope.fileName;
  $scope.selectFileToSearch = () => $scope.fileNameToSearch;

  $scope.getSelectedFile = (fileName) => {
    $scope.selectedFile = fileName;
    $scope.getSelectedIndex = InvertedIndexUtility
    .getSelectedIndex($scope.fileName, $scope.selectedFile);
    $scope.selectedFileContent = $scope
    .fileContent[$scope.getSelectedIndex - 1];
  };

  $scope.getSelectedFileToSearch = (fileName) => {
    $scope.selectedFileToSearch = fileName;
    $scope.getSelectedIndexToSearch = InvertedIndexUtility
    .getSelectedIndex($scope.fileNameToSearch, $scope.selectedFileToSearch);
    $scope.selectedFileContent = $scope
    .fileContent[$scope.getSelectedIndexToSearch - 1];
  };

  $scope.createIndex = () => {
    if ($scope.currentlyIndexed !== $scope.selectedFile) {
      if ($scope.getSelectedIndex === 0 || $scope.getSelectedIndex === -1) {
        bootbox.alert({
          message: 'Please select a file!',
          backdrop: true,
          buttons: {
            ok: {
              className: 'btn-danger'
            }
          },
        });
        return;
      }

      if (Validations.isValidJson($scope.selectedFileContent)) {
        if (Validations.isValidContent($scope.selectedFileContent)) {
          if ($scope.inverted.getIndex($scope.selectedFile)) {
            $scope.invertedIndexTable = $scope.inverted
            .getIndex($scope.selectedFile);
          } else {
            $scope.selectedFileContent = JSON.parse($scope.selectedFileContent);
            $scope.inverted
            .createIndex($scope.selectedFile, $scope.selectedFileContent);
            $scope.displayFileNames.push($scope.selectedFile);
            $scope.invertedIndexTable = $scope.inverted
            .getIndex($scope.selectedFile);
          }

          if (InvertedIndexUtility
          .getSelectedIndex($scope.fileNameToSearch, $scope.selectedFile)
           === -1) {
            $scope.fileNameToSearch.push($scope.selectedFile);
          }
          $scope.currentlyIndexed = $scope.selectedFile;
          $scope.showIndexTable = true;
          $scope.showIndexTableQueried = false;
          $scope.showIndexTableQueriedAll = false;
        }
      }
    }
  };

  $scope.searchAllFiles = () => {
    const fileName = $scope.selectedFileToSearch.slice(3, 6);
    const searchResult = $scope.inverted.searchIndex($scope.query, fileName);
    $scope.invertedIndexTableQueried = searchResult.index;
    $scope.titlesArrayForSearch = searchResult.title;

    $scope.showIndexTable = false;
    $scope.showIndexTableQueried = false;
    $scope.showIndexTableQueriedAll = true;
  };

  $scope.searchIndex = () => {
    if (event.which === 13) {
      if ($scope.query.trim() === '') {
        bootbox.alert({
          message: 'Please enter a valid search term',
          backdrop: true,
          buttons: {
            ok: {
              className: 'btn-danger'
            }
          },
        });
      } else if ($scope.getSelectedIndexToSearch === 0 ||
         $scope.getSelectedIndexToSearch === -1) {
        $scope.searchAllFiles();
      } else {
        const fileName = $scope.selectedFileToSearch;
        const query = $scope.query;

        const searchResult = $scope.inverted.searchIndex(query, fileName);

        if (searchResult.index.length === 0) {
          $scope.showNoResultFound = true;
          $scope.titlesArrayForSearch = [];
        } else {
          $scope.showNoResultFound = false;
          $scope.invertedIndexTableQueried = searchResult.index;
          $scope.titlesArrayForSearch = searchResult.title;
        }

        $scope.showIndexTable = false;
        $scope.showIndexTableQueried = true;
        $scope.showIndexTableQueriedAll = false;
      }
    }
  };

  $scope.uploadFiles = () => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];

      if ($scope.fileName.indexOf(file.name) !== -1) {
        bootbox.alert({
          message: `The file name ${file.name} already exists`,
          backdrop: true,
          buttons: {
            ok: {
              className: 'btn-danger'
            }
          },
        });
      } else if (/\.(json)$/i.test(file.name)) {
        $scope.fileName.push(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
          $scope.fileContent.push(event.target.result);
        };
        reader.readAsText(file);
      } else {
        const msg = `${file.name} is not valid! Only JSON file allowed `;
        bootbox.alert({
          message: msg,
          backdrop: true,
          buttons: {
            ok: {
              className: 'btn-danger'
            }
          },
        });
      }
    }
  };

  document.getElementById('files')
  .addEventListener('change', $scope.uploadFiles);
});

