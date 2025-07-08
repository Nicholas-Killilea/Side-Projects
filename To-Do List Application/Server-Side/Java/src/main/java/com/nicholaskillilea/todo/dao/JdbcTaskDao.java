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
        String sql = "SELECT * FROM tasks WHERE id = ? ORDER BY id";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, id);

        if (result.next()) {
            return mapRowToTask(result);
        } else {
            return null;
        }
    }

    @Override
    public Task getTaskByName(String name) {
        String sql = "SELECT * FROM tasks WHERE task ILIKE ? ORDER BY task";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, name);

        if (result.next()){
            return mapRowToTask(result);
        } else {
            return null;
        }
    }

    @Override
    public List<Task> getTaskByPriority(int priority) {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT * FROM tasks WHERE priority = ? ORDER BY priority";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, priority);
        while (results.next()) {
            tasks.add(mapRowToTask(results));
        }
        return tasks;
    }

    @Override
    public List<Task> getTaskByStatus(String status) {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT * FROM tasks WHERE status = ? ORDER BY status";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, status);
        while (results.next()) {
            tasks.add(mapRowToTask(results));
        }
        return tasks;
    }

    @Override
    public List<Task> getTaskByDueDate(LocalDate dueDate) {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT * FROM tasks WHERE due_date = ? ORDER BY due_date";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, dueDate);
        while (results.next()) {
            tasks.add(mapRowToTask(results));
        }
        return tasks;
    }

    @Override
    public Task createTask(Task task) {
        String sql = """
        INSERT INTO tasks (task, description, priority, created_on, due_date, estimated_hours, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING id;
        """;

        task.setCreatedOn(LocalDate.now());

        int newId = jdbcTemplate.queryForObject(sql, int.class,
            task.getTask(),
            task.getDescription(),
            task.getPriority(),
            task.getCreatedOn(),
            task.getDueDate(),
            task.getEstimatedHours(),
            task.getStatus()
        );

        task.setId(newId);
        return task;
    }

    @Override
    public boolean updateTask(Task task) {
        String sql = """
        UPDATE tasks
        SET task = ?, description = ?, priority = ?, due_date = ?, estimated_hours = ?, status = ?
        WHERE id = ?;
        """;

        int rowsUpdated = jdbcTemplate.update(sql,
            task.getTask(),
            task.getDescription(),
            task.getPriority(),
            task.getDueDate(),
            task.getEstimatedHours(),
            task.getStatus(),
            task.getId()
        );

        return rowsUpdated > 0;
    }

    @Override
    public boolean deleteTaskById(int id) {
        String sql = "DELETE FROM tasks WHERE id = ?";
        int rowsDeleted = jdbcTemplate.update(sql, id);
        return rowsDeleted > 0;
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
