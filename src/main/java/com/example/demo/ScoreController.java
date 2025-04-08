package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @CrossOrigin
    @GetMapping("/{name}")
    public List<Score> getScoresByUserName(@PathVariable String name) {
        return scoreRepository.findByUserImie(name);
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Score>> getAllScores(){
        return ResponseEntity.ok(scoreRepository.findAll());
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Score> newScore(@RequestBody Score score){
        return ResponseEntity.ok(scoreRepository.save(score));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteScore(@PathVariable Long id){
        scoreRepository.deleteById(id);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Score> editScoreById(@PathVariable Long id, @RequestBody Score score){
        Score updateScore = scoreRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("User with id: "+id+" does not exists"));

        updateScore.setGame(score.getGame());
        updateScore.setScore_date(score.getScore_date());
        updateScore.setScore(score.getScore());
        updateScore.setUser(score.getUser());

        scoreRepository.save(updateScore);

        return ResponseEntity.ok(updateScore);
    }
}
