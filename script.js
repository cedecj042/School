let Teacher = function (idNum, fName, lName, pre, suf) {
    return {
        id: idNum,
        firstName: fName,
        lastName: lName,
        prefix: pre,
        suffix: suf,
        toString: function () {
            return this.prefix + " " + this.firstName + " " + this.lastName + " " + this.suffix;
        },

    }
}

let Student = function (idNum, fName, lName, prog, yr) {
    return {
        id: idNum,
        firstName: fName,
        lastName: lName,
        program: prog,
        year: yr,
        toString: function () {
            return this.id + " " + this.firstName + " " + this.lastName + " " + this.program + " - " + this.year;
        }
    }
}

let Schedule = function (sCode, sDays, sTime) {
    return {
        code: sCode,
        days: sDays,
        time: sTime,
        schedules: [],
        addSchedule: function (schedule) {
            return this.schedules.push(schedule);
        },

        searchSchedule: function (sCode) {
            let mysched = null;

            this.schedules.forEach(sched => {
                if (sCode == sched.code) {
                    mysched = sched;

                }
            });
            return mysched;
        }, toString: function () {
            return "Schedule " + this.code + ":  " + this.days + " " + this.time;
        }
    }
}
let Course = function (cCode, cName, cDesc) {
    return {
        code: cCode,
        name: cName,
        description: cDesc,
        teachers: [],
        students: [],
        schedule: null,
        addTeacher: function (Teacher) {
            this.teachers.forEach(teacher => {
                if (teacher.idNum === Teacher.idNum) {
                    return;
                }
            })
            this.teachers.push(Teacher);
        },
        addStudents: function (Student) {
            this.students.forEach(student => {
                if (student.idNum === Student.idNum) {
                    return;
                }
            });
            this.students.push(Student);
        },
        addSchedule: function (Schedule) {
            this.schedule = Schedule;
        },
        getTeachers: function () {
            return this.teachers;
        },
        getStudents: function () {
            return this.students;
        },
        getSchedule: function () {
            return this.schedule;
        },
        getCourseCode: function () {
            return this.code;
        },
        getCourseName: function () {
            return this.name;
        },
        getCourseDescription() {
            return this.description;
        }

    }
}



let schedule = new Schedule('1', 'MWF', '8:30 AM - 9:30 AM');
schedule.addSchedule(schedule);
schedule.addSchedule(new Schedule('2', 'TTH', '8:30 AM - 10:00 AM'));
schedule.addSchedule(new Schedule('3', 'S', '8:30 AM - 10:30 AM'));

let student1 = new Student(1, 'Gian', 'Gerodias', 'BS in Computer Science', 3);
let student2 = new Student(2, 'Zharlaw', 'Calimpon', 'BS in Computer Science', 3);
let student3 = new Student(3, 'Shaundyl', 'Alipio', 'BS in Computer Science', 3);

let programs = ['BS in Computer Science', 'BS in Information Technology', 'BS in Business Administration',
    'BS in Accountancy', 'BS in Economics', 'BS in Finance', 'BA in Education', 'BA in Psychology', 'BA in Philosphy']
let years = ['1', '2', '3', '4', '5'];

let teacher1 = new Teacher(1, 'Ramon', 'Reyes', 'Mr.', 'BH');
let teacher2 = new Teacher(2, 'Christian', 'Gumanit', 'Mr.', 'PK');
let teacher3 = new Teacher(3, 'Hugh', 'Vergara', 'Dr.', 'BM');

let appsdev = new Course('11063','AppsDev','App development is the process of creating software applications that run on mobile devices, such as smartphones and tablets.');
appsdev.addTeacher(teacher2);
appsdev.addStudents(student1);
appsdev.addStudents(student2);
appsdev.addStudents(student3);
appsdev.addSchedule(schedule.schedules[0]);

let lists = [{ name: 'Students', array: [] }, { name: 'Teachers', array: [] }, { name: 'Courses', array: [appsdev] }, { name: 'Schedules', array: schedule.schedules }];
let days = [
    {
        name: 'MWF',
        time: ['8:30 AM - 9:30 AM', '9:30 AM - 10:30 AM', '10:30 AM - 11:30 AM',
            '11:30 AM - 12:30 PM', '12:30 PM - 1:30 PM', '1:30 PM - 2:30 PM', '2:30 PM - 3:30 PM', '3:30 PM - 4:30 PM']
    },
    {
        name: 'TTH',
        time: ['8:30 AM - 10:00 AM', '10:30 AM - 12:00 PM', '12:00 PM - 1:30 PM',
            '1:30 PM - 3:00 PM', '3:00 PM - 4:30 PM']
    },
    {
        name: 'S',
        time: ['8:30 AM - 10:30 AM', '10:30 AM - 12:30 PM', '12:30 PM - 2:30 PM', '2:30 AM - 4:30 PM']
    }
];
lists[0].array.push(student1, student2, student3);
lists[1].array.push(teacher1, teacher2, teacher3);

