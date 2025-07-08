package com.nicholaskillilea.todo.dao;

import com.nicholaskillilea.todo.model.Task;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;
import java.math.BigDecimal;

@Component
public class JdbcTaskDao implements TaskDao{
    private final JdbcTemplate jdbcTemplate;

    public JdbcTaskDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Task> getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT * FROM tasks ORDER BY id";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            tasks.add(mapRowToTask(results));
        }

        return tasks;
    }

    @Override
    public Task getTaskById(int id) {
        return null;
    }

    @Override
    public Task getTaskByName(String name) {
        return null;
    }

    @Override
    public List<Task> getTaskByPriority(int priority) {
        return null;
    }

    @Override
    public List<Task> getTaskByStatus(String status) {
        return null;
    }

    @Override
    public List<Task> getTaskByDueDate(LocalDate dueDate) {
        return null;
    }

    @Override
    public Task createTask(Task task) {
        return null;
    }

    @Override
    public boolean updateTask(Task task) {
        return false;
    }

    @Override
    public boolean deleteTaskById(int id) {
        return false;
    }

    private Task mapRowToTask(SqlRowSet rowSet) {
        Task task = new Task();
        task.setId(rowSet.getInt("id"));
        task.setTask(rowSet.getString("task"));
        task.setDescription(rowSet.getString("description"));
        task.setPriority(rowSet.getInt("priority"));
        task.setCreatedOn(rowSet.getDate("created_on").toLocalDate());

        Date dueDate = rowSet.getDate("due_date");
        if (dueDate != null) {
            task.setDueDate(dueDate.toLocalDate());
        }

        BigDecimal estimatedHours = rowSet.getBigDecimal("estimated_hours");
        if (estimatedHours != null) {
            task.setEstimatedHours(estimatedHours);
        }

        task.setStatus(rowSet.getString("status"));
        return task;
    }
}
