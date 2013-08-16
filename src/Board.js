(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex]  ;
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts() 
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      //sum the row, if > 1, there return true because there is conflict.
      var sum = 0;
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        sum = sum + this.get(rowIndex)[i];
      }
      if (sum > 1 ){
        return true;
      } else{
        return false;
      }
    },

    hasAnyRowConflicts: function(){
      //reduce(hasRowConflictAt, this.get )
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },

    hasSomeEmptyRows: function(){
      for(var i = 0; i < this.attributes.n; i++) {
        if(_(this.get(i)).reduce(function(sum, num){ return sum + num; }, 0) === 0){
          return true;
        }
      }
      return false;
    },

    hasColConflictAt: function(colIndex){
      var sum = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        sum = sum + this.attributes[i][colIndex];
      }
      return sum > 1 ? true : false;
    },

    hasAnyColConflicts: function(){
      for (var i = 0; i < this.attributes.n; i++) {
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var sum = 0;
      var col = majorDiagonalColumnIndexAtFirstRow;
      for (var row = 0; row < this.attributes.n; row++) {
        if(this._isInBounds(row, col)){
          sum += this.attributes[row][col];
        }
        col++;
      }
      return sum > 1 ? true : false;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var leftIndex = -(this.attributes.n - 2);
      for (var cols = leftIndex; cols < this.attributes.n - 2; cols++) {
        if(this.hasMajorDiagonalConflictAt(cols)){
          return true;
        }
      }
      return false;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var sum = 0;
      var col = minorDiagonalColumnIndexAtFirstRow;
      for (var row = 0; row < this.attributes.n; row++) {
        if(this._isInBounds(row,col)){
          sum += this.attributes[row][col];
        }
        col--;
      }
      return sum > 1 ? true : false;
    },

    hasAnyMinorDiagonalConflicts: function(){
      for (var minorIndex = 1; minorIndex < this.attributes.n+1; minorIndex++) {
        if(this.hasMinorDiagonalConflictAt(minorIndex)){
          return true;
        }
      }
      return false;
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
