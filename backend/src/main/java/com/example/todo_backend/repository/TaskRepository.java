package com.example.todo_backend.repository;

import com.example.todo_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCompleted(boolean completed);
    List<Task> findByDueDateBefore(LocalDateTime dueDate);
    List<Task> findByCategory(String category);
}