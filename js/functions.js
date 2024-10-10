const lineLength = function(line, linelength){
  return line.length <= linelength;
};

lineLength('проверяемая строка', 25);
lineLength('sds',3);

const palindrom = function(line){
  const normalLine = (line.replaceAll(' ','')).toLowerCase();
  let clearLine = '';
  for(let i = normalLine.length - 1;i >= 0;i--){
    clearLine += normalLine[i];
  }
  return normalLine === clearLine;
};

palindrom('топот');

