package com.app.eotcbooks.repository;

import com.app.eotcbooks.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
