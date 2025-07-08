package com.nicholaskillilea.todo.dao;
import com.nicholaskillilea.todo.model.Task;
import java.time.LocalDate;
import java.util.List;

public interface TaskDao {
    List<Task> getAllTasks();
    Task getTaskById(int id);
    Task getTaskByName(String name);
    List<Task> getTaskByPriority(int priority);
    List<Task> getTaskByStatus(String status);
    List<Task> getTaskByDueDate(LocalDate dueDate);
    Task createTask (Task task);
    boolean updateTask (Task task);
    boolean deleteTaskById (int id);
}
