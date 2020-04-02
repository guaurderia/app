const Pass = require("../../models/Pass.model");
const Dog = require("../../models/Dog.model");
const Attendance = require("../../models/Attendance.model");
const PassType = require("../../models/PassType.model");
const { withDbConnection } = require("../../config/withDbConnection");

var getPass = async (dog, active) => {
  const passes = await Pass.find({ dog: dog._id }).populate("passType");
  const today = new Date();
  const monthPasses = passes.filter(pass => (active ? pass.expires > today : pass.expires < today));
  const dayPasses = passes.filter(pass => (active ? pass.count > 0 : pass.count === 0));
  return { monthPasses: monthPasses, dayPasses: dayPasses };
};

const usePass = (pass, attendance) => {
  const monthPass = pass.passType.type === "month";
  const dayPass = pass.passType.type === "day";
  const expired = new Date() > pass.expires;
  const partTimeHours = 6;
  const isPartTime = pass.passType.hours <= partTimeHours;
  const totalTime = monthPass ? attendance.endTime.getHours() - attendance.startTime.getHours() : null;
  let valid;

  console.log("USE PASS", monthPass, dayPass, expired, isPartTime);

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
        console.log(`Bono ${pass.passType.name} es válido. Días disponibles: ${pass.count}. Horas asistencia: ${attendance}`);
        valid = true;
      } else {
        console.log(`Bono ${pass.passType.name} ha sido superado. Has superado por ${attendance - partTimeHours} el tiempo de tu bono.`);
        valid = false;
      }
    } else {
      console.log(`Bono de 10 días válido. Días disponibles: ${pass.count}. Horas asistencia: ${attendance}`);
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
  console.log("DOG", dog);
  const passes = await getPass(...dog, true);
  console.log("PASSES", passes);
  const attendances = await Attendance.find({ dog: dog })
    .limit(-1)
    .skip()
    .populate("dog");
  console.log("ATTENDANCE", attendances);
  usePass(passes.monthPasses[0], ...attendances);
  console.log("PASSES", passes, "ATTENDANCE", attendances);
});
