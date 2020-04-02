const Pass = require("../../models/Pass.model");
const Dog = require("../../models/Dog.model");
const Attendance = require("../../models/Attendance.model");
require("../../models/PassType.model");
const { withDbConnection } = require("../../config/withDbConnection");

var getPass = async (dog, type, active) => {
  const passes = await Pass.find({ dog: dog._id })
    .populate({ path: "passType", math: { type: type } })
    .populate("dog");
  const today = new Date();
  let result;
  if (passes.length > 0) {
    if (type === "month") {
      result = passes.filter(pass => (active ? pass.expires > today : pass.expires < today));
    } else if (type === "day") {
      result = passes.filter(pass => (active ? pass.count > 0 : pass.count === 0));
    }
  } else {
    result = `No pass found for ${dog.name}`;
  }
  return result;
};

const usePass = (pass, attendance) => {
  console.log("USE PASS", pass, attendance);
  const monthPass = pass.passType.type === "month";
  const dayPass = pass.passType.type === "day";
  const expired = new Date() > pass.expires;
  const partTimeHours = 6;
  const isPartTime = pass.passType.hours <= partTimeHours;
  const totalTime = attendance.endTime.getHours() - attendance.startTime.getHours();
  let valid;

  if (monthPass && !expired) {
    if (isPartTime) {
      if (totalTime <= partTimeHours) {
        console.log(`Bono ${pass.passType.name} es valido. Fecha expiración: ${pass.expires}`);
        return true;
      } else {
        console.log(`Bono ${pass.passType.name} ha sido superado. Has superado por ${totalTime - partTimeHours} el tiempo de tu bono.`);
        return false;
      }
    } else {
      console.log(`Bono ${pass.passType.name} es valido. Fecha expiración: ${pass.expires}`);
      return true;
    }
  } else if (monthPass) {
    //TODO: Borrado de bono de mes vencido
    // Podiamos quedarnos con el para tener un historico de bonos comprados
    console.log(`Bono ${pass.passType.name} está vencido. Caducó el día ${pass.expires}`);
    valid = false;
  }

  if (dayPass && pass.count) {
    if (isPartTime) {
      if (totalTime <= partTimeHours) {
        console.log(`Bono ${pass.passType.name} es válido. Días disponibles: ${pass.count}. Horas asistencia: ${totalTime}`);
        valid = true;
      } else {
        console.log(`Bono ${pass.passType.name} ha sido superado. Has superado por ${attendance - partTimeHours} el tiempo de tu bono.`);
        valid = false;
      }
    } else {
      console.log(`Bono de 10 días válido. Días disponibles: ${pass.count}. Horas asistencia: ${totalTime}`);
      valid = true;
    }
  } else if (dayPass) {
    console.log(`Bono ${passId.name} está gastado.`);
    valid = false;
  }
  return valid;
};
withDbConnection(async () => {
  const dog = await Dog.aggregate([{ $sample: { size: 1 } }]); // random dog
  const passes = await getPass(...dog, "day", true);
  console.log(passes);
  const attendances = await Attendance.find({ dog: dog })
    .limit(-1)
    .skip()
    .populate("dog");
  if (passes.length > 0) usePass(...passes, ...attendances);
  else console.log("No pass available");
});
