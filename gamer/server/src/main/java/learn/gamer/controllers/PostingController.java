package learn.gamer.controllers;

import learn.gamer.data.DataAccessException;
import learn.gamer.domain.PostingService;
import learn.gamer.models.Posting;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/posting")
public class PostingController {
    private final PostingService service;
    public PostingController(PostingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Posting> findAll() throws DataAccessException {
        return service.findAll();
    }

    @GetMapping("/{postingId}")
    public Posting findById(@PathVariable int postingId) throws DataAccessException {
        return service.findById(postingId);
    }

    @GetMapping("/{gamerTag}")
    public List<Posting> findByGamerTag(@PathVariable String gamerTag) throws DataAccessException {
        return service.findByGamerTag(gamerTag);
    }

    @GetMapping("/{gameTitle}")
    public List<Posting> findByGameTitle(@PathVariable String gameTitle) throws DataAccessException {
        return service.findByGameTitle(gameTitle);
    }

    @GetMapping("/{datePosted}")
    public List<Posting> findByDate(@PathVariable LocalDate datePosted) throws DataAccessException {
        return service.findByDate(datePosted);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Posting posting) {
        Result<Agent> result = service.add(agent);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