function showDashboard() {
    let div = document.getElementById("content");
    div.innerHTML = "";
    let container = document.createElement("div");
    container.className = "content-container";
    let dashboard = document.createElement("div");
    dashboard.className = "content-dashboard";
    div.appendChild(container);
    container.appendChild(dashboard);

    let h2 = document.createElement("h2");
    h2.innerText = "Dashboard";
    dashboard.appendChild(h2);


    let ul = document.createElement("ul");
    ul.className = "data";
    dashboard.appendChild(ul);
    lists.forEach(list => {
        let li = document.createElement("li");
        let h5 = document.createElement('h5');
        h5.innerText = "Total " + list.name;
        let h3 = document.createElement("h3");
        h3.innerText = list.array.length;
        li.appendChild(h5);
        li.appendChild(h3);
        ul.appendChild(li);
    })
}

function addButtonListen() {
    let buttons = document.querySelectorAll('.li-menu button');
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            let button = event.target;
            if (event.target.tagName === "I") {
                button = button.parentElement;
            }
            buttons.forEach(btn => {
                btn.className = "inactive";
            })
            if (button.id === "dashboard") {
                button.className = "active";
                showDashboard();
            } else if (button.id === "students") {
                button.className = "active";
                showStudents();
            } else if (button.id === "teachers") {
                button.className = "active";
                showTeachers();
            } else if (button.id === "schedules") {
                button.className = "active";
                showSchedule();

            }else if (button.id === "courses"){
                button.className = "active";
                showCourses();
            }
        });
    });
}


addButtonListen();
// showStudents();
showDashboard();



function showAll(ul, array) {
    array.forEach(object => {
        let li = document.createElement("li");
        let h4 = document.createElement('h4');
        h4.innerText = object.toString();
        li.appendChild(h4);
        ul.appendChild(li);
    });
}
function showAllSchedule(ul, array) {
    array.forEach(object => {
        let li = document.createElement("li");
        let h4 = document.createElement('h4');
        h4.innerText = object.toString();
        li.appendChild(h4);
        ul.appendChild(li);
    });
}
function searchArray(name, array) {
    let ul = document.getElementById("data");
    ul.innerHTML = "";
    array.forEach(object => {
        if (object.id === name.toLowerCase() || object.firstName.toLowerCase() === name.toLowerCase()
            || object.lastName.toLowerCase() === name.toLowerCase() || object.program.toLowerCase() === name.toLowerCase()) {
            let li = document.createElement("li");
            let h4 = document.createElement('h4');
            h4.innerText = object.toString();
            li.appendChild(h4);
            ul.appendChild(li);
        }
    })
}

