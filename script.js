// Task Manager Application for Pre-Medical Students

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.feedbacks = this.loadFeedbacks();
        this.currentField = document.getElementById('field').value;
        this.initializeEventListeners();
        this.renderTasks();
        this.updateStatistics();
        this.renderFeedbackHistory();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleAddTask(e));
        document.getElementById('field').addEventListener('change', (e) => this.handleFieldChange(e));
        document.getElementById('filterCategory').addEventListener('change', () => this.renderTasks());
        document.getElementById('filterPriority').addEventListener('change', () => this.renderTasks());
        document.getElementById('filterStatus').addEventListener('change', () => this.renderTasks());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompletedTasks());
        
        // Feedback form listeners
        document.getElementById('studentFeedbackForm').addEventListener('submit', (e) => this.handleStudentFeedback(e));
        document.getElementById('counselorFeedbackForm').addEventListener('submit', (e) => this.handleCounselorFeedback(e));
        document.getElementById('parentFeedbackForm').addEventListener('submit', (e) => this.handleParentFeedback(e));
        document.getElementById('feedbackFilter').addEventListener('change', () => this.renderFeedbackHistory());
        document.getElementById('clearFeedbackHistory').addEventListener('click', () => this.clearFeedbackHistory());
        
        // Set today's date as default for all forms
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDate').value = today;
        document.getElementById('studentDate').value = today;
        document.getElementById('counselorDate').value = today;
        document.getElementById('parentDate').value = today;
    }

    // Handle field change
    handleFieldChange(e) {
        this.currentField = e.target.value;
        this.renderTasks();
    }

    // Handle adding a new task
    handleAddTask(e) {
        e.preventDefault();
        
        const task = {
            id: Date.now(),
            field: this.currentField,
            title: document.getElementById('taskTitle').value.trim(),
            category: document.getElementById('taskCategory').value,
            date: document.getElementById('taskDate').value,
            time: document.getElementById('taskTime').value,
            priority: document.getElementById('taskPriority').value,
            description: document.getElementById('taskDescription').value.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStatistics();
        
        // Reset form
        document.getElementById('taskForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDate').value = today;
        
        // Show success feedback
        this.showNotification('Activity added successfully!', 'success');
    }

    // Toggle task completion
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStatistics();
        }
    }

    // Delete a task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this activity?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStatistics();
            this.showNotification('Activity deleted successfully!', 'danger');
        }
    }

    // Edit a task
    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        // Populate form with task data
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskDate').value = task.date;
        document.getElementById('taskTime').value = task.time || '';
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskDescription').value = task.description || '';

        // Delete the old task
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
        this.updateStatistics();

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showNotification('Edit the activity and submit to update', 'info');
    }

    // Clear all completed tasks
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStatistics();
            this.showNotification('Completed tasks cleared!', 'success');
        }
    }

    // Clear all filters
    clearFilters() {
        document.getElementById('filterCategory').value = 'All';
        document.getElementById('filterPriority').value = 'All';
        document.getElementById('filterStatus').value = 'All';
        this.renderTasks();
    }

    // Render all tasks based on filters
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const filterCategory = document.getElementById('filterCategory').value;
        const filterPriority = document.getElementById('filterPriority').value;
        const filterStatus = document.getElementById('filterStatus').value;

        // Filter tasks
        let filteredTasks = this.tasks.filter(task => {
            const categoryMatch = filterCategory === 'All' || task.category === filterCategory;
            const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
            const statusMatch = filterStatus === 'All' || 
                               (filterStatus === 'Completed' && task.completed) ||
                               (filterStatus === 'Pending' && !task.completed);
            
            return categoryMatch && priorityMatch && statusMatch;
        });

        // Sort tasks by date and priority
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            
            const priorityOrder = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <p>📝 No activities found. ${this.tasks.length > 0 ? 'Try adjusting your filters.' : 'Add your first task above!'}</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');

        // Add event listeners to checkboxes
        filteredTasks.forEach(task => {
            const checkbox = document.getElementById(`checkbox-${task.id}`);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.toggleTaskCompletion(task.id));
            }

            const editBtn = document.getElementById(`edit-${task.id}`);
            if (editBtn) {
                editBtn.addEventListener('click', () => this.editTask(task.id));
            }

            const deleteBtn = document.getElementById(`delete-${task.id}`);
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
            }
        });
    }

    // Create HTML for a single task
    createTaskHTML(task) {
        const taskDate = new Date(task.date);
        const formattedDate = taskDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });

        const isOverdue = !task.completed && new Date(task.date) < new Date();
        const overdueClass = isOverdue ? 'overdue' : '';

        return `
            <div class="task-card ${task.completed ? 'completed' : ''} ${overdueClass}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    id="checkbox-${task.id}"
                    ${task.completed ? 'checked' : ''}
                >
                <div class="task-content">
                    <div class="task-header">
                        <div>
                            <div class="task-title">${this.escapeHtml(task.title)}</div>
                            <div class="task-badges">
                                <span class="badge badge-category">${task.category}</span>
                                <span class="badge badge-priority-${task.priority}">${task.priority} Priority</span>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="btn-edit" id="edit-${task.id}">✏️ Edit</button>
                            <button class="btn-delete" id="delete-${task.id}">🗑️ Delete</button>
                        </div>
                    </div>
                    
                    <div class="task-meta">
                        <span>📅 ${formattedDate}</span>
                        ${task.time ? `<span>🕐 ${this.formatTime(task.time)}</span>` : ''}
                        ${isOverdue && !task.completed ? '<span style="color: #ef4444; font-weight: 600;">⚠️ Overdue</span>' : ''}
                    </div>
                    
                    ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    
                    <span class="task-field">📚 ${task.field}</span>
                </div>
            </div>
        `;
    }

    // Update statistics dashboard
    updateStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Animate number changes
        this.animateNumber('totalTasks', total);
        this.animateNumber('completedTasks', completed);
        this.animateNumber('pendingTasks', pending);
        
        document.getElementById('progressPercent').textContent = `${progress}%`;
    }

    // Animate number counting
    animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;
        const duration = 500;
        const steps = 20;
        const increment = (targetValue - currentValue) / steps;
        let current = currentValue;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            element.textContent = Math.round(current);
            
            if (step >= steps) {
                element.textContent = targetValue;
                clearInterval(timer);
            }
        }, duration / steps);
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10b981' : type === 'danger' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
            cursor: pointer;
        `;
        notification.textContent = message;

        // Add click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        document.body.appendChild(notification);

        // Add confetti effect for success
        if (type === 'success') {
            this.createConfetti();
        }

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Create confetti effect
    createConfetti() {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: 20px;
                right: ${20 + Math.random() * 100}px;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                z-index: 999;
                animation: confettiFall ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${Math.random() * 0.3}s;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }

    // Format time to 12-hour format
    formatTime(time) {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('preMedTasks', JSON.stringify(this.tasks));
    }

    // Load tasks from localStorage
    loadTasks() {
        const stored = localStorage.getItem('preMedTasks');
        return stored ? JSON.parse(stored) : [];
    }

    // Handle student feedback submission
    handleStudentFeedback(e) {
        e.preventDefault();
        
        const feedback = {
            id: Date.now(),
            type: 'Student',
            name: document.getElementById('studentName').value.trim(),
            date: document.getElementById('studentDate').value,
            mood: document.getElementById('studentMood').value,
            comment: document.getElementById('studentComment').value.trim(),
            createdAt: new Date().toISOString()
        };

        this.feedbacks.unshift(feedback);
        this.saveFeedbacks();
        this.renderFeedbackHistory();
        document.getElementById('studentFeedbackForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('studentDate').value = today;
        this.showNotification('Student reflection saved successfully!', 'success');
    }

    // Handle counselor feedback submission
    handleCounselorFeedback(e) {
        e.preventDefault();
        
        const feedback = {
            id: Date.now(),
            type: 'Counselor',
            name: document.getElementById('counselorName').value.trim(),
            date: document.getElementById('counselorDate').value,
            rating: document.getElementById('counselorRating').value,
            comment: document.getElementById('counselorComment').value.trim(),
            createdAt: new Date().toISOString()
        };

        this.feedbacks.unshift(feedback);
        this.saveFeedbacks();
        this.renderFeedbackHistory();
        document.getElementById('counselorFeedbackForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('counselorDate').value = today;
        this.showNotification('Counselor feedback submitted successfully!', 'success');
    }

    // Handle parent feedback submission
    handleParentFeedback(e) {
        e.preventDefault();
        
        const feedback = {
            id: Date.now(),
            type: 'Parent',
            name: document.getElementById('parentName').value.trim(),
            date: document.getElementById('parentDate').value,
            relation: document.getElementById('parentRelation').value,
            comment: document.getElementById('parentComment').value.trim(),
            createdAt: new Date().toISOString()
        };

        this.feedbacks.unshift(feedback);
        this.saveFeedbacks();
        this.renderFeedbackHistory();
        document.getElementById('parentFeedbackForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('parentDate').value = today;
        this.showNotification('Parent comment submitted successfully!', 'success');
    }

    // Render feedback history
    renderFeedbackHistory() {
        const feedbackHistory = document.getElementById('feedbackHistory');
        const filterType = document.getElementById('feedbackFilter').value;

        let filteredFeedbacks = this.feedbacks;
        if (filterType !== 'All') {
            filteredFeedbacks = this.feedbacks.filter(f => f.type === filterType);
        }

        if (filteredFeedbacks.length === 0) {
            feedbackHistory.innerHTML = `
                <div class="empty-state">
                    <p>💭 No feedback submitted yet</p>
                </div>
            `;
            return;
        }

        feedbackHistory.innerHTML = filteredFeedbacks.map(feedback => this.createFeedbackHTML(feedback)).join('');

        // Add delete button listeners
        filteredFeedbacks.forEach(feedback => {
            const deleteBtn = document.getElementById(`delete-feedback-${feedback.id}`);
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteFeedback(feedback.id));
            }
        });
    }

    // Create HTML for a single feedback item
    createFeedbackHTML(feedback) {
        const feedbackDate = new Date(feedback.date);
        const formattedDate = feedbackDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });

        let additionalInfo = '';
        if (feedback.type === 'Student') {
            additionalInfo = `<span>Feeling: ${feedback.mood}</span>`;
        } else if (feedback.type === 'Counselor') {
            additionalInfo = `<span>Rating: ${feedback.rating}</span>`;
        } else if (feedback.type === 'Parent') {
            additionalInfo = `<span>Relation: ${feedback.relation}</span>`;
        }

        return `
            <div class="feedback-item ${feedback.type.toLowerCase()}">
                <div class="feedback-item-header">
                    <div class="feedback-item-info">
                        <h4>${this.escapeHtml(feedback.name)}</h4>
                        <div class="feedback-item-meta">
                            <span class="feedback-type-badge ${feedback.type.toLowerCase()}">${feedback.type}</span>
                            <span>📅 ${formattedDate}</span>
                        </div>
                    </div>
                    <button class="btn-delete-feedback" id="delete-feedback-${feedback.id}">🗑️ Delete</button>
                </div>
                <div class="feedback-item-content">
                    ${this.escapeHtml(feedback.comment)}
                </div>
                ${additionalInfo ? `<div class="feedback-additional-info">${additionalInfo}</div>` : ''}
            </div>
        `;
    }

    // Delete a feedback
    deleteFeedback(feedbackId) {
        if (confirm('Are you sure you want to delete this feedback?')) {
            this.feedbacks = this.feedbacks.filter(f => f.id !== feedbackId);
            this.saveFeedbacks();
            this.renderFeedbackHistory();
            this.showNotification('Feedback deleted successfully!', 'danger');
        }
    }

    // Clear all feedback history
    clearFeedbackHistory() {
        if (this.feedbacks.length === 0) {
            this.showNotification('No feedback to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to delete all feedback? This action cannot be undone.')) {
            this.feedbacks = [];
            this.saveFeedbacks();
            this.renderFeedbackHistory();
            this.showNotification('All feedback cleared!', 'success');
        }
    }

    // Save feedbacks to localStorage
    saveFeedbacks() {
        localStorage.setItem('preMedFeedbacks', JSON.stringify(this.feedbacks));
    }

    // Load feedbacks from localStorage
    loadFeedbacks() {
        const stored = localStorage.getItem('preMedFeedbacks');
        return stored ? JSON.parse(stored) : [];
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(500px) rotate(720deg);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .shake {
        animation: shake 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
