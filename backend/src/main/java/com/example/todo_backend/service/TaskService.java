package com.example.todo_backend.service;

import com.example.todo_backend.model.Task;
import com.example.todo_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByStatus(boolean completed) {
        return taskRepository.findByCompleted(completed);
    }

    public List<Task> getTasksByDueDate(LocalDateTime dueDate) {
        return taskRepository.findByDueDateBefore(dueDate);
    }

    public List<Task> getTasksByCategory(String category) {
        return taskRepository.findByCategory(category);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setCompleted(taskDetails.isCompleted());
        task.setPriority(taskDetails.getPriority());
        task.setCategory(taskDetails.getCategory());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.deleteById(id);
    }

    public Task markTaskComplete(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public List<Task> getFilteredTasks(String status, String category, String dueDate) {
        // If no filters, return all
        if ((status == null || status.equals("all")) && (category == null || category.isEmpty()) && (dueDate == null || dueDate.isEmpty())) {
            return getAllTasks();
        }
        // Filter by status, category, dueDate as needed
        List<Task> filtered = getAllTasks();
        if (status != null && !status.equals("all")) {
            final boolean completed;
            if (status.equalsIgnoreCase("completed")) {
                completed = true;
            } else if (status.equalsIgnoreCase("incomplete")) {
                completed = false;
            } else {
                completed = false;
            }
            filtered = filtered.stream().filter(t -> t.isCompleted() == completed).toList();
        }
        if (category != null && !category.isEmpty()) {
            filtered = filtered.stream().filter(t -> category.equalsIgnoreCase(t.getCategory())).toList();
        }
        if (dueDate != null && !dueDate.isEmpty()) {
            try {
                LocalDateTime dt;
                try {
                    dt = LocalDateTime.parse(dueDate);
                } catch (DateTimeParseException ex) {
                    LocalDate localDate = LocalDate.parse(dueDate, DateTimeFormatter.ISO_DATE);
                    dt = localDate.atTime(23, 59, 59);
                }
                final LocalDateTime filterDt = dt; // make effectively final
                filtered = filtered.stream()
                    .filter(t -> t.getDueDate() != null && t.getDueDate().isBefore(filterDt))
                    .toList();
            } catch (DateTimeParseException ex) {
                // ignore invalid date
            }
        }
        return filtered;
    }
}