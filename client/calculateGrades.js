function calculateGrades(NumPrepare, NumRehearse, NumPerform, GradeDisplayID){
    console.log(NumPrepare,NumRehearse,NumPerform);
    
    let intPrepare = [];
    let intRehearse = [];
    let intPerform = [];

    for (let i=0; i<NumPrepare.length; i++) {
        if (NumPrepare[i] != ""){
            intPrepare.push(parseInt(NumPrepare[i]));
        }
    }

    for (let i=0; i<NumRehearse.length; i++) {
        if (NumRehearse[i] != ""){
            intRehearse.push(parseInt(NumRehearse[i]));
        }
    }

    for (let i=0; i<NumPerform.length; i++) {
        if (NumPerform[i] != ""){
            intPerform.push(parseInt(NumPerform[i]));
        }
    }

    let addedPrepare = 0;
    let addedRehearse = 0;
    let addedPerform = 0;

    

    for (let i = 0; i < intPrepare.length; i++){
        addedPrepare += intPrepare[i];
    }

    for (let i = 0; i < intRehearse.length; i++){
        addedRehearse += intRehearse[i];
    }

    for (let i = 0; i < intPerform.length; i++){
        addedPerform += intPerform[i];
    }

    if (addedPerform == 0){
        addedPerform = 100;
    }

    if (addedRehearse == 0){
        addedRehearse = 100;
    }

    if (addedPrepare == 0){
        addedPrepare = 100;
    }

    console.log(addedPrepare)
    console.log(addedRehearse)
    console.log(addedPerform)

    console.log(intPrepare)
    console.log(intRehearse)
    console.log(intPerform)

    console.log(NumPrepare)
    console.log(NumRehearse)
    console.log(NumPerform)

    let meanPrepare = addedPrepare/intPrepare.length;
    let meanRehearse = addedRehearse/intRehearse.length;
    let meanPeform = addedPerform/intPerform.length;

    if (meanPrepare == Infinity){
        meanPrepare = 100;
    }
    if (meanRehearse == Infinity){
        meanRehearse = 100;
    }
    if (meanPeform == Infinity){
        meanPeform = 100;
    }

    let finalGrade = ((meanPrepare * 20)/100)+((meanRehearse * 30)/100)+((meanPeform * 50)/100);

    console.log("Prepare Grade:",meanPrepare+"%");
    console.log("Rehearse Grade:",meanRehearse+"%");
    console.log("Perform Grade:",meanPeform+"%");
    console.log("Final Grade:",finalGrade+"%");

    document.getElementById(GradeDisplayID).innerText = "Grade: " + Math.round(finalGrade) + "%";

}