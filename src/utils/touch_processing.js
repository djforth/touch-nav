import _ from 'lodash/core';


function checkMove(st, end, sen){
  if (Math.abs(st - end) < sen) return false;

  return (st > end) ? 1 : 2;
}

function getXY(touch){
  return [touch.pageX, touch.pageY];
}

function getDir(dir1, dir2){
  return (result)=>{
    if (result === 1) return dir1;
    if (result === 2) return dir2;
    return '';
  };
}

export default function(touches, sensitivity=10){
  let start = _.first(touches);
  let [startX, startY] = getXY(start);

  let upDown    = getDir('up', 'down');
  let leftRight = getDir('right', 'left');
  let move;
  return {
    addMove(touches){
      move = _.first(touches);
    }

    , getDirection(){
      let [endX, endY] = getXY(move);
      let moveX = leftRight(checkMove(startX, endX, sensitivity));
      let moveY = upDown(checkMove(startY, endY, sensitivity));

      return {
          moveX: moveX
        , moveY: moveY
      };
    }
  };
};
