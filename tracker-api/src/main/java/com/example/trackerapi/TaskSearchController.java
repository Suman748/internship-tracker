package com.example.trackerapi;

import com.example.trackerapi.model.Task;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> f1ab07c6ceee298e61ebc04857bb91315b3ab97c
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> origin/main
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tasks/search")
public class TaskSearchController {
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> f1ab07c6ceee298e61ebc04857bb91315b3ab97c
=======
>>>>>>> origin/main
    @PersistenceContext
    private EntityManager em;

    @GetMapping
    public List<Task> search(@RequestParam(required = false) String status,
                             @RequestParam(required = false) String q) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Task> cq = cb.createQuery(Task.class);
        Root<Task> root = cq.from(Task.class);
        List<Predicate> preds = new ArrayList<>();
<<<<<<< HEAD
<<<<<<< HEAD

        if (status != null && !status.isBlank()) {
            preds.add(cb.equal(cb.upper(root.get("status").as(String.class)),
                    status.trim().toUpperCase()));
=======
        if (status != null && !status.isBlank()) {
            preds.add(cb.equal(cb.upper(root.get("status").as(String.class)), status.trim().toUpperCase()));
>>>>>>> f1ab07c6ceee298e61ebc04857bb91315b3ab97c
=======
        if (status != null && !status.isBlank()) {
            preds.add(cb.equal(cb.upper(root.get("status").as(String.class)), status.trim().toUpperCase()));
>>>>>>> origin/main
        }
        if (q != null && !q.isBlank()) {
            String like = "%" + q.trim().toLowerCase() + "%";
            preds.add(cb.or(
<<<<<<< HEAD
<<<<<<< HEAD
                    cb.like(cb.lower(root.get("title").as(String.class)), like),
                    cb.like(cb.lower(root.get("description").as(String.class)), like)));
=======
                cb.like(cb.lower(root.get("title").as(String.class)), like),
                cb.like(cb.lower(root.get("description").as(String.class)), like)));
>>>>>>> f1ab07c6ceee298e61ebc04857bb91315b3ab97c
=======
                cb.like(cb.lower(root.get("title").as(String.class)), like),
                cb.like(cb.lower(root.get("description").as(String.class)), like)));
>>>>>>> origin/main
        }
        cq.select(root).where(preds.toArray(new Predicate[0]));
        return em.createQuery(cq).getResultList();
    }
}
