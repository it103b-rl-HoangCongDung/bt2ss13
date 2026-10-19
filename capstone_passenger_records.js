const passengers = [
  {
    pnrCode: 'VN123', 
    passengerName: 'NGUYEN VAN A', 
    idNumber: '001098123456', 
    flightNumber: 'VN2023', 
    seatNumber: null, 
    isCheckedIn: false
  },
  {
    pnrCode: 'VN456', 
    passengerName: 'TRAN THI B', 
    idNumber: 'B1234567', 
    flightNumber: 'VN2023', 
    seatNumber: '12A', 
    isCheckedIn: true
  }
];

function validateIdNumber(idNumber) {
  const cccdRegex = /^\d{12}$/;
  const passportRegex = /^[A-Z]\d{7,8}$/;
  return cccdRegex.test(idNumber) || passportRegex.test(idNumber);
}

function isSeatTaken(flightNumber, seatNumber) {
  return passengers.some(p => p.flightNumber === flightNumber && p.seatNumber === seatNumber && p.isCheckedIn);
}

function checkInPassenger(pnrCode, seatNumber) {
  const passenger = passengers.find(p => p.pnrCode === pnrCode);
  
  if (!passenger) {
    console.log('Lỗi: Không tìm thấy hồ sơ hành khách với mã PNR này.');
    return false;
  }

  if (passenger.isCheckedIn) {
    console.log('Lỗi: Hành khách này đã thực hiện check-in trước đó.');
    return false;
  }

  if (!validateIdNumber(passenger.idNumber)) {
    console.log('Lỗi: Giấy tờ tùy thân không hợp lệ (CCCD phải 12 số, Hộ chiếu 1 chữ cái + 7-8 số).');
    return false;
  }

  if (isSeatTaken(passenger.flightNumber, seatNumber)) {
    console.log('Lỗi: Số ghế ' + seatNumber + ' trên chuyến bay ' + passenger.flightNumber + ' đã có người ngồi.');
    return false;
  }

  passenger.seatNumber = seatNumber;
  passenger.isCheckedIn = true;

  printBoardingPass(passenger);
  return true;
}

function printBoardingPass(passenger) {
  console.log('==================================================');
  console.log('|              BOARDING PASS - VIETNAM AIRLINES   |');
  console.log('==================================================');
  console.log('| Passenger Name: ' + passenger.passengerName.padEnd(31) + '|');
  console.log('| PNR Code: ' + passenger.pnrCode.padEnd(37) + '|');
  console.log('| Flight Number: ' + passenger.flightNumber.padEnd(34) + '|');
  console.log('| Seat Number: ' + passenger.seatNumber.padEnd(36) + '|');
  console.log('| ID Number: ' + passenger.idNumber.padEnd(38) + '|');
  console.log('| Status: CHECKED-IN                              |');
  console.log('==================================================');
  console.log('| Barcode: ||| |::|| |||:: |||| |:: ||| |::||     |');
  console.log('==================================================\n');
}

console.log('--- THỰC THI KIỂM THỬ HỆ THỐNG DÒNG LỆNH ---');
checkInPassenger('VN123', '12B');
checkInPassenger('VN123', '12C');
