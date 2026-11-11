package com.example.trackerapi;

import com.example.trackerapi.model.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tasks/search")
public class TaskSearchController {
    @PersistenceContext
    private EntityManager em;

    @GetMapping
    public List<Task> search(@RequestParam(required = false) String status,
                             @RequestParam(required = false) String q) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Task> cq = cb.createQuery(Task.class);
        Root<Task> root = cq.from(Task.class);
        List<Predicate> preds = new ArrayList<>();
        if (status != null && !status.isBlank()) {
            preds.add(cb.equal(cb.upper(root.get("status").as(String.class)), status.trim().toUpperCase()));
        }
        if (q != null && !q.isBlank()) {
            String like = "%" + q.trim().toLowerCase() + "%";
            preds.add(cb.or(
                cb.like(cb.lower(root.get("title").as(String.class)), like),
                cb.like(cb.lower(root.get("description").as(String.class)), like)));
        }
        cq.select(root).where(preds.toArray(new Predicate[0]));
        return em.createQuery(cq).getResultList();
    }
}
