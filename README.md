# 📚 Pre-Medical Student To-Do List & Planner

An interactive, feature-rich web application designed specifically for pre-medical students to organize their academic activities, track progress, and manage feedback from counselors, parents, and self-reflections.

![Pre-Medical Student Planner](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🔗 Live Demo

**[👉 Click here to view the live website](https://rodrigonyam.github.io/To-do-list-for-abiomedical-student/)**

> 💡 **Note**: If the link doesn't work yet, you need to enable GitHub Pages in your repository settings (see instructions below).

---

## 🌟 Features

### 📋 Task Management
- **Add Activities**: Create tasks with detailed information including:
  - Title and description
  - Category (Class, Lab, Assignment, Study Session, Extracurricular, Research, Volunteering, MCAT Prep)
  - Date and time
  - Priority levels (Low, Medium, High, Urgent)
- **Track Progress**: Mark tasks as completed with interactive checkboxes
- **Edit & Delete**: Full control over your tasks
- **Smart Sorting**: Tasks automatically sorted by date and priority
- **Overdue Warnings**: Visual indicators for overdue tasks

### 🎓 Field Specialization
Choose from multiple pre-medical fields:
- Biomedical Sciences
- Microbiology
- Biochemistry
- Anatomy
- Physiology
- Chemistry
- Neuroanatomy
- Neurophysiology
- Molecular Biology
- Cell Biology
- Immunology
- Pharmacology
- General Pre-Med

### 📊 Statistics Dashboard
- **Total Tasks**: View all activities at a glance
- **Completed Tasks**: Track accomplishments
- **Pending Tasks**: See what needs attention
- **Progress Percentage**: Visual progress indicator
- **Animated Counters**: Smooth number transitions

### 🔍 Advanced Filtering
- Filter by **Category**: Focus on specific types of activities
- Filter by **Priority**: Tackle urgent tasks first
- Filter by **Status**: View pending or completed items
- **Clear Filters**: Quick reset to view all tasks

### 💬 Feedback System

#### 🎓 Student Self-Reflection
- Share personal reflections on progress
- Track emotional state (Excellent, Good, Okay, Stressed, Overwhelmed)
- Document challenges and achievements

#### 👨‍🏫 Academic Counselor Feedback
- Counselors can provide professional guidance
- Rate academic performance (Outstanding to Requires Attention)
- Offer recommendations for improvement

#### 👨‍👩‍👧 Parent/Guardian Comments
- Parents can share observations from home
- Document support and encouragement
- Track student well-being

### ✨ Interactive Design
- **Smooth Animations**: Engaging transitions and hover effects
- **Ripple Effects**: Interactive button feedback
- **Confetti Celebration**: Success animations for completed tasks
- **Floating Cards**: Dynamic statistics display
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Click-to-Dismiss Notifications**: User-friendly alerts

### 💾 Data Persistence
- **Local Storage**: All data saved automatically
- **No Server Required**: Works completely offline
- **Privacy First**: Data never leaves your device

## 🚀 Getting Started

### 📺 View Live Demo

**[Click here to view the live website](https://rodrigonyam.github.io/To-do-list-for-abiomedical-student/)**

### 🔧 Enable GitHub Pages (First Time Setup)

If the live demo link doesn't work, follow these steps to enable GitHub Pages:

1. Go to your repository on GitHub
2. Click on **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://rodrigonyam.github.io/To-do-list-for-abiomedical-student/`

### Installation

1. **Clone or Download** this repository:
```bash
git clone https://github.com/rodrigonyam/To-do-list-for-abiomedical-student.git
```

2. **Navigate** to the project folder:
```bash
cd To-do-list-for-abiomedical-student
```

3. **Open** `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser

That's it! No installation, no dependencies, no server required.

## 📖 How to Use

### Adding a Task
1. Select your academic field from the dropdown
2. Fill in the activity details:
   - Enter a descriptive title
   - Choose a category
   - Set the date and time
   - Select priority level
   - Add optional description
3. Click "Add Activity"

### Managing Tasks
- **Complete**: Check the checkbox to mark as done
- **Edit**: Click the "Edit" button to modify details
- **Delete**: Click the "Delete" button to remove
- **Clear Completed**: Bulk delete all completed tasks

### Filtering Tasks
- Use the filter dropdowns to narrow down your view
- Select category, priority, or status
- Click "Clear Filters" to reset

### Submitting Feedback
1. Scroll to the feedback section
2. Choose the appropriate form:
   - Student Self-Reflection
   - Academic Counselor Feedback
   - Parent/Guardian Comments
3. Fill in all required fields
4. Click the submit button

### Viewing Feedback History
- All feedback appears in the "Feedback History" section
- Filter by type (Student, Counselor, Parent)
- Delete individual feedback or clear all history

## 🗂️ Project Structure

```
To-do-list-for-abiomedical-student/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with animations
  - Flexbox & Grid layouts
  - CSS animations & transitions
  - Responsive design
- **JavaScript (ES6+)**: Interactive functionality
  - Class-based architecture
  - Local Storage API
  - Event handling
  - DOM manipulation

## 🌐 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 🖥️ Desktop computers
- 💻 Laptops
- 📱 Tablets
- 📱 Mobile phones

## 🔒 Privacy & Security

- **100% Client-Side**: All data stored locally in your browser
- **No Data Collection**: No personal information sent anywhere
- **Offline Capable**: Works without internet connection
- **Your Data, Your Device**: Complete control over your information

## 🎯 Use Cases

Perfect for:
- Pre-medical students managing coursework
- Tracking lab schedules and assignments
- Organizing MCAT preparation
- Managing extracurricular activities
- Documenting research projects
- Coordinating with academic advisors
- Maintaining study schedules
- Balancing academic and personal commitments

## 🛠️ Customization

Want to customize the app? Here's how:

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Add New Categories
Modify the category options in `index.html`:
```html
<option value="Your New Category">Your New Category</option>
```

### Adjust Animations
Modify animation durations in `styles.css`:
```css
animation: yourAnimation 2s ease;
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**Rodrigue N**

## 🙏 Acknowledgments

Designed with ❤️ for pre-medical students working hard towards their dreams of becoming healthcare professionals.

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure JavaScript is enabled
3. Try clearing browser cache
4. Use a modern, updated browser

---

**Made for aspiring healthcare professionals** 🩺

**Good luck on your journey to medical school!** 🎓✨
