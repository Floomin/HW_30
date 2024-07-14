
class User {
    /**
     * The function is a constructor in JavaScript that initializes properties for a user object
     * including name, age, image, role, and courses.
     * @param user - The `user` parameter in the constructor function seems to be an object containing
     * the following properties:
     */
    constructor(user) {
        this.name = user.name;
        this.age = user.age;
        this.img = user.img;
        this.role = user.role;
        this.courses = user.courses || [];
    }


    /**
     * The `renderCourses` function generates HTML elements for each course in the `courses` array with
     * their title and corresponding score class.
     * @returns The `renderCourses()` method is returning a string of HTML elements for each course in the
     * `courses` array. Each course is represented by a `<div>` element with two child `<span>` elements -
     * one for the course title and one for the course score. The class of the course score `<span>` is
     * determined by the `getScoreClass()` method based on the course mark.
     */
    renderCourses() {
        return this.courses.map(course => `
                    <div class="course">
                        <span class="course-title">${course.title}</span>
                        <span class="course-score ${this.getScoreClass(course.mark)}">${this.getScoreClass(course.mark)}</span>
                    </div>
                ` ).join('');
    }

    /**
     * The function `getScoreClass` determines the grade classification based on a given mark using a
     * predefined gradation object.
     * @param mark - Mark is the score or mark obtained by a student in an exam or assessment. It is used
     * as input to determine the corresponding grade or score class based on the grading scale defined in
     * the `gradation` object.
     * @returns The `getScoreClass` function returns the grade/class corresponding to the given mark based
     * on the gradation object. If the mark falls within a certain range of maximum scores, the
     * corresponding grade is returned. If the mark is higher than the maximum score in the gradation
     * object, an empty string is returned.
     */
    getScoreClass(mark) {
        let previousKey = 0;
        for (const [maxScore, grade] of Object.entries(gradation).sort((a, b) => a[0] - b[0])) {
            if (mark <= maxScore) {
                return grade;
            }
            previousKey = maxScore;
        }
        return '';
    }


    /**
     * The `render` function generates HTML markup for a user card with details like name, age, role,
     * and courses if available.
     * @returns The `render()` method is returning an HTML template string that represents a user card.
     * The template includes details such as the user's name, age, role, and courses they are enrolled
     * in. The user's role determines the styling of the user card. If the user is enrolled in courses,
     * additional course information is rendered as well.
     */
    render() {
        return `
                    <div class="user-card ${this.role.toLowerCase()}">
                        <div class="user-details">
                            <div class="user-header">
                                <img src="images/users/${this.img}.png" alt="${this.name}" class="user-img">
                                <div class="user-info">
                                    <p class="user-name">Name: <span>${this.name}</span></p>
                                    <p class="user-age">Age: <span>${this.age}</span></p>
                                </div>
                            </div>
                            <div class="user-role">
                                <img src="images/roles/${this.role.toLowerCase()}.png" alt="${this.role}" class="role-img">
                                <span class="role-text">${this.role}</span>
                            </div>
                        </div>
                        ${this.courses.length ? `<div class="user-courses">${this.renderCourses(this.role.toLowerCase())}</div>` : ''}
                    </div>
                `;
    }
}


/* The class `Student` extends the `User` class in JavaScript. */
class Student extends User {
    constructor(user) {
        super(user);
    }
}


/* The `Admin` class extends the `User` class and includes a method `renderCourses()` that generates
HTML elements for each course in the `courses` array with title, score, and lector information. */
class Admin extends User {
    constructor(user) {
        super(user);
    }
    /**
     * The `renderCourses` function generates HTML elements for each course in the `courses` array with
     * title, score, and lector information.
     * @returns The `renderCourses()` method is returning a string that contains HTML markup for each
     * course in the `courses` array. Each course is displayed within a `<div>` element with class
     * "course--admin". The course title, admin's score, and lector information are displayed within `<p>`
     * elements with appropriate classes. The method uses template literals to dynamically generate the
     * HTML markup for each course and then
     */
    renderCourses() {
        return this.courses.map(course => `
                    <div class="course--admin">
                    <p>Titel: <span class="course-title">${course.title}</span></p>
                    <p>Admin's score: <span class="course-score ${this.getScoreClass(course.score)}">${this.getScoreClass(course.score)}</span></p>    
                    <p>Lector:<span class="course-lector"> ${course.lector}</span></p>     
                    </div>
                `).join('');
    }
}

/* The `Lector` class extends the `User` class and includes a method `renderCourses()` to generate HTML
elements for displaying course information with scores. */
class Lector extends User {
    constructor(user) {
        super(user);
    }


    /**
     * The `renderCourses` function generates HTML elements for each course with title, lector's score, and
     * average student's score.
     * @returns The `renderCourses()` method returns a string containing HTML elements for each course in
     * the `courses` array. Each course is displayed with its title, lector's score, and average student's
     * score. The `getScoreClass()` method is used to determine the CSS class for displaying the score.
     */
    renderCourses() {
        return this.courses.map(course => `
                    <div class="course--lector">
                    <p>Titel: <span class="course-title"> ${course.title}</span></p>
                    <p>Lector's score: <span class="course-score ${this.getScoreClass(course.score)}"> ${this.getScoreClass(course.score)}</span></p>
                    <p>Average student's score: <span class="course-score ${this.getScoreClass(course.studentsScore)}"> ${this.getScoreClass(course.studentsScore)}</span></p>
                    </div>
                `).join('');
    }
}


/**
 * The `renderUsers` function takes an array of user objects, creates instances based on their roles,
 * and renders them in the specified container on the webpage.
 * @param users - An array of user objects, where each user object contains information such as name,
 * role, and other details.
 */
function renderUsers(users) {
    const container = document.getElementById('usersContainer');
    container.innerHTML = users.map(user => {
        let userInstance;
        switch (user.role.toLowerCase()) {
            case 'student':
                userInstance = new Student(user);
                break;
            case 'admin':
                userInstance = new Admin(user);
                break;
            case 'lector':
                userInstance = new Lector(user);
                break;
            default:
                userInstance = new User(user);
        }
        return userInstance.render();
    }).join('');
}


/* The `renderUsers(users);` function call is invoking a function named `renderUsers` with the argument
`users`. */
renderUsers(users);