package learn.gamer.domain;

import learn.gamer.data.GameRepository;
import learn.gamer.models.Game;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

    public Game findByGameTitle(String gameTitle) {
        return gameRepository.findByGameTitle(gameTitle);
    }

    public Result<Game> add(Game game) {
        Result<Game> result = validate(game);
        if (result.getResultType() != ResultType.SUCCESS) {
            return result;
        }

        Game inserted = gameRepository.add(game);
        if (inserted == null) {
            result.addMessage("insert failed", ResultType.INVALID);
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    public Result<Game> deleteById(int gameId) {
        Result<Game> result = new Result<Game>();
        if (!gameRepository.deleteById(gameId)) {
            result.addMessage("Game id " + gameId + " was not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    //VALIDATIONS
    //check if null
    //check for duplicate
    //

    private Result<Game> validate(Game game) {

        Result<Game> result = new Result<>();

        if (game == null) {
            result.addMessage("game cannot be null.",ResultType.INVALID);
            return result;
        }

        if (game.getGameTitle() == null || game.getGameTitle().isBlank()) {
            result.addMessage("Game `gameTitle` is required.", ResultType.INVALID);
        }
        return result;
    }
}
