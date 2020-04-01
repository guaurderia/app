
var total_time = function(date1, date2) {
  return new Date(date2).getHours() - new Date(date1).getHours();  
}

var isValidPass = function(passId, diffTime) {
if (passId.name.includes("mes")) { // BONO MENSUAL
  if (new Date() <= passId.expires) { //mes dentro de fecha
    if (passId.name.includes("MJ")) { // MES MJ
      if (diffTime <= 6) {
        console.log(`Bono mes MJ. Válido. Fecha expiración: ${passId.expires}`)
        return true
      } else {
          console.log(`Horario de media jornada superado! Horas asistencia: ${diffTime}`)
          return false
      }
    } else { // MES JC
      console.log(`Bono mes: válido. Fecha expiración: ${passId.expires}`)
      return true
    }
  } else { // Mes fuera de fecha (BORRAR)
    //TODO: Borrado de bono de mes vencido
    console.log(`Bono de mes vencido. Caducó el día ${JSON.stringify(passId).expires}`)
    passId = {}
    return false
  }
} else if (passId.name.includes("10 dias")) { //BONO DE 10 días      
  if (passId.name.includes("MJ")) { // 10 MJ
    if (diffTime <= 6) {
      console.log(`Bono de 10 días MJ válido. Días disponibles: ${passId.count}. Horas asistencia: ${diffTime}`)
      return true
    } else {
      console.log(`Bono de 10 días MJ NO válido. Días disponibles: ${passId.count}. Horas asistencia: ${diffTime}`)
      return false
    }
  } else {
    console.log(`Bono de 10 días válido. Días disponibles: ${passId.count}. Horas asistencia: ${diffTime}`)
    return true
  }
} else {
  console.log(`Bono ${passId.name} no reconocido.`)
  return false
}
}

var getAssistancePass = function(passes) {
var finalPass
if (passes.some(e => e.name.match(/mes/))) {
  finalPass = passes.find(pass => {return pass.name.match(/mes/)})
} else {
  if (passes.some(e => e.name === '10 dias MJ')) {
    finalPass = passes.find(pass => {return pass.name.match(/10 dias MJ/)})
  } else {
    if (passes.some(e => e.name === '10 dias')) {
      finalPass = passes.find(pass => {return pass.name.match(/10 dias/)})
    } else {
      console.log(`Opps!! No se ha encontrado un bono válido!!`)
    }
  }
}
return finalPass;
}

function isPassValid(element, diffTime) {
  if(isValidPass(element, diffTime)) {
      return element;
   }
}

var calculatePass = function(dogId, startTime, endTime) { //TODO: contemplar borrado de bono cuando caduque
  if (endTime != '') { //Calculando Pass
      var diffTime = total_time(startTime, endTime)
      var dogPass = dogId  //From dogId: {name: "10 dias", price: 120, count: 4}
      var validPasses = []
      if (dogPass.length == 0) {
        console.log(`El perro no tiene actualmente ningún bono contratado. La visita de ${diffTime} horas de hoy se registrará como día suelto.`)
        //TODO: include return
        //return json(`El perro ${dogId.name} no tiene actualmente ningun bono contratado. La visita de ${diffTime} horas de hoy se registrará como día suelto.`);              
      } else {
        console.log(`Bonos del perro: ${JSON.stringify(dogPass)}`)
        var validPasses = dogPass.map(item => isPassValid(item, diffTime)).filter(n => n);
        console.log(`Valid passes: ${JSON.stringify(validPasses.filter(n => n))}`)
        var passToUse = getAssistancePass(validPasses)
        console.log(`SE CONSUMIRÁ EL BONO DE TIPO ${passToUse.name}`);
      }
    } else { //Registrando entrada
      //TODO: Registrar entrada
      console.log(`Registrando entrada...`)
  }
}


var PassInfo1 = {name: "10 dias", price: 120, count: 4}
var PassInfo2 = {name: "10 dias MJ", price: 90, count: 7}
var PassInfo3 = {name: "mes", price: 330, expires: new Date("2020-04-30T08:00:00.000+00:00")}
var PassInfo4 = {name: "10 dias MJ", price: 90, count: 2}

var dogId1 = [PassInfo1, PassInfo2]
var dogId2 = [PassInfo3, PassInfo4]
var dogId3 = []

console.log(calculatePass(dogId1, '2020-04-03T08:00:00.000+00:00', '2020-04-03T20:00:00.000+00:00')); //Consume 10 dias
console.log(calculatePass(dogId1, '2020-04-03T16:00:00.000+00:00', '2020-04-03T20:00:00.000+00:00')); //Consume 10 dias MJ
console.log(calculatePass(dogId2, '2020-04-03T08:00:00.000+00:00', '2020-04-03T20:00:00.000+00:00')); //Consume mes
console.log(calculatePass(dogId3, '2020-04-03T08:00:00.000+00:00', '2020-04-03T20:00:00.000+00:00')); //No tiene bono
