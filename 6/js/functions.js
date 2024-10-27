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

const isWorkMeeting = function(startWorking, endWorking, startMeeting, meetingTime){
  const timeToMinutes = function(time){
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMeetingInMinutes = timeToMinutes(startMeeting);
  const startWorkingDayInMinutes = timeToMinutes(startWorking);
  const endWorkingDayInMinutes = timeToMinutes(endWorking);
  const endMeetingInMinutes = startMeetingInMinutes + meetingTime;

  return startMeetingInMinutes >= startWorkingDayInMinutes && endMeetingInMinutes <= endWorkingDayInMinutes;
};


isWorkMeeting('14:00', '17:30', '08:0', 90);
