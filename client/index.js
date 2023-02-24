window.addEventListener('DOMContentLoaded', (event) => {
  let socket = io();
  
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
      document.getElementById("CourseNameDisplay").innerText = "Course: "+msg[0];
      document.getElementById("TeacherNameDisplay").innerText = "Teacher: "+msg[1];
      document.getElementById("CourseNameDisplay").style.display = "block";
      document.getElementById("TeacherNameDisplay").style.display = "block";
      document.getElementById("CourseNameDisplay").style.opacity = "100%";
      document.getElementById("TeacherNameDisplay").style.opacity = "100%";
    }, 1000);
  });




  socket.on('login-error', (msg) => {
    document.getElementById("StudentIDError").style.opacity = "100%";
    document.getElementById("submitStudentId").disabled = false;
    document.getElementById("RapidPassword").disabled = false;
    document.getElementById("RapidUsername").disabled = false;
    document.getElementById("loginSpinnerContainer").style.opacity = "0%";
  });
});

