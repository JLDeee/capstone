package learn.gamer.controllers;

import learn.gamer.domain.MatchService;
import learn.gamer.domain.Result;
import learn.gamer.models.Game;
import learn.gamer.models.Match;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/match")
public class MatchController {

    private final MatchService service;

    public MatchController(MatchService service) {
        this.service = service;
    }

    @GetMapping
    public List<Match> findAll() {
        return service.findAll();
    }

    @GetMapping("/{gamer_id_1}")
    public ResponseEntity<List<Match>> findYouMatched(@PathVariable int gamerId1) {
        List<Match> matches = service.findYouMatched(gamerId1);
        if (matches.size() == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matches);
    }

    @GetMapping("/{gamer_id_2}")
    public ResponseEntity<List<Match>> findMatchedYou(@PathVariable int gamerId2) {
        List<Match> matches = service.findMatchedYou(gamerId2);
        if (matches.size() == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(matches);
    }

/*    @PostMapping
    public ResponseEntity<Match> add(@RequestBody Match match) {
        Result<Match> result = service.add(match);
        return new ResponseEntity<>(result.getPayload(), getStatus(result, HttpStatus.CREATED));
    }*/
}
