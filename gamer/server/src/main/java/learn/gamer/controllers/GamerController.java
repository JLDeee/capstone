package learn.gamer.controllers;

import learn.gamer.domain.GamerService;
import learn.gamer.domain.Result;
import learn.gamer.domain.ResultType;
import learn.gamer.models.Gamer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gamer")
public class GamerController {
    private final GamerService service;

    public GamerController(GamerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Gamer> findAll() {
        return service.findAll();
    }
    
    @GetMapping("/game/{gameId}")
    public List<Gamer> findByGameId(@PathVariable int gameId) {
        return service.findByGameId(gameId);
    }

    @GetMapping("/{gamerTag}")
    public ResponseEntity<Gamer> findByGamerTag(@PathVariable String gamerTag) {
        Gamer gamer = service.findByGamerTag(gamerTag);
        if (gamerTag == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); // 404
        }
        return new ResponseEntity<>(gamer, HttpStatus.OK); // 200
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Gamer gamer) {
        Result<Gamer> result = service.create(gamer);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST); // 400
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED); // 201
    }

    @PutMapping("/{gamerTag}")
    public ResponseEntity<?> update(@PathVariable String gamerTag, @RequestBody Gamer gamer) {
        if (gamerTag != gamer.getGamerTag()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409
        }
        Result<Gamer> result = service.update(gamer);
        if (!result.isSuccess()) {
            if (result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
            } else {
                return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST); // 400
            }
        }
        return new ResponseEntity<>(result.getMessages(), HttpStatus.NO_CONTENT); // 204
    }
}
