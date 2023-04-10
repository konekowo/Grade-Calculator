window.addEventListener('DOMContentLoaded', (event) => {
  let socket = io();

  let numprepare = [];
  let numrehearse = [];
  let numperform = [];

  let schoolDistrict = getSchoolDistrict();
  socket.emit('schoolDist', schoolDistrict);
  console.log(schoolDistrict);

  document.getElementById('closeButtonEdit').addEventListener('click', () =>{
    let EditAssignmentBox = document.getElementById("EditAssignmentBox");
      EditAssignmentBox.style.opacity = "0%";
      EditAssignmentBox.style.width = "600px";
      EditAssignmentBox.style.height = "400px";
      setTimeout(() => {
        document.getElementById("DisableButtons").style.display = "none";
      }, 200);
  });

  socket.on('connect_error', () => {
    document.getElementById("connectServerMessageBox").style.display = "block";
    document.getElementById("startServerConnnect").innerText = "The server probably crashed. Reconnecting...";
    setTimeout(() => {
      document.getElementById("connectServerMessageBox").style.opacity = "100%";
      document.getElementById("connectServerMessageBox").style.width = "600px";
      document.getElementById("connectServerMessageBox").style.height = "300px";
    },1000);
    
  });
  
  setTimeout(() => {
    document.getElementById("connectServerMessageBox").style.opacity = "100%";
    document.getElementById("connectServerMessageBox").style.width = "600px";
    document.getElementById("connectServerMessageBox").style.height = "300px";
  }, 500);
  document.getElementById("submitStudentId").addEventListener("click", () => {
    submitStudentId();
  });



  socket.on('connectionOk', (msg) => {
    console.log("Message Recieved from server: " + msg);
    document.getElementById("connectServerMessageBox").style.opacity = "0%";
    document.getElementById("connectServerMessageBox").style.width = "500px";
    document.getElementById("connectServerMessageBox").style.height = "250px";
    setTimeout(() => {
      let loginMessagebox = document.getElementById("LogInMessageBox");
      document.getElementById("connectServerMessageBox").style.display = "none";
      loginMessagebox.style.opacity = "100%";
      loginMessagebox.style.width = "700px";
      loginMessagebox.style.height = "500px";
    }, 600);

  });

  function submitStudentId() {
    let studentIDInput = document.getElementById("RapidUsername");
    let studentID = studentIDInput.value;
    let PasswordInput = document.getElementById("RapidPassword");
    let Password = PasswordInput.value;
    if (studentID == "" || Password == ""){
      document.getElementById("StudentIDError").style.opacity = "100%";
    }
    else {
      document.getElementById("StudentIDError").style.opacity = "0%";
      console.log("sent " + studentID)
      socket.emit('studentID', studentID +"✅"+Password);
      document.getElementById("loginSpinnerContainer").style.opacity = "100%";
      document.getElementById("submitStudentId").disabled = true;
      document.getElementById("RapidUsername").disabled = true;
      document.getElementById("RapidPassword").disabled = true;
    }
    
  }

  function createCourse(courseNameText, q1, q2, q3, q4, inum) {
    let courseContainer = document.createElement("div");
    courseContainer.style.width = "998px";
    courseContainer.style.height = "50px";
    courseContainer.style.border = "solid 1px #28A489";

    

    console.log(q1);
    console.log(q2);
    console.log(q3);
    console.log(q4);

    let quarter1div = document.createElement("div");
    quarter1div.style.position = "absolute";
    quarter1div.style.left = "100%";
    quarter1div.style.transform = "translate(-198px)";
    quarter1div.style.borderLeft = "2px solid #28A489";
    quarter1div.style.height = "49px";
    courseContainer.appendChild(quarter1div);

    let quarter2div = document.createElement("div");
    quarter2div.style.position = "absolute";
    quarter2div.style.left = "100%";
    quarter2div.style.transform = "translate(-148px)";
    quarter2div.style.borderLeft = "2px solid #28A489";
    quarter2div.style.height = "49px";
    courseContainer.appendChild(quarter2div);

    let quarter3div = document.createElement("div");
    quarter3div.style.position = "absolute";
    quarter3div.style.left = "100%";
    quarter3div.style.transform = "translate(-98px)";
    quarter3div.style.borderLeft = "2px solid #28A489";
    quarter3div.style.height = "49px";
    courseContainer.appendChild(quarter3div);

    let quarter4div = document.createElement("div");
    quarter4div.style.position = "absolute";
    quarter4div.style.left = "100%";
    quarter4div.style.transform = "translate(-48px)";
    quarter4div.style.borderLeft = "2px solid #28A489";
    quarter4div.style.height = "49px";
    courseContainer.appendChild(quarter4div);



    let quarter1 = document.createElement("h5");
    quarter1.style.position = "absolute";
    quarter1.innerText = q1;
    quarter1.style.width = "70px";
    //quarter1.style.color = "#28A489";
    quarter1.style.left = "100%";
    quarter1.style.transform = "translate(-206px)";
    quarter1.style.textAlign = "center";
    quarter1.style.marginTop = "3px";
    quarter1.style.transition = "all 0.2s"
    quarter1.className = "quarterStyle";
    courseContainer.appendChild(quarter1);

    let quarter2 = document.createElement("h5");
    quarter2.style.position = "absolute";
    quarter2.innerText = q2;
    quarter2.style.width = "70px";
    //quarter2.style.color = "#28A489";
    quarter2.style.left = "100%";
    quarter2.style.transform = "translate(-156px)";
    quarter2.style.textAlign = "center";
    quarter2.style.marginTop = "3px";
    quarter2.style.transition = "all 0.2s"
    quarter2.className = "quarterStyle";
    courseContainer.appendChild(quarter2);

    let quarter3 = document.createElement("h5");
    quarter3.style.position = "absolute";
    quarter3.innerText = q3;
    quarter3.style.width = "70px";
    //quarter3.style.color = "#28A489";
    quarter3.style.left = "100%";
    quarter3.style.transform = "translate(-106px)";
    quarter3.style.textAlign = "center";
    quarter3.style.marginTop = "3px";
    quarter3.style.transition = "all 0.2s"
    quarter3.className = "quarterStyle";
    courseContainer.appendChild(quarter3);
    
    let quarter4 = document.createElement("h5");
    quarter4.style.position = "absolute";
    quarter4.innerText = q4;
    quarter4.style.width = "70px";
    //quarter4.style.color = "#28A489";
    quarter4.style.left = "100%";
    quarter4.style.transform = "translate(-58px)";
    quarter4.style.textAlign = "center";
    quarter4.style.marginTop = "3px";
    quarter4.style.transition = "all 0.2s"
    quarter4.className = "quarterStyle";
    courseContainer.appendChild(quarter4);

    quarter1.addEventListener("click", () => {
      console.log("Clicked "+ courseNameText + " q1");
      if (q1 == null || q1 == "[ i ]") {console.warn(q1);}
      else {
        console.log(q1);
        let studentIDInput = document.getElementById("RapidUsername");
        let studentID = studentIDInput.value;
        let PasswordInput = document.getElementById("RapidPassword");
        let Password = PasswordInput.value;
        socket.emit("courseChoose", "13"+"✂️"+ inum + "✂️"+studentID+"✂️"+Password);
        document.getElementById("home-table").style.filter = "blur(8px)";
        document.getElementById("fullScreenLoad").style.display = "block";
        document.getElementById("fullScreenLoad").style.opacity = "100%";
      }
      

    });

    quarter2.addEventListener("click", () => {
      console.log("Clicked "+ courseNameText + " q2");
      if (q2 == null || q2 == "[ i ]") {console.warn(q2);}
      else {
        console.log(q2);
        let studentIDInput = document.getElementById("RapidUsername");
        let studentID = studentIDInput.value;
        let PasswordInput = document.getElementById("RapidPassword");
        let Password = PasswordInput.value;
        socket.emit("courseChoose", "14"+"✂️"+ inum + "✂️"+studentID+"✂️"+Password);
        document.getElementById("home-table").style.filter = "blur(8px)";
        document.getElementById("fullScreenLoad").style.display = "block";
        document.getElementById("fullScreenLoad").style.opacity = "100%";
      }
      

    });
    quarter3.addEventListener("click", () => {
      console.log("Clicked "+ courseNameText + " q3");
      if (q3 == null || q3 == "[ i ]") {console.warn(q3);}
      else {
        console.log(q3);
        let studentIDInput = document.getElementById("RapidUsername");
        let studentID = studentIDInput.value;
        let PasswordInput = document.getElementById("RapidPassword");
        let Password = PasswordInput.value;
        socket.emit("courseChoose", "17"+"✂️"+ inum + "✂️"+studentID+"✂️"+Password);
        document.getElementById("home-table").style.filter = "blur(8px)";
        document.getElementById("fullScreenLoad").style.display = "block";
        document.getElementById("fullScreenLoad").style.opacity = "100%";
      }
      

    });
    quarter4.addEventListener("click", () => {
      console.log("Clicked "+ courseNameText + " q4");
      if (q4 == null || q4 == "[ i ]") {console.warn(q4);}
      else {
        console.log(q4);
        let studentIDInput = document.getElementById("RapidUsername");
        let studentID = studentIDInput.value;
        let PasswordInput = document.getElementById("RapidPassword");
        let Password = PasswordInput.value;
        socket.emit("courseChoose", "18"+"✂️"+ inum + "✂️"+studentID+"✂️"+Password);
        document.getElementById("home-table").style.filter = "blur(8px)";
        document.getElementById("fullScreenLoad").style.display = "block";
        document.getElementById("fullScreenLoad").style.opacity = "100%";
      }
      

    });
    
    
    


    let courseName = document.createElement("h5");
    courseName.innerText = courseNameText;
    courseName.style.color = "#28A489";
    courseName.style.marginTop = "3px";
    courseName.style.marginLeft = "10px";
    courseContainer.appendChild(courseName)
    document.getElementById("home-table").appendChild(courseContainer);

  }

  function createAssignment(assignName, assignWeight, assignGrade){
    let assignmentDiv = document.createElement("div");
    assignmentDiv.style.width = "70vw";
    assignmentDiv.style.height = "50px";
    assignmentDiv.style.border = "solid 1px #28A489";
    document.getElementById("course-table").appendChild(assignmentDiv);

    let assignmentWeight = document.createElement("h5");
    assignmentWeight.innerText = assignWeight;
    assignmentWeight.style.color = "#28A489";
    assignmentWeight.style.marginLeft = "10px";
    assignmentWeight.style.marginTop = "2px";
    assignmentWeight.style.width = "140px";
    assignmentDiv.appendChild(assignmentWeight);

    let assignmentTypesDivider = document.createElement("div");
    assignmentTypesDivider.className = "vl7";
    assignmentDiv.appendChild(assignmentTypesDivider);

    let assignmentTypesDivider2 = document.createElement("div");
    assignmentTypesDivider2.className = "vl8";
    assignmentDiv.appendChild(assignmentTypesDivider2);

    let assignementName = document.createElement("h5");
    assignementName.innerText = assignName;
    assignementName.style.color = "#28A489";
    assignementName.style.marginLeft = "160px";
    assignementName.style.marginTop = "-40px";
    assignementName.style.width = "500px";

    assignmentDiv.appendChild(assignementName);

    let assignementGrade = document.createElement("h5");
    assignementGrade.innerText = assignGrade;
    assignementGrade.style.color = "#28A489";
    assignementGrade.style.marginLeft = "70vw";
    assignementGrade.style.transform = "translate(-200px)";
    assignementGrade.style.marginTop = "-40px";
    assignementGrade.style.width = "500px";

    assignmentDiv.appendChild(assignementGrade);

    let assignmentEditButton = document.createElement("button");
    assignmentEditButton.style.position = "relative";
    assignmentEditButton.style.zIndex = "100";
    if (assignGrade != ""){
      assignmentEditButton.style.top = "-46px";
    }
    else{
      assignmentEditButton.style.top = "-6px";
    }
    
    assignmentEditButton.style.left = "100%";
    assignmentEditButton.style.transform = "translateX(-120%)";
    assignmentEditButton.innerText = "Edit";
    assignmentEditButton.className = "cyan";
    assignmentEditButton.disabled = "true";
    assignmentDiv.appendChild(assignmentEditButton);

    assignmentEditButton.addEventListener("mouseover", () => {
      assignmentEditButton.style.transform = "translate(-115%, -5px)";
    });
    assignmentEditButton.addEventListener("mouseout", () => {
      assignmentEditButton.style.transform = "translateX(-120%)";
    });

    assignmentEditButton.addEventListener("mousedown", () => {
      assignmentEditButton.style.transform = "translate(-118%, -2px)";
    });
    assignmentEditButton.addEventListener("mouseup", () => {
      assignmentEditButton.style.transform = "translateX(-120%)";
    });


    assignmentEditButton.addEventListener("click",() => {
      let EditAssignmentBox = document.getElementById("EditAssignmentBox");
      document.getElementById("DisableButtons").style.display = "block";
      setTimeout(() => {
        EditAssignmentBox.style.opacity = "100%";
        EditAssignmentBox.style.width = "700px";
        EditAssignmentBox.style.height = "500px";
      }, 200);

      document.getElementById("AssignmentNameTextBox").placeholder = assignName;
      if (assignGrade != ""){
        document.getElementById("AssignmentGradeTextBox").placeholder = assignGrade;
      }
      else{
        document.getElementById("AssignmentGradeTextBox").placeholder = "100";
      }
      let weightIndex;

      if (assignWeight == "Prepare"){
        weightIndex = "0";
      }
      else if (assignWeight == "Rehearse"){
        weightIndex = "1";
      }
      else {
        weightIndex = "2";
      }

      document.getElementById("AssignmentWeightDropdown").selectedIndex = weightIndex;
      
      function saveAssignmentEdits(){
        document.getElementById("doneEditAssignment").removeEventListener("click", saveAssignmentEdits, true);
        let editedName = document.getElementById("AssignmentNameTextBox").value;
        let editedGrade = document.getElementById("AssignmentGradeTextBox").value;
        let editedWeight = document.getElementById("AssignmentWeightDropdown").selectedIndex;
        assignementName.innerText = editedName;
        assignementGrade.innerText = editedGrade;
        let weightName;
        if (editedWeight == "0"){
          weightName = "Prepare";
        }
        else if (editedWeight == "1"){
          weightName = "Rehearse";
        }
        else {
          weightName = "Perform";
        }

        assignmentWeight.innerText = weightName;

        if (weightName != assignWeight){
          if (assignWeight == "Prepare"){
            for (let i = 0; i < numprepare.length; i++) {
              if (numprepare[i] == assignGrade) {
                numprepare[i] = "";
                break;
              }
            }

          }
          else if (assignWeight == "Rehearse"){
            for (let i = 0; i < numrehearse.length; i++) {
              if (numrehearse[i] == assignGrade) {
                numrehearse[i] = "";
                break;
              }
            }
          }
          else {
            for (let i = 0; i < numperform.length; i++) {
              if (numperform[i] == assignGrade) {
                numperform[i] = "";
                break;
              }
            }
          }

          if (weightName == "Prepare"){
            numprepare.push(editedGrade);
          }
          else if (weightName == "Rehearse"){
            numrehearse.push(editedGrade);
          }
          else {
            numperform.push(editedGrade);
          }

          calculateGrades(numprepare, numrehearse, numperform, "FinalGradeDisplay");
          
        }

      }


      document.getElementById("doneEditAssignment").addEventListener("click", saveAssignmentEdits());
      

      
      
    });
  }
  
  
  
  socket.on('ps-page-home', (msg) => {
    //psPageHome = msg;
    console.log(msg);

    


    let loginMessagebox = document.getElementById("LogInMessageBox");
      
      loginMessagebox.style.opacity = "0%";
      loginMessagebox.style.width = "600px";
      loginMessagebox.style.height = "400px";
      document.getElementById("loginName").innerText = "Logged In As " + msg[0];
      document.getElementById("loginName").style.opacity = "100%";
      document.getElementById("home-table").style.opacity = "100%";

    setTimeout(() => {
      
      document.getElementById("LogInMessageBox").style.display = "none";
      for (let i = 1; i < msg.length; i+=6) {
        console.log(i);
        createCourse(msg[i], msg[i+1], msg[i+2], msg[i+3], msg[i+4], msg[i+5]);
      }
    }, 600);
  });

  
  socket.on('ps-page-course', (msg) => {
    console.log(msg);
    let courseNameFromServer = msg[0];
    let teacherNameFromServer = msg[1];

    let NumPrepare = [];
    let NumRehearse = [];
    let NumPerform = [];

    let NamePrepare = [];
    let NameRehearse = [];
    let NamePerform = [];
    for (let i = 2; i < msg.length; i++){
      if (msg[i].startsWith("Prepare")){
        NumPrepare.push(msg[i+2]);
        NamePrepare.push(msg[i+1]);
        createAssignment(msg[i+1],"Prepare",msg[i+2]);
      }
      if (msg[i].startsWith("Rehearse")){
        NumRehearse.push(msg[i+2]);
        NameRehearse.push(msg[i+1]);
        createAssignment(msg[i+1],"Rehearse",msg[i+2]);
      }
      if (msg[i].startsWith("Perform")){
        NumPerform.push(msg[i+2]);
        NamePerform.push(msg[i+1]);
        createAssignment(msg[i+1],"Perform",msg[i+2]);
      }
    }
    
    document.getElementById("fullScreenLoad").style.opacity = "0%";
    document.getElementById("home-table").style.filter = "blur(0px)";
    setTimeout(() => {
      document.getElementById("fullScreenLoad").style.display = "none";
    }, 600);
    setTimeout(() => {
      document.getElementById("home-table").style.transition = "opacity 0.2s"
      document.getElementById("home-table").style.opacity = "0%";
    }, 500);
    setTimeout(() => {
      document.getElementById("home-table").style.display = "none";
      document.getElementById("course-table").style.display = "block";
      document.getElementById("course-table").style.opacity = "100%";
      document.getElementById("CourseNameDisplay").innerText = "Course: "+courseNameFromServer;
      document.getElementById("TeacherNameDisplay").innerText = "Teacher: "+teacherNameFromServer;
      document.getElementById("CourseNameDisplay").style.display = "block";
      document.getElementById("TeacherNameDisplay").style.display = "block";
      document.getElementById("FinalGradeDisplay").style.opacity = "100%";
      document.getElementById("FinalGradeDisplay").style.display = "block";
      document.getElementById("CourseNameDisplay").style.opacity = "100%";
      document.getElementById("TeacherNameDisplay").style.opacity = "100%";
      document.getElementById("makeNewAssignmentButton").style.display = "block";
      numprepare = NumPrepare;
      numrehearse = NumRehearse;
      numperform = NumPerform;
      calculateGrades(numprepare, numrehearse, numperform, "FinalGradeDisplay");
      document.getElementById("makeNewAssignmentButton").addEventListener('click', () => {
        let NewAssignmentBox = document.getElementById("NewAssignmentBox");
        document.getElementById("DisableButtons2").style.display = "block";
        setTimeout(() => {
          NewAssignmentBox.style.opacity = "100%";
          NewAssignmentBox.style.width = "700px";
          NewAssignmentBox.style.height = "500px";
        }, 200);
      });

      document.getElementById("doneNewAssignment").addEventListener('click', () => {
        inputNewGrade();
        let NewAssignmentBox = document.getElementById("NewAssignmentBox");
        NewAssignmentBox.style.opacity = "0%";
        NewAssignmentBox.style.width = "600px";
        NewAssignmentBox.style.height = "400px";
        setTimeout(() => {
          document.getElementById("DisableButtons2").style.display = "none";
        }, 200);
      });

      document.getElementById("closeButtonNewAssignment").addEventListener('click', () => {
        let NewAssignmentBox = document.getElementById("NewAssignmentBox");
        NewAssignmentBox.style.opacity = "0%";
        NewAssignmentBox.style.width = "600px";
        NewAssignmentBox.style.height = "400px";
        setTimeout(() => {
          document.getElementById("DisableButtons2").style.display = "none";
          document.getElementById("NewAssignmentNameTextBox").value = "";
          document.getElementById("NewAssignmentGradeTextBox").value = "";
          document.getElementById("NewAssignmentWeightDropdown").selectedIndex = "0";
        }, 200);
      });

    }, 1000);
  });


  function inputNewGrade(){
        let newName = document.getElementById("NewAssignmentNameTextBox").value;
        let newGrade = document.getElementById("NewAssignmentGradeTextBox").value;
        let newWeight = document.getElementById("NewAssignmentWeightDropdown").selectedIndex;
        let weightName;
        if (newWeight == "0"){
          weightName = "Prepare";
        }
        else if (newWeight == "1"){
          weightName = "Rehearse";
        }
        else {
          weightName = "Perform";
        }

        if (newName == ""){
          newName = "New Assignment";
        }
        if (newGrade == ""){
          newGrade = "100";
        }


        switch (weightName){
          case "Prepare":
            numprepare.push(newGrade);
            break;
          case "Rehearse":
            numrehearse.push(newGrade);
            break;
          case "Perform":
            numperform.push(newGrade);
            break;
        }

        createAssignment(newName, weightName, newGrade);



        calculateGrades(numprepare, numrehearse, numperform, "FinalGradeDisplay");
        document.getElementById("NewAssignmentNameTextBox").value = "";
        document.getElementById("NewAssignmentGradeTextBox").value = "";
        document.getElementById("NewAssignmentWeightDropdown").selectedIndex = "0";

  }


  socket.on('login-error', (msg) => {
    document.getElementById("StudentIDError").style.opacity = "100%";
    document.getElementById("submitStudentId").disabled = false;
    document.getElementById("RapidPassword").disabled = false;
    document.getElementById("RapidUsername").disabled = false;
    document.getElementById("loginSpinnerContainer").style.opacity = "0%";
  });
});

