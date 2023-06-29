package learn.gamer.controllers;

import learn.gamer.domain.GameService;
import learn.gamer.models.Game;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/game")
public class GameController {

    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    @GetMapping
    public List<Game> findAll() {
        return service.findAll();
    }

    @GetMapping("/{game_title}")
    public ResponseEntity<Game> findById(@PathVariable String gameTitle) {
        Game game = service.findByGameTitle(gameTitle);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(game);
    }
}
