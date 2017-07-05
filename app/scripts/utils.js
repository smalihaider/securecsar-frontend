'use strict';

angular.module('sdeutils', [])
  .service('sdeutils', function($q) {

    this.getDescendantProp = function(obj, desc) {
      var arr = desc.split('.');
      while (arr.length) {
        if (obj === undefined) {
          return obj;
        }
        obj = obj[arr.shift()];
      }
      return obj;
    };

    // This method will pretty print file sizes (1.70 KB instead of 1742 bytes)
    this.humanReadableSize = function(fileSizeInBytes) {
      var i = -1;
      var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
      do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
      } while (fileSizeInBytes > 1024);
      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };

    // This method will remove any keys from the given object which have null, undefined or empty values
    // We require for filters to work properly on columns which have blank values
    this.clearFilter = function(filter) {
      if (filter) {
        angular.forEach(filter, function(value, key) {
          if (value === '' || value === undefined || typeof(value) === undefined || value === null) {
            delete filter[key];
          }
        });
      }
    };

    /**
     * Validates if a selected file is a @params separator separated file and has number Of columns equal to @params numberOfFields.
     *
     * It returns a promise object which on resolving returns true/false of whether the first 2 rows of files are properly formatted or not
     *
     */
    this.validateCSVFile = function(file, numberOfFields, separator) {
      // read file as text
      var reader = new FileReader();
      var data;
      var deferred = $q.defer();

      reader.onload = (function() {
        return function(e) {

          data = e.target.result;
          // validate if file is as required
          var fileData = data.csvToArray({
            'fSep': separator,
            'rSep': '\n',
            'quot': '"',
            'head': false,
            'trim': true
          });
          var valid = true;
          if (fileData instanceof Array && fileData.length > 0) {
            for (var recordNum = 0; recordNum < 2; recordNum++) {
              if (fileData[recordNum] instanceof Array && fileData[recordNum].length !== numberOfFields) {
                valid = false;
                break;
              }
            }
          } else {
            valid = false;
          }
          deferred.resolve(valid);
          return valid;
        };

      })(file);

      reader.readAsText(file);

      return deferred.promise;
    };

  });