const addStudent = (event) => {
    let div = document.getElementById("add-component");
    div.setAttribute("class", "add-component show");
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container");
    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addcontainer.appendChild(addDiv);
    let h3 = document.createElement("h3");
    h3.innerText = "Add Student";
    addDiv.appendChild(h3);
    let i = document.createElement("i");
    i.className = "icon-close";
    addDiv.appendChild(i);
    i.addEventListener("click", () => {
        div.classList = "add-component hide";
        div.innerHTML = "";
    })

    let adding = document.createElement("div");
    adding.className = "adding";
    let idLabel = document.createElement("label");
    idLabel.setAttribute("for", "student-id");
    idLabel.innerText = "Student ID";

    let idInput = document.createElement("input");
    idInput.placeholder = "Enter Student ID";
    adding.appendChild(idLabel);
    adding.appendChild(idInput);
    addDiv.appendChild(adding);

    let adding1 = document.createElement("div");
    adding1.className = "adding";
    let fNameLabel = document.createElement("label");
    fNameLabel.setAttribute("for", "firstName");
    fNameLabel.innerText = "First Name";
    let fNameInput = document.createElement("input");
    fNameInput.placeholder = "Enter First Name";
    adding1.appendChild(fNameLabel);
    adding1.appendChild(fNameInput);
    addDiv.appendChild(adding1);

    let adding2 = document.createElement("div");
    adding2.className = "adding";
    let lNameLabel = document.createElement("label");
    lNameLabel.setAttribute("for", "lastName");
    lNameLabel.innerText = "Last Name";
    let lNameInput = document.createElement("input");
    lNameInput.placeholder = "Enter Last Name";
    adding2.appendChild(lNameLabel);
    adding2.appendChild(lNameInput);
    addDiv.appendChild(adding2);

    let adding3 = document.createElement("div");
    adding3.className = "adding";
    let progLabel = document.createElement("label");
    progLabel.setAttribute("for", "program");
    progLabel.innerText = "Program";
    let progSelect = document.createElement("select");
    progSelect.className = "normal";

    programs.forEach(program => {
        let option = document.createElement("option");
        option.value = program;
        option.innerText = program;
        progSelect.appendChild(option);
    })

    adding3.appendChild(progLabel);
    adding3.appendChild(progSelect);
    addDiv.appendChild(adding3);

    let adding4 = document.createElement("div");
    adding4.className = "adding";
    let yearLabel = document.createElement("label");
    yearLabel.setAttribute("for", "year");
    yearLabel.innerText = "Year";
    let yearSelect = document.createElement("select");
    yearSelect.className = "normal";
    years.forEach(year => {
        let option = document.createElement("option");
        option.value = year;
        option.innerText = year;
        yearSelect.appendChild(option);
    })

    adding4.appendChild(yearLabel);
    adding4.appendChild(yearSelect);
    addDiv.appendChild(adding4);


    div.addEventListener('click', (event) => {
        if (event.target.id === "add-component") {
            div.setAttribute("class", "hide");
            addcontainer.remove();
        }
    });
    idInput.addEventListener("focus", () => {
        idInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    fNameInput.addEventListener("focus", () => {
        fNameInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    lNameInput.addEventListener("focus", () => {
        lNameInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    let btn = document.createElement("button");
    btn.id = "addStudent";
    btn.innerText = "Add Student";
    btn.addEventListener('click', (event) => {
        if (idInput.value !== "" && fNameInput.value !== "" && lNameInput.value !== "") {
            let student = new Student(idInput.value, fNameInput.value, lNameInput.value, progSelect.value, yearSelect.value);
            lists[0].array.push(student);
            showStudents();
            div.setAttribute("class", "hide");
            addcontainer.remove();
        } else {
            if (idInput.value === "") {
                idInput.style.borderColor = "red";
            } if (fNameInput.value === "") {
                fNameInput.style.borderColor = "red";
            } if (lNameInput.value === "") {
                lNameInput.style.borderColor = "red";
            }
        }

    });
    addDiv.appendChild(btn);
}
function showStudents() {
    let div = document.getElementById("content");
    div.innerHTML = "";
    let container = document.createElement("div");
    container.className = "content-container";
    let dashboard = document.createElement("div");
    dashboard.className = "content-dashboard";
    div.appendChild(container);
    container.appendChild(dashboard);

    let header = document.createElement("div");
    header.className = "header";
    let h2 = document.createElement("h2");
    h2.innerText = "Students"
    let headerBtn = document.createElement("button");
    headerBtn.innerText = "Add Student";
    header.appendChild(h2);
    header.appendChild(headerBtn);
    dashboard.appendChild(header);
    headerBtn.addEventListener("click", (event) => {
        addStudent(event);
    });

    let search = document.createElement("div");
    search.className = "search";
    let input = document.createElement("input");
    input.placeholder = "Search Student";
    input.type = "text";
    let searchBtn = document.createElement("button");
    searchBtn.innerText = "Search";


    search.appendChild(input);
    search.appendChild(searchBtn);
    dashboard.appendChild(search);

    let ul = document.createElement("ul");
    ul.id = "data";
    dashboard.appendChild(ul);

    input.addEventListener("change", (event) => {
        searchBtn.addEventListener("click", () => {
            searchArray(event.target.value, lists[0].array);
        });
        if (event.target.value === "") {
            ul.innerHTML = "";
            showAll(ul, lists[0].array);
        }
    });
    showAll(ul, lists[0].array);
}




function showTeachers() {
    let div = document.getElementById("content");
    div.innerHTML = "";
    let container = document.createElement("div");
    container.className = "content-container";
    let dashboard = document.createElement("div");
    dashboard.className = "content-dashboard";
    div.appendChild(container);
    container.appendChild(dashboard);

    let header = document.createElement("div");
    header.className = "header";
    let h2 = document.createElement("h2");
    h2.innerText = "Teachers"
    let headerBtn = document.createElement("button");
    headerBtn.innerText = "Add Teacher";
    header.appendChild(h2);
    header.appendChild(headerBtn);
    dashboard.appendChild(header);
    headerBtn.addEventListener("click", (event) => {
        addTeacher(event);
    });

    let search = document.createElement("div");
    search.className = "search";
    let input = document.createElement("input");
    input.placeholder = "Search Teacher";
    input.type = "text";
    let searchBtn = document.createElement("button");
    searchBtn.innerText = "Search";


    search.appendChild(input);
    search.appendChild(searchBtn);
    dashboard.appendChild(search);

    let ul = document.createElement("ul");
    ul.id = "data";
    dashboard.appendChild(ul);

    input.addEventListener("change", (event) => {
        searchBtn.addEventListener("click", () => {
            searchArray(event.target.value, lists[1].array);

        });
        if (event.target.value === "") {
            ul.innerHTML = "";
            showAll(ul, lists[1].array);
        }
    });
    showAll(ul, lists[1].array);
}

const addTeacher = (event) => {
    let div = document.getElementById("add-component");
    div.setAttribute("class", "add-component show");
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container");
    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addcontainer.appendChild(addDiv);
    let h3 = document.createElement("h3");
    h3.innerText = "Add Teacher";
    addDiv.appendChild(h3);
    let i = document.createElement("i");
    i.className = "icon-close";
    addDiv.appendChild(i);
    i.addEventListener("click", () => {
        div.classList = "add-component hide";
        div.innerHTML = "";
    })
    let adding = document.createElement("div");
    adding.className = "adding";
    let idLabel = document.createElement("label");
    idLabel.setAttribute("for", "student-id");
    idLabel.innerText = "Teacher ID";

    let idInput = document.createElement("input");
    idInput.placeholder = "Enter Teacher ID";
    adding.appendChild(idLabel);
    adding.appendChild(idInput);

    let adding1 = document.createElement("div");
    adding1.className = "adding";
    let fNameLabel = document.createElement("label");
    fNameLabel.setAttribute("for", "firstName");
    fNameLabel.innerText = "First Name";
    let fNameInput = document.createElement("input");
    fNameInput.placeholder = "Enter First Name";
    adding1.appendChild(fNameLabel);
    adding1.appendChild(fNameInput);

    let adding2 = document.createElement("div");
    adding2.className = "adding";
    let lNameLabel = document.createElement("label");
    lNameLabel.setAttribute("for", "lastName");
    lNameLabel.innerText = "Last Name";
    let lNameInput = document.createElement("input");
    lNameInput.placeholder = "Enter Last Name";
    adding2.appendChild(lNameLabel);
    adding2.appendChild(lNameInput);


    let adding3 = document.createElement("div");
    adding3.className = "adding";
    let sufLabel = document.createElement("label");
    sufLabel.setAttribute("for", "suffix");
    sufLabel.innerText = "Suffix";
    let sufInput = document.createElement("input");
    sufInput.placeholder = "Enter Suffix (Optional)";
    adding3.appendChild(sufLabel);
    adding3.appendChild(sufInput);


    let adding4 = document.createElement("div");
    adding4.className = "adding";
    let preLabel = document.createElement("label");
    preLabel.setAttribute("for", "prefix");
    preLabel.innerText = "Prefix";
    let preInput = document.createElement("input");
    preInput.placeholder = "Enter Prefix";
    adding4.appendChild(preLabel);
    adding4.appendChild(preInput);

    addDiv.appendChild(adding);
    addDiv.appendChild(adding4);
    addDiv.appendChild(adding1);
    addDiv.appendChild(adding2);
    addDiv.appendChild(adding3);

    div.addEventListener('click', (event) => {
        if (event.target.id === "add-component") {
            div.setAttribute("class", "hide");
            addcontainer.remove();
        }
    });
    idInput.addEventListener("focus", () => {
        idInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    fNameInput.addEventListener("focus", () => {
        fNameInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    lNameInput.addEventListener("focus", () => {
        lNameInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    preInput.addEventListener("focus", () => {
        preInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    let btn = document.createElement("button");
    btn.id = "addStudent";
    btn.innerText = "Add Student";
    btn.addEventListener('click', (event) => {
        if (idInput.value !== "" && fNameInput.value !== "" && lNameInput.value !== "") {
            let teacher = new Teacher(idInput.value, fNameInput.value, lNameInput.value, preInput.value, sufInput.value);
            lists[1].array.push(teacher);
            showTeachers();
            div.setAttribute("class", "hide");
            addcontainer.remove();
        } else {
            if (idInput.value === "") {
                idInput.style.borderColor = "red";
            } if (fNameInput.value === "") {
                fNameInput.style.borderColor = "red";
            } if (lNameInput.value === "") {
                lNameInput.style.borderColor = "red";
            }
            if (preInput.value === "") {
                preInput.style.borderColor = "red";
            }
        }

    });

    addDiv.appendChild(btn);
}

function showSchedule() {
    let div = document.getElementById("content");
    div.innerHTML = "";
    let container = document.createElement("div");
    container.className = "content-container";
    let dashboard = document.createElement("div");
    dashboard.className = "content-dashboard";
    div.appendChild(container);
    container.appendChild(dashboard);

    let header = document.createElement("div");
    header.className = "header";
    let h2 = document.createElement("h2");
    h2.innerText = "Schedule"
    let headerBtn = document.createElement("button");
    headerBtn.innerText = "Add Schedule";
    header.appendChild(h2);
    header.appendChild(headerBtn);
    dashboard.appendChild(header);
    headerBtn.addEventListener("click", (event) => {
        addSchedule(event);
    });

    let search = document.createElement("div");
    search.className = "search";
    let input = document.createElement("input");
    input.placeholder = "Search Schedule";
    input.type = "text";
    let searchBtn = document.createElement("button");
    searchBtn.innerText = "Search";


    search.appendChild(input);
    search.appendChild(searchBtn);
    dashboard.appendChild(search);

    let ul = document.createElement("ul");
    ul.id = "data";
    dashboard.appendChild(ul);

    input.addEventListener("change", (event) => {
        searchBtn.addEventListener("click", () => {
            if (event.target.value !== "") {
                ul.innerHTML = "";
                let sched = schedule.searchSchedule(event.target.value);
                if(sched !== null){
                    let li = document.createElement("li");
                    let h4 = document.createElement('h4');
                    h4.innerText = sched.toString();
                    li.appendChild(h4);
                    ul.appendChild(li);
                }

                days.forEach(day =>{
                    if(day.name === event.target.value){
                        schedule.schedules.forEach(sched =>{
                            if(sched.days === event.target.value){
                                let li = document.createElement("li");
                                let h4 = document.createElement('h4');
                                h4.innerText = sched.toString();
                                li.appendChild(h4);
                                ul.appendChild(li);
                            }
                        })
                    }
                })
            }


        });
        if (event.target.value === "") {
            ul.innerHTML = "";
            showAllSchedule(ul, schedule.schedules);
        }
    });
    showAllSchedule(ul, schedule.schedules);
}

const addSchedule = (event) => {
    let div = document.getElementById("add-component");
    div.setAttribute("class", "add-component show");
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container");
    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addcontainer.appendChild(addDiv);
    let h3 = document.createElement("h3");
    h3.innerText = "Add Schedule";
    addDiv.appendChild(h3);
    let i = document.createElement("i");
    i.className = "icon-close";
    addDiv.appendChild(i);
    i.addEventListener("click", () => {
        div.classList = "add-component hide";
        div.innerHTML = "";
    })

    let adding = document.createElement("div");
    adding.className = "adding";
    let idLabel = document.createElement("label");
    idLabel.setAttribute("for", "schule-id");
    idLabel.innerText = "Schedule ID";

    let idInput = document.createElement("input");
    idInput.placeholder = "Enter Schedule ID";
    adding.appendChild(idLabel);
    adding.appendChild(idInput);
    addDiv.appendChild(adding);

    let adding1 = document.createElement("div");
    adding1.className = "adding";
    let dayLabel = document.createElement("label");
    dayLabel.setAttribute("for", "days");
    dayLabel.innerText = "Days";
    let daySelect = document.createElement("select");
    daySelect.className = "normal";

    days.forEach(day => {
        let option = document.createElement("option");
        option.value = day.name;
        option.innerText = day.name;
        daySelect.appendChild(option);
    });

    adding1.appendChild(dayLabel);
    adding1.appendChild(daySelect);
    addDiv.appendChild(adding1);

    let adding2 = document.createElement("div");
    adding2.className = "adding";
    let timeLabel = document.createElement("label");
    timeLabel.setAttribute("for", "days");
    timeLabel.innerText = "Days";
    let timeSelect = document.createElement("select");
    timeSelect.className = "normal";

    days.forEach(day => {
        if (daySelect.value === day.name) {
            day.time.forEach(dTime => {
                let option = document.createElement("option");
                option.value = dTime;
                option.innerText = dTime;
                timeSelect.appendChild(option);
            })
        }
    });
    daySelect.addEventListener("change", () => {
        timeSelect.innerHTML = "";
        days.forEach(day => {
            if (daySelect.value === day.name) {
                day.time.forEach(dTime => {
                    let option = document.createElement("option");
                    option.value = dTime;
                    option.innerText = dTime;
                    timeSelect.appendChild(option);
                })
            }
        });
    })

    adding2.appendChild(timeLabel);
    adding2.appendChild(timeSelect);
    addDiv.appendChild(adding2);


    div.addEventListener('click', (event) => {
        if (event.target.id === "add-component") {
            div.setAttribute("class", "hide");
            addcontainer.remove();
        }
    });
    idInput.addEventListener("focus", () => {
        idInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    daySelect.addEventListener("focus", () => {
        daySelect.style.border = " 1px solid rgba(255, 255, 255, 0.125)";

    })
    let btn = document.createElement("button");
    btn.id = "addStudent";
    btn.innerText = "Add Schedule";
    btn.addEventListener('click', (event) => {
        if (idInput.value !== "") {
            if (schedule.searchSchedule(idInput.value) === null) {
                let flag = 0;
                schedule.schedules.forEach(sched => {
                    console.log(timeSelect.value);
                    console.log(sched.time);
                    console.log(daySelect.value);
                    console.log(sched.day);
                    if (daySelect.value === sched.days && timeSelect.value === sched.time) {
                        flag = 1;
                        return;
                    }
                });
                if (flag === 0) {
                    schedule.addSchedule(new Schedule(idInput.value, daySelect.value, timeSelect.value));
                    showSchedule();
                    div.setAttribute("class", "hide");
                    addcontainer.remove();
                } else {
                    timeSelect.style.borderColor = "red";
                }
            } else {
                idInput.style.borderColor = "red";

            }
        } else {
            idInput.style.borderColor = "red";
        }
    });
    addDiv.appendChild(btn);
}


function showCourses() {
    let div = document.getElementById("content");
    div.innerHTML = "";
    let container = document.createElement("div");
    container.className = "content-container";
    let dashboard = document.createElement("div");
    dashboard.className = "content-dashboard";
    div.appendChild(container);
    container.appendChild(dashboard);

    let header = document.createElement("div");
    header.className = "header";
    let h2 = document.createElement("h2");
    h2.innerText = "Courses"
    let headerBtn = document.createElement("button");
    headerBtn.innerText = "Add Course";
    header.appendChild(h2);
    header.appendChild(headerBtn);
    dashboard.appendChild(header);
    headerBtn.addEventListener("click", (event) => {
        addCourses(event);
    });

    let search = document.createElement("div");
    search.className = "search";
    let input = document.createElement("input");
    input.placeholder = "Search Course";
    input.type = "text";
    let searchBtn = document.createElement("button");
    searchBtn.innerText = "Search";


    search.appendChild(input);
    search.appendChild(searchBtn);
    dashboard.appendChild(search);

    let ul = document.createElement("ul");
    ul.id = "data";
    dashboard.appendChild(ul);

    input.addEventListener("change", (event) => {
        searchBtn.addEventListener("click", () => {
            searchCourses(event.target.value, lists[2].array);
        });
        if (event.target.value === "") {
            ul.innerHTML = "";
            showAllCourses(ul, lists[2].array);
        }
    });
    showAllCourses(ul, lists[2].array);
}

function showAllCourses(ul, array) {
    array.forEach(object => {
        let li = document.createElement("li");
        let div = document.createElement("div");
        div.className = "course-container"; 
        div.style.cursor = "pointer";
        div.addEventListener("click",()=>{
            viewCourse(object);
        })

        let h4 = document.createElement('h4');
        h4.innerText = object.getCourseCode();
        let h41 = document.createElement('h4');
        h41.innerText = object.getCourseName();
        let h42 = document.createElement('h4');
        h42.innerText = object.getCourseDescription();
        div.appendChild(h4);
        div.appendChild(h41);
        div.appendChild(h42);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

function searchCourses(name, array) {
    let ul = document.getElementById("data");
    ul.innerHTML = "";
    array.forEach(object => {
        if (object.code == name || object.name.toLowerCase() === name.toLowerCase()) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.className = "course-container"; 
            let h4 = document.createElement('h4');
            h4.innerText = object.getCourseCode();
            let h41 = document.createElement('h4');
            h41.innerText = object.getCourseName();
            let h42 = document.createElement('h4');
            h42.innerText = object.getCourseDescription();
            div.appendChild(h4);
            div.appendChild(h41);
            div.appendChild(h42);
            li.appendChild(div);
            ul.appendChild(li);
        }
    })
}

const addCourses = (event) => {
    let div = document.getElementById("add-component");
    div.setAttribute("class", "add-component show");
    div.style.overflowY= "scroll";
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container extra");

    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addDiv.style.gap="20px";
    addcontainer.appendChild(addDiv);
    let h3 = document.createElement("h3");
    h3.innerText = "Add Course";
    addDiv.appendChild(h3);
    let i = document.createElement("i");
    i.className = "icon-close";
    addDiv.appendChild(i);
    i.addEventListener("click", () => {
        div.classList = "add-component hide";
        div.innerHTML = "";
    })

    let adding = document.createElement("div");
    adding.className = "adding";
    let codeLabel = document.createElement("label");
    codeLabel.setAttribute("for", "course-code");
    codeLabel.innerText = "Course Code";

    let codeInput = document.createElement("input");
    codeInput.placeholder = "Enter Course Code";
    adding.appendChild(codeLabel);
    adding.appendChild(codeInput);
    addDiv.appendChild(adding);

    let adding1 = document.createElement("div");
    adding1.className = "adding";
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "course-name");
    nameLabel.innerText = "Course Name";
    let nameInput = document.createElement("input");
    nameInput.placeholder = "Enter Course Name";
    adding1.appendChild(nameLabel);
    adding1.appendChild(nameInput);
    addDiv.appendChild(adding1);

    let adding2 = document.createElement("div");
    adding2.className = "adding";
    let descLabel = document.createElement("label");
    descLabel.setAttribute("for", "course-description");
    descLabel.innerText = "Course Description";
    descLabel.style.alignSelf = "start";
    let textarea = document.createElement("textarea");
    textarea.rows = 5;
    textarea.cols = 30;
    textarea.placeholder = "Enter Course Description";
    adding2.appendChild(descLabel);
    adding2.appendChild(textarea);
    addDiv.appendChild(adding2);


    
    let adding5 = document.createElement("div");
    adding5.className = "adding";
    let scheduleLabel = document.createElement("label");
    scheduleLabel.setAttribute("for", "schedule");
    scheduleLabel.innerText = "Schedule";
    let scheduleSelect = document.createElement("select");
    scheduleSelect.className = "normal";

    lists[3].array.forEach(schedule => {
        let option = document.createElement("option");
        option.value = schedule.toString();
        option.innerText = schedule.toString();
        scheduleSelect.appendChild(option);
    })

    adding5.appendChild(scheduleLabel);
    adding5.appendChild(scheduleSelect);
    addDiv.appendChild(adding5);


    let adding3 = document.createElement("div");
    adding3.className = "adding-select";
    let teacherLabel = document.createElement("label");
    teacherLabel.setAttribute("for", "teachers");
    teacherLabel.innerText = "Teachers";
    let teacherSelect = document.createElement("select");
    teacherSelect.multiple = true;
    teacherSelect.className= "select-teachers";
    lists[1].array.forEach(teacher => {
        let option = document.createElement("option");
        option.value = teacher.toString();
        option.innerText = teacher.toString();
        teacherSelect.appendChild(option);
    })
    let teachersUl = document.createElement("ul");
    teachersUl.className = "teachers-ul";
    teacherSelect.addEventListener("click",(event)=>{
        console.log(event.target.value);
        let flag = 0;
        for(let i =0;i<teachersUl.children.length;i++){
            if(teachersUl.children[i].children[0].innerText === event.target.value){
                flag = 1;
                return;
            }
        }
        if(flag === 1){
            return;
        }else {
            let li = document.createElement("li");
            let h4 = document.createElement ("h4");
            h4.innerText = event.target.value;
            let i = document.createElement("i");
            i.className = "select-close";
            i.addEventListener("click",(event)=>{
                event.target.parentElement.remove();
            });
            li.appendChild(h4);
            li.appendChild(i);
            teachersUl.appendChild(li);
        }
    });

    adding3.appendChild(teacherLabel);
    adding3.appendChild(teacherSelect);
    adding3.appendChild(teachersUl);

    addDiv.appendChild(adding3);

    let adding4 = document.createElement("div");
    adding4.className = "adding-select";
    let studentLabel = document.createElement("label");
    studentLabel.setAttribute("for", "students");
    studentLabel.innerText = "Students";
    let studentSelect = document.createElement("select");
    studentSelect.multiple = true;
    studentSelect.className= "select-teachers";
    lists[0].array.forEach(student => {
        let option = document.createElement("option");
        option.value = student.toString();
        option.innerText = student.toString();
        studentSelect.appendChild(option);
    })


    let studentsUl = document.createElement("ul");
    studentsUl.className = "teachers-ul";
    studentSelect.addEventListener("click",(event)=>{

        let flag = 0;
        for(let i =0;i<studentsUl.children.length;i++){
            if(studentsUl.children[i].children[0].innerText === event.target.value){
                flag = 1;
                return;
            }
        }
        if(flag === 1){
            return;
        }else {
            let li = document.createElement("li");
            let h4 = document.createElement ("h4");
            h4.innerText = event.target.value;
            let i = document.createElement("i");
            i.className = "select-close";
            i.addEventListener("click",(event)=>{
                event.target.parentElement.remove();
            });
            li.appendChild(h4);
            li.appendChild(i);
            studentsUl.appendChild(li);
        }
    });

    adding4.appendChild(studentLabel);
    adding4.appendChild(studentSelect);
    adding4.appendChild(studentsUl);

    addDiv.appendChild(adding4);


    div.addEventListener('click', (event) => {
        if (event.target.id === "add-component") {
            div.setAttribute("class", "hide");
            addcontainer.remove();
        }
    });
    codeInput.addEventListener("focus", () => {
        codeInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    nameInput.addEventListener("focus", () => {
        nameInput.style.border = " 1px solid rgba(255, 255, 255, 0.125)";
    });
    let btn = document.createElement("button");
    btn.id = "addStudent";
    btn.innerText = "Add Course";
    btn.addEventListener('click', (event) => {
        if (codeInput.value !== "" && nameInput.value !== "") {
            let course = new Course(codeInput.value,nameInput.value,textarea.value);
            for(let i =0;i<studentsUl.children.length;i++){
                lists[0].array.forEach(student =>{
                    if(student.toString() === studentsUl.children[i].children[0].innerText){
                        course.addStudents(student);
                    }
                })
            }
            for(let i =0;i<teachersUl.children.length;i++){
                lists[1].array.forEach(teacher =>{
                    console.log(teacher);
                    if(teacher.toString() === teachersUl.children[i].children[0].innerText){
                        course.addTeacher(teacher);
                    }
                })
            }
            course.addSchedule(scheduleSelect.value);
            lists[2].array.push(course);
            showCourses();
            div.setAttribute("class", "hide");
            addcontainer.remove();
        } else {
            if (codeInput.value === "") {
                codeInput.style.borderColor = "red";
            } if (nameInput.value === "") {
                nameInput.style.borderColor = "red";
            } 
        }

    });
    addDiv.appendChild(btn);
}


const viewCourse = (object) => {
    let div = document.getElementById("add-component");
    div.setAttribute("class", "add-component show");
    div.style.overflowY= "scroll";
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container extra");

    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addDiv.style.gap="20px";
    addcontainer.appendChild(addDiv);
    let i = document.createElement("i");
    i.className = "icon-close";
    addDiv.appendChild(i);
    i.addEventListener("click", () => {
        div.classList = "add-component hide";
        div.innerHTML = "";
    })

    let contentDiv = document.createElement("div");
    contentDiv.className = "content-div";
    addDiv.appendChild(contentDiv);

    let h4 =document.createElement("h4");
    h4.innerText = object.getCourseCode();
    let h2 = document.createElement("h2");
    h2.innerText = object.getCourseName();
    let p = document.createElement("p");
    p.innerText = object.getCourseDescription();

    contentDiv.appendChild(h4);
    contentDiv.appendChild(h2);
    contentDiv.appendChild(p);

    let schedHeader = document.createElement("h4");
    schedHeader.innerText =  object.getSchedule().toString();
    contentDiv.appendChild(schedHeader)

    let teacherDiv = document.createElement("div");
    teacherDiv.className = "teacher-div";
    let teacherH4 = document.createElement("h4");
    teacherH4.innerText = "Teachers";
    let teacherUl = document.createElement("ul");
    let teachers = object.getTeachers();
    teachers.forEach(teacher =>{
        let li = document.createElement("li");
        let h5 = document.createElement("h5");
        h5.innerText = teacher.toString();
        li.appendChild(h5);
        teacherUl.appendChild(li);
    })
    teacherDiv.appendChild(teacherH4);
    teacherDiv.appendChild(teacherUl);
    contentDiv.appendChild(teacherDiv);


    let studentsDiv = document.createElement("div");
    studentsDiv.className = "teacher-div";
    let studentH4 = document.createElement("h4");
    studentH4.innerText = "Students";
    let studentUl = document.createElement("ul");
    let students = object.getStudents();
    students.forEach(student =>{
        let li = document.createElement("li");
        let h5 = document.createElement("h5");
        h5.innerText = student.toString();
        li.appendChild(h5);
        studentUl.appendChild(li);
    })
    studentsDiv.appendChild(studentH4);
    studentsDiv.appendChild(studentUl);
    contentDiv.appendChild(studentsDiv);


    
}