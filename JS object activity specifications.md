Create an program that creates the following objects:

1. Teacher
2. Student
3. Schedule
4. Course

1. The Teacher object has the following properties:
    a. Teacher's ID Number
    b. Teacher's first name
    c. Teacher's last name
    d. Teacher's prefix (e.g. Dr., Engr., Mr., Ms., Mrs.)
    e. Teacher's suffix (e.g. MIT, PhD, MBA)
2. The Teacher object has the following methods:
    a. Teacher constructor which accepts the ID number, prefix, first name, the last name and suffix. (e.g. new Teacher(1110,'Dr.','Gregg','Gabison','DIT'))
    b. toString() which outputs the complete string of the teacher's information. (e.g. Dr. Gregg Gabison,PhD)

3. The Student object has the following properties:
    a. Student's ID number
    b. Student's first name
    c. Student's last name
    d. Student's program (e.g. BSIT, BSCS)
    e. Student's year
4. The Student object has the following methods:
    a. Student constructor which accepts the ID number, first name, last name, program and year
    b. toString() which outputs the complete string of the student's information. 

5. The Schedule object has the following properties:
    a. Schedule's code
    b. Schedule's days (e.g. MWF, TTH, S)
    c. Schedule's time (e.g. For MWF 08:00am - 09:00am, For TTH 08:30am - 10:00am)
    d. Schedule collection - an array that will contain the created schedules.
6. The Schedule object methods has the following methods:
    a. Schedule constructor which accepts the code, days, and time. This constructor will update the schedule collection
    b. searchSchedule(<schedule code>), searches the schedule collection and then returns the selected schedule object. 

7. The Course object has the following properties:
    a. Course's code
    b. Course's name
    c. Course's description
    d. Course's teacher - a collection of teacher objects
    e. Course's students - a collection of student objects
    f. Course's schedule - contains the selected schedule object
8. The Course object has the following methods:
    a. Course constuctor which will accept the course code, course name and course description (e.g. new Course(11100,'Apps Dev 1', 'Applications Development and Emerging Technologies'))
    b. addTeacher(<teacher object>) to accept the teacher/s for the course
    c. addStudents(<student object>) to accepts the student/s for the course
    d. addSchedule(<schedule object>) to accepts the course's schedule.
    e. getTeachers() returns the teacher/s assigned to this course
    f. getStudents() returns the student/s enrolled to this course
    g. getCourseCode() returns the course code
    h. getCourseName() returns the course name
    i. getCourseDescription() returns the course description
