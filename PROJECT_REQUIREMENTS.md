# Flashcard Generator — Capstone Project Requirements

## OVERVIEW

The Capstone project integrates the core ideas, concepts and principles learned in the preceding modules and puts them to use in real-world problems. It helps to exercise and assess the ability of learners to achieve optimal learning outcomes. Learners will apply knowledge and skills learned in various topics, which will help them specialise in each of them. It is intentionally designed to enable learners to make their concepts rock solid and to demonstrate their creativity and mastery of all the topics.

## KEY OBJECTIVES OF CAPSTONE PROJECT

### 2.1 Team Collaboration

Team members working in collaboration will always be able to learn from each other's successes and failures. They will have an organizational approach to learning. It will ensure bringing varied talents together, making a pool of different skills and knowledge. When working on projects together, each team member should have equal participation. Each team member should provide better input, brainstorm unique ideas and find solutions to the various project problems from time to time. Effective team collaboration makes all this extremely easy. Plus, it transcends all the obstacles that may stand in the way of achieving the final project goal.

### 2.2 Hands-on work experience

Capstone projects introduce you to the worldly scenario. This will help you identify your strengths and skills and foster the development of business. By getting hands-on experience in the classroom through capstone projects students develop the key transferable competencies and skills necessary for the workplace which are essential in the Full Stack Web Development domain.

### 2.3 Holistic Understanding

Capstone Projects are designed to ensure that a student inculcates a holistic understanding of various topics they have learned. It helps you master every concept and fosters overall growth, ensuring success. The biggest benefit of a holistic understanding is that it encompasses psychological, social, and emotional growth and Full Stack Web Development concepts. A holistic approach motivates students to learn about a subject. It instils curiosity and allows students to learn naturally and creatively.

## HOW TO DO THE CAPSTONE PROJECT

- Students are expected to unravel the project and have a definite view of how to execute.
- They can work on the project either in groups or individually (We encourage students to work in groups to gain maximum understanding).
- They can experiment and come up with innovative outcomes so that they can upscale their skills and prove their competency.

### 3.1 Group project

To form a team a student can go to the community spaces and put a post asking people to collaborate on your project. After forming a team, students can discuss and decide their way. It is essential for each student to contribute equally and to know the essence of the whole project including the tasks they are not responsible for. This would ensure comprehensive learning and help the students learn different perspectives from their peers. Please note the maximum size of a team is 3.

### 3.2 Individual project

If a student decides to do a project solely on their own, they can do so. The student must execute the project with utter clarity.

## GUIDELINES FOR FLASHCARD GENERATOR

### Pages

1. Create Flashcard Page
2. My Flashcards Page
3. Flashcard Details Page

### Libraries/Packages

- **react-router-dom** — https://www.npmjs.com/package/react-router-dom
- **react-redux** — https://www.npmjs.com/package/react-redux
- **react-icons** — https://react-icons.github.io/react-icons/
- **Formik** — https://formik.org/
- **Tailwind CSS** — https://tailwindcss.com/docs/installation

### Guidelines

- Your project directory must have a well-defined structure. Try to make different folders for different aspects of code. (For eg: components folder for different components). You can learn more about react project structure [here](https://youtu.be/Mm6_DlO5vvs).
- The Flash Card Project will have 3 pages.

#### Create Flashcard Page

- This page will create a particular flashcard and contain two forms — One for creating a main flashcard and the other for adding terms to that flashcard.
- The main flashcard form has 3 fields:
  - Create Group (Title of flashcard)
  - Image (Optional)
  - Description (Some details about that flashcard)
- The Term form will also have 3 fields:
  - Enter Term (Title)
  - Enter Definition (term definition)
  - Image (Optional)
- In the term form you have to add more buttons for adding more term inputs. When you click the "add more" button another set of inputs will get added. You can have as many terms as you need in a particular flashcard.
- You can delete a term you don't want to add by clicking the Trash icon shown on the rightmost end.
- When you click the edit icon, the cursor should focus on the title input of that term so that the user can edit the data.
- Lastly, you have the **Create** button that will create the flashcard.
- Use the **Formik** library for form validations and submission.

#### My Flashcards Page

- (Listing page for all created flashcards.)

#### Flashcard Details Page

- The flashcard details page must show the Flashcard title and description at the top.
- The terms in the flashcard should be shown on the left side, and when a user clicks on a particular term, the details must be displayed in the centre.
- The centre part i.e. the term details can also be shown as a carousel so that the user can navigate to other terms by clicking the arrows at the bottom.
- On clicking the share button, a modal should open which will contain the link of that flashcard and a copy button. When a user clicks the copy button, the link should be copied to the clipboard.
- Rest all things like social media sharing etc. are optional. You can implement them if you want.
- Other optional features are download and print features. When a user clicks the download button/print button, the PDF of the flashcard with all terms and their data can be generated and saved to their computer.

### State & Persistence

- As the data stored in React state is not persistent, you can use the **localStorage** API in JavaScript to store your data and make it persistent. Learn more at https://www.w3schools.com/jsref/prop_win_localstorage.asp
- For state management purposes you should make use of the **Redux** library.

### Process & Deployment

- As you will be doing your project in a group, for project management purposes you should use Git/GitHub.
- Test individual components using **React Testing Library**.
- Host your app on Heroku cloud or any other hosting provider you prefer.
