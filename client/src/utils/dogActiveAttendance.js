const dogActiveAttendance = (dog, activeAttendance) => {
  if (activeAttendance.length) {
    const [foundActiveAttendance] = activeAttendance.filter((att) => {
      return att.dog._id === dog._id;
    });
    return foundActiveAttendance
  }
}

export default dogActiveAttendance
