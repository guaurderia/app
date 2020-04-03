const Pass = require("../../models/Pass.model");
const Dog = require("../../models/Dog.model");
const Attendance = require("../../models/Attendance.model");
require("../../models/PassType.model");
const { withDbConnection } = require("../../config/withDbConnection");

const getTotalTime = attendance => attendance.endTime.getHours() - attendance.startTime.getHours();

const getPass = async (active, dog, type) => {
  const passes = await Pass.find({ dog: dog._id })
    .populate({ path: "passType", math: { type: type } })
    .populate("dog");
  const today = new Date();
  const activeMonth = passes.expires > today;
  const activeDay = passes.count;
  let result;
  if (passes.length > 0) {
    if (type === "month") {
      result = passes.filter(pass => (active ? activeMonth : !activeMonth));
    } else if (type === "day") {
      result = passes.filter(pass => (active ? activeDay : !activeDay));
    } else if (type === "all") {
      result = passes.filter(pass => (active ? activeMonth || activeDay : !activeMonth || !activeDay));
    }
  } else {
    result = `No pass found for ${dog.name}`;
  }
  return result;
};

const usePass = (pass, attendance) => {
  const monthPass = pass.passType.type === "month";
  const dayPass = pass.passType.type === "day";
  const totalTime = getTotalTime(attendance);
  const overtime = totalTime > pass.passType.hours;
  const expired = () => (monthPass ? pass.expires < new Date() : !pass.count);
  let valid;

  if (monthPass && !expired()) {
    if (!overtime) {
      console.log(`Bono ${pass.passType.name} es valido. Fecha expiración: ${pass.expires}`);
      valid = true;
    } else {
      console.log(`Bono ${pass.passType.name} ha sido superado. Has superado por ${totalTime - partTimeHours} el tiempo de tu bono.`);
      valid = false;
    }
  } else if (monthPass) console.log(`Bono ${pass.passType.name} ha caducado.`);

  if (dayPass && !expired()) {
    if (!overtime) {
      console.log(`Bono ${pass.passType.name} es válido. Días disponibles: ${pass.count}. Horas asistencia: ${totalTime}`);
      valid = true;
    } else {
      console.log(`Bono ${pass.passType.name} ha sido superado. Has superado por ${attendance - partTimeHours} el tiempo de tu bono.`);
      valid = false;
    }
  } else if (dayPass) console.log(`Bono ${pass.passType.name} ha sido usado.`);

  return valid;
};

const checkout = async attId => {
  const [attendance] = await Attendance.find({ _id: attId }).populate("dog");
  console.log("ATTENDANCE", attendance);
  const passes = await getPass(false, attendance.dog, "all");
  console.log("PASSES", passes);
  if (passes.length > 0) return passes.forEach(pass => usePass(pass, attendance));
  else return console.log(`${attendance.dog.name} no tiene ningún bono activo`);
};

withDbConnection(() => checkout("5e87249e941e9f31036ae0c6").then(e => console.log(e)));
