// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = {}; //fixme

  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = 0;

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

  var board = new Board(makeEmptyMatrix(n));

  var countNQ = function(board, row){
    if(row < n){
      for(var col = 0; col < n; col++){
        copy = _.extend({}, board);
        copy.attributes[row][col]=1;

        if (!board.hasAnyRooksConflicts() && (row === n-1)){
          solutionCount++;
        }

        if (!copy.hasAnyRooksConflicts()){
          countNQ(copy,row+1);
        }
        copy.attributes[row][col]=0;
      }
    }
    };
  countNQ(board,0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

//&& !board.hasSomeEmptyRows()

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = 0; //fixme

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

  var board = new Board(makeEmptyMatrix(n));

  var countNQ = function(board, row){
    if(row < n){
      for(var col = 0; col < n; col++){
        copy = _.extend({}, board);
        copy.attributes[row][col]=1;

        if (!board.hasAnyQueensConflicts() && (row === n-1)){
          solutionCount++;
        }

        if (!copy.hasAnyQueensConflicts()){
          countNQ(copy,row+1);
        }
        copy.attributes[row][col]=0;
      }
    }
    };
  countNQ(board,0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
